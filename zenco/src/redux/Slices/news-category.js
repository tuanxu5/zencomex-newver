import { createSlice } from "@reduxjs/toolkit";
import { fetchAllNewsCategories } from "../thunks/news-category-thunk";

const initialState = {
  allNewsCategory: [],
  loading: false,
  error: null,
};

const newsCategorySlice = createSlice({
  name: "newsCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNewsCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllNewsCategories.fulfilled, (state, action) => {
        state.allNewsCategory = action.payload.DT;
        state.loading = false;
      })
      .addCase(fetchAllNewsCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newsCategorySlice.reducer;
