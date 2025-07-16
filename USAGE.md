# 🇻🇳 Hướng dẫn sử dụng Vietnam Administrative Data CDN

> **CDN miễn phí cho dữ liệu hành chính Việt Nam** - 63 tỉnh thành, 696 quận/huyện, 10,035 phường/xã

## 📊 Thông tin tổng quan

- **63** tỉnh thành phố
- **696** quận/huyện/thị xã  
- **10,035** phường/xã/thị trấn
- **100% miễn phí**, không rate limit
- **Global CDN** với tốc độ cao (<100ms)
- **99.9% uptime** 

## 🚀 Bắt đầu nhanh

### Base URL
```
https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/
```

### Endpoints chính
- **Tất cả tỉnh thành:** `/provinces.json`
- **Quận/huyện theo tỉnh:** `/districts/{province_code}.json`
- **Phường/xã theo quận/huyện:** `/wards/{district_code}.json`

## 💻 Ví dụ sử dụng

### 1. Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
    <title>Vietnam Address Selector</title>
</head>
<body>
    <select id="provinces"></select>
    <select id="districts"></select>
    <select id="wards"></select>

    <script>
        const BASE_URL = 'https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/';

        // Load provinces
        async function loadProvinces() {
            const response = await fetch(`${BASE_URL}provinces.json`);
            const provinces = await response.json();
            
            const select = document.getElementById('provinces');
            provinces.forEach(province => {
                const option = document.createElement('option');
                option.value = province.code;
                option.textContent = province.full_name;
                select.appendChild(option);
            });
        }

        // Load districts
        async function loadDistricts(provinceCode) {
            const response = await fetch(`${BASE_URL}districts/${provinceCode}.json`);
            const districts = await response.json();
            
            const select = document.getElementById('districts');
            select.innerHTML = '';
            districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district.code;
                option.textContent = district.full_name;
                select.appendChild(option);
            });
        }

        // Load wards
        async function loadWards(districtCode) {
            const response = await fetch(`${BASE_URL}wards/${districtCode}.json`);
            const wards = await response.json();
            
            const select = document.getElementById('wards');
            select.innerHTML = '';
            wards.forEach(ward => {
                const option = document.createElement('option');
                option.value = ward.code;
                option.textContent = ward.full_name;
                select.appendChild(option);
            });
        }

        // Event listeners
        document.getElementById('provinces').addEventListener('change', (e) => {
            if (e.target.value) loadDistricts(e.target.value);
        });

        document.getElementById('districts').addEventListener('change', (e) => {
            if (e.target.value) loadWards(e.target.value);
        });

        // Initialize
        loadProvinces();
    </script>
</body>
</html>
```

### 2. React/Next.js

```jsx
import { useState, useEffect } from 'react';

const VietnamAddressSelector = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const BASE_URL = 'https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/';

  // Load provinces on mount
  useEffect(() => {
    fetch(`${BASE_URL}provinces.json`)
      .then(res => res.json())
      .then(data => setProvinces(data));
  }, []);

  // Load districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      fetch(`${BASE_URL}districts/${selectedProvince}.json`)
        .then(res => res.json())
        .then(data => setDistricts(data));
      setWards([]);
      setSelectedDistrict('');
      setSelectedWard('');
    }
  }, [selectedProvince]);

  // Load wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`${BASE_URL}wards/${selectedDistrict}.json`)
        .then(res => res.json())
        .then(data => setWards(data));
      setSelectedWard('');
    }
  }, [selectedDistrict]);

  return (
    <div className="space-y-4">
      <select 
        value={selectedProvince} 
        onChange={(e) => setSelectedProvince(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Chọn tỉnh thành...</option>
        {provinces.map(province => (
          <option key={province.code} value={province.code}>
            {province.full_name}
          </option>
        ))}
      </select>

      <select 
        value={selectedDistrict} 
        onChange={(e) => setSelectedDistrict(e.target.value)}
        className="w-full p-2 border rounded"
        disabled={!selectedProvince}
      >
        <option value="">Chọn quận/huyện...</option>
        {districts.map(district => (
          <option key={district.code} value={district.code}>
            {district.full_name}
          </option>
        ))}
      </select>

      <select 
        value={selectedWard} 
        onChange={(e) => setSelectedWard(e.target.value)}
        className="w-full p-2 border rounded"
        disabled={!selectedDistrict}
      >
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

### 3. Vue.js

```vue
<template>
  <div>
    <select v-model="selectedProvince" @change="onProvinceChange">
      <option value="">Chọn tỉnh thành...</option>
      <option v-for="province in provinces" :key="province.code" :value="province.code">
        {{ province.full_name }}
      </option>
    </select>

    <select v-model="selectedDistrict" @change="onDistrictChange" :disabled="!selectedProvince">
      <option value="">Chọn quận/huyện...</option>
      <option v-for="district in districts" :key="district.code" :value="district.code">
        {{ district.full_name }}
      </option>
    </select>

    <select v-model="selectedWard" :disabled="!selectedDistrict">
      <option value="">Chọn phường/xã...</option>
      <option v-for="ward in wards" :key="ward.code" :value="ward.code">
        {{ ward.full_name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: 'https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/',
      provinces: [],
      districts: [],
      wards: [],
      selectedProvince: '',
      selectedDistrict: '',
      selectedWard: ''
    }
  },
  
  async mounted() {
    await this.loadProvinces();
  },
  
  methods: {
    async loadProvinces() {
      const response = await fetch(`${this.baseUrl}provinces.json`);
      this.provinces = await response.json();
    },
    
    async onProvinceChange() {
      if (this.selectedProvince) {
        const response = await fetch(`${this.baseUrl}districts/${this.selectedProvince}.json`);
        this.districts = await response.json();
      }
      this.wards = [];
      this.selectedDistrict = '';
      this.selectedWard = '';
    },
    
    async onDistrictChange() {
      if (this.selectedDistrict) {
        const response = await fetch(`${this.baseUrl}wards/${this.selectedDistrict}.json`);
        this.wards = await response.json();
      }
      this.selectedWard = '';
    }
  }
}
</script>
```

### 4. Node.js/Express

```javascript
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const BASE_URL = 'https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/';

// Cache để tối ưu performance
const cache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

async function fetchWithCache(url) {
  if (cache.has(url)) {
    const { data, timestamp } = cache.get(url);
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
  }
  
  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}

// API endpoints
app.get('/api/provinces', async (req, res) => {
  try {
    const provinces = await fetchWithCache(`${BASE_URL}provinces.json`);
    res.json(provinces);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch provinces' });
  }
});

app.get('/api/districts/:provinceCode', async (req, res) => {
  try {
    const { provinceCode } = req.params;
    const districts = await fetchWithCache(`${BASE_URL}districts/${provinceCode}.json`);
    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch districts' });
  }
});

app.get('/api/wards/:districtCode', async (req, res) => {
  try {
    const { districtCode } = req.params;
    const wards = await fetchWithCache(`${BASE_URL}wards/${districtCode}.json`);
    res.json(wards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wards' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### 5. Python/FastAPI

```python
from fastapi import FastAPI, HTTPException
import httpx
from typing import Optional
import asyncio

app = FastAPI()
BASE_URL = "https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/"

# Cache đơn giản
cache = {}

async def fetch_with_cache(url: str):
    if url in cache:
        return cache[url]
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        data = response.json()
        cache[url] = data
        return data

@app.get("/provinces")
async def get_provinces():
    try:
        return await fetch_with_cache(f"{BASE_URL}provinces.json")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch provinces")

@app.get("/districts/{province_code}")
async def get_districts(province_code: str):
    try:
        return await fetch_with_cache(f"{BASE_URL}districts/{province_code}.json")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch districts")

@app.get("/wards/{district_code}")
async def get_wards(district_code: str):
    try:
        return await fetch_with_cache(f"{BASE_URL}wards/{district_code}.json")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch wards")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## 📋 Cấu trúc dữ liệu

### Province (Tỉnh thành)
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

### District (Quận/Huyện)
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

### Ward (Phường/Xã)
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

## 🔍 Danh sách Codes phổ biến

### Tỉnh thành lớn:
- **01** - Hà Nội
- **79** - TP. Hồ Chí Minh
- **48** - Đà Nẵng
- **31** - Hải Phòng
- **92** - Cần Thơ

### Quận/Huyện Hà Nội:
- **001** - Ba Đình
- **002** - Hoàn Kiếm
- **003** - Tây Hồ
- **004** - Long Biên
- **005** - Cầu Giấy

### Quận TP.HCM:
- **760** - Quận 1
- **761** - Quận 12
- **762** - Quận Gò Vấp
- **763** - Quận Bình Thạnh
- **764** - Quận Tân Bình

## ⚡ Performance Tips

### 1. Sử dụng Cache
```javascript
class VietnamAddressCache {
  constructor() {
    this.cache = new Map();
    this.baseUrl = 'https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/';
  }

  async fetch(path) {
    if (this.cache.has(path)) {
      return this.cache.get(path);
    }

    const response = await fetch(this.baseUrl + path);
    const data = await response.json();
    this.cache.set(path, data);
    return data;
  }

  async getProvinces() {
    return this.fetch('provinces.json');
  }

  async getDistricts(provinceCode) {
    return this.fetch(`districts/${provinceCode}.json`);
  }

  async getWards(districtCode) {
    return this.fetch(`wards/${districtCode}.json`);
  }
}

const addressAPI = new VietnamAddressCache();
```

### 2. Preload dữ liệu quan trọng
```javascript
// Preload provinces và các thành phố lớn
Promise.all([
  fetch('https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/provinces.json'),
  fetch('https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/districts/01.json'), // Hà Nội
  fetch('https://cdn.jsdelivr.net/gh/exsavior2412/dia-chi-viet-nam@main/districts/79.json')  // TP.HCM
]).then(responses => {
  console.log('✅ Preloaded key data');
});
```

### 3. Error Handling
```javascript
async function safelyFetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch:', error);
    return []; // Return empty array as fallback
  }
}
```

## 🐛 Troubleshooting

### Q: Tại sao không load được dữ liệu?
**A:** Kiểm tra:
- Network connection
- URL có đúng format không
- Province/District code có hợp lệ không

### Q: Dữ liệu load chậm?
**A:** 
- Sử dụng cache
- Preload dữ liệu quan trọng
- Sử dụng CDN (đã có sẵn)

### Q: Có rate limit không?
**A:** Không! CDN này 100% miễn phí và không có giới hạn requests.

### Q: Dữ liệu có cập nhật không?
**A:** Dữ liệu được sync từ Tổng cục Thống kê, cập nhật khi có thay đổi chính thức.

## 📞 Hỗ trợ

- **GitHub Issues:** https://github.com/exsavior2412/dia-chi-viet-nam/issues
- **Demo:** https://exsavior2412.github.io/dia-chi-viet-nam/
- **Source:** https://github.com/exsavior2412/dia-chi-viet-nam

## 📄 License

- **Data:** Public Domain (Vietnam Government)
- **Code:** MIT License
- **CDN:** Free for commercial use

---

**Made with ❤️ for Vietnamese Developer Community** 