const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  
  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dones Espirituales</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      text-align: center;
    }
    .container {
      max-width: 800px;
      padding: 2rem;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #4a5568;
      margin-bottom: 1rem;
    }
    p {
      color: #718096;
      margin-bottom: 2rem;
      line-height: 1.6;
    }
    .message {
      margin-top: 2rem;
      padding: 1rem;
      background-color: #ebf8ff;
      border-left: 4px solid #4299e1;
      color: #2c5282;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Dones Espirituales</h1>
    <p>Descubre y desarrolla tus dones espirituales para servir mejor en tu comunidad de fe.</p>
    
    <div class="message">
      <p>Estamos trabajando en mejorar este sitio. Pronto estará disponible con todas las funcionalidades.</p>
      <p>Por favor, vuelve más tarde para descubrir tus dones espirituales a través de nuestro test interactivo.</p>
    </div>
  </div>
</body>
</html>
  `;
  
  res.end(html);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});