import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  createBrand,
  deleteBrand,
  updateBrand,
} from "../../redux/brand/brandSlice";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Upload,
  Image,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const Brand = () => {
  const dispatch = useDispatch();
  const { brands, loading } = useSelector((state) => state.brand);

  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const openModal = (brand = null) => {
    form.resetFields();
    setFileList([]);
    setPreviewImage(null);

    if (brand) {
      setEditId(brand._id);
      form.setFieldsValue({ name: brand.name });
      setPreviewImage(brand.brandImage || null);
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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      if (fileList[0]?.originFileObj) {
        formData.append("brandImage", fileList[0].originFileObj);
      }

      if (editId) {
        const result = await dispatch(
          updateBrand({ id: editId, formData })
        ).unwrap();
        toast.success(`Brand "${result.name}" updated successfully`);
      } else {
        const result = await dispatch(createBrand(formData)).unwrap();
        toast.success(`Brand "${result.name}" created successfully`);
      }
      closeModal();
    } catch (error) {
      toast.error(error.message || "Failed to save brand");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBrand(id)).unwrap();
      toast.success("Brand deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete brand");
    }
  };

  const columns = [
    {
      title: "Brand",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "brandImage",
      key: "image",
      render: (image) =>
        image ? (
          <Image src={image} alt="brand" width={60} height={60} />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            type="default"
            onClick={() => openModal(record)}
            className="mr-2"
          >
            Edit
          </Button>
          {/* <Popconfirm
            title="Are you sure to delete this brand?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm> */}
          <Popconfirm
            title="Are you sure to delete this brand?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ style: { color: "black" } }}
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Brands</h1>
        <Button
          type="default"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          Create Brand
        </Button>
      </div>

      <Table
        dataSource={brands}
        columns={columns}
        rowKey="_id"
        loading={loading}
        bordered
      />

      {/* <Modal
        title={editId ? "Edit Brand" : "Create Brand"}
        open={showModal}
        onCancel={closeModal}
        onOk={handleSubmit}
        okText={editId ? "Update" : "Create"}
      > */}
      <Modal
  title={editId ? "Edit Brand" : "Create Brand"}
  open={showModal}
  onCancel={closeModal}
  onOk={handleSubmit}
  okText={editId ? "Update" : "Create"}
  okButtonProps={{
    type: "primary", // ensures blue button
    style: {
      backgroundColor: "#1890ff",
      borderColor: "#1890ff",
      color: "#fff", // optional if text is not visible
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

        <Form form={form} layout="vertical">
          <Form.Item
            label="Brand Name"
            name="name"
            rules={[{ required: true, message: "Please enter brand name" }]}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>

          <Form.Item label="Brand Image">
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false} // Prevent auto-upload
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
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

export default Brand;
