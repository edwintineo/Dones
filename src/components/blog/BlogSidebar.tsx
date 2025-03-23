import { Link } from "react-router";
import { useBlogStore } from "@/store/blog-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatearFecha } from "@/lib/utils";
import { useMemo } from "react";

export function BlogSidebar() {
  const { articulos, categorias, autores } = useBlogStore();
  
  // Obtener los artículos más recientes de forma memoizada
  const articulosRecientes = useMemo(() => {
    return [...articulos]
      .sort((a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime())
      .slice(0, 3);
  }, [articulos]);

  return (
    <div className="space-y-6">
      {/* Buscador */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Buscar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar artículos..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categorías */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Categorías</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {categorias.map((categoria) => (
              <li key={categoria.id}>
                <Link 
                  to={`/blog/categoria/${categoria.slug}`}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {categoria.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Artículos recientes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Artículos recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {articulosRecientes.map((articulo) => (
              <li key={articulo.id} className="border-b pb-3 last:border-0 last:pb-0">
                <Link 
                  to={`/blog/${articulo.slug}`}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {articulo.titulo}
                </Link>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatearFecha(articulo.fechaPublicacion)}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Autores */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Autores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {autores.map((autor) => (
              <Link 
                key={autor.id}
                to={`/blog/autor/${autor.id}`}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
              >
                <img 
                  src={autor.imagen} 
                  alt={autor.nombre} 
                  className="h-8 w-8 rounded-full object-cover"
                  loading="lazy"
                />
                <span className="text-sm">{autor.nombre}</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}