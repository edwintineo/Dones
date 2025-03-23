import { useState } from "react";
import { useBlogStore } from "@/store/blog-store";
import { useAuthStore } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Loader2 } from "lucide-react";
import { CaptchaVerification } from "./CaptchaVerification";
import { TwoFactorAuth } from "./TwoFactorAuth";
import { TwoFactorSetup } from "./TwoFactorSetup";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, passwordVerified, captchaVerified, tfaSetupComplete } = useAuthStore();
  const { verifyPassword } = useAuthStore();
  const { iniciarSesion } = useBlogStore();
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const success = verifyPassword(password);
      setIsLoading(false);
      
      if (!success) {
        setPassword("");
      }
    }, 1000);
  };
  
  const handleCaptchaSuccess = () => {
    // Continuar al siguiente paso después de verificar el CAPTCHA
  };
  
  const handleTwoFactorSuccess = () => {
    // Iniciar sesión en el blog después de verificar 2FA
    iniciarSesion("Loslideres001*");
  };
  
  const handleTwoFactorSetupComplete = () => {
    // Continuar al siguiente paso después de configurar 2FA
  };
  
  // Mostrar el formulario de contraseña si no está verificada
  if (!passwordVerified) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif text-center">Acceso Administrativo</CardTitle>
          <CardDescription className="text-center">
            Ingrese su contraseña para acceder al panel de administración
          </CardDescription>
        </CardHeader>
        <form onSubmit={handlePasswordSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                "Continuar"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }
  
  // Mostrar la verificación CAPTCHA si la contraseña está verificada pero el CAPTCHA no
  if (!captchaVerified) {
    return <CaptchaVerification onSuccess={handleCaptchaSuccess} />;
  }
  
  // Mostrar la configuración de 2FA si no está configurada
  if (!tfaSetupComplete) {
    return <TwoFactorSetup onComplete={handleTwoFactorSetupComplete} />;
  }
  
  // Mostrar la autenticación de 2FA si todo lo demás está verificado pero no autenticado
  if (!isAuthenticated) {
    return <TwoFactorAuth onSuccess={handleTwoFactorSuccess} />;
  }
  
  // No debería llegar aquí, pero por si acaso
  return null;
}