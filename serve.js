#!/usr/bin/env node
/**
 * Simple HTTP Server cho Vietnam Admin CDN Demo
 * Chạy: node serve.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8000;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
          <h1>404 - File Not Found</h1>
          <p>File: ${filePath}</p>
          <p><a href="/">← Back to Demo</a></p>
        `, 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}\n`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(content, 'utf-8');
    }
  });
});

function openBrowser() {
  const url = `http://localhost:${PORT}`;
  const start = (process.platform === 'darwin' ? 'open' : 
                 process.platform === 'win32' ? 'start' : 'xdg-open');
  
  exec(`${start} ${url}`, (error) => {
    if (error) {
      console.log(`💡 Please open: ${url}`);
    }
  });
}

// Check if files exist
const requiredFiles = ['index.html', 'provinces.json', 'metadata.json'];
const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));

console.log('🚀 Starting Vietnam Admin CDN Demo Server...');
console.log(`📂 Directory: ${process.cwd()}`);
console.log(`🌐 Server: http://localhost:${PORT}`);
console.log('📋 Files available:');

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} (missing)`);
  }
});

if (missingFiles.length > 0) {
  console.log(`\n⚠️  Warning: ${missingFiles.length} files missing!`);
}

server.listen(PORT, () => {
  console.log(`\n🎯 Demo page: http://localhost:${PORT}`);
  console.log('⏹️  Press Ctrl+C to stop server\n');
  
  // Auto open browser after 1.5 seconds
  setTimeout(openBrowser, 1500);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Port ${PORT} is already in use!`);
    console.log('💡 Try a different port or close other servers');
  } else {
    console.error('Server error:', err);
  }
}); 