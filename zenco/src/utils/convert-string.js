export const toSlugLinkParams = (str) => {
  return str
    .normalize("NFD") // Tách dấu khỏi ký tự
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tiếng Việt
    .toLowerCase()
    .replace(/đ/g, "d") // Chuyển đổi "đ" thành "d"
    .replace(/[^a-z0-9\s-]/g, "") // Xóa ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-"); // Thay dấu cách bằng dấu "-"
};
