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
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  SearchOutlined,
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

  // Filters
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  // Brand change for filter bar
  const handleBrandChange = (brandId) => {
    setSelectedBrand(brandId);
    setSelectedCategory(null);

    if (brandId) {
      const filtered = categories.filter(
        (cat) => cat.brand?._id === brandId || cat.brand === brandId
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  };

  // Brand change inside form (modal)
  const handleFormBrandChange = (brandId) => {
    const filtered = categories.filter(
      (cat) => cat.brand?._id === brandId || cat.brand === brandId
    );
    setFilteredCategories(filtered);
    form.setFieldsValue({ category: null });
  };

  const openModal = (product = null) => {
    form.resetFields();
    setFileList([]);
    setPreviewImage(null);

    if (product) {
      setEditId(product._id);
      const brandId = product.brand?._id || product.brand;
      const filtered = categories.filter(
        (cat) => cat.brand?._id === brandId || cat.brand === brandId
      );
      setFilteredCategories(filtered);

      form.setFieldsValue({
        name: product.name,
        slug: product.slug,
        description: product.description,
        listPrice: product.listPrice,
        discountPrice: product.discountPrice,
        weight: product.weight,
        weightUnit: product.weightUnit || "kg",
        capacity: product.capacity,
        // width: product.width,
        // height: product.height,
        // dimension: product.dimension,
        stock: product.stock,
        status: product.status,
        brand: brandId,
        category: product.category?._id || product.category,
      });
      setPreviewImage(product.productImage || null);
    } else {
      setEditId(null);
      setFilteredCategories([]);
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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (fileList[0]?.originFileObj) {
        formData.append("productImage", fileList[0].originFileObj);
      }

      if (editId) {
        const result = await dispatch(
          updateProduct({ id: editId, formData })
        ).unwrap();
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

  // Table columns
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Price ($)", dataIndex: "listPrice", render: (p) => `$${p}` },
    {
      title: "Discount ($)",
      dataIndex: "discountPrice",
      render: (p) => `$${p}`,
    },
    // { title: "Weight", render: (r) => `${r.weight} ${r.weightUnit || "kg"}` },
    // { title: "Capacity", dataIndex: "capacity" },
    // {
    //   title: "Size (W×H×D)",
    //   render: (r) =>
    //     r.width && r.height && r.dimension
    //       ? `${r.width}×${r.height}×${r.dimension} cm`
    //       : "N/A",
    // },
    {
      title: "Brand",
      render: (r) =>
        typeof r.brand === "object"
          ? r.brand?.name
          : brands.find((b) => b._id === r.brand)?.name || "N/A",
    },

    {
      title: "Category",
      render: (r) => r.category?.name || "N/A",
    },
    {
      title: "Image",
      dataIndex: "productImage",
      render: (img) =>
        img ? <Image src={img} alt="product" width={50} height={50} /> : "N/A",
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
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Filtering logic
  const filteredProducts = products
    .filter((p) => {
      const matchesBrand =
        !selectedBrand ||
        p.brand?._id === selectedBrand ||
        p.brand === selectedBrand;
      const matchesCategory =
        !selectedCategory ||
        p.category?._id === selectedCategory ||
        p.category === selectedCategory;
      const matchesSearch =
        !searchText || p.name.toLowerCase().includes(searchText.toLowerCase());
      return matchesBrand && matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Filter Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h1 className="text-2xl font-semibold">Products</h1>

        <div className="flex flex-wrap gap-3 items-center">
          <Select
            placeholder="Filter by Brand"
            allowClear
            style={{ width: 180 }}
            value={selectedBrand}
            onChange={handleBrandChange}
          >
            {brands?.map((b) => (
              <Option key={b._id} value={b._id}>
                {b.name}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Filter by Category"
            allowClear
            style={{ width: 180 }}
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            disabled={!selectedBrand || filteredCategories.length === 0}
            notFoundContent={
              !selectedBrand
                ? "Select brand first"
                : "No category available for this brand"
            }
          >
            {(filteredCategories.length > 0
              ? filteredCategories
              : categories
            ).map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>

          <Input
            placeholder="Search by product name"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 220 }}
            allowClear
          />

          <Button
            type="default"
            icon={<PlusOutlined />}
            onClick={() => openModal()}
          >
            Create Product
          </Button>
        </div>
      </div>

      {/* Product Table */}
      <Table
        dataSource={filteredProducts}
        columns={columns}
        rowKey="_id"
        loading={loading}
        bordered
      />

      {/* Modal Form */}
      <Modal
        title={editId ? "Edit Product" : "Create Product"}
        open={showModal}
        onCancel={closeModal}
        onOk={handleSubmit}
        okText={editId ? "Update" : "Create"}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input
              onChange={handleNameChange}
              placeholder="Enter product name"
            />
          </Form.Item>

          <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
            <Input placeholder="Auto-generated slug" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          {/* Price Fields */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="listPrice"
                label="List Price"
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="List Price" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="discountPrice"
                label="Discount Price"
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="Discount Price" />
              </Form.Item>
            </Col>
          </Row>

          {/* Weight + Unit */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="weight"
                label="Weight"
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="Weight" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="weightUnit" label="Unit" initialValue="kg">
                <Select>
                  <Option value="kg">KG</Option>
                  <Option value="lbs">LBS</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Dimensions */}
          {/* <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="width" label="Width">
                <Input type="number" placeholder="Width (cm)" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="height" label="Height">
                <Input type="number" placeholder="Height (cm)" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="dimension" label="Depth">
                <Input type="number" placeholder="Depth (cm)" />
              </Form.Item>
            </Col>
          </Row> */}

          {/* Capacity + Status (same line) */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="capacity" label="Capacity">
                <Input placeholder="e.g. 5L" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="Status" initialValue="active">
                <Select>
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Stock */}
          <Form.Item name="stock" label="Stock">
            <Input type="number" placeholder="Enter stock quantity" />
          </Form.Item>

          {/* Brand & Category */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="brand"
                label="Brand"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Brand"
                  onChange={handleFormBrandChange}
                >
                  {brands?.map((b) => (
                    <Option key={b._id} value={b._id}>
                      {b.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Category"
                  disabled={filteredCategories.length === 0}
                  notFoundContent="No category for this brand"
                >
                  {filteredCategories.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Product Image">
            <Upload
              listType="picture"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {previewImage && (
              <Image
                src={previewImage}
                alt="Preview"
                style={{ marginTop: 10 }}
                width={100}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
