// src/pages/admin/Orders.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/order/orderSlice";
import { Table, Image, Tag } from "antd";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const columns = [
    {
      title: "Customer",
      dataIndex: "shippingAddress",
      key: "customer",
      render: (shippingAddress) => (
        <div>
          <strong>{shippingAddress.name}</strong>
          <p>{shippingAddress.email}</p>
          <p>{shippingAddress.phone}</p>
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "shippingAddress",
      key: "address",
      render: (address) => (
        <span>
          {address.address}, {address.pinCode}
          <br />
          <Tag>{address.companyName}</Tag>
        </span>
      ),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => (
        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 my-2">
              <Image src={item.image} width={50} height={50} />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (total) => <strong>₹{total.toLocaleString()}</strong>,
    },
    {
      title: "Payment",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => (
        <Tag color={method === "Cash on Delivery" ? "blue" : "green"}>
          {method}
        </Tag>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="_id"
        loading={loading}
        bordered
      />
    </div>
  );
};

export default Orders;
