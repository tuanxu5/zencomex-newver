const { Router } = require("express");
const homeController = require("../../controller/zenco-controllers/homeController");

const router = Router();

router.get("/slides", homeController.showBanner);
router.delete("/slides/delete/:id", homeController.deleteBanner);
router.put("/slides/update", homeController.updateBanner);

module.exports = router;
