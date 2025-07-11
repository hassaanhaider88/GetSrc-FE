import { IoLinkSharp } from "react-icons/io5";
import { MdFileDownload } from "react-icons/md";
import { toast } from "react-toastify";
const SingleFileHome = ({ FileData, SelectedTab }) => {
  const handleFileDownload = (fileUri) => {
    if (FileData.FileType == "Images") {
      const fileNameWithExtension = `${FileData.FileName.trim()}.png`;
      const a = document.createElement("a");
      a.href = fileUri;
      a.download = fileNameWithExtension;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (FileData.FileType == "Videos") {
      const fileNameWithExtension = `${FileData.FileName.trim()}.mp4`;
      const a = document.createElement("a");
      a.href = fileUri;
      a.download = fileNameWithExtension;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const fileNameWithExtension = `${FileData.FileName.trim()}.gif`;
      const a = document.createElement("a");
      a.href = fileUri;
      a.download = fileNameWithExtension;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    // Show toast
    toast.success(`${FileData.FileType} downloading...`);
  };
  const handleFileCopy = (fileUri) => {
    if (FileData.FileType == "Videos") {
      navigator.clipboard.writeText(FileData.video);
    } else {
      navigator.clipboard.writeText(FileData.img);
    }
    toast.success(`${FileData.FileType} URL Copied...`);
  };
  const currentURL =
    FileData?.FileType == "Images" || "GIFs" ? FileData.img : FileData.video;

  return (
    <div
      className={`relative w-full h-[200px] cursor-pointer group overflow-hidden rounded-xl ${
        SelectedTab == "All" || SelectedTab == FileData.FileType
          ? "block"
          : "hidden"
      }`}
    >
      {/* Media: Image or Video */}
      {FileData.img ? (
        <img
          src={FileData.img}
          alt={FileData.FileName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <video
          src={FileData.video}
          alt={FileData.FileName}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5">
        <p className="text-white ImagerFont absolute bottom-5 right-5">{FileData.FileType}</p>
        <p className="text-white  capitalize absolute top-5 left-5">{FileData.FileName}</p>
        
        <button
          onClick={() => handleFileDownload(currentURL)}
          title="Download"
          className="bg-white text-black p-2 rounded-full hover:bg-[#4ED7DD] hover:text-white transition duration-300 shadow-lg"
        >
          <MdFileDownload size={20} />
        </button>
        <button
          onClick={() => handleFileCopy(currentURL)}
          title="Copy URL"
          className="bg-white text-black p-2 rounded-full hover:bg-[#4ED7DD] hover:text-white transition duration-300 shadow-lg"
        >
          <IoLinkSharp size={20} />
        </button>
      </div>
    </div>

    // <div
    //   className={`relative ${
    //     SelectedTab == "All" || SelectedTab == FileData.FileType
    //       ? "block"
    //       : "hidden"
    //   }`}
    // >
    //   <div className="w-[250px] h-[300px] rounded-2xl shadow-md border border-white/20 overflow-hidden transition-all duration-500 hover:translate-y-[-10px] hover:shadow-lg hover:border-violet-600/20 active:translate-y-[-5px] active:scale-98 font-sans">
    //     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 animate-shine" />

    //     <div className="absolute inset-[-10px] bg-radial-gradient opacity-0 transition-opacity duration-500 hover:opacity-100" />

    //     <div className="p-5 h-full flex flex-col gap-3 relative z-20">
    //       <div className="absolute top-3 right-3 bg-green-500 text-black z-40 py-0.5 px-2 rounded-full text-xs font-semibold scale-80 opacity-0 transition-all duration-400 ease-in-out delay-100 hover:scale-100 hover:opacity-100"></div>

    //       <div className="w-full h-[200px] ScrollInVisible overflow-auto rounded-xl transition-all duration-500 hover:translate-y-[-5px] hover:scale-[1.03] hover:shadow-lg relative">
    //         {FileData.img ? (
    //           <img
    //             className="cursor-pointer"
    //             src={FileData.img}
    //             alt={FileData.FileName}
    //             width={"100%"}
    //             aria-label={`Video preview of ${FileData.FileName}`}
    //             height={"100%"}
    //           />
    //         ) : (
    //           <video
    //             src={FileData.video}
    //             alt={FileData.FileName}
    //             autoPlay
    //             loop
    //             muted
    //             playsInline
    //             preload="auto"
    //             className="w-full h-full pointer-events-none object-cover"
    //             aria-label={`Video preview of ${FileData.FileName}`}
    //           />
    //         )}
    //       </div>

    //       <div className="flex flex-col gap-0.5">
    //         <p className="text-gray-800 text-base font-bold transition-all duration-300 hover:text-[#4ED7DD] hover:translate-x-[2px]">
    //           {FileData.FileName}
    //         </p>
    //         <p className="text-gray-800 text-sm opacity-70 transition-all duration-300 hover:opacity-100 hover:translate-x-[2px]">
    //           {FileData.FileType}
    //         </p>
    //       </div>

    //       <div className="flex justify-between items-center mt-auto">
    //         <div className="w-8 h-8 bg-[#4ED7DD] rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300 scale-90 hover:scale-100 hover:shadow-lg hover:shadow-violet-600/20 hover:ring-4 hover:ring-[#4ed6dd5b] animate-pulse-svg">
    //           <MdFileDownload
    //             size={20}
    //             title={`Download ${FileData.FileType}`}
    //             aria-label={`Download ${FileData.FileName}`}
    //             onClick={() => handleFileDownload(currentURL)}
    //           />
    //         </div>
    //         <div className="w-8 h-8 bg-[#4ED7DD] rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300 scale-90 hover:scale-100 hover:shadow-lg hover:shadow-violet-600/20 hover:ring-4 hover:ring-[#4ed6dd5b] animate-pulse-svg">
    //           <IoLinkSharp
    //             title="Copy URI"
    //             onClick={() => handleFileCopy(currentURL)}
    //             size={20}
    //             aria-label={`Copy URL of ${FileData.FileName}`}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SingleFileHome;
