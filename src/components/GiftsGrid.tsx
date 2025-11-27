import { DonCard } from '@/components/GiftCard';
import { donesEspirituales } from '@/lib/data';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function DonesGrid() {
  return (
    <section id="dones" className="py-20 w-full bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Dones Espirituales</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Los dones espirituales son habilidades divinas dadas a los creyentes para servir a otros y edificar la comunidad.
            Cada don tiene un propósito y expresión únicos.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
        >
          {donesEspirituales.map((don) => (
            <motion.div key={don.id} variants={item}>
              <DonCard
                nombre={don.nombre}
                descripcion={don.descripcion}
                referenciasBiblicas={don.referenciasBiblicas}
                icono={don.icono}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}