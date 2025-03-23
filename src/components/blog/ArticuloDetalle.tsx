import { useMemo } from "react";
import { useBlogStore } from "@/store/blog-store";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatearFecha, getImageUrl } from "@/lib/utils";
import { Markdown } from "@/components/blog/Markdown";

interface ArticuloDetalleProps {
  slug: string;
}

export function ArticuloDetalle({ slug }: ArticuloDetalleProps) {
  const { articulos, autores, categorias } = useBlogStore();
  
  // Buscar el artículo por slug
  const articulo = useMemo(() => {
    if (!slug) return null;
    
    const art = articulos.find(a => a.slug === slug);
    if (!art) return null;
    
    const autor = autores.find(a => a.id === art.autorId);
    const categoria = categorias.find(c => c.id === art.categoriaId);
    
    return {
      ...art,
      autor: autor || { id: '', nombre: 'Autor desconocido', imagen: '', bio: '' },
      categoria: categoria || { id: '', nombre: 'Sin categoría', slug: '' }
    };
  }, [slug, articulos, autores, categorias]);
  
  // Si no se encuentra el artículo
  if (!articulo) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-serif mb-4">Artículo no encontrado</h2>
        <Button asChild>
          <Link to="/blog">Volver al blog</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <article className="max-w-3xl mx-auto">
      <Link 
        to="/blog" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver al blog
      </Link>
      
      <div className="mb-8 text-center">
        <Badge variant="outline" className="mb-4">
          {articulo.categoria.nombre}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          {articulo.titulo}
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <img 
              src={getImageUrl(articulo.autor.imagen)}
              alt={articulo.autor.nombre} 
              className="h-8 w-8 rounded-full object-cover"
              loading="lazy"
            />
            <span>{articulo.autor.nombre}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatearFecha(articulo.fechaPublicacion)}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8 aspect-video overflow-hidden rounded-lg">
        <img 
          src={getImageUrl(articulo.imagen)}
          alt={articulo.titulo} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <Markdown content={articulo.contenido || ''} />
      </div>
      
      <div className="mt-12 pt-8 border-t text-center">
        <h3 className="text-lg font-serif mb-4">Sobre el autor</h3>
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
          <img 
            src={getImageUrl(articulo.autor.imagen)}
            alt={articulo.autor.nombre} 
            className="h-16 w-16 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <h4 className="font-medium">{articulo.autor.nombre}</h4>
            <p className="text-sm text-muted-foreground">{articulo.autor.bio}</p>
          </div>
        </div>
      </div>
    </article>
  );
}