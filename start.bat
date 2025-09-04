@echo off
echo Starting CodeHub Learning Platform...
echo.

echo Installing dependencies...
call npm install

echo.
echo Starting frontend development server...
echo Frontend will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev