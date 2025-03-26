#!/bin/bash

# Imprimir información de diagnóstico
echo "Current directory: $(pwd)"
echo "PATH: $PATH"
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Instalar dependencias con npm
npm install

# Construir el proyecto con npm
npm run vite-build

# Verificar el resultado
if [ $? -eq 0 ]; then
  echo "Build completed successfully!"
  exit 0
else
  echo "Build failed!"
  exit 1
fi