import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Link } from "react-router";
import { ArticuloConRelaciones } from "@/lib/types";
import { formatearFecha, getImageUrl } from "@/lib/utils";
import { useState } from "react";

interface ArticuloCardProps {
  articulo: ArticuloConRelaciones;
  destacado?: boolean;
}

export function ArticuloCard({ articulo, destacado = false }: ArticuloCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Manejo seguro de datos
  const {
    titulo = "Sin título",
    slug = "",
    imagen = "",
    fechaPublicacion = "",
    resumen = "",
    autor = { nombre: "Autor desconocido", imagen: "" },
    categoria = { nombre: "Sin categoría" }
  } = articulo || {};
  
  return (
    <Card className={`overflow-hidden h-full flex flex-col ${destacado ? 'border-primary/50' : ''}`}>
      <div className="h-48 overflow-hidden bg-muted/30 relative">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={getImageUrl(imagen)}
          alt={titulo} 
          className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-1">
          <Badge variant="outline" className="font-normal">
            {categoria.nombre}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {formatearFecha(fechaPublicacion)}
          </div>
        </div>
        <CardTitle className="font-serif line-clamp-2">
          <Link to={`/blog/${slug}`} className="hover:text-primary transition-colors">
            {titulo}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <img 
            src={getImageUrl(autor.imagen)}
            alt={autor.nombre} 
            className="h-6 w-6 rounded-full object-cover"
            loading="lazy"
          />
          <span>{autor.nombre}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{resumen}</p>
      </CardContent>
      <CardFooter>
        <Link 
          to={`/blog/${slug}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Leer más →
        </Link>
      </CardFooter>
    </Card>
  );
}