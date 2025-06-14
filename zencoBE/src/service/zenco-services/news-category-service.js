const { Op } = require("sequelize");
const db = require("../../models");

//--------------Category----------------------//
const fetchNewsCategories = async (req) => {
  if (JSON.stringify(req.query) === "{}") {
    const newsCategories = await db.news_category.findAll({
      where: {
        hienthi: true,
      },
    });
    if (newsCategories) {
      return {
        EM: "get list news categories successfully",
        EC: 0,
        DT: newsCategories,
      };
    } else {
      return {
        EM: "something wrongs with service",
        EC: -1,
        DT: false,
      };
    }
  } else {
    const { page, pageSize, name } = req.query;
    const offset = parseInt(page * pageSize);
    const limit = parseInt(pageSize);
    try {
      const { rows: newsCategories, count: total } = await db.news_category.findAndCountAll({
        where: {
          ten_vi: {
            [Op.like]: `%${name}%`,
          },
        },
        offset: offset,
        limit: limit,
      });

      if (newsCategories) {
        return {
          EM: "get list news categories successfully",
          EC: 0,
          total,
          DT: newsCategories,
        };
      } else {
        return {
          EM: "something wrongs with service",
          EC: -1,
          DT: [],
        };
      }
    } catch (error) {}
  }
};

const createNewsCategory = async (body) => {
  const idImageEditor = body.imageEditor?.map((item) => item.id);
  try {
    const newsCategory = await db.news_category.create(body);
    if (idImageEditor.length > 0) {
      await db.table_photo.update(
        {
          id_vitri: newsCategory.id,
        },
        {
          where: {
            id: {
              [Op.in]: idImageEditor,
            },
          },
        }
      );
    }

    if (newsCategory) {
      return {
        EM: "add news category successfully",
        EC: 0,
        DT: newsCategory,
      };
    } else {
      return {
        EM: "something wrongs with service",
        EC: -1,
        DT: [],
      };
    }
  } catch (error) {
    console.log("error", error);
  }
};

const deleteNewsCategory = async (id) => {
  try {
    const newsCategory = await db.news_category.destroy({
      where: { id },
    });
    if (newsCategory) {
      return {
        EM: "Xoá chuyên mục thành công",
        EC: 0,
        DT: newsCategory,
      };
    } else {
      return {
        EM: "Đã có lỗi xảy ra",
        EC: -1,
        DT: [],
      };
    }
  } catch (error) {}
};

const updateNewsCategory = async (req) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const newsCategory = await db.news_category.update(body, {
      where: { id: id },
    });
    if (newsCategory) {
      return {
        EM: "Cập nhật chuyên mục thành công",
        EC: 0,
        DT: newsCategory,
      };
    } else {
      return {
        EM: "Đã có lỗi xảy ra",
        EC: -1,
        DT: [],
      };
    }
  } catch (error) {
    console.log("error", error);
  }
};

const checkExistUrl = async (req) => {
  const { url } = req.body;

  if (!url) {
    return {
      EM: "url is not exist",
      EC: -1,
      DT: false,
    };
  }

  try {
    const existUrlNewsCategory = await db.news_category.findOne({
      where: { tenkhongdau: url },
    });
    const newData = {
      id: existUrlNewsCategory.id,
      title: existUrlNewsCategory.ten_vi,
      alias: existUrlNewsCategory.tenkhongdau,
      description: existUrlNewsCategory.noidung_vi,
      intro: existUrlNewsCategory.mota_vi,
      image: existUrlNewsCategory.photo,
      dateCreate: existUrlNewsCategory.ngaytao,
      dateUpdate: existUrlNewsCategory.ngaysua || "",
      videoUrl: existUrlNewsCategory.thumb2,
      titleSeo: existUrlNewsCategory.title,
      keywordSeo: existUrlNewsCategory.keywords,
      descriptionSeo: existUrlNewsCategory.description,
      parent: existUrlNewsCategory.type,
      type: "tin-tuc",
    };
    if (existUrlNewsCategory) {
      return {
        EM: "url is exist",
        EC: 0,
        DT: newData,
      };
    } else {
      return {
        EM: "url is not exist",
        EC: -1,
        DT: false,
      };
    }
  } catch (error) {}
};

module.exports = {
  fetchNewsCategories,
  createNewsCategory,
  deleteNewsCategory,
  updateNewsCategory,
  checkExistUrl,
};
