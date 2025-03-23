import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from '@/hooks/use-toast';

// Contraseña robusta (esto debería estar en un servidor en producción)
const ADMIN_PASSWORD = "Loslideres001*";

// Clave secreta para 2FA (en producción, esto debería generarse y almacenarse de forma segura)
export const TOTP_SECRET = "JBSWY3DPEHPK3PXP"; // Ejemplo de clave para Google Authenticator

interface AuthState {
  isAuthenticated: boolean;
  captchaVerified: boolean;
  passwordVerified: boolean;
  tfaSetupComplete: boolean;
  tfaEnabled: boolean;
  
  verifyPassword: (password: string) => boolean;
  verifyCaptcha: (token: string) => boolean;
  verifyTOTP: (code: string) => boolean;
  completeTfaSetup: () => void;
  logout: () => void;
  resetAuthState: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      captchaVerified: false,
      passwordVerified: false,
      tfaSetupComplete: false,
      tfaEnabled: false,
      
      verifyPassword: (password: string) => {
        const isValid = password === ADMIN_PASSWORD;
        
        if (isValid) {
          set({ passwordVerified: true });
          return true;
        }
        
        toast({
          title: "Error de autenticación",
          description: "La contraseña es incorrecta",
          variant: "destructive",
        });
        
        return false;
      },
      
      verifyCaptcha: (token: string) => {
        // En un entorno real, verificaríamos el token con el servicio de CAPTCHA
        // Aquí simplemente verificamos que exista un token
        const isValid = !!token;
        
        if (isValid) {
          set({ captchaVerified: true });
          return true;
        }
        
        toast({
          title: "Error de verificación",
          description: "Por favor, complete el CAPTCHA",
          variant: "destructive",
        });
        
        return false;
      },
      
      verifyTOTP: (code: string) => {
        // En un entorno real, verificaríamos el código TOTP con una biblioteca como 'otplib'
        // Aquí simulamos la verificación para fines de demostración
        const isValid = code.length === 6 && !isNaN(Number(code));
        
        if (isValid) {
          set({ isAuthenticated: true });
          return true;
        }
        
        toast({
          title: "Error de verificación",
          description: "El código de autenticación es incorrecto",
          variant: "destructive",
        });
        
        return false;
      },
      
      completeTfaSetup: () => {
        set({ tfaSetupComplete: true, tfaEnabled: true });
      },
      
      logout: () => {
        set({
          isAuthenticated: false,
          captchaVerified: false,
          passwordVerified: false,
        });
      },
      
      resetAuthState: () => {
        set({
          captchaVerified: false,
          passwordVerified: false,
        });
      }
    }),
    {
      name: 'admin-auth-storage',
      partialize: (state) => ({
        tfaSetupComplete: state.tfaSetupComplete,
        tfaEnabled: state.tfaEnabled,
      }),
    }
  )
);