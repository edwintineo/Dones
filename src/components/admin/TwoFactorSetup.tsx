import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore, TOTP_SECRET } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export function TwoFactorSetup({ onComplete }: { onComplete: () => void }) {
  const { completeTfaSetup } = useAuthStore();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Generar la URL para Google Authenticator
  const otpAuthUrl = `otpauth://totp/DonesEspirituales:Admin?secret=${TOTP_SECRET}&issuer=DonesEspirituales`;
  
  // URL para generar un código QR usando una API externa (Google Charts API)
  const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(otpAuthUrl)}`;

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
      // En un entorno real, verificaríamos el código TOTP con una biblioteca como 'otplib'
      // Aquí simulamos la verificación para fines de demostración
      const isValid = verificationCode.length === 6 && !isNaN(Number(verificationCode));
      
      setIsLoading(false);
      
      if (isValid) {
        completeTfaSetup();
        onComplete();
      } else {
        setError("El código de verificación es incorrecto");
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-serif text-center">Configurar Autenticación de Dos Factores</CardTitle>
        <CardDescription className="text-center">
          Escanee el código QR con Google Authenticator para configurar la autenticación de dos factores
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-white rounded-lg">
              <img 
                src={qrCodeUrl} 
                alt="Código QR para Google Authenticator" 
                width={200} 
                height={200} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secret-key">Clave secreta (si no puede escanear el código QR)</Label>
            <div className="flex">
              <Input
                id="secret-key"
                value={TOTP_SECRET}
                readOnly
                className="font-mono"
              />
              <Button
                type="button"
                variant="outline"
                className="ml-2"
                onClick={() => {
                  navigator.clipboard.writeText(TOTP_SECRET);
                }}
              >
                Copiar
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="verification-code">Código de verificación</Label>
            <Input
              id="verification-code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Ingrese el código de 6 dígitos"
              maxLength={6}
              required
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
              "Verificar y activar"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}