import { useState } from 'react';
import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">DE</span>
          </div>
          <span className="font-serif text-xl font-bold">Dones Espirituales</span>
        </Link>

        {/* Botón de menú móvil */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Alternar menú</span>
        </Button>

        {/* Navegación de escritorio */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Inicio
          </Link>
          <a href="/#dones" className="text-sm font-medium hover:text-primary">
            Dones
          </a>
          <a href="/#test" className="text-sm font-medium hover:text-primary">
            Test
          </a>
          <Link to="/blog" className="text-sm font-medium hover:text-primary">
            Blog
          </Link>
          <Link to="/admin" className="text-sm font-medium hover:text-primary">
            Admin
          </Link>
          <Button asChild>
            <a href="/#test">Hacer el Test</a>
          </Button>
        </nav>

        {/* Navegación móvil */}
        <div
          className={cn(
            "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background",
            isMenuOpen ? "slide-in-from-top-2" : "hidden"
          )}
        >
          <div className="relative z-20 grid gap-6 rounded-md p-4">
            <Link 
              to="/" 
              className="flex items-center py-2 text-lg font-semibold hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <a 
              href="/#dones" 
              className="flex items-center py-2 text-lg font-semibold hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Dones
            </a>
            <a 
              href="/#test" 
              className="flex items-center py-2 text-lg font-semibold hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Test
            </a>
            <Link 
              to="/blog" 
              className="flex items-center py-2 text-lg font-semibold hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/admin" 
              className="flex items-center py-2 text-lg font-semibold hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
            <Button 
              className="w-full" 
              onClick={() => {
                document.getElementById('test')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Hacer el Test
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}