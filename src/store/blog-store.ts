import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Articulo, Autor, Categoria } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { datosInicialesBlog } from '@/lib/blog-data';

interface BlogState {
  articulos: Articulo[];
  autores: Autor[];
  categorias: Categoria[];
  isAdmin: boolean;
  adminPassword: string;
  
  // Acciones para artículos
  agregarArticulo: (articulo: Omit<Articulo, 'id'>) => string;
  actualizarArticulo: (id: string, articulo: Partial<Articulo>) => void;
  eliminarArticulo: (id: string) => void;
  obtenerArticuloPorSlug: (slug: string) => Articulo | undefined;
  obtenerArticulosDestacados: () => Articulo[];
  obtenerArticulosPorCategoria: (categoriaId: string) => Articulo[];
  
  // Acciones para autores
  agregarAutor: (autor: Omit<Autor, 'id'>) => string;
  actualizarAutor: (id: string, autor: Partial<Autor>) => void;
  eliminarAutor: (id: string) => void;
  
  // Acciones para categorías
  agregarCategoria: (categoria: Omit<Categoria, 'id'>) => string;
  actualizarCategoria: (id: string, categoria: Partial<Categoria>) => void;
  eliminarCategoria: (id: string) => void;
  
  // Autenticación
  iniciarSesion: (password: string) => boolean;
  cerrarSesion: () => void;
}

// Crear el store con persistencia
export const useBlogStore = create<BlogState>()(
  persist(
    (set, get) => ({
      articulos: datosInicialesBlog.articulos,
      autores: datosInicialesBlog.autores,
      categorias: datosInicialesBlog.categorias,
      isAdmin: false,
      adminPassword: 'Loslideres001*', // Contraseña actualizada
      
      // Acciones para artículos
      agregarArticulo: (articulo) => {
        const id = uuidv4();
        set((state) => ({
          articulos: [...state.articulos, { ...articulo, id }]
        }));
        return id;
      },
      
      actualizarArticulo: (id, articulo) => {
        set((state) => ({
          articulos: state.articulos.map((a) => 
            a.id === id ? { ...a, ...articulo } : a
          )
        }));
      },
      
      eliminarArticulo: (id) => {
        set((state) => ({
          articulos: state.articulos.filter((a) => a.id !== id)
        }));
      },
      
      obtenerArticuloPorSlug: (slug) => {
        return get().articulos.find((a) => a.slug === slug);
      },
      
      obtenerArticulosDestacados: () => {
        return get().articulos.filter((a) => a.destacado);
      },
      
      obtenerArticulosPorCategoria: (categoriaId) => {
        return get().articulos.filter((a) => a.categoriaId === categoriaId);
      },
      
      // Acciones para autores
      agregarAutor: (autor) => {
        const id = uuidv4();
        set((state) => ({
          autores: [...state.autores, { ...autor, id }]
        }));
        return id;
      },
      
      actualizarAutor: (id, autor) => {
        set((state) => ({
          autores: state.autores.map((a) => 
            a.id === id ? { ...a, ...autor } : a
          )
        }));
      },
      
      eliminarAutor: (id) => {
        set((state) => ({
          autores: state.autores.filter((a) => a.id !== id)
        }));
      },
      
      // Acciones para categorías
      agregarCategoria: (categoria) => {
        const id = uuidv4();
        set((state) => ({
          categorias: [...state.categorias, { ...categoria, id }]
        }));
        return id;
      },
      
      actualizarCategoria: (id, categoria) => {
        set((state) => ({
          categorias: state.categorias.map((c) => 
            c.id === id ? { ...c, ...categoria } : c
          )
        }));
      },
      
      eliminarCategoria: (id) => {
        set((state) => ({
          categorias: state.categorias.filter((c) => c.id !== id)
        }));
      },
      
      // Autenticación
      iniciarSesion: (password) => {
        if (password === get().adminPassword) {
          set({ isAdmin: true });
          return true;
        }
        return false;
      },
      
      cerrarSesion: () => {
        set({ isAdmin: false });
      }
    }),
    {
      name: 'blog-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        articulos: state.articulos,
        autores: state.autores,
        categorias: state.categorias
      }),
      version: 1,
    }
  )
);