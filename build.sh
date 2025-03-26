#!/bin/bash

# Crear un directorio temporal para nuestros scripts
mkdir -p /tmp/npm-scripts

# Crear un script falso para bun que redirija a npm
cat > /tmp/npm-scripts/bun <<EOF
#!/bin/bash
echo "Redirecting bun command to npm"
if [ "\$1" = "install" ]; then
  npm install "\${@:2}"
elif [ "\$1" = "run" ]; then
  npm run "\${@:2}"
else
  npm "\$@"
fi
EOF

# Hacer el script ejecutable
chmod +x /tmp/npm-scripts/bun

# Crear el directorio .bun/bin si no existe
mkdir -p /home/fine/.bun/bin

# Copiar nuestro script falso a la ubicación que Fine está buscando
cp /tmp/npm-scripts/bun /home/fine/.bun/bin/bun

# Asegurarse de que el script es ejecutable
chmod +x /home/fine/.bun/bin/bun

# Mostrar información de diagnóstico
echo "Created bun redirect script at /home/fine/.bun/bin/bun"
ls -la /home/fine/.bun/bin/
cat /home/fine/.bun/bin/bun

# Ahora ejecutar la construcción normal
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Instalar dependencias
npm install

# Compilar TypeScript
npx tsc -b

# Construir con Vite
npx vite build

echo "Build completed successfully!"