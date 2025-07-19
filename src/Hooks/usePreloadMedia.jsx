import { useEffect } from "react";

const usePreloadMedia = (urls = []) => {
  useEffect(() => {
    urls.forEach((url) => {
      const ext = url.split(".").pop().toLowerCase();
      const isVideo = ["mp4", "webm", "mov"].includes(ext);
      const el = isVideo
        ? Object.assign(document.createElement("video"), { preload: "auto" })
        : new Image();

      el.src = url;
      el.style.display = "none";
      el.muted = true; // for video
      document.body.appendChild(el);
    });
  }, [urls]);
};

export default usePreloadMedia;
