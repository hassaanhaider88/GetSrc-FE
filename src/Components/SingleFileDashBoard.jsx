import { MdFileDownload } from "react-icons/md";
import { IoLinkSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import GetSrcBE from '../../API.js'
import React from "react";

const SingleFileInfo = ({ FileData, Length, SelectedTab }) => {
  const navigate = useNavigate();

  const handleFileDelete = async () => {
    const isConfirmed = window.confirm("Confirm to delete this file?");
    if (!isConfirmed) return;

    try {
      const res = await fetch(`${GetSrcBE}/api/file/${FileData._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        toast.error("Error while deleting file.");
        return;
      }

      toast.success("Deleted successfully.");
      navigate("/upload-file");
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  const handleFileCopy = (fileUri) => {
    navigator.clipboard.writeText(fileUri);
    toast.success(`${FileData.FileType} URL copied.`);
  };

  const currentURL =
    FileData.FileType === "Images" || FileData.FileType === "GIFs"
      ? FileData.img
      : FileData.video;

  const isVisible =
    SelectedTab === "All" || SelectedTab === FileData.FileType;

  if (!isVisible) return null;

  return (
    <article
      role="group"
      aria-label={`File card for ${FileData.FileName}`}
      className="relative w-full h-[110px] px-6 py-3 mb-4 rounded-2xl border border-gray-200 shadow-md bg-white transition-all hover:shadow-lg flex items-center justify-between"
    >
      {/* Index Badge */}
      <span
        className="absolute -top-2 -left-2 bg-[#4ED7DD] text-white text-xs px-2 py-1 rounded-full shadow"
        aria-hidden="true"
      >
        #{Length}
      </span>

      {/* Preview & Title */}
      <div className="flex items-center gap-4" aria-label="Preview and file name">
        <div className="w-20 h-20 overflow-hidden rounded-xl shadow-sm border border-gray-100 bg-gray-50 flex items-center justify-center">
          {FileData.img ? (
            <img
              src={FileData.img}
              alt={`Preview of ${FileData.FileName}`}
              className="object-cover w-full h-full"
              loading="lazy"
              decoding="async"
              width="80"
              height="80"
            />
          ) : (
            <video
              src={FileData.video}
              className="object-cover w-full h-full"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label={`Video preview of ${FileData.FileName}`}
              width="80"
              height="80"
            />
          )}
        </div>
        <h2 className="text-base font-semibold text-gray-700 hover:text-[#4ED7DD] transition">
          {FileData.FileName}
        </h2>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center justify-center gap-2" aria-label="File actions">
        <div className="flex items-center gap-4">
          <button
            onClick={handleFileDelete}
            title={`Delete ${FileData.FileType}`}
            aria-label={`Delete ${FileData.FileName}`}
            className="text-gray-700 -rotate-90 hover:text-[#f77474] hover:scale-105 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            <FaDeleteLeft size={20} />
          </button>

          <button
            onClick={() => handleFileCopy(currentURL)}
            title="Copy file URL"
            aria-label={`Copy URL of ${FileData.FileName}`}
            className="text-gray-700 hover:text-[#4ED7DD] hover:scale-105 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ED7DD]"
          >
            <IoLinkSharp size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-500">{FileData.FileType}</p>
      </div>
    </article>
  );
};

export default SingleFileInfo;
