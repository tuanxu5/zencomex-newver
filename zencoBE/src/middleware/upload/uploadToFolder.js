const fs = require("fs");
const multer = require("multer");
const path = require("path");
const slugify = require("slugify");

// Thiết lập thư mục để lưu file tải lên

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { dir } = req.query;
    let uploadPath;

    // Kiểm tra xem dir có được cung cấp không
    if (dir) {
      uploadPath = path.join(__dirname, `../../../public/upload/${dir}`);
    } else {
      uploadPath = path.join(__dirname, "../../../public/upload"); // Thư mục mặc định
    }

    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err); // Nếu có lỗi khi tạo thư mục, gọi callback với lỗi
      }
      cb(null, uploadPath); // Gọi callback với đường dẫn thư mục
    });
  },
  filename: function (req, file, cb) {
    function removeVietnameseAccents(str) {
      return str
        .normalize("NFD") // Chuẩn hóa để tách dấu khỏi chữ cái
        .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tổ hợp
        .replace(/đ/g, "d") // Chuyển "đ" thành "d"
        .replace(/Đ/g, "D"); // Chuyển "Đ" thành "D"
    }

    function fixEncodingIssues(str) {
      return Buffer.from(str, "binary").toString("utf-8"); // Chuyển về UTF-8 đúng
    }

    function sanitizeFileName(fileName) {
      fileName = fixEncodingIssues(fileName); // Sửa lỗi mã hóa trước khi xử lý

      const nameWithoutExt = fileName.replace(/\.[^/.]+$/, ""); // Lấy phần tên file
      const extension = fileName.split(".").pop(); // Lấy phần mở rộng file

      const cleanedName = removeVietnameseAccents(nameWithoutExt)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Xóa ký tự đặc biệt, giữ lại chữ, số, khoảng trắng và "-"
        .trim() // Xóa khoảng trắng dư thừa
        .replace(/\s+/g, "-"); // Thay khoảng trắng bằng "-"

      return `${cleanedName}.${extension}`;
    }

    const timestamp = Date.now();
    const fileExtension = path.extname(sanitizeFileName(file.originalname)); // Lấy đuôi file
    const originalNameWithoutExt = path.basename(sanitizeFileName(file.originalname), fileExtension); // Lấy tên file không có đuôi

    // Bỏ khoảng cách và kết hợp tên file với timestamp
    const sanitizedOriginalName = originalNameWithoutExt.replace(/\s+/g, "_");
    const newFileName = `${sanitizedOriginalName}_${timestamp}${fileExtension}`;
    cb(null, newFileName); // Đặt tên file mới
  },
});

const uploadToFolder = multer({ storage: storage });

module.exports = uploadToFolder;
