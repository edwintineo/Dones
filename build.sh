#!/bin/bash

# Este script evita el uso de cualquier gestor de paquetes
# y simplemente copia el archivo HTML estático a la carpeta de salida

# Crear directorio de salida
mkdir -p dist

# Copiar archivo HTML a la carpeta de salida
cp index.html dist/index.html

echo "Build completado con éxito!"
exit 0