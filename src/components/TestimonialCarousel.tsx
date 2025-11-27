import { useState, useEffect } from 'react';
import { testimonios } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <div className="absolute top-0 left-0 md:-left-12 opacity-10">
        <Quote className="h-24 w-24 md:h-32 md:w-32 text-primary rotate-180" />
      </div>

      <Card className="glass-card border-none shadow-xl bg-gradient-to-br from-white/40 to-white/10 dark:from-black/40 dark:to-black/10 backdrop-blur-md">
        <CardContent className="pt-12 pb-12 px-6 md:px-12 min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={indiceActivo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-foreground/90">
                "{testimonios[indiceActivo].testimonio}"
              </blockquote>

              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-sm opacity-50" />
                  <Avatar className="h-20 w-20 border-2 border-background relative">
                    <AvatarImage src={testimonios[indiceActivo].imagen} alt={testimonios[indiceActivo].nombre} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                      {testimonios[indiceActivo].nombre.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="text-center">
                  <h4 className="font-heading text-lg font-bold">{testimonios[indiceActivo].nombre}</h4>
                  <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mt-2 inline-block">
                    Don de {testimonios[indiceActivo].don}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navegación por puntos */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonios.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${index === indiceActivo ? 'w-8 bg-primary' : 'w-2 bg-primary/20 hover:bg-primary/40'
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