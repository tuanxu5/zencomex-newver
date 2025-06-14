const { Router } = require("express");
const adminController = require("../../../controller/zenco-controllers/adminController");
const { checkUserJWT } = require("../../../middleware/JWTActions");

const router = Router();

router.post("/register", checkUserJWT, adminController.adminRegister);
router.post("/login", adminController.adminLogin);
router.post("/logout", adminController.adminLogout);
router.post("/checkToken", adminController.checkToken);

// check name url
router.get("/url", adminController.checkExistUrl);

//products
router.get("/product/list", adminController.adminGetProduct);
router.get("/product/category", adminController.adminGetCategory);
router.get("/product/child-category", adminController.adminGetChildCategory);

module.exports = router;
