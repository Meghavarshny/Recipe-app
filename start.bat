@echo off
TITLE Recipe App

REM Navigate to project root directory
cd /d "%~dp0"

REM Start backend server in a new window
start "Recipe App - Backend" cmd /k "npm run dev"

REM Wait a few seconds for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend server in a new window
start "Recipe App - Frontend" cmd /k "cd frontend && npm run dev"

echo Recipe App servers starting...
echo.
echo Backend: http://localhost:3000
echo Frontend: http://localhost:3001
echo.
echo Press any key to close this window...
pause >nul