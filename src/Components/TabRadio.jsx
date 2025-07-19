const TabRadio = ({ SelectedTab, setSelectedTab }) => {
  const tabs = ["All", "Images", "Videos", "GIFs"];

  return (
    <div className="w-full ImagerFont flex justify-center items-center mt-6">
      <div
        role="tablist"
        aria-label="Media Type Tabs"
        className="relative px-2 py-1 TabRadioScroll flex bg-gray-100 rounded-2xl overflow-x-scroll sm:overflow-hidden border border-gray-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={SelectedTab === tab}
            aria-controls={`panel-${tab}`}
            id={`tab-${tab}`}
            onClick={() => setSelectedTab(tab)}
            type="button"
            className={`relative cursor-pointer px-6 py-2 text-sm font-semibold z-10 text-center md:w-24 w-16 min-w-[6rem] flex items-center justify-center
              ${
                SelectedTab === tab
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }
              hover:scale-[1.05] active:scale-[0.97] transform transition-all duration-300 ease-in-out
              hover:drop-shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-#4ED7DD focus-visible:ring-offset-2`}
          >
            <span className="z-10">{tab}</span>
          </button>
        ))}

        {/* 3D Slidebar animation */}
        <div
          className="absolute top-1 bottom-1 w-[96px] bg-gradient-to-br from-[#4ED7DD] via-[#4ed6ddc9] to-[#4ed6ddda] rounded-xl z-0 transition-transform duration-300 ease-out shadow-md shadow-cyan-500/40"
          style={{
            transform: `translateX(${tabs.indexOf(SelectedTab) * 100}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default TabRadio;
