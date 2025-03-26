#!/bin/bash

# Asegurarse de que estamos usando npm
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"

# Instalar dependencias
npm install

# Construir el proyecto
npm run build