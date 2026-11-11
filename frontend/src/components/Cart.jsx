
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cart/cartSlice";
import { getSingleApprovedUser } from "../redux/user/userSlice";
import { placeOrder } from "../redux/order/orderSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BrandHeader from "../components/BrandHeader";
import Footer from "./Footer";

import {
  ShoppingCartOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
  LockOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  ArrowRightOutlined,
  InboxOutlined,
} from "@ant-design/icons";

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
    <div className="flex min-h-screen flex-col bg-[#0a1311]">

      {/* BRAND HEADER */}
      <div className="relative z-50">
        <BrandHeader
          logo={firstBrand?.brandImage}
          brandName={firstBrand?.name || "Your Cart"}
        />
      </div>

      {/* MAIN CONTENT */}
      <main className="relative flex-grow overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8">

        {/* BACKGROUND EFFECTS */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#2de2c8]/5 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#f2b84b]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">

          {/* PAGE HEADING */}
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2de2c8]/30 bg-[#2de2c8]/10 px-4 py-2">
                <ShoppingCartOutlined className="text-[#2de2c8]" />
                <span className="text-xs font-bold uppercase tracking-[2px] text-[#2de2c8]">
                  Shopping Cart
                </span>
              </div>

              <h1 className="text-3xl font-bold text-[#f4ead0] sm:text-4xl">
                Your Shopping Cart
              </h1>

              <p className="mt-3 text-sm text-[#f4ead0]/55">
                Review your selected products and complete your order.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#14211d] px-5 py-3">
              <ShoppingOutlined className="text-xl text-[#f2b84b]" />
              <div>
                <p className="text-xs text-[#f4ead0]/50">Total Items</p>
                <p className="font-bold text-[#f4ead0]">
                  {cartItems.reduce(
                    (total, item) => total + (Number(item.quantity) || 0),
                    0
                  )} Products
                </p>
              </div>
            </div>

          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">

            {/* CART ITEMS SECTION */}
            <section className="lg:col-span-7">

              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#f4ead0]">
                  Cart Items
                </h2>

                <span className="text-sm text-[#f4ead0]/45">
                  {cartItems.length} Items
                </span>
              </div>

              {cartItems.length === 0 ? (

                /* EMPTY CART */
                <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#14211d] px-6 py-12 text-center shadow-xl">

                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-[#2de2c8]/20 bg-[#2de2c8]/10">
                    <InboxOutlined className="text-5xl text-[#2de2c8]" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#f4ead0]">
                    Your Cart is Empty
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-[#f4ead0]/50">
                    You haven't added any products to your cart yet.
                    Explore our products and find what your business needs.
                  </p>

                  <button
                    onClick={() => navigate("/")}
                    className="mt-8 flex items-center gap-3 rounded-full bg-[#f2b84b] px-8 py-4 text-sm font-black text-[#0a1311] transition-all duration-300 hover:bg-[#f4ead0]"
                  >
                    Continue Shopping
                    <ArrowRightOutlined />
                  </button>

                </div>

              ) : (

                <div className="space-y-5">

                  {cartItems.map((item) => (

                    <div
                      key={item.productId}
                      className="group relative flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#14211d] p-5 shadow-lg transition-all duration-300 hover:border-[#2de2c8]/30 sm:flex-row sm:items-center"
                    >

                      {/* PRODUCT IMAGE */}
                      <div className="flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-[#f4ead0] sm:w-28">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* PRODUCT DETAILS */}
                      <div className="min-w-0 flex-1">

                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-[#2de2c8]">
                          {item.brand?.name || "Allied Product"}
                        </p>

                        <h4 className="text-lg font-bold text-[#f4ead0]">
                          {item.name}
                        </h4>

                        <p className="mt-2 text-xl font-bold text-[#f2b84b]">
                          ${(item.price ?? 0).toLocaleString()}
                        </p>

                        {/* QUANTITY */}
                        <div className="mt-4 flex flex-wrap items-center gap-3">

                          <span className="text-xs font-semibold text-[#f4ead0]/50">
                            Quantity:
                          </span>

                          <div className="flex items-center overflow-hidden rounded-lg border border-white/15">

                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="flex h-9 w-9 items-center justify-center text-[#f4ead0] transition hover:bg-[#2de2c8]/10 hover:text-[#2de2c8] disabled:opacity-30"
                              aria-label="Decrease quantity"
                            >
                              <MinusOutlined />
                            </button>

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
                              className="h-9 w-12 border-x border-white/10 bg-transparent text-center text-sm font-bold text-[#f4ead0] outline-none"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center text-[#f4ead0] transition hover:bg-[#2de2c8]/10 hover:text-[#2de2c8]"
                              aria-label="Increase quantity"
                            >
                              <PlusOutlined />
                            </button>

                          </div>

                        </div>

                      </div>

                      {/* REMOVE BUTTON */}
                      <button
                        onClick={() => handleRemove(item.productId)}
                        className="flex items-center gap-2 self-start rounded-lg border border-red-400/20 px-3 py-2 text-xs font-semibold text-red-400 transition hover:border-red-400/50 hover:bg-red-400/10 sm:self-center"
                      >
                        <DeleteOutlined />
                        Remove
                      </button>

                    </div>

                  ))}

                  {/* TOTAL */}
                  <div className="rounded-2xl border border-[#f2b84b]/20 bg-[#14211d] p-6">

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#f4ead0]/60">
                        Subtotal
                      </span>

                      <span className="text-lg font-bold text-[#f4ead0]">
                        ${(totalAmount ?? 0).toLocaleString()}
                      </span>
                    </div>

                    <div className="my-5 border-t border-white/10" />

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-base font-bold text-[#f4ead0]">
                        Total Amount
                      </span>

                      <span className="text-2xl font-black text-[#f2b84b]">
                        ${(totalAmount ?? 0).toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-[#f4ead0]/40">
                      Final order details will be confirmed during checkout.
                    </p>

                  </div>

                </div>

              )}

            </section>

            {/* CHECKOUT SECTION */}
            <section className="lg:col-span-5">

              <div className="mb-5 flex items-center gap-3">
                <LockOutlined className="text-xl text-[#2de2c8]" />

                <h2 className="text-xl font-bold text-[#f4ead0]">
                  Checkout Details
                </h2>
              </div>

              {!userId ? (

                /* LOGIN REQUIRED */
                <div className="rounded-2xl border border-white/10 bg-[#14211d] p-7 text-center shadow-xl">

                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f2b84b]/10">
                    <LockOutlined className="text-3xl text-[#f2b84b]" />
                  </div>

                  <h3 className="text-xl font-bold text-[#f4ead0]">
                    Login Required
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#f4ead0]/55">
                    Please login to your account to continue with checkout
                    and place your order.
                  </p>

                  <button
                    onClick={() => navigate("/login?redirect=cart")}
                    className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-[#f2b84b] px-5 py-4 text-sm font-black text-[#0a1311] transition hover:bg-[#f4ead0]"
                  >
                    Go to Login
                    <ArrowRightOutlined />
                  </button>

                  <p className="mt-5 text-sm text-[#f4ead0]/50">
                    Don't have an account?{" "}
                    <span
                      onClick={() => navigate("/register")}
                      className="cursor-pointer font-bold text-[#2de2c8] hover:underline"
                    >
                      Register here
                    </span>
                  </p>

                </div>

              ) : singleUserLoading ? (

                <div className="rounded-2xl border border-white/10 bg-[#14211d] p-10 text-center">
                  <p className="text-sm text-[#f4ead0]/60">
                    Loading user details...
                  </p>
                </div>

              ) : (

                cartItems.length > 0 && (

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5 rounded-2xl border border-white/10 bg-[#14211d] p-6 shadow-xl sm:p-7"
                  >

                    {/* CUSTOMER DETAILS */}
                    <div>
                      <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2de2c8]/10 text-[#2de2c8]">
                          <ShoppingOutlined />
                        </div>

                        <div>
                          <h3 className="font-bold text-[#f4ead0]">
                            Customer Information
                          </h3>
                          <p className="text-xs text-[#f4ead0]/40">
                            Your registered account details
                          </p>
                        </div>
                      </div>

                      {/* NAME */}
                      <div className="mb-4">
                        <label className="mb-2 block text-xs font-bold text-[#f4ead0]/70">
                          Full Name
                        </label>

                        <input
                          type="text"
                          value={checkoutForm.name}
                          className="w-full rounded-lg border border-white/10 bg-[#0a1311]/60 px-4 py-3 text-sm text-[#f4ead0]/60 outline-none"
                          disabled
                        />
                      </div>

                      {/* EMAIL */}
                      <div className="mb-4">
                        <label className="mb-2 block text-xs font-bold text-[#f4ead0]/70">
                          Email Address
                        </label>

                        <input
                          type="text"
                          value={checkoutForm.email}
                          className="w-full rounded-lg border border-white/10 bg-[#0a1311]/60 px-4 py-3 text-sm text-[#f4ead0]/60 outline-none"
                          disabled
                        />
                      </div>

                      {/* COMPANY */}
                      <div className="mb-4">
                        <label className="mb-2 block text-xs font-bold text-[#f4ead0]/70">
                          Company Name
                        </label>

                        <input
                          type="text"
                          value={checkoutForm.companyName}
                          className="w-full rounded-lg border border-white/10 bg-[#0a1311]/60 px-4 py-3 text-sm text-[#f4ead0]/60 outline-none"
                          disabled
                        />
                      </div>

                      {/* PHONE */}
                      <div>
                        <label className="mb-2 block text-xs font-bold text-[#f4ead0]/70">
                          Phone Number
                        </label>

                        <input
                          type="text"
                          value={checkoutForm.phone}
                          className="w-full rounded-lg border border-white/10 bg-[#0a1311]/60 px-4 py-3 text-sm text-[#f4ead0]/60 outline-none"
                          disabled
                        />
                      </div>

                    </div>

                    {/* SHIPPING DETAILS */}
                    <div className="border-t border-white/10 pt-5">

                      <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f2b84b]/10 text-[#f2b84b]">
                          <EnvironmentOutlined />
                        </div>

                        <div>
                          <h3 className="font-bold text-[#f4ead0]">
                            Shipping Address
                          </h3>
                          <p className="text-xs text-[#f4ead0]/40">
                            Where should we deliver your order?
                          </p>
                        </div>
                      </div>

                      {/* ADDRESS */}
                      <div className="mb-4">
                        <label className="mb-2 block text-xs font-bold text-[#f4ead0]/70">
                          Complete Address *
                        </label>

                        <textarea
                          name="address"
                          value={checkoutForm.address}
                          onChange={handleInputChange}
                          placeholder="Enter your complete address"
                          className="min-h-[100px] w-full resize-y rounded-lg border border-white/15 bg-[#0a1311]/60 px-4 py-3 text-sm text-[#f4ead0] outline-none transition focus:border-[#2de2c8] focus:ring-2 focus:ring-[#2de2c8]/10"
                          required
                        />
                      </div>

                      {/* PIN CODE */}
                      <div>
                        <label className="mb-2 block text-xs font-bold text-[#f4ead0]/70">
                          Pin Code *
                        </label>

                        <input
                          type="text"
                          name="pinCode"
                          value={checkoutForm.pinCode}
                          onChange={handleInputChange}
                          placeholder="Enter your pin code"
                          className="w-full rounded-lg border border-white/15 bg-[#0a1311]/60 px-4 py-3 text-sm text-[#f4ead0] outline-none transition focus:border-[#2de2c8] focus:ring-2 focus:ring-[#2de2c8]/10"
                          required
                        />
                      </div>

                    </div>

                    {/* PAYMENT */}
                    <div className="border-t border-white/10 pt-5">

                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2de2c8]/10 text-[#2de2c8]">
                          <CreditCardOutlined />
                        </div>

                        <div>
                          <h3 className="font-bold text-[#f4ead0]">
                            Payment Method
                          </h3>
                          <p className="text-xs text-[#f4ead0]/40">
                            Select your payment option
                          </p>
                        </div>
                      </div>

                      <select
                        name="paymentMethod"
                        value={checkoutForm.paymentMethod}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-lg border border-white/15 bg-[#0a1311] px-4 py-3 text-sm text-[#f4ead0] outline-none transition focus:border-[#2de2c8]"
                        required
                      >
                        <option value="Cash on Delivery">
                          Cash on Delivery
                        </option>
                      </select>

                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="rounded-xl border border-[#f2b84b]/20 bg-[#f2b84b]/5 p-5">

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#f4ead0]/60">
                          Order Total
                        </span>

                        <span className="text-xl font-black text-[#f2b84b]">
                          ${(totalAmount ?? 0).toLocaleString()}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-[#f4ead0]/40">
                        Payment method: Cash on Delivery
                      </p>

                    </div>

                    {/* PLACE ORDER */}
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#f2b84b] px-6 py-4 text-sm font-black tracking-wide text-[#0a1311] shadow-lg transition-all duration-300 hover:bg-[#f4ead0] hover:shadow-xl"
                    >
                      PLACE ORDER
                      <ArrowRightOutlined className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>

                    <p className="flex items-center justify-center gap-2 text-center text-[11px] text-[#f4ead0]/40">
                      <LockOutlined />
                      Your checkout information is securely handled.
                    </p>

                  </form>

                )

              )}

            </section>

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default Cart;
