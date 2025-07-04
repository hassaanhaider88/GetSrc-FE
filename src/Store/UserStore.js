import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Required for feedback

import GetSrcBE from "../../API.js";

const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  UserData: JSON.parse(localStorage.getItem("UserData")),

  // Sign Up
  signUp: async (fullName, email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${GetSrcBE}/api/user/sign-up`, {
        FullName: fullName,
        Email: email,
        password,
      });
      const userData = res.data.user;
      localStorage.setItem("UserData", JSON.stringify(userData));
      set({ user: userData, UserData: userData, loading: false });
      return userData;
    } catch (err) {
      set({
        error: err.response?.data?.error || "Sign up failed",
        loading: false,
      });
    }
  },

  // Sign In
  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${GetSrcBE}/api/user/sign-in`, {
        Email: email,
        password,
      });
      const userData = res.data.user;
      localStorage.setItem("UserData", JSON.stringify(userData));
      set({ user: userData, UserData: userData, loading: false });
      return userData;
    } catch (err) {
      set({
        error: err.response?.data?.error || "Sign in failed",
        loading: false,
      });
    }
  },

  // Sign Out
  signOut: () => {
    localStorage.removeItem("UserData");
    set({ user: null, UserData: null });
  },

  // Update User
  updateUser: async (updates) => {
    set({ loading: true, error: null });
    const { UserData } = get();
    if (!UserData || !UserData._id) {
      toast.error("User not found");
      set({ loading: false });
      return;
    }

    try {
      const res = await fetch(`${GetSrcBE}/user/update/${UserData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: updates.fullName,
          email: updates.email,
          profile: updates.profile,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("User updated successfully");
        localStorage.setItem("UserData", JSON.stringify(data.user));
        set({ UserData: data.user, user: data.user, loading: false });
      } else {
        toast.error(data.error || "Failed to update user");
        set({ loading: false });
      }
    } catch (err) {
      toast.error("Something went wrong");
      set({
        error: err.response?.data?.error || "Update failed",
        loading: false,
      });
    }
  },
}));

export default useUserStore;
