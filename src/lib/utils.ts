import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatearFecha(fechaStr: string): string {
  try {
    const fecha = new Date(fechaStr);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(fecha);
  } catch (error) {
    console.error("Error al formatear fecha:", error);
    return fechaStr; // Devolver la fecha original si hay error
  }
}

// Función auxiliar para cargar imágenes de forma segura
export function getImageUrl(url: string): string {
  // Si la URL ya es válida, la devolvemos
  if (url && (url.startsWith('http') || url.startsWith('/'))) {
    return url;
  }
  
  // URL de imagen por defecto
  return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop';
}