import { useState } from "react";
import { useBlogStore } from "@/store/blog-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminArticulos } from "./AdminArticulos";
import { AdminAutores } from "./AdminAutores";
import { AdminCategorias } from "./AdminCategorias";

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState("articulos");
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="articulos">Artículos</TabsTrigger>
          <TabsTrigger value="autores">Autores</TabsTrigger>
          <TabsTrigger value="categorias">Categorías</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articulos">
          <AdminArticulos />
        </TabsContent>
        
        <TabsContent value="autores">
          <AdminAutores />
        </TabsContent>
        
        <TabsContent value="categorias">
          <AdminCategorias />
        </TabsContent>
      </Tabs>
    </div>
  );
}