import { useState } from "react";
import { useBlogStore } from "@/store/blog-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AdminAutores() {
  const { autores, agregarAutor, actualizarAutor, eliminarAutor } = useBlogStore();
  const { toast } = useToast();
  
  const [modoEdicion, setModoEdicion] = useState(false);
  const [autorId, setAutorId] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");
  const [bio, setBio] = useState("");
  
  const resetForm = () => {
    setAutorId(null);
    setNombre("");
    setImagen("");
    setBio("");
    setModoEdicion(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre || !imagen || !bio) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      return;
    }
    
    if (modoEdicion && autorId) {
      actualizarAutor(autorId, {
        nombre,
        imagen,
        bio,
      });
      
      toast({
        title: "Autor actualizado",
        description: "El autor ha sido actualizado correctamente",
      });
    } else {
      agregarAutor({
        nombre,
        imagen,
        bio,
      });
      
      toast({
        title: "Autor creado",
        description: "El autor ha sido creado correctamente",
      });
    }
    
    resetForm();
  };
  
  const handleEditar = (id: string) => {
    const autor = autores.find(a => a.id === id);
    if (!autor) return;
    
    setAutorId(id);
    setNombre(autor.nombre);
    setImagen(autor.imagen);
    setBio(autor.bio);
    setModoEdicion(true);
  };
  
  const handleEliminar = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este autor?")) {
      eliminarAutor(id);
      
      toast({
        title: "Autor eliminado",
        description: "El autor ha sido eliminado correctamente",
      });
    }
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif">
            {modoEdicion ? "Editar autor" : "Crear nuevo autor"}
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
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imagen">URL de la imagen</Label>
              <Input
                id="imagen"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Biografía</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              {modoEdicion && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
              <Button type="submit">
                {modoEdicion ? "Actualizar autor" : "Crear autor"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif">Autores existentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Biografía</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {autores.map((autor) => (
                <TableRow key={autor.id}>
                  <TableCell>
                    <img 
                      src={autor.imagen} 
                      alt={autor.nombre} 
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{autor.nombre}</TableCell>
                  <TableCell className="max-w-xs truncate">{autor.bio}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditar(autor.id)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEliminar(autor.id)}
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