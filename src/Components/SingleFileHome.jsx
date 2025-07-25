import { IoLinkSharp } from "react-icons/io5";
import { MdFileDownload } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
  const handleFileCopy = () => {
    if (FileData.FileType == "Icons") {
      var hostName = window.location.origin;
      var ImgName = (FileData.img).split('').splice(6).join('')
      navigator.clipboard.writeText(` ${hostName}/${ImgName}`);
    } else if (FileData.FileType == "Videos") {
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
        <LazyLoadImage
          loading="lazy"
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
          loading="lazy"
          preload="metadata"
          className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5">
        <p className="text-white ImagerFont absolute bottom-5 right-5">
          {FileData.FileType}
        </p>
        <p className="text-white  capitalize absolute top-5 left-5">
          {FileData.FileName}
        </p>

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
  );
};

export default SingleFileHome;
