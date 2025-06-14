const express = require("express");
const apiController = require("../controller/apiController");
const groupController = require("../controller/groupController");
const userController = require("../controller/userController");

//------zenco--------
//banner routes
const bannerRoutes = require("./zencomex/bannerRoutes");
//product routes
const productRoutes = require("./zencomex/productRoutes");
//------upload--------
const uploadRoutes = require("./zencomex/uploads/upload-to-cloundinary");
const uploadToFolder = require("./zencomex/uploads/upload-to-folder");
//------general--------//
const generalRoutes = require("./zencomex/generalRoutes");

//---------images--------
const imageRoutes = require("./zencomex/images/readImageRoutes");

// ---------- Admin user ------------
const adminRoutes = require("./zencomex/admin/adminRoutes");

// ----------- Footer ------------
const footerRoutes = require("./zencomex/footerRoutes");

// Mail
const emailRoutes = require("./zencomex/emailRoutes");

const newsCategoryRoutes = require("./zencomex/news-category-routes");

const router = express.Router();

const initApiRoutes = (app) => {
  // router.all("*", checkUserJWT, checkUserPermission);

  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);
  router.get("/account", userController.getUserAccount);

  router.get("/user/show", userController.showUser);
  router.post("/user/create", userController.createUser);
  router.put("/user/update", userController.updateUser);
  router.delete("/user/delete", userController.deleteUser);

  router.get("/group/show", groupController.showGroup);

  //-----zenco--------
  //banner
  router.use("/home", bannerRoutes);

  //upload to folder
  router.use("/upload-to-folder", uploadToFolder);

  //upload banner
  router.use("/upload", uploadRoutes);

  // products
  router.use("/product", productRoutes);

  //images
  router.use("/image", imageRoutes);

  //general
  router.use("/general", generalRoutes);

  //footer
  router.use("/footer", footerRoutes);

  // Admin user
  router.use("/admin", adminRoutes);

  //Email
  router.use("/email", emailRoutes);

  router.use("/news-category", newsCategoryRoutes);

  router.use("/test-haha", (req, res) => {
    return res.send("test troi");
  });

  return app.use("/api", router);
};

module.exports = initApiRoutes;
