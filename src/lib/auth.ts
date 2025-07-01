import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from '@/hooks/use-toast';

// ADVERTENCIA DE SEGURIDAD: En un entorno de producción, la autenticación debe ser manejada por un backend seguro.
// Las credenciales y la lógica de verificación NO deben estar hardcodeadas en el frontend.
// Esta implementación es solo para fines de demostración local sin backend.
const ADMIN_PASSWORD = "Loslideres001*"; // Esto DEBE ser gestionado por un backend

// ADVERTENCIA DE SEGURIDAD: La clave secreta para 2FA (TOTP_SECRET) NO debe estar hardcodeada en el frontend.
// En producción, esto DEBE generarse y almacenarse de forma segura en el backend y ser gestionado por el servidor.
export const TOTP_SECRET = "JBSWY3DPEHPK3PXP"; // Ejemplo de clave para Google Authenticator (solo para demostración)

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
        // ADVERTENCIA DE SEGURIDAD: En un entorno real de producción, la verificación del CAPTCHA
        // DEBE realizarse en el backend para evitar manipulaciones del cliente.
        // Aquí simplemente verificamos que exista un token para fines de demostración.
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
        // ADVERTENCIA DE SEGURIDAD: En un entorno real de producción, la verificación del código TOTP
        // DEBE realizarse en el backend utilizando una biblioteca segura (ej. 'otplib').
        // Aquí simulamos la verificación para fines de demostración.
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