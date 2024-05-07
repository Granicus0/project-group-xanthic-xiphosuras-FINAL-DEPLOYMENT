@echo off

:: **Project-Level Installations**
echo Installing project-wide dependencies...
npm install

echo Installing Tailwind CSS dependencies...
npm install -D tailwindcss postcss autoprefixer

echo Initializing Tailwind CSS configuration...
npx tailwindcss init -p

:: **MERN Subdirectory Installations**
echo Installing dependencies in the 'mern' directory...
cd mern
npm install

echo Installing dependencies in the 'server' directory...
cd server
npm install
cd ..

echo Installing dependencies in the 'client' directory...
cd client
npm install
cd ..

echo Setup Complete!
