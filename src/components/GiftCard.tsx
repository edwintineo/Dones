import * as LucideIcons from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DonCardProps {
  nombre: string;
  descripcion: string;
  referenciasBiblicas: string;
  icono: string;
  className?: string;
}

export function DonCard({ nombre, descripcion, referenciasBiblicas, icono, className }: DonCardProps) {
  // Obtener dinámicamente el icono de Lucide
  let IconComponent = LucideIcons.Gift;

  try {
    const iconName = icono.charAt(0).toUpperCase() + icono.slice(1);
    if (iconName in LucideIcons) {
      IconComponent = (LucideIcons as any)[iconName];
    }
  } catch (error) {
    console.error("Error al cargar el icono:", error);
  }

  return (
    <Card className={cn("glass-card border-none overflow-hidden group", className)}>
      <CardHeader className="pb-2">
        <div className="mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="font-heading text-xl group-hover:text-primary transition-colors">{nombre}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{descripcion}</p>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground/80 pt-0 mt-auto">
        <p className="italic">Ref: {referenciasBiblicas}</p>
      </CardFooter>
    </Card>
  );
}