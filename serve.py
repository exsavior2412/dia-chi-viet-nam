#!/usr/bin/env python3
"""
Simple HTTP Server cho Vietnam Admin CDN Demo
Chạy: python serve.py
Hoặc: python3 serve.py
"""

import http.server
import socketserver
import os
import webbrowser
from threading import Timer

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def open_browser():
    """Tự động mở browser sau 1.5 giây"""
    webbrowser.open(f'http://localhost:{PORT}')

if __name__ == "__main__":
    # Đảm bảo chạy từ đúng thư mục
    if os.path.exists('index.html'):
        print(f"🚀 Starting Vietnam Admin CDN Demo Server...")
        print(f"📂 Directory: {os.getcwd()}")
        print(f"🌐 Server: http://localhost:{PORT}")
        print(f"📋 Files available:")
        for file in ['index.html', 'provinces.json', 'metadata.json']:
            if os.path.exists(file):
                print(f"   ✅ {file}")
            else:
                print(f"   ❌ {file} (missing)")
        
        # Tự động mở browser sau 1.5 giây
        Timer(1.5, open_browser).start()
        
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"\n🎯 Demo page: http://localhost:{PORT}")
            print("⏹️  Press Ctrl+C to stop server\n")
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n🛑 Server stopped!")
    else:
        print("❌ Error: index.html not found!")
        print("💡 Please run this script from the my-vietnam-admin-cdn directory") 