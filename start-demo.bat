@echo off
echo 🇻🇳 Vietnam Admin CDN Demo Server
echo ================================

:: Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Node.js found - Using Node.js server
    echo 🚀 Starting server...
    echo 💡 Server will open at http://localhost:8000
    echo ⏹️  Press Ctrl+C to stop
    echo.
    node serve.js
    goto :end
)

:: Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Python found - Using Python server
    echo 🚀 Starting server...
    echo 💡 Server will open at http://localhost:8000
    echo ⏹️  Press Ctrl+C to stop
    echo.
    python serve.py
    goto :end
)

:: Check if Python3 is available
python3 --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Python3 found - Using Python3 server
    echo 🚀 Starting server...
    echo 💡 Server will open at http://localhost:8000
    echo ⏹️  Press Ctrl+C to stop
    echo.
    python3 serve.py
    goto :end
)

:: No compatible runtime found
echo ❌ Error: No compatible runtime found!
echo.
echo 💡 Please install one of the following:
echo    • Node.js: https://nodejs.org/
echo    • Python: https://python.org/
echo.
echo 🔧 Alternative: Use built-in Windows Python
echo    • Type 'python' to install from Microsoft Store
echo.
pause

:end
echo.
echo 👋 Demo server stopped!
pause 