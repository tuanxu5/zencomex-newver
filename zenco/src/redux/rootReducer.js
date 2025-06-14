/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import infomationReducer from "./Slices/infomation";
import newsCategoryReducer from "./Slices/news-category";
import productReducer from "./Slices/product";

const rootPersistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  product: productReducer,
  information: infomationReducer,
  newsCategory: newsCategoryReducer,
});

export { rootPersistConfig, rootReducer };
