const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "news_category",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_list: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ten_vi: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      ten_en: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tenkhongdau: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      mota_vi: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mota_en: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      keywords: {
        type: DataTypes.TEXT, // Đổi từ STRING(1024) thành TEXT
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT, // Đổi từ STRING(1024) thành TEXT
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      thumb: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      stt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hienthi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      noibat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      ngaytao: {
        type: DataTypes.BIGINT, // Đổi từ INTEGER -> BIGINT để lưu timestamp
        allowNull: true,
      },
      ngaysua: {
        type: DataTypes.BIGINT, // Đổi từ INTEGER -> BIGINT để lưu timestamp
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "news_category",
      timestamps: false, // Hoặc đổi thành true nếu muốn Sequelize tự quản lý ngaytao/ngaysua
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
