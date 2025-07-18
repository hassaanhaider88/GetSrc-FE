import { IoLinkSharp } from "react-icons/io5";
import { MdFileDownload } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
const QueryImages = ({ ImageData }) => {
  console.log(ImageData);
  const handleFileDownload = (fileUri) => {
    const fileNameWithExtension = `${ImageData.FileName.trim()}.png`;
    const a = document.createElement("a");
    a.href = fileUri;
    a.download = fileNameWithExtension;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); 
    // Show toast
    toast.success(`Images downloading...`);
  };
  const handleFileCopy = (fileUri) => {
    navigator.clipboard.writeText(fileUri);
    toast.success(`Images URL Copied...`);
  };
  return (
    // <h1>Img</h1>
    <div className="relative w-full h-[200px] cursor-pointer group overflow-hidden rounded-xl">
      <LazyLoadImage
        loading="lazy"
        src={ImageData.links.download}
        alt={ImageData.alt_description}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5">
        <p className="text-white ImagerFont absolute bottom-5 right-5">
          Images
        </p>

        <button
          onClick={() => handleFileDownload(ImageData.links.download)}
          title="Download"
          className="bg-white text-black p-2 rounded-full hover:bg-[#4ED7DD] hover:text-white transition duration-300 shadow-lg"
        >
          <MdFileDownload size={20} />
        </button>
        <button
          onClick={() => handleFileCopy(ImageData.links.download)}
          title="Copy URL"
          className="bg-white text-black p-2 rounded-full hover:bg-[#4ED7DD] hover:text-white transition duration-300 shadow-lg"
        >
          <IoLinkSharp size={20} />
        </button>
      </div>
    </div>
  );
};

export default QueryImages;
