import { IoLinkSharp } from "react-icons/io5";
import { MdFileDownload } from "react-icons/md";
import { downloadUrl } from "download.js";
import { toast } from "react-toastify";
const QueryVideos = ({ VideoData }) => {
  const handleFileDownload = (fileUri) => {
   
    downloadUrl(fileUri, `video_${VideoData.id}.mp4`);
    toast.success(`Videos downloading...`);
  };
  const handleFileCopy = (fileUri) => {
    navigator.clipboard.writeText(fileUri);
    toast.success(`Video URL Copied...`);
  };
  return (
    // <h1>Img</h1>
    <div className="relative w-full h-[200px] cursor-pointer group overflow-hidden rounded-xl">
      <video
        key={VideoData.id}
        src={VideoData.video_files[0].link}
        //   alt={FileData.FileName}
        autoPlay
        loop
        muted
        playsInline
        loading="eager"
        preload="metadata"
        className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5">
        <p className="text-white ImagerFont absolute bottom-5 right-5">
          Videos
        </p>

        <button
          onClick={() => handleFileDownload(VideoData.video_files[0].link)}
          title="Download"
          className="bg-white text-black p-2 rounded-full hover:bg-[#4ED7DD] hover:text-white transition duration-300 shadow-lg"
        >
          <MdFileDownload size={20} />
        </button>
        <button
          onClick={() => handleFileCopy(VideoData.video_files[0].link)}
          title="Copy URL"
          className="bg-white text-black p-2 rounded-full hover:bg-[#4ED7DD] hover:text-white transition duration-300 shadow-lg"
        >
          <IoLinkSharp size={20} />
        </button>
      </div>
    </div>
  );
};

export default QueryVideos;
