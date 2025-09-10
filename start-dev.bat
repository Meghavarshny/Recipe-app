@echo off
TITLE Recipe App - Development Environment

REM Check if running on Windows
echo Checking system environment...
echo.

REM Navigate to project root directory
cd /d "%~dp0"

REM Check if Node.js is installed
echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js and try again
    pause
    exit /b 1
)

echo Node.js is installed
echo.

REM Check if npm is installed
echo Checking if npm is installed...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed or not in PATH
    echo Please install npm and try again
    pause
    exit /b 1
)

echo npm is installed
echo.

REM Check if backend dependencies are installed
echo Checking backend dependencies...
if not exist "node_modules" (
    echo Installing backend dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install backend dependencies
        pause
        exit /b 1
    )
    echo Backend dependencies installed successfully
) else (
    echo Backend dependencies already installed
)

echo.

REM Check if frontend dependencies are installed
echo Checking frontend dependencies...
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install frontend dependencies
        cd ..
        pause
        exit /b 1
    )
    cd ..
    echo Frontend dependencies installed successfully
) else (
    echo Frontend dependencies already installed
)

echo.

REM Start both frontend and backend servers
echo Starting Recipe App development environment...
echo.

REM Start backend server in a new window
start "Recipe App - Backend Server" cmd /k "title Recipe App - Backend Server && cd /d "%~dp0" && npm run dev"

REM Wait a few seconds for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend server in a new window
start "Recipe App - Frontend Server" cmd /k "title Recipe App - Frontend Server && cd /d "%~dp0\frontend" && npm run dev"

echo.
echo Recipe App development environment started successfully!
echo.
echo Backend server running on: http://localhost:3000
echo Frontend server running on: http://localhost:3001
echo.
echo You can now access the application in your browser.
echo Press any key to close this window (servers will continue running)...
pause >nul