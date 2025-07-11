import React, { useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PricePlanCard = ({ Cdata }) => {
  const handleUpgrade = () => {
    var User = JSON.parse(localStorage.getItem("UserData"));
    window.open(
      `https://wa.me/923437117831?text=AssalamoAlikum,%20I%20want%20to%20upgrade%20to%20Pro%20Plan%20For%20GetURI%20With%20UserId%20${User._id}%20And%20Name%20${User.full_name}`,
      "_blank",
      "noopener noreferrer"
    );
  };

  useEffect(() => {
    console.log(Cdata.price);
  }, []);

  return (
    <article
      aria-label={`Price plan: ${Cdata.name}`}
      style={{
        background:
          "linear-gradient(90deg,rgba(78, 215, 221, 0.95) 20%,rgba(78, 215, 221, 0.6) 45%,rgba(0, 190, 200, 0.4) 70%,rgba(0, 160, 190, 0.3) 90%)",
      }}
      className="relative z-20 overflow-hidden rounded-3xl border border-white/10 p-10 shadow-lg transition-all duration-500 cursor-pointer hover:shadow-xl group"
    >
      {/* Pricing header */}
      <header className="flex items-center gap-3 mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          ${Cdata.price}
        </h2>
        <p className="text-sm font-medium text-gray-700">
          {Cdata.price}$/month <br />
          (billed annually)
        </p>
      </header>

      {/* Divider */}
      <hr className="my-8 h-px w-full bg-gradient-to-r from-white/10 via-white/20 to-white/10" />

      {/* Features list */}
      <ul className="flex flex-col gap-4 text-gray-800" aria-label="Plan features">
        {Cdata.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <img
              src="./List_Icon.svg"
              alt=""
              loading="lazy"
              width="20"
              height="20"
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Action */}
      {Cdata.name === "Free" ? (
        <Link
          to="/"
          className="mt-10 flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-medium text-gray-800 transition-all duration-300 ease-in-out hover:scale-95 hover:border-white/40 hover:shadow-md hover:bg-white/5"
          aria-label="Continue with Free Plan"
        >
          Continue With Free
          <FaArrowRightLong aria-hidden="true" />
        </Link>
      ) : (
        <button
          onClick={handleUpgrade}
          title="Message me privately on WhatsApp"
          className="mt-10 mx-auto flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-medium text-gray-800 transition-all duration-300 ease-in-out hover:scale-95 hover:border-white/40 hover:shadow-md hover:bg-white/5"
          aria-label="Upgrade to Pro Plan"
        >
          Get Pro Plan
          <FaArrowRightLong aria-hidden="true" />
        </button>
      )}

      {/* Footer note */}
      <footer className="mt-4 text-center text-sm text-gray-500">
        No extra hidden charges
      </footer>
    </article>
  );
};

export default PricePlanCard;
