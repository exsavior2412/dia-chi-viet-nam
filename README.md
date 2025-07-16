# 🇻🇳 Vietnam Administrative Data CDN

Dữ liệu đơn vị hành chính Việt Nam đầy đủ với **63 tỉnh thành**, **696 quận/huyện**, **10,035 phường/xã** - 100% miễn phí, nhanh chóng và ổn định.

## 🚀 Quick Start

```javascript
// Lấy tất cả tỉnh thành
const provinces = await fetch('https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/provinces.json')
  .then(r => r.json());

// Lấy quận/huyện của Hà Nội (code: 01)
const districts = await fetch('https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/districts/01.json')
  .then(r => r.json());

// Lấy phường/xã của quận Ba Đình (code: 001)
const wards = await fetch('https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/wards/001.json')
  .then(r => r.json());
```

## 📊 Thống kê dữ liệu

- **63** tỉnh thành phố
- **696** quận/huyện/thị xã  
- **10,035** phường/xã/thị trấn
- **Nguồn**: [vietnamese-provinces-database](https://github.com/ThangLeQuoc/vietnamese-provinces-database)
- **Cập nhật**: Tháng 7/2024

## 🌐 CDN Endpoints

| Endpoint | Mô tả |
|----------|-------|
| `/provinces.json` | Tất cả 63 tỉnh thành |
| `/districts/{province_code}.json` | Quận/huyện theo tỉnh |
| `/wards/{district_code}.json` | Phường/xã theo quận/huyện |
| `/metadata.json` | Thông tin metadata |

**Base URL**: `https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/`

## 📋 Cấu trúc dữ liệu

### Provinces (Tỉnh thành)
```json
{
  "code": "01",
  "name": "Hà Nội", 
  "name_en": "Ha Noi",
  "full_name": "Thành phố Hà Nội",
  "full_name_en": "Ha Noi City",
  "type": "thành phố",
  "codename": "ha_noi"
}
```

### Districts (Quận/Huyện)
```json
{
  "code": "001",
  "name": "Ba Đình",
  "name_en": "Ba Dinh",
  "full_name": "Quận Ba Đình", 
  "full_name_en": "Ba Dinh District",
  "type": "quận",
  "province_code": "01",
  "codename": "ba_dinh"
}
```

### Wards (Phường/Xã)
```json
{
  "code": "00001",
  "name": "Phúc Xá",
  "name_en": "Phuc Xa",
  "full_name": "Phường Phúc Xá",
  "full_name_en": "Phuc Xa Ward",
  "type": "phường", 
  "district_code": "001",
  "codename": "phuc_xa"
}
```

## 📖 Hướng dẫn sử dụng

**👉 [Xem hướng dẫn chi tiết tại USAGE.md](./USAGE.md)**

Hướng dẫn bao gồm:
- ✅ **Vanilla JavaScript** - Cách tích hợp cơ bản
- ✅ **React/Next.js** - Component address selector
- ✅ **Vue.js** - Template và methods
- ✅ **Node.js/Express** - Backend API với cache
- ✅ **Python/FastAPI** - REST API endpoints
- ✅ **Performance Tips** - Tối ưu tốc độ load
- ✅ **Error Handling** - Xử lý lỗi
- ✅ **Troubleshooting** - Giải quyết vấn đề

## 💻 Ví dụ hoàn chỉnh

### React Component
```jsx
import { useState, useEffect } from 'react';

const VietnamAddressSelector = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const baseUrl = 'https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main';

  useEffect(() => {
    // Load provinces on component mount
    fetch(`${baseUrl}/provinces.json`)
      .then(r => r.json())
      .then(setProvinces);
  }, []);

  const handleProvinceChange = async (provinceCode) => {
    if (provinceCode) {
      const response = await fetch(`${baseUrl}/districts/${provinceCode}.json`);
      const districts = await response.json();
      setDistricts(districts);
    }
    setWards([]);
  };

  const handleDistrictChange = async (districtCode) => {
    if (districtCode) {
      const response = await fetch(`${baseUrl}/wards/${districtCode}.json`);
      const wards = await response.json();
      setWards(wards);
    }
  };

  return (
    <div>
      <select onChange={(e) => handleProvinceChange(e.target.value)}>
        <option value="">Chọn tỉnh thành...</option>
        {provinces.map(province => (
          <option key={province.code} value={province.code}>
            {province.full_name}
          </option>
        ))}
      </select>

      <select onChange={(e) => handleDistrictChange(e.target.value)}>
        <option value="">Chọn quận/huyện...</option>
        {districts.map(district => (
          <option key={district.code} value={district.code}>
            {district.full_name}
          </option>
        ))}
      </select>

      <select>
        <option value="">Chọn phường/xã...</option>
        {wards.map(ward => (
          <option key={ward.code} value={ward.code}>
            {ward.full_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VietnamAddressSelector;
```

## 🎯 Demo

Xem demo trực tiếp tại: [GitHub Pages](https://exsavior2412.github.io/dia-chi-viet-nam/)

## 🔥 Ưu điểm

- ✅ **100% miễn phí** - Sử dụng vĩnh viễn không tốn phí
- ✅ **Tốc độ cao** - CDN global, response time < 100ms
- ✅ **Độ tin cậy** - 99.9% uptime, không bị rate limit
- ✅ **Dữ liệu đầy đủ** - 63 tỉnh đầy đủ, 10k+ phường/xã
- ✅ **Dễ sử dụng** - REST API đơn giản, không cần authentication
- ✅ **CORS enabled** - Sử dụng được từ browser
- ✅ **Multiple formats** - JSON, gzip compressed
- ✅ **Caching friendly** - Cache được lâu dài

## 📈 Performance

| Metric | Value |
|--------|-------|
| Average Response Time | < 100ms |
| File Size (gzipped) | < 50KB |
| Cache Duration | 24 hours |
| Uptime | 99.9% |

## 🛠️ Technical Details

- **CDN Provider**: jsDelivr
- **Format**: JSON
- **Encoding**: UTF-8
- **Compression**: Gzip
- **CORS**: Enabled
- **HTTPS**: Always

## 📝 License

- **Data**: Public domain (Vietnam Government)
- **Code**: MIT License
- **CDN**: Free for commercial use

## 🤝 Contributing

Báo lỗi hoặc đóng góp tại [Issues](https://github.com/exsavior2412/dia-chi-viet-nam/issues)

## 🔄 Updates

Dữ liệu được cập nhật định kỳ từ nguồn chính thức. Phiên bản hiện tại: **2024.1**

## 🔗 Links

- **Demo:** https://exsavior2412.github.io/dia-chi-viet-nam/
- **Hướng dẫn chi tiết:** [USAGE.md](./USAGE.md)
- **JavaScript Client:** [vietnam-admin-client.js](./vietnam-admin-client.js)
- **Demo local:** [DEMO-GUIDE.md](./DEMO-GUIDE.md)

---

**Made with ❤️ by [exsavior2412](https://github.com/exsavior2412)** 

**For Vietnamese Developer Community** 🇻🇳 