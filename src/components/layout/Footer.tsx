import { Link } from 'react-router';
import { Facebook, Instagram, Twitter, Youtube, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/50 pt-16 pb-8 mt-16 border-t">
      <div className="container grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-all duration-300">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="font-heading text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Dones Espirituales
            </span>
          </Link>
          <p className="text-muted-foreground leading-relaxed max-w-xs">
            Ayudándote a descubrir y desarrollar tus dones espirituales únicos para una vida llena de propósito y servicio.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-lg font-bold mb-6">Enlaces Rápidos</h3>
          <ul className="space-y-3">
            <li>
              <a href="#dones" className="text-muted-foreground hover:text-primary transition-colors">Dones Espirituales</a>
            </li>
            <li>
              <a href="#test" className="text-muted-foreground hover:text-primary transition-colors">Test de Dones</a>
            </li>
            <li>
              <a href="#testimonios" className="text-muted-foreground hover:text-primary transition-colors">Testimonios</a>
            </li>
            <li>
              <a href="#recursos" className="text-muted-foreground hover:text-primary transition-colors">Recursos</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg font-bold mb-6">Recursos</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Podcasts</a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Eventos</a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Comunidad</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg font-bold mb-6">Conectar</h3>
          <div className="flex space-x-4 mb-6">
            <a href="#" className="h-10 w-10 rounded-full bg-background border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-background border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-background border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-background border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            Suscríbete a nuestro boletín para recibir actualizaciones e ideas.
          </p>
        </div>
      </div>

      <div className="container pt-8 border-t text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Dones Espirituales. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}