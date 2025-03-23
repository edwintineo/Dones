import { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { ArticuloCard } from "@/components/blog/ArticuloCard";
import { useBlogStore } from "@/store/blog-store";
import { ArticuloConRelaciones } from "@/lib/types";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const BlogPage = () => {
  const { articulos, autores, categorias } = useBlogStore();
  
  // Preparar los artículos con sus relaciones
  const articulosConRelaciones = useMemo(() => {
    const result: ArticuloConRelaciones[] = [];
    
    for (const articulo of articulos) {
      const autor = autores.find(a => a.id === articulo.autorId);
      const categoria = categorias.find(c => c.id === articulo.categoriaId);
      
      if (autor && categoria) {
        result.push({
          ...articulo,
          autor,
          categoria
        });
      }
    }
    
    return result;
  }, [articulos, autores, categorias]);
  
  // Ordenar artículos por fecha (más recientes primero)
  const articulosOrdenados = useMemo(() => {
    return [...articulosConRelaciones].sort(
      (a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime()
    );
  }, [articulosConRelaciones]);
  
  // Separar artículos destacados
  const articulosDestacados = useMemo(() => {
    return articulosOrdenados.filter(a => a.destacado);
  }, [articulosOrdenados]);
  
  const articulosRegulares = useMemo(() => {
    return articulosOrdenados.filter(a => !a.destacado);
  }, [articulosOrdenados]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Artículos y recursos sobre dones espirituales y crecimiento en la fe
            </p>
          </div>
          
          {articulosDestacados.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-semibold mb-6 text-center">Artículos destacados</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {articulosDestacados.map(articulo => (
                  <ArticuloCard key={articulo.id} articulo={articulo} destacado />
                ))}
              </div>
            </section>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-semibold mb-6 text-center lg:text-left">Artículos recientes</h2>
              {articulosRegulares.length > 0 ? (
                <div className="grid gap-8">
                  {articulosRegulares.map(articulo => (
                    <ArticuloCard key={articulo.id} articulo={articulo} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center">No hay artículos disponibles.</p>
              )}
            </div>
            
            <div>
              <BlogSidebar />
            </div>
          </div>
        </div>
      </main>
      
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPage;