import { useState, useEffect } from 'react';
import { testimonios } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

export function TestimoniosCarousel() {
  const [indiceActivo, setIndiceActivo] = useState(0);

  // Auto-rotar testimonios
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActivo((actual) => (actual + 1) % testimonios.length);
    }, 8000);
    
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="absolute top-6 left-6 md:top-10 md:left-10 opacity-20">
        <Quote className="h-16 w-16 md:h-24 md:w-24 text-primary" />
      </div>
      
      <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-secondary/20">
        <CardContent className="pt-10">
          <div className="relative z-10">
            {testimonios.map((testimonio, index) => (
              <div
                key={testimonio.id}
                className={`transition-opacity duration-500 absolute inset-0 ${
                  index === indiceActivo ? 'opacity-100 z-10' : 'opacity-0 -z-10'
                }`}
              >
                <blockquote className="text-lg md:text-xl italic mb-6 text-center px-4">
                  "{testimonio.testimonio}"
                </blockquote>
                <div className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 mb-3">
                    <AvatarImage src={testimonio.imagen} alt={testimonio.nombre} />
                    <AvatarFallback>{testimonio.nombre.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="font-semibold">{testimonio.nombre}</p>
                    <p className="text-sm text-muted-foreground">Don de {testimonio.don}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Testimonio actual (no-absoluto para dimensionamiento adecuado) */}
            <div className="invisible">
              <blockquote className="text-lg md:text-xl italic mb-6 text-center px-4">
                "{testimonios[indiceActivo].testimonio}"
              </blockquote>
              <div className="flex flex-col items-center">
                <Avatar className="h-16 w-16 mb-3">
                  <AvatarFallback>{testimonios[indiceActivo].nombre.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-semibold">{testimonios[indiceActivo].nombre}</p>
                  <p className="text-sm text-muted-foreground">Don de {testimonios[indiceActivo].don}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navegación por puntos */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonios.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === indiceActivo ? 'w-6 bg-primary' : 'w-2 bg-primary/30'
                }`}
                onClick={() => setIndiceActivo(index)}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}