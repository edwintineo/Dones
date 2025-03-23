import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, FileText, Video } from 'lucide-react';

interface RecursoCardProps {
  titulo: string;
  tipo: string;
  descripcion: string;
  enlace: string;
  imagen: string;
}

export function RecursoCard({ titulo, tipo, descripcion, enlace, imagen }: RecursoCardProps) {
  const getIcon = () => {
    switch (tipo) {
      case 'Libro':
        return <Book className="h-5 w-5" />;
      case 'Video':
        return <Video className="h-5 w-5" />;
      case 'Artículo':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={imagen} 
          alt={titulo} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-primary/10 p-1 rounded-md">
            {getIcon()}
          </div>
          <CardDescription>{tipo}</CardDescription>
        </div>
        <CardTitle className="font-serif">{titulo}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{descripcion}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <a href={enlace}>Saber Más</a>
        </Button>
      </CardFooter>
    </Card>
  );
}