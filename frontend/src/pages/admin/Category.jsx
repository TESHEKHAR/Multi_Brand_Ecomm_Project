import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Form,
  Modal,
  Popconfirm,
  Space,
  Select,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../redux/category/categorySlice";
import { getBrands } from "../../redux/brand/brandSlice";
import { toast } from "react-toastify";

const { Option } = Select;

const Category = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);

  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  const openModal = (category = null) => {
    form.resetFields();
    if (category) {
      setEditId(category._id);
      form.setFieldsValue({
        name: category.name,
        brand: category.brand?._id || undefined,
      });
    } else {
      setEditId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    form.resetFields();
    setShowModal(false);
    setEditId(null);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = {
        name: values.name,
        brand: values.brand,
      };

      if (editId) {
        await dispatch(updateCategory({ id: editId, formData })).unwrap();
        toast.success("Category updated successfully");
      } else {
        await dispatch(createCategory(formData)).unwrap();
        toast.success("Category created successfully");
      }

      closeModal();
      dispatch(getCategories());
    } catch (error) {
      toast.error(error.message || "Error saving category");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
      toast.success("Category deleted successfully");
      dispatch(getCategories());
    } catch (error) {
      toast.error(error.message || "Error deleting category");
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
    },
    {
      title: "Brand",
      dataIndex: ["brand", "name"],
      render: (brandName) => brandName || "N/A",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this category?"
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => openModal()}
        >
          Create Category
        </Button>
      </div>

      <Table
        dataSource={categories}
        columns={columns}
        rowKey="_id"
        loading={loading}
        bordered
      />

      <Modal
        title={editId ? "Edit Category" : "Create Category"}
        open={showModal}
        onCancel={closeModal}
        onOk={handleSubmit}
        okText={editId ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item label="Brand" name="brand">
            <Select placeholder="Select a brand" allowClear>
              {brands.map((b) => (
                <Option key={b._id} value={b._id}>
                  {b.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
