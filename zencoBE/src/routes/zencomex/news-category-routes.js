const { Router } = require("express");
const newsCategoryController = require("../../controller/zenco-controllers/news-category-controller");

const router = Router();

router.get("/", newsCategoryController.fetchNewsCategories);
router.post("/create", newsCategoryController.createNewsCategory);
router.delete("/delete/:id", newsCategoryController.deleteNewsCategory);
router.put("/update/:id", newsCategoryController.updateNewsCategory);
router.post("/check-url", newsCategoryController.checkExistUrl);
router.get("/", newsCategoryController.fetchNewsCategories);

module.exports = router;
