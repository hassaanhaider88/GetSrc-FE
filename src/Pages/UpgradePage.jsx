import PricingData from "../DummyData/PlanPrice";
import PricePlanCard from "../Components/PricePlanCard";
import { Helmet } from "react-helmet";

const UpgradePage = () => {
  return (
    <>
    <Helmet>
        <title>Upgrade To Pro | GetSrc</title>
        <meta
          name="description"
          content="Easy Upgrada Your acount and get access to unlimited features for one month.."
        />
      </Helmet>
    <section className="w-full min-h-screen py-10 px-4 md:px-10 flex flex-col items-center">
      <h1 className="text-center text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gray-900 mb-6">
        Supercharge Your Experience —
        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-[#4ED7DD] mx-2">
          Go Pro
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-[#4ED7DD] rounded-full animate-pulse" />
        </span>
        For Video Uploads & Priority Support
      </h1>

      <div className="flex flex-wrap justify-center gap-10 mt-8 w-full max-w-7xl">
        {PricingData.map((Cdata, idx) => (
          <PricePlanCard key={idx} Cdata={Cdata} />
        ))}
      </div>
    </section>
    </>
  );
};

export default UpgradePage;
