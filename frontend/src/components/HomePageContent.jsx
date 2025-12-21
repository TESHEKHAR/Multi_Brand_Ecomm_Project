import React from "react";

const HomePageContent = () => {
  return (
    <div className="w-full text-gray-800">

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-slate-900 to-blue-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-x">
            Welcome to Allied Purchasing Network
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            An Exclusive Purchasing Platform for Approved Clients
          </p>
        </div>
        {/* Animated background shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500 rounded-full opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-500 rounded-full opacity-30 animate-pulse-slow"></div>
      </section>

      {/* INTRO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <p className="text-lg max-w-4xl mx-auto">
          Allied Purchasing Network is a <span className="font-semibold">private purchasing platform</span> built
          exclusively for approved businesses. We provide access to negotiated pricing,
          vetted suppliers, and client-only products not available on public marketplaces.
        </p>
      </section>

      {/* CLIENT ACCESS POLICY */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
            Client-Only Access Policy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition">
              <ul className="space-y-4 text-left">
                <li>✅ Only approved clients may place orders</li>
                <li>👀 Non-clients can register & browse products</li>
                <li>🔒 Ordering enabled only after approval</li>
                <li>📝 All registrations are reviewed manually</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition">
              <h3 className="font-semibold text-lg mb-4">
                If your company is not approved yet:
              </h3>
              <ul className="space-y-3">
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
      <section className="py-16 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
          Interested in Becoming a Client?
        </h2>

        <p className="max-w-3xl mx-auto mb-8 text-lg">
          Once approved, your company gains access to exclusive pricing,
          pre-negotiated supplier agreements, centralized purchasing tools,
          and measurable cost savings.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            "Exclusive Client Pricing",
            "Negotiated Supplier Agreements",
            "Centralized Purchasing Tools",
            "Cost Reduction Opportunities",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-6 font-medium hover:bg-blue-50 transition"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* New User Registration */}
          <button className="px-10 py-4 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition">
            Register to Begin Review
          </button>

          {/* Already Registered User Login */}
          <a
            href="/login" // <-- update this link to your login route
            className="px-10 py-4 bg-white text-blue-900 rounded-lg font-semibold border border-blue-900 hover:bg-blue-900 hover:text-white transition"
          >
            Already Registered? Login
          </a>
        </div>
      </section>

      {/* WHY APN */}
      <section className="py-16 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-8 bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x">
          Why Allied Purchasing Network?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Protect Client Pricing",
            "Prevent Unauthorized Purchasing",
            "Maintain Supplier Discipline",
            "Deliver Real Cost Savings",
          ].map((item, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 font-medium hover:shadow-lg transition"
            >
              {item}
            </div>
          ))}
        </div>

        <p className="mt-10 text-lg font-semibold">
          Access is controlled by design — because your savings matter.
        </p>
      </section>

      {/* TAILWIND ANIMATION CLASSES */}
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
            animation: pulse 6s ease-in-out infinite;
          }
        `}
      </style>

    </div>
  );
};

export default HomePageContent;
