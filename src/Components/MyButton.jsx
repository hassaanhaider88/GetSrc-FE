export default function MyButton({BtnText}) {
  return (
    <>
      <style>{`
            .button-wrapper::before {
                animation: spin-gradient 4s linear infinite;
            }
        
            @keyframes spin-gradient {
                from {
                    transform: rotate(0deg);
                }
        
                to {
                    transform: rotate(360deg);
                }
            }
        `}</style>
      <div className="relative inline-block p-0.5 rounded-full overflow-hidden hover:scale-105 transition duration-300 active:scale-100 before:content-[''] before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_#00F5FF,_#00F5FF30,_#00F5FF)] button-wrapper">
        <button className="relative z-10 bg-gray-800 text-white rounded-full px-8 py-3 font-medium text-sm">
          {BtnText}
        </button>
      </div>
    </>
  );
}
