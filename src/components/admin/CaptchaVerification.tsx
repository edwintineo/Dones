import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/lib/auth";
import { Loader2, RefreshCw } from "lucide-react";

// Simulación simple de CAPTCHA
const generateCaptchaText = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export function CaptchaVerification({ onSuccess }: { onSuccess: () => void }) {
  const { verifyCaptcha } = useAuthStore();
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const regenerateCaptcha = () => {
    const newCaptchaText = generateCaptchaText();
    setCaptchaText(newCaptchaText);
    drawCaptcha(newCaptchaText);
  };

  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fondo
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Líneas de ruido
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(0, 0, 0, 0.2)`;
      ctx.stroke();
    }
    
    // Texto
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Dibujar cada carácter con ligera rotación
    const chars = text.split('');
    const charWidth = canvas.width / (chars.length + 1);
    
    chars.forEach((char, i) => {
      const x = (i + 1) * charWidth;
      const y = canvas.height / 2 + (Math.random() * 10 - 5);
      const rotation = Math.random() * 0.4 - 0.2; // Rotación entre -0.2 y 0.2 radianes
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
    
    // Puntos de ruido
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        2,
        2
      );
    }
  };

  useEffect(() => {
    regenerateCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (userInput.toLowerCase() !== captchaText.toLowerCase()) {
      setError('El texto CAPTCHA no coincide. Inténtelo de nuevo.');
      regenerateCaptcha();
      setUserInput('');
      return;
    }
    
    setIsLoading(true);
    
    // Simular verificación con el servidor
    setTimeout(() => {
      const success = verifyCaptcha(captchaText);
      setIsLoading(false);
      
      if (success) {
        onSuccess();
      } else {
        setError('Error al verificar el CAPTCHA. Inténtelo de nuevo.');
        regenerateCaptcha();
        setUserInput('');
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-serif text-center">Verificación CAPTCHA</CardTitle>
        <CardDescription className="text-center">
          Por favor, ingrese los caracteres que ve en la imagen
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-full h-16 bg-gray-100 rounded-md overflow-hidden">
              <canvas 
                ref={canvasRef} 
                width={280} 
                height={80} 
                className="w-full h-full"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1"
                onClick={regenerateCaptcha}
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Regenerar CAPTCHA</span>
              </Button>
            </div>
            
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ingrese el texto del CAPTCHA"
              required
            />
            
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
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