import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/HeroSection";
import { DonesGrid } from "@/components/GiftsGrid";
import { TestDones } from "@/components/TestDones";
import { TestimoniosCarousel } from "@/components/TestimonialCarousel";
import { ArticuloCard } from "@/components/blog/ArticuloCard";
import { useBlogStore } from "@/store/blog-store";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useMemo } from "react";
import { ArticuloConRelaciones } from "@/lib/types";

const Index = () => {
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
  
  // Obtener los 3 artículos más recientes para mostrar en la página principal
  const articulosRecientes = useMemo(() => {
    return [...articulosConRelaciones]
      .sort((a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime())
      .slice(0, 3);
  }, [articulosConRelaciones]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex flex-col items-center w-full">
        {/* Sección Hero */}
        <HeroSection />
        
        {/* Sección de Dones */}
        <DonesGrid />
        
        {/* Sección del Test */}
        <section id="test" className="py-16 bg-muted/50 w-full">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Descubre tus Dones</h2>
              <p className="text-lg text-muted-foreground">
                Realiza este test para identificar tus dones espirituales principales y aprender cómo desarrollarlos.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <TestDones />
            </div>
          </div>
        </section>
        
        {/* Sección de Artículos del Blog */}
        <section id="recursos" className="py-16 w-full">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Artículos Recientes</h2>
              <p className="text-lg text-muted-foreground">
                Explora nuestros últimos artículos sobre dones espirituales y crecimiento en la fe.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
              {articulosRecientes.length > 0 ? (
                articulosRecientes.map(articulo => (
                  <ArticuloCard key={articulo.id} articulo={articulo} />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-muted-foreground mb-4">No hay artículos disponibles actualmente.</p>
                </div>
              )}
            </div>
            
            <div className="mt-10 text-center">
              <Button asChild size="lg" className="flex items-center gap-2">
                <Link to="/blog">
                  <BookOpen className="h-5 w-5" />
                  Ver todos los artículos
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Sección de Testimonios */}
        <section id="testimonios" className="py-16 bg-muted/50 w-full">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Testimonios</h2>
              <p className="text-lg text-muted-foreground">
                Escucha las experiencias de otros que han descubierto y desarrollado sus dones espirituales.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <TestimoniosCarousel />
            </div>
          </div>
        </section>
        
        {/* Llamada a la Acción */}
        <section className="py-16 bg-primary text-primary-foreground w-full">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Comienza tu Viaje</h2>
              <p className="text-xl mb-8">
                Empieza a desarrollar tus dones espirituales hoy y descubre tu propósito divino.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#test" className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-medium">
                  Hacer el Test
                </a>
                <Link to="/blog" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border border-primary-foreground/20 px-6 py-3 rounded-md font-medium">
                  Leer el Blog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;