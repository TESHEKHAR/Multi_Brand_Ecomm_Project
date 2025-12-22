import React from "react";

const HomePageContent = () => {
  return (
    <div className="w-full text-gray-800">

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-slate-900 to-blue-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-x">
            Welcome to Allied Purchasing Network
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-90 px-2 sm:px-0">
            An Exclusive Purchasing Platform for Approved Clients
          </p>
        </div>
        {/* Animated background shapes */}
        <div className="absolute -top-32 -left-32 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-500 rounded-full opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-32 -right-32 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-pink-500 rounded-full opacity-30 animate-pulse-slow"></div>
      </section>

      {/* INTRO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <p className="text-base sm:text-lg md:text-xl max-w-4xl mx-auto">
          Allied Purchasing Network is a <span className="font-semibold">private purchasing platform</span> built
          exclusively for approved businesses. We provide access to negotiated pricing,
          vetted suppliers, and client-only products not available on public marketplaces.
        </p>
      </section>

      {/* CLIENT ACCESS POLICY */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center mb-8 sm:mb-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
            Client-Only Access Policy
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl shadow p-4 sm:p-6 hover:shadow-xl transition">
              <ul className="space-y-2 sm:space-y-4 text-left text-sm sm:text-base">
                <li>✅ Only approved clients may place orders</li>
                <li>👀 Non-clients can register & browse products</li>
                <li>🔒 Ordering enabled only after approval</li>
                <li>📝 All registrations are reviewed manually</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow p-4 sm:p-6 hover:shadow-xl transition">
              <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-4">
                If your company is not approved yet:
              </h3>
              <ul className="space-y-1 sm:space-y-3 text-sm sm:text-base">
                <li>• Create an account</li>
                <li>• Log in securely</li>
                <li>• Browse products & categories</li>
                <li className="font-medium text-red-600">
                  • Ordering remains disabled until approval
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BECOME A CLIENT */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
          Interested in Becoming a Client?
        </h2>

        <p className="max-w-3xl mx-auto mb-6 sm:mb-8 text-base sm:text-lg">
          Once approved, your company gains access to exclusive pricing,
          pre-negotiated supplier agreements, centralized purchasing tools,
          and measurable cost savings.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
          {[
            "Exclusive Client Pricing",
            "Negotiated Supplier Agreements",
            "Centralized Purchasing Tools",
            "Cost Reduction Opportunities",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-4 sm:p-6 font-medium hover:bg-blue-50 transition text-sm sm:text-base"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button className="px-6 sm:px-10 py-3 sm:py-4 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition">
            Register to Begin Review
          </button>

          <a
            href="/login"
            className="px-6 sm:px-10 py-3 sm:py-4 bg-white text-blue-900 rounded-lg font-semibold border border-blue-900 hover:bg-blue-900 hover:text-white transition"
          >
            Already Registered? Login
          </a>
        </div>
      </section>

      {/* WHY APN */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-6 sm:mb-8 bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x">
          Why Allied Purchasing Network?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            "Protect Client Pricing",
            "Prevent Unauthorized Purchasing",
            "Maintain Supplier Discipline",
            "Deliver Real Cost Savings",
          ].map((item, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 sm:p-6 font-medium hover:shadow-lg transition text-sm sm:text-base"
            >
              {item}
            </div>
          ))}
        </div>

        <p className="mt-6 sm:mt-10 text-base sm:text-lg font-semibold">
          Access is controlled by design — because your savings matter.
        </p>
      </section>

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 6s ease infinite;
          }

          .animate-pulse-slow {
            animation: pulse 6s ease-in-out 6s infinite;
          }
        `}
      </style>

    </div>
  );
};

export default HomePageContent;
