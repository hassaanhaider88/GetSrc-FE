const URLToggle = ({ IsSendURL, setIsSendURL }) => {
  return (
    <form
      className="fixed top-5 right-5 w-[200px] h-[50px]"
      role="radiogroup"
      aria-label="Toggle between URL and File upload"
    >
      <div
        className="absolute inset-0 rounded-full transition-all duration-300 flex items-center gap-5 justify-between px-4 text-sm font-bold shadow-lg bg-gradient-to-bl from-[#74DC2a] to-[#4ed7dd]"
      >
        <label
          htmlFor="yes"
          className={`cursor-pointer transition-colors ${
            IsSendURL ? "text-white" : "text-black/30"
          }`}
        >
          Send Url
        </label>
        <label
          htmlFor="no"
          className={`cursor-pointer transition-colors ${
            !IsSendURL ? "text-white" : "text-black/30"
          }`}
        >
          Send File
        </label>
      </div>

      {/* Hidden radio inputs for accessibility & state control */}
      <input
        type="radio"
        id="yes"
        name="toggle"
        value="yes"
        checked={IsSendURL}
        onChange={() => setIsSendURL(true)}
        className="sr-only"
        aria-checked={IsSendURL}
        role="radio"
      />
      <input
        type="radio"
        id="no"
        name="toggle"
        value="no"
        checked={!IsSendURL}
        onChange={() => setIsSendURL(false)}
        className="sr-only"
        aria-checked={!IsSendURL}
        role="radio"
      />
    </form>
  );
};

export default URLToggle;
