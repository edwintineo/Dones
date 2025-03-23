import { Link } from 'react-router';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted py-12 mt-16">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">DE</span>
            </div>
            <span className="font-serif text-xl font-bold">Dones Espirituales</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Ayudándote a descubrir y desarrollar tus dones espirituales únicos para una vida llena de propósito.
          </p>
        </div>
        
        <div>
          <h3 className="font-serif text-lg font-semibold mb-4">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            <li>
              <a href="#dones" className="text-sm hover:text-primary">Dones Espirituales</a>
            </li>
            <li>
              <a href="#test" className="text-sm hover:text-primary">Test de Dones</a>
            </li>
            <li>
              <a href="#testimonios" className="text-sm hover:text-primary">Testimonios</a>
            </li>
            <li>
              <a href="#recursos" className="text-sm hover:text-primary">Recursos</a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-serif text-lg font-semibold mb-4">Recursos</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm hover:text-primary">Blog</a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-primary">Podcasts</a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-primary">Eventos</a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-primary">Comunidad</a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-serif text-lg font-semibold mb-4">Conectar</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="hover:text-primary">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="hover:text-primary">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            Suscríbete a nuestro boletín para recibir actualizaciones e ideas.
          </p>
        </div>
      </div>
      
      <div className="container mt-8 pt-8 border-t">
        <p className="text-sm text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} Dones Espirituales. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}