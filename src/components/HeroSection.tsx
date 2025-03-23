import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const scrollToDones = () => {
    document.getElementById('dones')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden w-full">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sacred-geometry" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <line x1="2" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="0.5" />
              <line x1="20" y1="2" x2="20" y2="38" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sacred-geometry)" />
        </svg>
      </div>

      <div className="container flex flex-col items-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-blue-500 bg-clip-text text-transparent">
            Descubre tus Dones Espirituales
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Descubre las habilidades divinas que te han sido otorgadas para servir a otros y cumplir tu propósito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={scrollToDones}>
              Explorar Dones
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#test">Hacer el Test</a>
            </Button>
          </div>
        </div>

        <div className="mt-16 flex justify-center animate-bounce">
          <Button variant="ghost" size="icon" onClick={scrollToDones}>
            <ArrowDown className="h-6 w-6" />
            <span className="sr-only">Desplazar hacia abajo</span>
          </Button>
        </div>
      </div>
    </section>
  );
}