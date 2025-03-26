#!/bin/bash

# Imprimir información de diagnóstico
echo "Current directory: $(pwd)"
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Instalar dependencias usando npm directamente
echo "Installing dependencies..."
npm install

# Construir el proyecto usando npm directamente
echo "Building project..."
npm exec -- vite build

# Verificar si la construcción fue exitosa
if [ $? -eq 0 ]; then
  echo "Build successful!"
  exit 0
else
  echo "Build failed!"
  exit 1
fi