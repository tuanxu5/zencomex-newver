const { Router } = require("express");
const uploadToFolder = require("../../../middleware/upload/uploadToFolder");

const router = Router();

//upload to folder
router.post("/upload", uploadToFolder.array("files", 10), (req, res) => {
  return res.status(200).json({
    EM: "upload successfully",
    EC: "0",
    EF: "",
    DT: req.files,
  });
});

module.exports = router;
