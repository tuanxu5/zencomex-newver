# Sử dụng image Node.js chính thức từ Docker Hub
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json trước để tối ưu cache
COPY package.json package-lock.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào container (CHỈ làm sau khi cài xong package)
COPY . .

# Chạy ứng dụng backend
CMD ["npm", "start"]