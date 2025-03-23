// Tipos para el blog
export interface Autor {
  id: string;
  nombre: string;
  imagen: string;
  bio: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  slug: string;
}

export interface Articulo {
  id: string;
  titulo: string;
  slug: string;
  resumen: string;
  contenido: string;
  imagen: string;
  fechaPublicacion: string;
  autorId: string;
  categoriaId: string;
  destacado: boolean;
}

export interface ArticuloConRelaciones extends Articulo {
  autor: Autor;
  categoria: Categoria;
}