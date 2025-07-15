import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Form,
  Space,
  Modal,
  Upload,
  Select,
  Image,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/product/productSlice";
import { getBrands } from "../../redux/brand/brandSlice";
import { getCategories } from "../../redux/category/categorySlice";
import { toast } from "react-toastify";
import slugify from "slugify";

const { Option } = Select;

const Product = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);

  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  const openModal = (product = null) => {
    form.resetFields();
    setFileList([]);
    setPreviewImage(null);

    if (product) {
      setEditId(product._id);
      form.setFieldsValue({
        name: product.name,
        slug: product.slug,
        description: product.description,
        listPrice: product.listPrice,
        discountPrice: product.discountPrice,
        weight: product.weight,
        status: product.status,
        brand: product.brand?._id || product.brand,
        category: product.category?._id || product.category,
      });
      setPreviewImage(product.productImage || null);
    } else {
      setEditId(null);
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    form.resetFields();
    setFileList([]);
    setPreviewImage(null);
    setEditId(null);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    form.setFieldsValue({
      slug: slugify(name, { lower: true }),
    });
  };

  const handlePriceChange = () => {
    const listPrice = parseFloat(form.getFieldValue("listPrice"));
    if (!isNaN(listPrice)) {
      const discount = +(listPrice - (listPrice * 29.99) / 100).toFixed(2);
      form.setFieldsValue({ discountPrice: discount });
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("slug", values.slug);
      formData.append("description", values.description);
      formData.append("listPrice", parseFloat(values.listPrice));
      formData.append("discountPrice", parseFloat(values.discountPrice));
      formData.append("weight", parseFloat(values.weight));
      formData.append("status", values.status);
      formData.append("brand", values.brand);
      formData.append("category", values.category);

      if (fileList[0]?.originFileObj) {
        formData.append("productImage", fileList[0].originFileObj);
      }

      if (editId) {
        const result = await dispatch(updateProduct({ id: editId, formData })).unwrap();
        toast.success(`Product "${result.name}" updated successfully`);
      } else {
        const result = await dispatch(createProduct(formData)).unwrap();
        toast.success(`Product "${result.name}" created successfully`);
      }

      closeModal();
      dispatch(getProducts());
    } catch (error) {
      toast.error(error.message || "Error saving product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success("Product deleted successfully");
      dispatch(getProducts());
    } catch (error) {
      toast.error(error.message || "Error deleting product");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price ($)",
      dataIndex: "listPrice",
      render: (p) => `$${p}`,
    },
    {
      title: "Discount ($)",
      dataIndex: "discountPrice",
      render: (p) => `$${p}`,
    },
    {
      title: "Weight (KG)",
      dataIndex: "weight",
    },
    {
      title: "Image",
      dataIndex: "productImage",
      render: (img) =>
        img ? (
          <Image src={img} alt="product" width={50} height={50} style={{ objectFit: "cover" }} />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ style: { color: "#000" } }}
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Button type="default" icon={<PlusOutlined />} onClick={() => openModal()}>
          Create Product
        </Button>
      </div>

      <Table
        dataSource={products}
        columns={columns}
        rowKey="_id"
        loading={loading}
        bordered
      />

      <Modal
        title={editId ? "Edit Product" : "Create Product"}
        open={showModal}
        onCancel={closeModal}
        onOk={handleSubmit}
        okText={editId ? "Update" : "Create"}
        okButtonProps={{
          type: "primary",
          style: {
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            color: "#fff",
          },
        }}
        cancelButtonProps={{
          style: {
            color: "#000",
            backgroundColor: "#f5f5f5",
            borderColor: "#d9d9d9",
          },
        }}
      >
        <Form form={form} layout="vertical" initialValues={{ status: "active" }}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Product Name"
              name="name"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input placeholder="Enter product name" onChange={handleNameChange} />
            </Form.Item>

            <Form.Item label="Slug" name="slug">
              <Input disabled />
            </Form.Item>
          </div>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="List Price ($)"
              name="listPrice"
              rules={[{ required: true, message: "Enter list price" }]}
            >
              <Input type="number" step="0.01" onChange={handlePriceChange} />
            </Form.Item>

            <Form.Item label="Discount Price ($)" name="discountPrice">
              <Input type="number" step="0.01" disabled />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Weight (KG)"
              name="weight"
              rules={[{ required: true, message: "Enter weight" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Status" name="status">
              <Select>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Brand" name="brand" rules={[{ required: true }]}>
              <Select placeholder="Select Brand">
                {brands?.map((b) => (
                  <Option key={b._id} value={b._id}>{b.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Category" name="category" rules={[{ required: true }]}>
              <Select placeholder="Select Category">
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item label="Product Image">
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList: newList }) => setFileList(newList)}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {previewImage && fileList.length === 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Current Image:</p>
                <Image src={previewImage} alt="preview" width={100} />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
