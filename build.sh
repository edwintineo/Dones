#!/bin/bash

# Este script simplemente copia el archivo HTML estático a la carpeta de salida
# sin necesidad de ninguna herramienta de compilación

# Crear directorio de salida
mkdir -p dist

# Copiar archivo HTML a la carpeta de salida
cp index.html dist/index.html

echo "Build completado con éxito!"
exit 0