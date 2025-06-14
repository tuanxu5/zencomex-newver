const newsCategoryService = require("../../service/zenco-services/news-category-service");

//---------- category ------------//
const fetchNewsCategories = async (req, res) => {
  try {
    let data = await newsCategoryService.fetchNewsCategories(req);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      total: data.total,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const createNewsCategory = async (req, res) => {
  const { body } = req;
  try {
    let data = await newsCategoryService.createNewsCategory(body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const deleteNewsCategory = async (req, res) => {
  try {
    const data = await newsCategoryService.deleteNewsCategory(req?.params?.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const updateNewsCategory = async (req, res) => {
  try {
    let data = await newsCategoryService.updateNewsCategory(req);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Đã có lỗi xảy ra từ server",
      EC: "-1",
      DT: "",
    });
  }
};

const checkExistUrl = async (req, res) => {
  try {
    let data = await newsCategoryService.checkExistUrl(req);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Đã có lỗi xảy ra từ server",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  fetchNewsCategories,
  createNewsCategory,
  deleteNewsCategory,
  updateNewsCategory,
  checkExistUrl,
};
