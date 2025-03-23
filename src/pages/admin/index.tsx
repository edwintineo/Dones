import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { LoginForm } from "@/components/admin/LoginForm";
import { useBlogStore } from "@/store/blog-store";
import { useAuthStore } from "@/lib/auth";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const AdminPage = () => {
  const { isAdmin } = useBlogStore();
  const { isAuthenticated, logout } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    useBlogStore.getState().cerrarSesion();
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container">
          {isAdmin && isAuthenticated ? (
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-serif font-bold">Panel de Administración</h1>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </Button>
              </div>
              <AdminPanel />
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-serif font-bold text-center mb-6">Administración</h1>
              <LoginForm />
            </div>
          )}
        </div>
      </main>
      
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPage;