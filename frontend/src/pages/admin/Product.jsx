import React, { useState } from 'react';
import { Table, Button, Input, Form, Space } from 'antd';

const Product = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Nike Air Max', brand: 'Nike', price: 5999, stock: 20 },
    { id: 2, name: 'Adidas Ultraboost', brand: 'Adidas', price: 7499, stock: 15 },
    { id: 3, name: 'Puma Flyer', brand: 'Puma', price: 4299, stock: 10 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();

  const handleAddProduct = (values) => {
    const newProduct = {
      id: products.length + 1,
      ...values,
      price: parseInt(values.price),
      stock: parseInt(values.stock),
    };
    setProducts([...products, newProduct]);
    setShowForm(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      responsive: ['md'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" danger size="small">
            Delete
          </Button>
          <Button type="default" size="small" className="bg-yellow-400 text-white hover:bg-yellow-500">
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
        <Button
  type="primary"
  className="!bg-blue-600 !border-blue-600 hover:!bg-blue-700"
>
  {showForm ? 'Cancel' : 'Add Product'}
</Button>

      </div>

      {/* AntD Form */}
      {showForm && (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddProduct}
          className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Form.Item name="name" rules={[{ required: true }]} label="Product Name">
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="brand" rules={[{ required: true }]} label="Brand">
            <Input placeholder="Enter brand" />
          </Form.Item>
          <Form.Item name="price" rules={[{ required: true }]} label="Price">
            <Input type="number" placeholder="Enter price" />
          </Form.Item>
          <Form.Item name="stock" rules={[{ required: true }]} label="Stock">
            <Input type="number" placeholder="Enter stock" />
          </Form.Item>
          <Form.Item className="sm:col-span-2 md:col-span-4">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}

      {/* Ant Design Table */}
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: '100%' }}
      />
    </div>
  );
};

export default Product;
