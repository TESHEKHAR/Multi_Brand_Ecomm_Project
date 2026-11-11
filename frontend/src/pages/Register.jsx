
import axios from '../api/axiosInstance';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BrandHeader from "../components/BrandHeader";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      await axios.post('/register', formData);
      toast.success(
        'Thank you for registering. Your request is under review. You will receive an email once approved.'
      );
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      <BrandHeader />

      <main
        style={{ paddingTop: "calc(var(--header-height, 90px) + 30px)" }}
        className="relative min-h-screen overflow-hidden bg-[#0a1311] px-4 pb-12 sm:px-6 lg:px-8"
      >

        {/* Background Effects */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#2de2c8]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#f2b84b]/10 blur-[120px]" />

        <div className="relative mx-auto flex min-h-[700px] max-w-6xl items-center justify-center">

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
                  Join Our Network.
                  <br />
                  <span className="text-[#2de2c8]">
                    Grow Together.
                  </span>
                </h1>

                <p className="mt-6 max-w-md text-base leading-8 text-[#f4ead0]/65">
                  Become part of a smarter purchasing network. Connect with
                  procurement experts and discover new opportunities to
                  optimize your business costs.
                </p>

                {/* Features */}
                <div className="mt-12 space-y-7">

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2de2c8]/30 bg-[#2de2c8]/10 text-xl text-[#2de2c8]">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#f4ead0]">
                        Easy Registration
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[#f4ead0]/50">
                        Submit your business details to get started.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#f2b84b]/30 bg-[#f2b84b]/10 text-xl text-[#f2b84b]">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#f4ead0]">
                        Expert Procurement Support
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[#f4ead0]/50">
                        Get access to procurement guidance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2de2c8]/30 bg-[#2de2c8]/10 text-xl text-[#2de2c8]">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#f4ead0]">
                        Better Purchasing Opportunities
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[#f4ead0]/50">
                        Discover opportunities to save on business purchases.
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

            {/* RIGHT SIDE - REGISTER FORM */}
            <section className="flex items-center justify-center bg-[#f4ead0] px-6 py-12 sm:px-12 lg:px-14">

              <div className="w-full max-w-md">

                {/* Heading */}
                <div className="mb-8">

                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0a1311] text-[#2de2c8]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="10" cy="7" r="4" />
                      <line x1="20" y1="8" x2="20" y2="14" />
                      <line x1="23" y1="11" x2="17" y2="11" />
                    </svg>
                  </div>

                  <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-[#b18a39]">
                    Get Started Today
                  </p>

                  <h2 className="text-4xl font-bold tracking-tight text-[#0a1311]">
                    Create Account
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#14211d]/65">
                    Enter your business details to submit your registration
                    request.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold text-[#14211d]"
                    >
                      Full Name <span className="text-red-600">*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white/70 px-4 py-3.5 text-sm text-[#0a1311] outline-none transition-all placeholder:text-[#14211d]/35 focus:border-[#b18a39] focus:ring-4 focus:ring-[#b18a39]/10 ${errors.name ? 'border-red-500' : 'border-[#14211d]/15'
                        }`}
                    />

                    {errors.name && (
                      <p className="mt-1 text-xs font-medium text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-[#14211d]"
                    >
                      Email Address <span className="text-red-600">*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white/70 px-4 py-3.5 text-sm text-[#0a1311] outline-none transition-all placeholder:text-[#14211d]/35 focus:border-[#b18a39] focus:ring-4 focus:ring-[#b18a39]/10 ${errors.email ? 'border-red-500' : 'border-[#14211d]/15'
                        }`}
                    />

                    {errors.email && (
                      <p className="mt-1 text-xs font-medium text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* PHONE */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-bold text-[#14211d]"
                    >
                      Phone Number <span className="text-red-600">*</span>
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white/70 px-4 py-3.5 text-sm text-[#0a1311] outline-none transition-all placeholder:text-[#14211d]/35 focus:border-[#b18a39] focus:ring-4 focus:ring-[#b18a39]/10 ${errors.phone ? 'border-red-500' : 'border-[#14211d]/15'
                        }`}
                    />

                    {errors.phone && (
                      <p className="mt-1 text-xs font-medium text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* COMPANY */}
                  <div>
                    <label
                      htmlFor="companyName"
                      className="mb-2 block text-sm font-bold text-[#14211d]"
                    >
                      Company Name <span className="text-red-600">*</span>
                    </label>

                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      autoComplete="organization"
                      placeholder="Enter your company name"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white/70 px-4 py-3.5 text-sm text-[#0a1311] outline-none transition-all placeholder:text-[#14211d]/35 focus:border-[#b18a39] focus:ring-4 focus:ring-[#b18a39]/10 ${errors.companyName ? 'border-red-500' : 'border-[#14211d]/15'
                        }`}
                    />

                    {errors.companyName && (
                      <p className="mt-1 text-xs font-medium text-red-600">
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  {/* REGISTER BUTTON */}
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#0a1311] px-6 py-4 text-sm font-bold tracking-wide text-[#f4ead0] shadow-lg transition-all duration-300 hover:bg-[#14211d] hover:shadow-xl"
                  >
                    SUBMIT REGISTRATION

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
                  </button>

                </form>

                {/* LOGIN LINK */}
                <div className="mt-7 border-t border-[#14211d]/15 pt-6 text-center">
                  <p className="text-sm text-[#14211d]/70">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="font-bold text-[#9a742c] underline decoration-[#9a742c]/40 underline-offset-4 transition hover:text-[#0a1311]"
                    >
                      Login here
                    </Link>
                  </p>
                </div>

                {/* FOOTER */}
                <p className="mt-7 text-center text-[11px] tracking-wide text-[#14211d]/40">
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

export default Register;