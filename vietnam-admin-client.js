/**
 * Vietnam Administrative Data CDN Client
 * Author: exsavior2412
 * Version: 1.0.0
 * Repository: https://github.com/exsavior2412/my-vietnam-admin-cdn
 */

class VietnamAdminCDN {
  constructor(options = {}) {
    this.baseURL = options.baseURL || 'https://cdn.jsdelivr.net/gh/exsavior2412/my-vietnam-admin-cdn@main';
    this.cache = new Map();
    this.options = {
      cacheTimeout: options.cacheTimeout || 24 * 60 * 60 * 1000, // 24 hours
      useLocalStorage: options.useLocalStorage !== false,
      retryCount: options.retryCount || 3,
      retryDelay: options.retryDelay || 1000,
      ...options
    };
    
    this.storageKey = 'vietnam-admin-cache';
    
    if (this.options.useLocalStorage && typeof localStorage !== 'undefined') {
      this.loadFromLocalStorage();
    }
  }

  /**
   * Load cache từ localStorage
   */
  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const { timestamp, data } = JSON.parse(stored);
        
        // Check if cache is still valid
        if (Date.now() - timestamp < this.options.cacheTimeout) {
          Object.entries(data).forEach(([key, value]) => {
            this.cache.set(key, value);
          });
          console.log('✅ Loaded cache from localStorage');
        }
      }
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
    }
  }

  /**
   * Save cache to localStorage
   */
  saveToLocalStorage() {
    if (!this.options.useLocalStorage || typeof localStorage === 'undefined') return;
    
    try {
      const data = {};
      this.cache.forEach((value, key) => {
        data[key] = value;
      });
      
      localStorage.setItem(this.storageKey, JSON.stringify({
        timestamp: Date.now(),
        data
      }));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  /**
   * Fetch with retry mechanism
   */
  async fetchWithRetry(url, retries = this.options.retryCount) {
    try {
      return await this.fetch(url);
    } catch (error) {
      if (retries > 0) {
        console.warn(`Retrying ${url}, ${retries} attempts left`);
        await new Promise(resolve => setTimeout(resolve, this.options.retryDelay));
        return this.fetchWithRetry(url, retries - 1);
      }
      throw error;
    }
  }

  /**
   * Basic fetch with caching
   */
  async fetch(path) {
    if (this.cache.has(path)) {
      return this.cache.get(path);
    }

    try {
      const response = await fetch(`${this.baseURL}${path}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      this.cache.set(path, data);
      this.saveToLocalStorage();
      
      return data;
    } catch (error) {
      console.error(`Failed to fetch ${path}:`, error);
      throw error;
    }
  }

  /**
   * Lấy tất cả tỉnh thành
   * @returns {Promise<Array>} Array of provinces
   */
  async getProvinces() {
    return await this.fetch('/provinces.json');
  }

  /**
   * Lấy quận/huyện theo tỉnh
   * @param {string} provinceCode - Mã tỉnh (01, 79, ...)
   * @returns {Promise<Array>} Array of districts
   */
  async getDistricts(provinceCode) {
    if (!provinceCode) throw new Error('Province code is required');
    return await this.fetch(`/districts/${provinceCode}.json`);
  }

  /**
   * Lấy phường/xã theo quận/huyện
   * @param {string} districtCode - Mã quận/huyện (001, 760, ...)
   * @returns {Promise<Array>} Array of wards
   */
  async getWards(districtCode) {
    if (!districtCode) throw new Error('District code is required');
    return await this.fetch(`/wards/${districtCode}.json`);
  }

  /**
   * Lấy thông tin một tỉnh theo mã
   * @param {string} code - Mã tỉnh
   * @returns {Promise<Object|null>} Province object
   */
  async getProvince(code) {
    const provinces = await this.getProvinces();
    return provinces.find(p => p.code === code) || null;
  }

  /**
   * Lấy thông tin một quận/huyện theo mã
   * @param {string} provinceCode - Mã tỉnh
   * @param {string} districtCode - Mã quận/huyện
   * @returns {Promise<Object|null>} District object
   */
  async getDistrict(provinceCode, districtCode) {
    const districts = await this.getDistricts(provinceCode);
    return districts.find(d => d.code === districtCode) || null;
  }

  /**
   * Lấy thông tin một phường/xã theo mã
   * @param {string} districtCode - Mã quận/huyện
   * @param {string} wardCode - Mã phường/xã
   * @returns {Promise<Object|null>} Ward object
   */
  async getWard(districtCode, wardCode) {
    const wards = await this.getWards(districtCode);
    return wards.find(w => w.code === wardCode) || null;
  }

  /**
   * Tìm kiếm tỉnh thành theo tên
   * @param {string} query - Từ khóa tìm kiếm
   * @returns {Promise<Array>} Array of matching provinces
   */
  async searchProvinces(query) {
    const provinces = await this.getProvinces();
    const lowerQuery = query.toLowerCase();
    
    return provinces.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.full_name.toLowerCase().includes(lowerQuery) ||
      p.name_en.toLowerCase().includes(lowerQuery) ||
      p.codename.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Tìm kiếm quận/huyện theo tên
   * @param {string} provinceCode - Mã tỉnh
   * @param {string} query - Từ khóa tìm kiếm
   * @returns {Promise<Array>} Array of matching districts
   */
  async searchDistricts(provinceCode, query) {
    const districts = await this.getDistricts(provinceCode);
    const lowerQuery = query.toLowerCase();
    
    return districts.filter(d => 
      d.name.toLowerCase().includes(lowerQuery) ||
      d.full_name.toLowerCase().includes(lowerQuery) ||
      d.name_en.toLowerCase().includes(lowerQuery) ||
      d.codename.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Tìm kiếm phường/xã theo tên
   * @param {string} districtCode - Mã quận/huyện
   * @param {string} query - Từ khóa tìm kiếm
   * @returns {Promise<Array>} Array of matching wards
   */
  async searchWards(districtCode, query) {
    const wards = await this.getWards(districtCode);
    const lowerQuery = query.toLowerCase();
    
    return wards.filter(w => 
      w.name.toLowerCase().includes(lowerQuery) ||
      w.full_name.toLowerCase().includes(lowerQuery) ||
      w.name_en.toLowerCase().includes(lowerQuery) ||
      w.codename.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Lấy địa chỉ đầy đủ
   * @param {string} provinceCode - Mã tỉnh
   * @param {string} districtCode - Mã quận/huyện
   * @param {string} wardCode - Mã phường/xã
   * @returns {Promise<Object|null>} Full address object
   */
  async getFullAddress(provinceCode, districtCode, wardCode) {
    try {
      const [province, district, ward] = await Promise.all([
        this.getProvince(provinceCode),
        this.getDistrict(provinceCode, districtCode),
        this.getWard(districtCode, wardCode)
      ]);

      if (!province || !district || !ward) {
        return null;
      }

      return {
        province: {
          code: province.code,
          name: province.name,
          full_name: province.full_name,
          type: province.type
        },
        district: {
          code: district.code,
          name: district.name,
          full_name: district.full_name,
          type: district.type
        },
        ward: {
          code: ward.code,
          name: ward.name,
          full_name: ward.full_name,
          type: ward.type
        },
        full_address: `${ward.full_name}, ${district.full_name}, ${province.full_name}`,
        full_address_en: `${ward.full_name_en}, ${district.full_name_en}, ${province.full_name_en}`
      };
    } catch (error) {
      console.error('Error getting full address:', error);
      return null;
    }
  }

  /**
   * Preload tất cả dữ liệu (tỉnh + quận/huyện)
   * @returns {Promise<Object>} Stats object
   */
  async preloadAll() {
    console.log('🚀 Preloading all data...');
    
    // Load provinces first
    const provinces = await this.getProvinces();
    console.log(`✅ Loaded ${provinces.length} provinces`);
    
    // Load all districts
    const districtPromises = provinces.map(p => this.getDistricts(p.code));
    await Promise.all(districtPromises);
    
    console.log('✅ All data preloaded');
    return this.getCacheStats();
  }

  /**
   * Lấy metadata từ CDN
   * @returns {Promise<Object>} Metadata object
   */
  async getMetadata() {
    return await this.fetch('/metadata.json');
  }

  /**
   * Lấy thống kê
   * @returns {Promise<Object>} Stats object với metadata và cache info
   */
  async getStats() {
    const metadata = await this.getMetadata();
    return {
      ...metadata,
      cache: this.getCacheStats(),
      lastUpdated: new Date(metadata.last_updated).toLocaleString('vi-VN')
    };
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
    console.log('🗑️ Cache cleared');
  }

  /**
   * Lấy thông tin cache
   * @returns {Object} Cache stats
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      memoryUsage: typeof window !== 'undefined' && window.performance?.memory 
        ? `${Math.round(window.performance.memory.usedJSHeapSize / 1024 / 1024)}MB`
        : 'N/A'
    };
  }

  /**
   * Test kết nối CDN
   * @returns {Promise<Object>} Test results
   */
  async testConnection() {
    const start = performance.now();
    
    try {
      const provinces = await this.getProvinces();
      const duration = performance.now() - start;
      
      return {
        success: true,
        duration: Math.round(duration),
        provincesCount: provinces.length,
        message: `✅ Connected successfully in ${Math.round(duration)}ms`
      };
    } catch (error) {
      return {
        success: false,
        duration: performance.now() - start,
        error: error.message,
        message: `❌ Connection failed: ${error.message}`
      };
    }
  }
}

// Export cho các môi trường khác nhau
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VietnamAdminCDN;
}

if (typeof window !== 'undefined') {
  window.VietnamAdminCDN = VietnamAdminCDN;
}

// AMD support
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return VietnamAdminCDN;
  });
} 