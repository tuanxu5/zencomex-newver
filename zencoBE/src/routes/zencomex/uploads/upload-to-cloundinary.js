const express = require("express");
const { Router } = require("express");
const path = require("path");

const uploadFiles = require("../../../middleware/upload/uploadToCloudinary");
const uploadToFolder = require("../../../middleware/upload/uploadToFolder");
const homeController = require("../../../controller/zenco-controllers/homeController");
const productController = require("../../../controller/zenco-controllers/productController");
const deleteImage = require("../../../middleware/upload/deleteFileFolder");

const router = Router();

// Đường dẫn đến thư mục 'upload/product'
const uploadDirectory = path.join(__dirname, "../../../../public/upload/");
// Cấu hình router để phục vụ các tệp tin từ thư mục 'upload/product'
router.use("/", express.static(uploadDirectory));

//upload to folder
router.post("/folder", uploadToFolder.array("files", 50), homeController.uploadImageToFolder);

router.post("/folder/delete", deleteImage, homeController.deleteImageFolder);

// banner
router.post("/banner", uploadFiles.array("files", 10), homeController.uploadImageBanner);

// product
//---Image of product editor-------
router.post("/editor", uploadFiles.array("files", 10), productController.saveInfoImage);

module.exports = router;
