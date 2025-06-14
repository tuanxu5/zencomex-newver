const { Router } = require("express");
const emailController = require("../../controller/zenco-controllers/mailController");

const router = Router();

router.get("", emailController.getAllEmail);
router.post("/send", emailController.sendEmail);
router.delete("/delete/:id", emailController.deleteEmail);

module.exports = router;
