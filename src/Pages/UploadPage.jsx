import { useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { RiFocus2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import URLToggle from "../Components/URLToggler";
import axios from "axios";
import GetSrcBE from '../../API.js'
import { Helmet } from "react-helmet";

const UploadPage = () => {
  const navigate = useNavigate();
  const fileUploader = useRef(null);

  const [isURLMode, setIsURLMode] = useState(false);
  const [urlVal, setUrlVal] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [selectType, setSelectType] = useState("Images");
  const [isVideoUpload, setIsVideoUpload] = useState(false);
  const [previewURL, setPreviewURL] = useState("");

  const TYPES = ["Images", "Videos", "GIFs"];
  const user = JSON.parse(localStorage.getItem("UserData"));

  const handleFileClick = () => fileUploader.current.click();

  const isValidImageURL = (url) =>
    /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);

  const handleURLFile = async (url, fromImgkit = false) => {
    if (!fileName) return toast.error("Image Name Required..");

    const payload = {
      ImgUrl: url,
      File_Name: fileName,
      Video: null,
      UserCreated: user?._id,
      FileType: selectType,
    };

    const response = await axios.post(`${GetSrcBE}/api/img-upload/url`, payload);
    if (response.status === 201) return navigate("/dashboard");

    setBtnLoading(false);
    toast.error("Something went wrong...");
  };

  const handleFileUpload = (file) => {
    if (isURLMode) return handleURLFile(urlVal);

    if (!file || !user) return;

    const fileType = file.type;

    if (fileType.startsWith("video/")) {
      if (!user.ProPlan) {
        toast.error("Upgrade to Pro to upload videos.");
        setSelectType("Images");
        return;
      }

      const videoEl = document.createElement("video");
      videoEl.preload = "metadata";
      videoEl.onloadedmetadata = () => {
        window.URL.revokeObjectURL(videoEl.src);
        const maxDuration = 5 * 60;
        if (videoEl.duration > maxDuration) {
          toast.error("Video must be less than 5 minutes!");
          setIsVideoUpload(false);
          setPreviewURL("https://i.pinimg.com/236x/77/59/37/77593701947abbd4f18f87e38d38e225.jpg");
          return;
        }

        setSelectType("Videos");
        setPreviewURL(URL.createObjectURL(file));
        setIsVideoUpload(true);
        setSelectedFile(file);
        setFileSelected(true);
      };
      videoEl.src = URL.createObjectURL(file);
      return;
    }

    if (
      fileType === "image/svg+xml" ||
      fileType.startsWith("application/") ||
      fileType.startsWith("text/")
    )
      return toast.error("Unsupported file type.");

    const uploadsAllowed = user?.ProPlan ? 50 : 15;
    if (user.uploadedMedia.length >= uploadsAllowed)
      return toast.error(`Limit reached: ${uploadsAllowed} uploads allowed.`);

    setSelectType("Images");
    setPreviewURL(URL.createObjectURL(file));
    setSelectedFile(file);
    setIsVideoUpload(false);
    setFileSelected(true);
    toast.success("Image Uploaded");
  };

  const handleSubmit = async () => {
    setBtnLoading(true);
    const fromImgkit = false;

    if (isURLMode) return handleURLFile(urlVal, fromImgkit);

    if (!fileName || !selectedFile) {
      setBtnLoading(false);
      return toast.error("Missing file or file name.");
    }

    if (selectType === "Videos") {
      const formData = new FormData();
      formData.append("Uploader", selectedFile);
      formData.append("File_Name", fileName);
      formData.append("FileType", selectType);
      formData.append("UserCreated", user?._id);

      const res = await axios.post(`${GetSrcBE}/api/upload-video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setBtnLoading(false);
      return res.status === 201
        ? navigate("/dashboard")
        : toast.error("Upload failed.");
    }

    try {
      const { data: authData } = await axios.get(`${GetSrcBE}/api/auth`);

      const formData = new FormData();
      formData.append("Uploader", selectedFile);
      formData.append("publicKey", "public_6yB+SqW0xeN3nKq319nU8ESrzHI=");
      formData.append("fileName", fileName);
      formData.append("FileType", selectType);
      formData.append("UserCreated", user?._id);
      formData.append("signature", authData.signature);
      formData.append("expire", authData.expire);
      formData.append("token", authData.token);

      const res = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setBtnLoading(false);
      if (res.status === 200) {
        handleURLFile(res.data.url, true);
        toast.success("Uploaded successfully");
      } else {
        toast.error("Upload failed.");
      }
    } catch (err) {
      setBtnLoading(false);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
    <Helmet>
        <title>Easy Upload Media | GetSrc</title>
        <meta
          name="description"
          content="Can easily upload images and video (if pro) and get Instance URL."
        />
      </Helmet>
    <div className="w-full h-screen flex flex-col px-10 py-10 justify-between items-center">
      <URLToggle IsSendURL={isURLMode} setIsSendURL={setIsURLMode} />

      <div className="w-full h-full flex flex-col md:flex-row gap-5 items-center justify-between px-10">
        {!isURLMode && (
          <div
            onClick={handleFileClick}
            className="w-full md:w-1/2 border-2 border-dashed border-[#4ED7DD] rounded-2xl p-10 flex items-center justify-center cursor-pointer transition hover:bg-[#4ed6dd25] h-[400px]"
          >
            <input
              type="file"
              hidden
              ref={fileUploader}
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
            {fileSelected ? (
              isVideoUpload ? (
                <video
                  src={previewURL}
                  autoPlay
                  loop
                  muted
                  className="w-[300px] h-full object-contain"
                />
              ) : (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              )
            ) : (
              <IoMdCloudUpload className="text-[#4ED7DD]" size={150} />
            )}
          </div>
        )}

        <div className={`flex flex-col gap-4 ${isURLMode ? "w-full" : "w-1/2"}`}>
          {isURLMode && (
            <input
              value={urlVal}
              onChange={(e) => setUrlVal(e.target.value)}
              type="text"
              placeholder="Enter image URL (.jpg, .png, .gif)"
              className="w-full px-5 py-2 rounded-[40px] bg-[#cececeaf] outline-none"
            />
          )}

          <input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            type="text"
            placeholder="Enter your file name..."
            className="w-full px-5 py-2 rounded-[40px] bg-[#F6F5FB] outline-none"
            required
          />

          <div className="w-full flex justify-center mt-4">
            <div className="relative flex px-2 rounded-xl">
              {TYPES.map((type) => (
                <label
                  key={type}
                  onClick={() => setSelectType(type)}
                  className={`cursor-pointer w-24 px-6 py-2 text-sm font-semibold text-center z-10 ${
                    selectType === type
                      ? "text-white"
                      : "bg-[#F6F5FB] rounded-2xl"
                  }`}
                >
                  {type}
                </label>
              ))}
              <div
                className="absolute top-1 bottom-1 w-[96px] bg-[#4ED7DD] rounded-xl z-0 transition-transform duration-300"
                style={{
                  transform: `translateX(${TYPES.indexOf(selectType) * 100}%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={btnLoading}
        className={`button ${btnLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div className="wrap">
          <p>
            <span>✧</span>
            <span>✦</span>
            {btnLoading ? "Uploading..." : "Upload Image"}
          </p>
        </div>
      </button>

      {/* Tooltip */}
      <span className="absolute bottom-[20%] -rotate-90 right-5">
        <div className="tooltip-container relative group">
          <RiFocus2Fill className="text-black hover:text-[#4ED7DD] animate-ping group-hover:animate-none cursor-pointer" />
          <span className="absolute pointer-events-none opacity-0 group-hover:opacity-100 px-4 py-2 text-sm font-medium text-white bg-[#4ED7DD] rounded-lg shadow-lg transition-all duration-200 whitespace-nowrap z-50 bottom-full left-1/2 -translate-x-1/2 -translate-y-2 mb-2">
            Media will be deleted after 15 days
            <span className="absolute w-2 h-2 bg-[#4ED7DD] rotate-45 bottom-[-4px] left-1/2 -translate-x-1/2" />
          </span>
        </div>
      </span>
    </div>
    </>
  );
};

export default UploadPage;
