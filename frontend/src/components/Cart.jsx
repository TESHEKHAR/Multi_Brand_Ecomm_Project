import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cart/cartSlice";
import { getSingleApprovedUser } from "../redux/user/userSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { singleUser, singleUserLoading } = useSelector((state) => state.user);

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.id;

  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    companyName: "",
    phone: "",
    address: "",
    pinCode: "",
  });

  useEffect(() => {
    if (userId) {
      dispatch(getSingleApprovedUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (singleUser) {
      setCheckoutForm((prev) => ({
        ...prev,
        name: singleUser.name || "",
        email: singleUser.email || "",
        companyName: singleUser.companyName || "",
        phone: singleUser.phone || "",
        address: singleUser.address || "",
        pinCode: singleUser.pinCode || "",
      }));
    }
  }, [singleUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkout data submitted:", checkoutForm);
    // Call your checkout API here
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Cart Items */}
      <div className="md:col-span-7">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 bg-white p-4 shadow rounded"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{item.name}</h4>
                  <p className="text-sm text-gray-500">Brand: {item.brand?.name}</p>
                  <p className="font-medium text-blue-600">₹{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <label htmlFor={`qty-${item.productId}`}>Qty:</label>
                    <input
                      id={`qty-${item.productId}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.productId, Number(e.target.value))
                      }
                      className="w-16 px-2 py-1 border rounded"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="text-right mt-4">
              <h3 className="text-xl font-semibold text-green-700">
                Total: ₹{totalAmount.toLocaleString()}
              </h3>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Form */}
      <div className="md:col-span-5">
        <h3 className="text-xl font-semibold mb-4">Checkout</h3>
        {singleUserLoading ? (
          <p className="text-gray-500">Loading user info...</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
          >
            {[
              { label: "Name", name: "name", type: "text", disabled: true },
              { label: "Email", name: "email", type: "email", disabled: true },
              { label: "Company", name: "companyName", type: "text", disabled: true },
              { label: "Phone", name: "phone", type: "tel", disabled: true },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={checkoutForm[field.name]}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded mt-1 bg-gray-100"
                  disabled={field.disabled}
                  required
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium">Address</label>
              <textarea
                name="address"
                value={checkoutForm.address}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded mt-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Pin Code</label>
              <input
                type="text"
                name="pinCode"
                value={checkoutForm.pinCode}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded mt-1"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Cart;
