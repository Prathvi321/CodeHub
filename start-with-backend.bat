@echo off
echo Starting CodeHub with Backend...
echo.

echo Installing all dependencies...
call npm run install-all

echo.
echo Starting backend server...
start "Backend Server" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting frontend server...
echo.
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:5000
echo.

call npm run dev