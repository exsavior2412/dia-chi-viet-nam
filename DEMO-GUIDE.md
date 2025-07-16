# 🎯 Hướng dẫn chạy Demo

## ❌ Vấn đề CORS khi mở file HTML trực tiếp

Khi bạn mở file `index.html` trực tiếp từ file explorer, browser sẽ báo lỗi CORS:

```
Access to fetch at 'file:///...' from origin 'null' has been blocked by CORS policy
```

**Nguyên nhân**: Browser chặn các request giữa file:// protocol với file khác vì lý do bảo mật.

## ✅ Giải pháp: Chạy Local HTTP Server

### 🚀 Cách 1: Sử dụng script tự động (Khuyến nghị)

**Windows:**
```bash
# Double click hoặc chạy trong Command Prompt
start-demo.bat
```

**Mac/Linux:**
```bash
# Sử dụng Python
python3 serve.py

# Hoặc Node.js
node serve.js
```

### 🐍 Cách 2: Python built-in server

**Python 3:**
```bash
cd C:\Users\Savior\Desktop\cdn\vietnam-admin-project\my-vietnam-admin-cdn
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

### 📦 Cách 3: Node.js server

```bash
cd C:\Users\Savior\Desktop\cdn\vietnam-admin-project\my-vietnam-admin-cdn

# Sử dụng npx (không cần cài gì)
npx http-server -p 8000 --cors

# Hoặc script tự tạo
node serve.js
```

### 🌐 Cách 4: Live Server (VS Code Extension)

1. Cài đặt **Live Server** extension trong VS Code
2. Right-click vào `index.html`
3. Chọn "Open with Live Server"

### 🔧 Cách 5: Serve (Global Package)

```bash
# Cài đặt globally
npm install -g serve

# Chạy server
serve -p 8000
```

## 🎯 Kết quả mong đợi

Sau khi chạy server, bạn sẽ thấy:

```
🚀 Starting Vietnam Admin CDN Demo Server...
📂 Directory: C:\Users\Savior\Desktop\cdn\vietnam-admin-project\my-vietnam-admin-cdn
🌐 Server: http://localhost:8000
📋 Files available:
   ✅ index.html
   ✅ provinces.json
   ✅ metadata.json
   ✅ districts/01.json
   ✅ wards/001.json

🎯 Demo page: http://localhost:8000
⏹️  Press Ctrl+C to stop server
```

Trình duyệt sẽ tự động mở tại `http://localhost:8000` và bạn sẽ thấy:
- ✅ Dropdown chọn tỉnh thành (63 tỉnh)
- ✅ Dropdown chọn quận/huyện
- ✅ Dropdown chọn phường/xã
- ✅ Hiển thị địa chỉ đầy đủ
- ✅ Thống kê dữ liệu

## 🐛 Troubleshooting

### Port 8000 đã được sử dụng?
```bash
# Thử port khác
python -m http.server 8080
# Hoặc
node serve.js  # Sẽ tự động đổi port
```

### Không có Python/Node.js?
**Cài đặt Python:**
- Windows: https://python.org/downloads/
- Hoặc từ Microsoft Store: `python`

**Cài đặt Node.js:**
- Tải từ: https://nodejs.org/

### File không tìm thấy?
```bash
# Đảm bảo bạn đang ở đúng thư mục
cd C:\Users\Savior\Desktop\cdn\vietnam-admin-project\my-vietnam-admin-cdn

# Kiểm tra file có tồn tại
dir index.html
dir provinces.json
```

## 📱 Test trên thiết bị khác

Khi server đang chạy, bạn có thể truy cập từ thiết bị khác:

1. **Tìm IP của máy:**
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

2. **Truy cập từ thiết bị khác:**
   ```
   http://192.168.1.100:8000  # Thay IP thực tế
   ```

## 🚀 Production vs Demo

**Demo (Local):**
- URL: `http://localhost:8000/`
- Dùng file local
- Chỉ cho development/test

**Production (CDN):**
- URL: `https://cdn.jsdelivr.net/gh/exsavior2412/my-vietnam-admin-cdn@main/`
- Global CDN
- Cho production apps

## 💡 Tips

- ✅ Luôn chạy server khi test demo
- ✅ Không mở HTML trực tiếp từ file explorer
- ✅ Sử dụng `start-demo.bat` cho Windows (dễ nhất)
- ✅ Check console để debug lỗi
- ✅ Dùng CDN URL cho production apps 