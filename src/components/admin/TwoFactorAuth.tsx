import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export function TwoFactorAuth({ onSuccess }: { onSuccess: () => void }) {
  const { verifyTOTP } = useAuthStore();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (verificationCode.length !== 6 || isNaN(Number(verificationCode))) {
      setError("El código debe tener 6 dígitos");
      return;
    }
    
    setIsLoading(true);
    
    // Simular verificación con el servidor
    setTimeout(() => {
      const success = verifyTOTP(verificationCode);
      setIsLoading(false);
      
      if (success) {
        onSuccess();
      } else {
        setError("El código de verificación es incorrecto");
        setVerificationCode("");
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-serif text-center">Autenticación de Dos Factores</CardTitle>
        <CardDescription className="text-center">
          Ingrese el código de verificación de su aplicación Google Authenticator
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verification-code">Código de verificación</Label>
            <Input
              id="verification-code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Ingrese el código de 6 dígitos"
              maxLength={6}
              required
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
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
              "Verificar"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}