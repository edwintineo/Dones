#!/bin/bash

# Asegurarse de que estamos usando npm, no bun
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"
unset BUN_INSTALL

# Verificar qué herramientas están disponibles
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "PATH: $PATH"

# Instalar dependencias con npm
npm install

# Ejecutar la compilación de TypeScript
npx tsc -b

# Construir con Vite
npx vite build

echo "Build completed successfully!"