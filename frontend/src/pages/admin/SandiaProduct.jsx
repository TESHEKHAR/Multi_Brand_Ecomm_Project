import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  Row,
  Col,
  Space,
  Typography,
  message,
  Modal,
  Table,
  Popconfirm,
  Image,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined, CloudUploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, createProduct } from '../../redux/sandiaProduct/sandiaproductSlice';

const { Title } = Typography;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const SandiaProduct = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.SandiaProduct);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      // Append simple string/number fields
      Object.entries(values).forEach(([key, value]) => {
        if (
          ['productName', 'header', 'slug', 'shortDescription', 'description','specifications','modelNumber', 'productImages','warranty', 'includes', 'listPrice', 'discountPrice', 'accessories', 'accessories','discountPrice'].includes(key)
        ) {
          formData.append(key, value);
        }
      });

      // Append product images
      values.productImages?.forEach((fileWrapper) => {
        const file = fileWrapper.fileList?.[0]?.originFileObj;
        if (file) formData.append('productImages', file);
      });

      // Append literature files
      values.literature?.forEach((fileWrapper) => {
        const file = fileWrapper.fileList?.[0]?.originFileObj;
        if (file) formData.append('literature', file);
      });

      // Append specifications as JSON string
      formData.append('specifications', JSON.stringify(values.specifications || []));

      // Process and append accessories and their images
      const accessories = values.accessories?.map((acc) => ({
        ...acc,
        image: acc.image?.map((fw) => fw.fileList?.[0]?.originFileObj?.name || fw.url || ''), // Store image name or URL
      }));
      formData.append('accessories', JSON.stringify(accessories || []));
      

      values.accessories?.forEach((acc) => {
        acc.image?.forEach((fw) => {
          const file = fw.fileList?.[0]?.originFileObj;
          if (file) formData.append('accessoryImages', file);
        });
      });

      if (editingProduct) {
        // If editing an existing product
        // await dispatch(updateProduct({ id: editingProduct.id, data: formData })).unwrap();
        // message.success('Product updated successfully!');
      } else {
        // If creating a new product
        await dispatch(createProduct(formData)).unwrap();
        message.success('Product created successfully!');
      }

      form.resetFields();
      setIsModalVisible(false);
      setEditingProduct(null); // Clear editing product
      dispatch(getProducts()); // Re-fetch products to update the table
    } catch (err) {
      console.error('Form submission error:', err);
      message.error(err.message || 'Error saving product');
    }
  };

  const showModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      const formData = { ...product };

      const createFileListItem = (file, idx) => ({
        uid: file.uid || `rc-upload-${Date.now()}-${idx}`,
        name: file.name || `file-${idx}`,
        status: 'done',
        url: file instanceof File ? URL.createObjectURL(file) : file,
        originFileObj: file instanceof File ? file : null,
      });

      if (formData.productImages) {
        formData.productImages = formData.productImages.map((file, idx) => ({
          fileList: file ? [createFileListItem(file, idx)] : [],
        }));
      }
      if (formData.literature) {
        formData.literature = formData.literature.map((file, idx) => ({
          fileList: file ? [createFileListItem(file, idx)] : [],
        }));
      }
      if (formData.accessories) {
        formData.accessories = formData.accessories.map(acc => ({
          ...acc,
          image: acc.image?.map((file, idx) => ({
            fileList: file ? [createFileListItem(file, idx)] : [],
          })),
        }));
      }
      form.setFieldsValue(formData);
    } else {
      setEditingProduct(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingProduct(null);
  };

  // const handleDeleteProduct = (id) => {
  //   setProducts(products.filter(p => p.id !== id));
  //   message.success('Product deleted successfully!');
  // };

 const handleDeleteProduct = async (id) => {
    try {
      // await dispatch(deleteProduct(id)).unwrap();
      // message.success('Product deleted successfully!');
      dispatch(getProducts()); // Re-fetch products to update the table
    } catch (err) {
      message.error(err.message || 'Error deleting product');
    }
  };
  const productTableColumns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      sorter: (a, b) => a.productName.localeCompare(b.productName),
      width: 180, 
    },
    {
      title: 'Model Number',
      dataIndex: 'modelNumber',
      key: 'modelNumber',
      width: 120,
    },
    {
      title: 'List Price',
      dataIndex: 'listPrice',
      key: 'listPrice',
      render: (text) => text ? `$${parseFloat(text).toFixed(2)}` : '-',
      sorter: (a, b) => a.listPrice - b.listPrice,
      width: 100,
    },
    {
      title: 'Short Description',
      dataIndex: 'shortDescription',
      key: 'shortDescription',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Images',
      dataIndex: 'productImages',
      key: 'productImages',
      width: 120,
      render: (images) => {
        const validImages = images?.filter(img => img instanceof File || typeof img === 'string');
        return (
          <Space size={[4, 4]} wrap>
            {validImages && validImages.length > 0 ? (
              validImages.slice(0, 3).map((file, index) => (
                <Image
                  key={file.uid || index}
                  src={file instanceof File ? URL.createObjectURL(file) : file}
                  alt={`product-${index}`}
                  width={50}
                  height={50}
                  style={{ objectFit: 'cover', borderRadius: 4 }}
                  fallback="https://via.placeholder.com/50?text=IMG"
                />
              ))
            ) : (
              <span style={{ color: '#bfbfbf' }}>No Images</span>
            )}
            {validImages && validImages.length > 3 && `+${validImages.length - 3} more`}
          </Space>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)} size="small" />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDeleteProduct(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }} 
          >
            <Button type="link" icon={<DeleteOutlined />} danger size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <Button type="default" icon={<CloudUploadOutlined />} size="large" onClick={() => showModal()}>
          Create New Product
        </Button>
      </div>
      <Table
        dataSource={products}
        columns={productTableColumns}
        rowKey="id"
        pagination={{ pageSize: 5 }} 
        locale={{ emptyText: 'No products created yet. Click "Create New Product" to add one.' }}
        bordered
        scroll={{ x: 1200 }}
        className="shadow-md rounded-lg"
        loading={loading}
      />

      <Modal
        title={<Title level={4} style={{ margin: 0 }}>{editingProduct ? 'Edit Product' : 'Create Product'}</Title>}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1000}
        destroyOnClose={true}
        maskClosable={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ specifications: [{}], accessories: [{}], productImages: [{}], literature: [{}] }}
          scrollToFirstError
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Product Name" name="productName" rules={[{ required: true, message: 'Please enter product name!' }]}>
                <Input placeholder="Enter product name" />
              </Form.Item>

              <Form.Item label="Header" name="header">
                <Input placeholder="Enter header" />
              </Form.Item>

              <Form.Item label="Slug" name="slug">
                <Input placeholder="Enter slug (e.g., product-name-model)" />
              </Form.Item>

              <Form.Item label="Short Description" name="shortDescription">
                <Input.TextArea rows={2} placeholder="A brief overview of the product" />
              </Form.Item>

              <Form.Item label="Model Number" name="modelNumber">
                <Input placeholder="Enter model number" />
              </Form.Item>

              <Form.Item label="Warranty" name="warranty">
                <Input placeholder="e.g., 1 Year Limited Warranty" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Includes" name="includes">
                <Input.TextArea rows={2} placeholder="Items included with the product (e.g., Power Adapter, Manual)" />
              </Form.Item>

              <Form.Item label="List Price" name="listPrice" rules={[{ type: 'number', transform: (value) => value ? Number(value) : null, message: 'Must be a number!' }]}>
                <Input type="number" placeholder="Enter list price" prefix="$" />
              </Form.Item>

              <Form.Item label="Discount Price" name="discountPrice" rules={[{ type: 'number', transform: (value) => value ? Number(value) : null, message: 'Must be a number!' }]}>
                <Input type="number" placeholder="Enter discount price (optional)" prefix="$" />
              </Form.Item>

              <Form.Item label="Full Description" name="description">
                <Input.TextArea rows={6} placeholder="Detailed description of the product features and benefits." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Title level={5} style={{ marginTop: 16, marginBottom: 8 }}>Product Images</Title>
              <Form.List name="productImages">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, idx) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'fileList']}
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          rules={[{ required: true, message: 'Please upload an image!' }]}
                          style={{ flexGrow: 1 }}
                        >
                          <Upload
                            name="productImage"
                            listType="picture"
                            maxCount={1}
                            onPreview={handlePreview}
                            beforeUpload={() => false}
                          >
                            <Button icon={<UploadOutlined />}>Select Image</Button>
                          </Upload>
                        </Form.Item>
                        {fields.length > 0 && (
                          <MinusCircleOutlined onClick={() => remove(name)} style={{ marginLeft: 8 }} />
                        )}
                        {idx === fields.length - 1 && (
                          <PlusOutlined onClick={() => add()} style={{ marginLeft: 8 }} />
                        )}
                      </Space>
                    ))}
                    {fields.length === 0 && (
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Product Image
                      </Button>
                    )}
                  </>
                )}
              </Form.List>

              <Title level={5} style={{ marginTop: 16, marginBottom: 8 }}>Specifications</Title>
              <Form.List name="specifications">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, idx) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'key']}
                          rules={[{ required: true, message: 'Key required' }]}
                          style={{ flex: 1 }}
                        >
                          <Input placeholder="Key (e.g., Power)" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Value required' }]}
                          style={{ flex: 2 }}
                        >
                          <Input placeholder="Value (e.g., 120V AC)" />
                        </Form.Item>
                        {fields.length > 0 && (
                          <MinusCircleOutlined onClick={() => remove(name)} style={{ marginLeft: 8 }} />
                        )}
                        {idx === fields.length - 1 && (
                          <PlusOutlined onClick={() => add()} style={{ marginLeft: 8 }} />
                        )}
                      </Space>
                    ))}
                    {fields.length === 0 && (
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Specification
                      </Button>
                    )}
                  </>
                )}
              </Form.List>
            </Col>

            <Col span={12}>
              <Title level={5} style={{ marginTop: 16, marginBottom: 8 }}>Accessories</Title>
              <Form.List name="accessories">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} style={{ marginBottom: 16, border: '1px solid #f0f0f0', borderRadius: 4, padding: 16 }}>
                        <Row gutter={[8, 8]} align="middle">
                          <Col span={24}>
                            <Form.List {...restField} name={[name, 'image']}>
                              {(imgFields, { add: addImg, remove: removeImg }) => (
                                <>
                                  <Space direction="vertical" style={{ width: '100%' }}>
                                    {imgFields.map((imgField, imgIdx) => (
                                      <Space key={imgField.key} style={{ display: 'flex', marginBottom: 0 }} align="baseline">
                                        <Form.Item
                                          {...imgField}
                                          name={[imgField.name, 'fileList']}
                                          valuePropName="fileList"
                                          getValueFromEvent={normFile}
                                          rules={[{ required: true, message: 'Upload accessory image!' }]}
                                          style={{ flexGrow: 1 }}
                                        >
                                          <Upload
                                            name="accessoryImage"
                                            listType="picture"
                                            maxCount={1}
                                            onPreview={handlePreview}
                                            beforeUpload={() => false}
                                          >
                                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                                          </Upload>
                                        </Form.Item>
                                        {imgFields.length > 0 && (
                                          <MinusCircleOutlined onClick={() => removeImg(imgField.name)} style={{ marginLeft: 8 }} />
                                        )}
                                        {imgIdx === imgFields.length - 1 && (
                                          <PlusOutlined onClick={() => addImg()} style={{ marginLeft: 8 }} />
                                        )}
                                      </Space>
                                    ))}
                                  </Space>
                                  {imgFields.length === 0 && (
                                    <Button type="dashed" onClick={() => addImg()} block icon={<PlusOutlined />}>
                                      Add Accessory Image
                                    </Button>
                                  )}
                                </>
                              )}
                            </Form.List>
                          </Col>
                          <Col span={24}>
                            <Form.Item
                              {...restField}
                              name={[name, 'names']}
                              rules={[{ required: true, message: 'Enter accessory name(s)' }]}
                              label="Names"
                            >
                              <Input.TextArea rows={1} placeholder="Names (comma separated)" />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item
                              {...restField}
                              name={[name, 'modelNumbers']}
                              rules={[{ required: true, message: 'Enter model number(s)' }]}
                              label="Model Numbers"
                            >
                              <Input.TextArea rows={1} placeholder="Model Numbers (comma separated)" />
                            </Form.Item>
                          </Col>
                          <Col span={24} style={{ textAlign: 'right' }}>
                            {fields.length > 1 && (
                              <Button type="link" icon={<MinusCircleOutlined />} onClick={() => remove(name)}>
                                Remove Accessory
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </div>
                    ))}
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Accessory
                    </Button>
                  </>
                )}
              </Form.List>

              <Title level={5} style={{ marginTop: 16, marginBottom: 8 }}>Literature (PDFs)</Title>
              <Form.List name="literature">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, idx) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'fileList']}
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          rules={[{ required: true, message: 'Please upload a PDF!' }]}
                          style={{ flexGrow: 1 }}
                        >
                          <Upload
                            name="literatureFile"
                            accept=".pdf"
                            maxCount={1}
                            onPreview={handlePreview}
                            beforeUpload={() => false}
                          >
                            <Button icon={<UploadOutlined />}>Select PDF</Button>
                          </Upload>
                        </Form.Item>
                        {fields.length > 0 && (
                          <MinusCircleOutlined onClick={() => remove(name)} style={{ marginLeft: 8 }} />
                        )}
                        {idx === fields.length - 1 && (
                          <PlusOutlined onClick={() => add()} style={{ marginLeft: 8 }} />
                        )}
                      </Space>
                    ))}
                    {fields.length === 0 && (
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Literature PDF
                      </Button>
                    )}
                  </>
                )}
              </Form.List>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: 32, textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" size="large">
              {editingProduct ? 'Update Product' : 'Submit Product'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default SandiaProduct;