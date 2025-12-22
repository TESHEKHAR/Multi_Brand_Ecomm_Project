import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cart/cartSlice";
import { getSingleApprovedUser } from "../redux/user/userSlice";
import { placeOrder } from "../redux/order/orderSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BrandHeader from "../components/BrandHeader";
import Footer from "./Footer";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    paymentMethod: "Cash on Delivery",
  });

  useEffect(() => {
    if (userId) dispatch(getSingleApprovedUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (singleUser && userId) {
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
  }, [singleUser, userId]);

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

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.price ?? 0) * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) {
      toast.info("Please login to place your order.");
      navigate("/login?redirect=cart");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    dispatch(
      placeOrder({
        userId,
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          brand: item.brand?._id || null,
        })),
        shippingAddress: checkoutForm,
        paymentMethod: checkoutForm.paymentMethod,
        totalAmount,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Order placed successfully!");
        dispatch({ type: "cart/clearCart" });
        navigate("/");
      })
      .catch(() => {
        toast.error("Failed to place order!");
      });
  };

  const firstBrand = cartItems[0]?.brand;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Brand Header */}
      <div className="relative z-10">
        <BrandHeader
          logo={firstBrand?.brandImage}
          brandName={firstBrand?.name || "Your Cart"}
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* CART ITEMS */}
        <div className="md:col-span-7">
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

          {cartItems.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full min-h-[60vh] flex flex-col justify-center">
              <p className="text-gray-500 text-lg md:text-xl mb-4">
                Your cart is empty.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-2 bg-blue-600 text-white px-6 py-2 md:px-10 md:py-4 rounded hover:bg-blue-700 transition text-sm md:text-base self-center"
              >
                Continue Shopping
              </button>
            </div>
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
                    <p className="text-sm text-gray-500">
                      Brand: {item.brand?.name}
                    </p>
                    <p className="font-medium text-blue-600">
                      ${item.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <label>Qty:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.productId,
                            Number(e.target.value)
                          )
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
                  Total: ${(totalAmount ?? 0).toLocaleString()}
                </h3>
              </div>
            </div>
          )}
        </div>

        {/* CHECKOUT FORM */}
        <div className="md:col-span-5">
          <h3 className="text-xl font-semibold mb-4">Checkout</h3>

          {!userId ? (
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-center">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Login Required
              </h3>
              <p className="text-gray-600 mb-4">
                You need to login to continue with checkout.
              </p>

              <button
                onClick={() => navigate("/login?redirect=cart")}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Go to Login
              </button>

              <p className="text-sm text-gray-500 mt-4">
                Don’t have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Register here
                </span>
              </p>
            </div>
          ) : singleUserLoading ? (
            <p>Loading user details...</p>
          ) : (
            cartItems.length > 0 && (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
              >
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={checkoutForm.name}
                    className="w-full border px-3 py-2 rounded bg-gray-100"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="text"
                    value={checkoutForm.email}
                    className="w-full border px-3 py-2 rounded bg-gray-100"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Company</label>
                  <input
                    type="text"
                    value={checkoutForm.companyName}
                    className="w-full border px-3 py-2 rounded bg-gray-100"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    value={checkoutForm.phone}
                    className="w-full border px-3 py-2 rounded bg-gray-100"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Address</label>
                  <textarea
                    name="address"
                    value={checkoutForm.address}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
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
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    value={checkoutForm.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                    required
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Place Order
                </button>
              </form>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Cart;
