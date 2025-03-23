import { useState } from "react";
import { useBlogStore } from "@/store/blog-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AdminCategorias() {
  const { categorias, agregarCategoria, actualizarCategoria, eliminarCategoria } = useBlogStore();
  const { toast } = useToast();
  
  const [modoEdicion, setModoEdicion] = useState(false);
  const [categoriaId, setCategoriaId] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [slug, setSlug] = useState("");
  
  const resetForm = () => {
    setCategoriaId(null);
    setNombre("");
    setSlug("");
    setModoEdicion(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre || !slug) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      return;
    }
    
    if (modoEdicion && categoriaId) {
      actualizarCategoria(categoriaId, {
        nombre,
        slug,
      });
      
      toast({
        title: "Categoría actualizada",
        description: "La categoría ha sido actualizada correctamente",
      });
    } else {
      agregarCategoria({
        nombre,
        slug,
      });
      
      toast({
        title: "Categoría creada",
        description: "La categoría ha sido creada correctamente",
      });
    }
    
    resetForm();
  };
  
  const handleEditar = (id: string) => {
    const categoria = categorias.find(c => c.id === id);
    if (!categoria) return;
    
    setCategoriaId(id);
    setNombre(categoria.nombre);
    setSlug(categoria.slug);
    setModoEdicion(true);
  };
  
  const handleEliminar = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
      eliminarCategoria(id);
      
      toast({
        title: "Categoría eliminada",
        description: "La categoría ha sido eliminada correctamente",
      });
    }
  };
  
  const generarSlug = () => {
    if (!nombre) return;
    
    const slug = nombre
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    setSlug(slug);
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif">
            {modoEdicion ? "Editar categoría" : "Crear nueva categoría"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onBlur={generarSlug}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              {modoEdicion && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
              <Button type="submit">
                {modoEdicion ? "Actualizar categoría" : "Crear categoría"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif">Categorías existentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categorias.map((categoria) => (
                <TableRow key={categoria.id}>
                  <TableCell className="font-medium">{categoria.nombre}</TableCell>
                  <TableCell>{categoria.slug}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditar(categoria.id)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEliminar(categoria.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}