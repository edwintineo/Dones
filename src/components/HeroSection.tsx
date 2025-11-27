import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  const scrollToDones = () => {
    document.getElementById('dones')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden w-full pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container flex flex-col items-center relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Descubre tu propósito divino</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Descubre tus <br />
            <span className="text-gradient">Dones Espirituales</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl mb-10 text-muted-foreground max-w-2xl mx-auto"
          >
            Explora las habilidades únicas que te han sido otorgadas para servir, crecer y transformar tu entorno.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" onClick={scrollToDones} className="h-12 px-8 rounded-full text-lg shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all duration-300">
              Explorar Dones
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-8 rounded-full text-lg border-2 hover:bg-secondary/10 hover:border-secondary hover:text-secondary transition-all duration-300">
              <a href="#test">Hacer el Test</a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <Button variant="ghost" size="icon" onClick={scrollToDones} className="rounded-full hover:bg-primary/10">
            <ArrowDown className="h-6 w-6 text-primary" />
            <span className="sr-only">Desplazar hacia abajo</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}