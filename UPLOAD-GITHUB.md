#  Hướng dẫn Upload lên GitHub và sử dụng CDN

## BƯỚC 1: Tạo Repository trên GitHub
1. Vào GitHub.com  Login vào tài khoản exsavior2412
2. Click "New Repository" 
3. Repository name: my-vietnam-admin-cdn
4. Description:  Vietnam Administrative Data CDN
5. Public  (bắt buộc)
6.  KHÔNG tích các box khác
7. Create repository

## BƯỚC 2: Upload lên GitHub
```
git remote add origin https://github.com/exsavior2412/my-vietnam-admin-cdn.git
git branch -M main  
git push -u origin main
```

## BƯỚC 3: CDN URLs của bạn:
Base: https://cdn.jsdelivr.net/gh/exsavior2412/my-vietnam-admin-cdn@main/
Provinces: /provinces.json
Districts: /districts/{code}.json  
Wards: /wards/{code}.json

 HOÀN THÀNH! CDN của bạn đã sẵn sàng!
