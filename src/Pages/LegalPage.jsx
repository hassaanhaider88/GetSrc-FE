import React from "react";

const LegalPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      {/* Main Title */}
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
        📄 Legal Information
      </h1>

      {/* Section Component */}
      <div className="space-y-12">
        {/* Terms and Conditions */}
        <section>
          <h2 className="text-2xl font-semibold text-[#4ED7DD] mb-4">
            Terms & Conditions
          </h2>
          <p className="text-base leading-relaxed text-gray-700">
            By using this website, you agree to follow all the terms mentioned here.
            You must not misuse our services, attempt to hack, or redistribute without permission.
            We reserve the right to terminate access at any time without prior notice.
          </p>
        </section>

        {/* Privacy Policy */}
        <section>
          <h2 className="text-2xl font-semibold text-[#4ED7DD] mb-4">
            Privacy Policy
          </h2>
          <p className="text-base leading-relaxed text-gray-700">
            We collect minimal data including uploaded content and analytics data to improve performance.
            We do not sell your information to third parties. Your privacy is important and protected.
            Note: Uploaded images and videos are publicly accessible via generated links.
          </p>
        </section>

        {/* Cookie Policy */}
        <section>
          <h2 className="text-2xl font-semibold text-[#4ED7DD] mb-4">
            Cookie Policy
          </h2>
          <p className="text-base leading-relaxed text-gray-700">
            This site uses cookies to enhance your experience and analyze traffic.
            You may disable cookies in your browser, but some features might not function properly without them.
          </p>
        </section>

        {/* Disclaimer */}
        <section>
          <h2 className="text-2xl font-semibold text-[#4ED7DD] mb-4">
            Disclaimer
          </h2>
          <p className="text-base leading-relaxed text-gray-700">
            All tools and services are provided "as-is" with no warranties.
            We are not liable for any data loss, misuse, or damage caused by using this service.
            Please use it at your own discretion.
          </p>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="text-2xl font-semibold text-[#4ED7DD] mb-4">
            Contact Us
          </h2>
          <p className="text-base leading-relaxed text-gray-700">
            If you have any questions or concerns about our policies, feel free to contact us at:{" "}
            <a
              href="mailto:hassaanhaider.dev@proton.me"
              className="text-blue-600 underline hover:text-blue-800 transition"
            >
              hassaanhaider.dev@proton.me
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default LegalPage;
