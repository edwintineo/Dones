import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface DonCardProps {
  nombre: string;
  descripcion: string;
  referenciasBiblicas: string;
  icono: string;
}

export function DonCard({ nombre, descripcion, referenciasBiblicas, icono }: DonCardProps) {
  // Obtener dinámicamente el icono de Lucide
  // Corregimos el error de tipado usando una conversión segura
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div className="mb-2 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="font-serif">{nombre}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{descripcion}</p>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground pt-0">
        <p>Referencia: {referenciasBiblicas}</p>
      </CardFooter>
    </Card>
  );
}