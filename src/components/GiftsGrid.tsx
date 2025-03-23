import { DonCard } from '@/components/GiftCard';
import { donesEspirituales } from '@/lib/data';

export function DonesGrid() {
  return (
    <section id="dones" className="py-16 w-full">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Dones Espirituales</h2>
          <p className="text-lg text-muted-foreground">
            Los dones espirituales son habilidades divinas dadas a los creyentes para servir a otros y edificar la comunidad.
            Cada don tiene un propósito y expresión únicos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {donesEspirituales.map((don) => (
            <DonCard
              key={don.id}
              nombre={don.nombre}
              descripcion={don.descripcion}
              referenciasBiblicas={don.referenciasBiblicas}
              icono={don.icono}
            />
          ))}
        </div>
      </div>
    </section>
  );
}