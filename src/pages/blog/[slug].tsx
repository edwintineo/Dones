import { useParams } from "react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { ArticuloDetalle } from "@/components/blog/ArticuloDetalle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useEffect } from "react";

const ArticuloPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Asegurarse de que la página se cargue desde el principio al cambiar de artículo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <ArticuloDetalle slug={slug || ""} />
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

export default ArticuloPage;