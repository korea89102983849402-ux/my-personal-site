@echo off
setlocal

echo Checking for Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is NOT installed or not in your PATH.
    echo Opening Node.js download page...
    start https://nodejs.org/
    echo.
    echo Please install Node.js (LTS version recommended).
    echo After installation, you may need to restart your terminal or computer.
    echo.
    pause
    exit /b
)

echo Node.js is installed. Version:
node -v

if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
)

if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo Error installing dependencies. Please check your internet connection or npm configuration.
        pause
        exit /b
    )
)

echo Starting development server...
echo.
echo Once the server starts, open your browser to: http://localhost:3000
echo.
call npm run dev
pause
