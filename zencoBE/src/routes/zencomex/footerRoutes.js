const { Router } = require("express");
const footerController = require("../../controller/zenco-controllers/footerController");

const router = Router();

router.get("", footerController.getFooter);
router.post("/create", footerController.createFooter);
router.delete("/delete/:id", footerController.deleteFooter);
router.put("/update/:id", footerController.updateFooter);

module.exports = router;
