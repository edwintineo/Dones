import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Dones', href: '/#dones' },
    { name: 'Test', href: '/#test' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-all duration-300">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="font-heading text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Dones Espirituales
          </span>
        </Link>

        {/* Botón de menú móvil */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Alternar menú</span>
        </Button>

        {/* Navegación de escritorio */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const id = link.href.split('#')[1];
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          ))}
          <Button asChild className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
            <a href="/#test">Descubre tu Don</a>
          </Button>
        </nav>

        {/* Navegación móvil */}
        <div
          className={cn(
            "fixed inset-0 top-[60px] z-40 bg-background/95 backdrop-blur-md md:hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
          )}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    const id = link.href.split('#')[1];
                    setTimeout(() => {
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-2xl font-heading font-bold hover:text-primary transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-heading font-bold hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
            <Button
              size="lg"
              className="w-full max-w-xs rounded-full mt-4"
              onClick={() => {
                setIsMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('test')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
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