import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

export const fetchAllNewsCategories = createAsyncThunk("newsCategory/fetchAllNewsCategories", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("/news-category");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || error.message || "Lỗi không xác định";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
