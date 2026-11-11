
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { loginUser } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { syncCartAfterLogin } from "../redux/cart/cartSlice";
import BrandHeader from "../components/BrandHeader";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const validateFields = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      const resultAction = await dispatch(loginUser(formData));

      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Login successful!");
        dispatch(syncCartAfterLogin());

        const redirect = new URLSearchParams(location.search).get("redirect");
        navigate(redirect ? "/" + redirect : "/");
      } else {
        toast.error(resultAction.payload || "Login failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <BrandHeader />

      <main
        style={{ paddingTop: "calc(var(--header-height, 90px) + 30px)" }}
        className="relative min-h-screen overflow-hidden bg-[#0a1311] px-4 pb-12 sm:px-6 lg:px-8"
      >

        {/* Background Decoration */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#2de2c8]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#f2b84b]/10 blur-[120px]" />

        <div className="relative mx-auto flex min-h-[650px] max-w-6xl items-center justify-center">

          <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-[#14211d] shadow-2xl lg:grid-cols-2">

            {/* LEFT SIDE */}
            <section className="relative flex flex-col justify-between overflow-hidden bg-[#14211d] p-8 sm:p-12 lg:p-14">

              {/* Decorative Circles */}
              <div className="absolute -right-20 top-20 h-72 w-72 rounded-full border border-[#2de2c8]/20" />
              <div className="absolute -right-10 top-32 h-52 w-52 rounded-full border border-[#2de2c8]/20" />
              <div className="absolute right-10 top-48 h-32 w-32 rounded-full border border-[#f2b84b]/20" />

              <div className="relative z-10">
                <div className="mb-12 inline-flex items-center gap-2 rounded-full border border-[#2de2c8]/30 bg-[#2de2c8]/10 px-4 py-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#2de2c8]" />
                  <span className="text-xs font-semibold uppercase tracking-[2px] text-[#2de2c8]">
                    Allied Purchasing Network
                  </span>
                </div>

                <h1 className="max-w-lg text-4xl font-bold leading-tight text-[#f4ead0] sm:text-5xl">
                  Smarter Purchasing.
                  <br />
                  <span className="text-[#2de2c8]">
                    Stronger Business.
                  </span>
                </h1>

                <p className="mt-6 max-w-md text-base leading-8 text-[#f4ead0]/65">
                  Access better purchasing opportunities, expert procurement
                  guidance, and the power of a national group purchasing
                  network.
                </p>

                {/* Feature Items */}
                <div className="mt-12 space-y-6">

                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2de2c8]/30 bg-[#2de2c8]/10 text-xl text-[#2de2c8]">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#f4ead0]">
                        Strategic Procurement
                      </h3>
                      <p className="mt-1 text-sm text-[#f4ead0]/50">
                        Make smarter purchasing decisions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#f2b84b]/30 bg-[#f2b84b]/10 text-xl text-[#f2b84b]">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#f4ead0]">
                        National GPO Advantage
                      </h3>
                      <p className="mt-1 text-sm text-[#f4ead0]/50">
                        Benefit from collective purchasing power.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2de2c8]/30 bg-[#2de2c8]/10 text-xl text-[#2de2c8]">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#f4ead0]">
                        Cost Optimization
                      </h3>
                      <p className="mt-1 text-sm text-[#f4ead0]/50">
                        Discover opportunities to reduce costs.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="relative z-10 mt-14 border-t border-white/10 pt-6">
                <p className="text-sm text-[#f4ead0]/40">
                  Empowering businesses through smarter procurement.
                </p>
              </div>
            </section>

            {/* RIGHT SIDE - LOGIN FORM */}
            <section className="flex items-center justify-center bg-[#f4ead0] px-6 py-12 sm:px-12 lg:px-14">

              <div className="w-full max-w-md">

                <div className="mb-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0a1311] text-2xl text-[#2de2c8]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="27"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>

                  <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-[#b18a39]">
                    Welcome Back
                  </p>

                  <h2 className="text-4xl font-bold tracking-tight text-[#0a1311]">
                    Login to your account
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#14211d]/65">
                    Enter your credentials to access your Allied Purchasing
                    Network account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-[#14211d]"
                    >
                      Email Address <span className="text-red-600">*</span>
                    </label>

                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#14211d]/40">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-10 6L2 7" />
                        </svg>
                      </div>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full rounded-xl border bg-white/70 py-4 pl-12 pr-4 text-sm text-[#0a1311] outline-none transition-all placeholder:text-[#14211d]/35 focus:border-[#b18a39] focus:ring-4 focus:ring-[#b18a39]/10 ${errors.email
                            ? "border-red-500"
                            : "border-[#14211d]/15"
                          }`}
                      />
                    </div>

                    {errors.email && (
                      <p className="mt-2 text-xs font-medium text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-bold text-[#14211d]"
                    >
                      Password <span className="text-red-600">*</span>
                    </label>

                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#14211d]/40">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>

                      <input
                        id="password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full rounded-xl border bg-white/70 py-4 pl-12 pr-4 text-sm text-[#0a1311] outline-none transition-all placeholder:text-[#14211d]/35 focus:border-[#b18a39] focus:ring-4 focus:ring-[#b18a39]/10 ${errors.password
                            ? "border-red-500"
                            : "border-[#14211d]/15"
                          }`}
                      />
                    </div>

                    {errors.password && (
                      <p className="mt-2 text-xs font-medium text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* LOGIN BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#0a1311] px-6 py-4 text-sm font-bold tracking-wide text-[#f4ead0] shadow-lg transition-all duration-300 hover:bg-[#14211d] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Logging in..." : "LOGIN TO YOUR ACCOUNT"}

                    {!loading && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2de2c8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    )}
                  </button>

                </form>

                {/* REGISTER */}
                <div className="mt-8 border-t border-[#14211d]/15 pt-6 text-center">
                  <p className="text-sm text-[#14211d]/70">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-bold text-[#9a742c] underline decoration-[#9a742c]/40 underline-offset-4 transition hover:text-[#0a1311]"
                    >
                      Create an Account
                    </Link>
                  </p>
                </div>

                <p className="mt-8 text-center text-[11px] tracking-wide text-[#14211d]/40">
                  © {new Date().getFullYear()} Allied Purchasing Network.
                  All rights reserved.
                </p>

              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  );
};

export default Login;