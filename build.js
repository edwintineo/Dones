// Script de construcción personalizado para evitar problemas con Bun
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Directorio de salida
const outDir = path.join(__dirname, 'dist');

// Crear una página HTML estática simple
function createStaticPage() {
  console.log('Creando página HTML estática...');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dones Espirituales</title>
  <style>
    :root {
      --primary: #4c51bf;
      --primary-hover: #434190;
      --text: #4a5568;
      --text-secondary: #718096;
      --background: #f7fafc;
      --card: #ffffff;
      --border: #e2e8f0;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: var(--background);
      color: var(--text);
      line-height: 1.6;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    header {
      background-color: var(--card);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 10;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary);
      text-decoration: none;
    }
    
    nav ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    nav ul li {
      margin-left: 1.5rem;
    }
    
    nav ul li a {
      color: var(--text);
      text-decoration: none;
      transition: color 0.3s;
    }
    
    nav ul li a:hover {
      color: var(--primary);
    }
    
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;
    }
    
    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .hero p {
      font-size: 1.25rem;
      max-width: 800px;
      margin: 0 auto 2rem;
    }
    
    .btn {
      display: inline-block;
      background-color: var(--primary);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      text-decoration: none;
      font-weight: 600;
      transition: background-color 0.3s;
    }
    
    .btn:hover {
      background-color: var(--primary-hover);
    }
    
    .section {
      padding: 4rem 0;
    }
    
    .section-title {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .section-title h2 {
      font-size: 2rem;
      color: var(--text);
    }
    
    .section-title p {
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto;
    }
    
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .card {
      background-color: var(--card);
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }
    
    .card-content {
      padding: 1.5rem;
    }
    
    .card h3 {
      margin-top: 0;
      color: var(--text);
    }
    
    .card p {
      color: var(--text-secondary);
    }
    
    .message {
      margin: 2rem 0;
      padding: 1rem;
      background-color: #ebf8ff;
      border-left: 4px solid #4299e1;
      color: #2c5282;
    }
    
    footer {
      background-color: #2d3748;
      color: white;
      padding: 2rem 0;
      text-align: center;
    }
    
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        padding: 1rem;
      }
      
      nav ul {
        margin-top: 1rem;
      }
      
      nav ul li {
        margin-left: 1rem;
        margin-right: 1rem;
      }
      
      .hero h1 {
        font-size: 2rem;
      }
      
      .cards {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="header-content">
        <a href="#" class="logo">Dones Espirituales</a>
        <nav>
          <ul>
            <li><a href="#dones">Dones</a></li>
            <li><a href="#test">Test</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Descubre tus Dones Espirituales</h1>
      <p>Explora y desarrolla los dones que te han sido otorgados para servir a otros y cumplir tu propósito divino.</p>
      <a href="#test" class="btn">Hacer el Test</a>
    </div>
  </section>

  <section id="dones" class="section">
    <div class="container">
      <div class="section-title">
        <h2>Dones Espirituales</h2>
        <p>Los dones espirituales son habilidades divinas dadas a los creyentes para servir a otros y edificar la comunidad.</p>
      </div>
      
      <div class="cards">
        <div class="card">
          <div class="card-content">
            <h3>Administración</h3>
            <p>La capacidad de organizar tareas y personas para lograr objetivos en la obra de Dios.</p>
          </div>
        </div>
        
        <div class="card">
          <div class="card-content">
            <h3>Exhortación</h3>
            <p>La habilidad de animar, consolar y motivar a otros a vivir una vida cristiana plena.</p>
          </div>
        </div>
        
        <div class="card">
          <div class="card-content">
            <h3>Evangelismo</h3>
            <p>La capacidad de comunicar el mensaje de salvación a los no creyentes de manera efectiva.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="test" class="section" style="background-color: #f8fafc;">
    <div class="container">
      <div class="section-title">
        <h2>Test de Dones Espirituales</h2>
        <p>Realiza nuestro test para descubrir tus dones espirituales y cómo puedes desarrollarlos.</p>
      </div>
      
      <div class="message">
        <p>Estamos trabajando en implementar el test completo. ¡Vuelve pronto para descubrir tus dones espirituales!</p>
      </div>
      
      <div style="text-align: center; margin-top: 2rem;">
        <a href="#" class="btn">Próximamente</a>
      </div>
    </div>
  </section>

  <section id="blog" class="section">
    <div class="container">
      <div class="section-title">
        <h2>Blog</h2>
        <p>Artículos y recursos sobre dones espirituales y crecimiento en la fe.</p>
      </div>
      
      <div class="cards">
        <div class="card">
          <div class="card-content">
            <h3>Cómo identificar y desarrollar tu don de enseñanza</h3>
            <p>Descubre las características del don de enseñanza y cómo puedes desarrollarlo para servir mejor en tu comunidad.</p>
            <a href="#" style="color: var(--primary);">Leer más →</a>
          </div>
        </div>
        
        <div class="card">
          <div class="card-content">
            <h3>Mi experiencia descubriendo mi don de misericordia</h3>
            <p>Un testimonio personal sobre cómo el descubrimiento del don de misericordia transformó mi vida y ministerio.</p>
            <a href="#" style="color: var(--primary);">Leer más →</a>
          </div>
        </div>
        
        <div class="card">
          <div class="card-content">
            <h3>5 ejercicios prácticos para desarrollar tu don de liderazgo</h3>
            <p>Actividades concretas que puedes implementar para fortalecer y desarrollar tu don de liderazgo espiritual.</p>
            <a href="#" style="color: var(--primary);">Leer más →</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Dones Espirituales. Todos los derechos reservados.</p>
    </div>
  </footer>
</body>
</html>
  `;
  
  fs.writeFileSync(path.join(outDir, 'index.html'), htmlContent);
  console.log('Página HTML estática creada con éxito.');
}

// Función principal
function build() {
  try {
    console.log('Iniciando proceso de construcción...');
    
    // Crear directorio de salida si no existe
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    
    // Crear página HTML estática
    createStaticPage();
    
    console.log('Construcción completada con éxito.');
  } catch (error) {
    console.error('Error durante la construcción:', error);
    process.exit(1);
  }
}

// Ejecutar la construcción
build();