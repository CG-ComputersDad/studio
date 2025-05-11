#!/bin/bash
echo "Starting NutriSnap development server..."
echo "Make sure you have Node.js and npm installed."
echo "If you haven't installed project dependencies yet, please open a terminal in this folder and run: npm install"
echo ""
echo "The development server will start shortly."
echo "Once started, you can access the website at http://localhost:9002 (or the port shown in the terminal)."
echo "Press Ctrl+C in the terminal window running the server to stop it."
echo ""

# Attempt to run npm run dev
npm run dev

echo ""
echo "Server process has ended."
# Keep the terminal open for a moment if executed by double-click and it failed quickly
# If npm run dev runs successfully, it will keep the terminal open.
# This is a fallback for quick failures when double-clicked.
if [ $? -ne 0 ]; then
  read -p "Press Enter to close this window..."
fi