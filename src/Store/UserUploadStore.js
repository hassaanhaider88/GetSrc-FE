import { create } from "zustand";

const useUploadStore = create((set) => ({
  uploadedFile: null,
  fileMeta: null,

  handleUpload: (file, F_name, F_Type) => {
    if (!file) return false;

    const fileData = {
      name: F_name,
      type: F_Type,
      createdAt: new Date().toISOString(),
    };

    set({
      uploadedFile: file,
      fileMeta: fileData,
    });

    return true;
  },

  clearUpload: () => {
    set({
      uploadedFile: null,
      fileMeta: null,
    });
  },
}));

export default useUploadStore;
