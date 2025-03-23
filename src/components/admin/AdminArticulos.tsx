import { useState } from "react";
import { useBlogStore } from "@/store/blog-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatearFecha } from "@/lib/utils";

export function AdminArticulos() {
  const { articulos, autores, categorias, agregarArticulo, actualizarArticulo, eliminarArticulo } = useBlogStore();
  const { toast } = useToast();
  
  const [modoEdicion, setModoEdicion] = useState(false);
  const [articuloId, setArticuloId] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [slug, setSlug] = useState("");
  const [resumen, setResumen] = useState("");
  const [contenido, setContenido] = useState("");
  const [imagen, setImagen] = useState("");
  const [autorId, setAutorId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [destacado, setDestacado] = useState(false);
  
  const resetForm = () => {
    setArticuloId(null);
    setTitulo("");
    setSlug("");
    setResumen("");
    setContenido("");
    setImagen("");
    setAutorId("");
    setCategoriaId("");
    setDestacado(false);
    setModoEdicion(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titulo || !slug || !resumen || !contenido || !imagen || !autorId || !categoriaId) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      return;
    }
    
    const fechaPublicacion = new Date().toISOString().split('T')[0];
    
    if (modoEdicion && articuloId) {
      actualizarArticulo(articuloId, {
        titulo,
        slug,
        resumen,
        contenido,
        imagen,
        autorId,
        categoriaId,
        destacado,
      });
      
      toast({
        title: "Artículo actualizado",
        description: "El artículo ha sido actualizado correctamente",
      });
    } else {
      agregarArticulo({
        titulo,
        slug,
        resumen,
        contenido,
        imagen,
        fechaPublicacion,
        autorId,
        categoriaId,
        destacado,
      });
      
      toast({
        title: "Artículo creado",
        description: "El artículo ha sido creado correctamente y aparecerá en la página principal si es uno de los 3 más recientes.",
      });
    }
    
    resetForm();
  };
  
  const handleEditar = (id: string) => {
    const articulo = articulos.find(a => a.id === id);
    if (!articulo) return;
    
    setArticuloId(id);
    setTitulo(articulo.titulo);
    setSlug(articulo.slug);
    setResumen(articulo.resumen);
    setContenido(articulo.contenido);
    setImagen(articulo.imagen);
    setAutorId(articulo.autorId);
    setCategoriaId(articulo.categoriaId);
    setDestacado(articulo.destacado);
    setModoEdicion(true);
  };
  
  const handleEliminar = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
      eliminarArticulo(id);
      
      toast({
        title: "Artículo eliminado",
        description: "El artículo ha sido eliminado correctamente",
      });
    }
  };
  
  const generarSlug = () => {
    if (!titulo) return;
    
    const slug = titulo
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    setSlug(slug);
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif">
            {modoEdicion ? "Editar artículo" : "Crear nuevo artículo"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="resumen">Resumen</Label>
              <Textarea
                id="resumen"
                value={resumen}
                onChange={(e) => setResumen(e.target.value)}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contenido">Contenido (Markdown)</Label>
              <Textarea
                id="contenido"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                rows={10}
                className="font-mono text-sm"
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="autor">Autor</Label>
                <Select value={autorId} onValueChange={setAutorId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar autor" />
                  </SelectTrigger>
                  <SelectContent>
                    {autores.map((autor) => (
                      <SelectItem key={autor.id} value={autor.id}>
                        {autor.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría</Label>
                <Select value={categoriaId} onValueChange={setCategoriaId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="destacado"
                checked={destacado}
                onCheckedChange={setDestacado}
              />
              <Label htmlFor="destacado">Artículo destacado</Label>
            </div>
            
            <div className="flex justify-end gap-2">
              {modoEdicion && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
              <Button type="submit">
                {modoEdicion ? "Actualizar artículo" : "Crear artículo"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif">Artículos existentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Destacado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articulos
                .sort((a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime())
                .map((articulo) => {
                  const autor = autores.find(a => a.id === articulo.autorId);
                  const categoria = categorias.find(c => c.id === articulo.categoriaId);
                  
                  return (
                    <TableRow key={articulo.id}>
                      <TableCell className="font-medium">{articulo.titulo}</TableCell>
                      <TableCell>{autor?.nombre || "Desconocido"}</TableCell>
                      <TableCell>{categoria?.nombre || "Sin categoría"}</TableCell>
                      <TableCell>{formatearFecha(articulo.fechaPublicacion)}</TableCell>
                      <TableCell>{articulo.destacado ? "Sí" : "No"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditar(articulo.id)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEliminar(articulo.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}