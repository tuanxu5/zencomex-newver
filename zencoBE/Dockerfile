# Sử dụng image Node.js chính thức từ Docker Hub
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json trước để tối ưu cache
COPY package.json package-lock.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Copy ảnh mặc định vào thư mục tạm (bên ngoài volume)
COPY ./public/upload/baiviet /tmp/default-images

# CMD duy nhất: copy ảnh mặc định nếu chưa có và start app
CMD ["sh", "-c", "mkdir -p /app/public/upload/baiviet && cp -n -r /tmp/default-images/* /app/public/upload/baiviet && npm start"]