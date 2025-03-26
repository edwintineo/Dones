// Script de construcción personalizado para Fine
const { execSync } = require('child_process');
const path = require('path');

console.log('Iniciando proceso de construcción personalizado...');

try {
  // Ejecutar TypeScript
  console.log('Compilando TypeScript...');
  execSync('node ./node_modules/typescript/bin/tsc', { stdio: 'inherit' });
  
  // Ejecutar Vite build
  console.log('Ejecutando Vite build...');
  execSync('node ./node_modules/vite/bin/vite.js build', { stdio: 'inherit' });
  
  console.log('Construcción completada con éxito!');
} catch (error) {
  console.error('Error durante la construcción:', error.message);
  process.exit(1);
}