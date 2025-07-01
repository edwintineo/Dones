import { useTestStore, obtenerPreguntasPagina, obtenerTotalPaginas } from '@/store/quiz-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';

const opcionesRespuesta = [
  { valor: 1, texto: "Nunca o muy poco" },
  { valor: 2, texto: "Rara vez" },
  { valor: 3, texto: "A veces" },
  { valor: 4, texto: "Frecuentemente" },
  { valor: 5, texto: "Siempre o completamente de acuerdo" }
];

export function TestDones() {
  const { 
    paginaActual, 
    respuestas, 
    resultados,
    completado,
    responderPregunta, 
    siguientePagina, 
    paginaAnterior,
    reiniciarTest
  } = useTestStore();

  const preguntas = obtenerPreguntasPagina(paginaActual);
  const totalPaginas = obtenerTotalPaginas();
  const progreso = ((paginaActual + 1) / totalPaginas) * 100;

  // Verificar si todas las preguntas de la página actual tienen respuesta
  const todasRespondidas = preguntas.every(pregunta => respuestas[pregunta.indice] > 0);

  if (completado) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-center">Tus Dones Espirituales</CardTitle>
            <CardDescription className="text-center">
              Basado en tus respuestas, estos son tus dones espirituales principales:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <h3 className="font-serif text-xl font-semibold mb-4 text-center">Dones que ya usas:</h3>
              {resultados.cuadroA.length > 0 ? (
                <div className="space-y-6">
                  {resultados.cuadroA.map((don, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-serif text-lg font-semibold">{don.nombre}</h4>
                        <span className="text-sm font-medium bg-primary/10 px-2 py-1 rounded-full">
                          {Math.round(don.porcentaje)}%
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3">{don.descripcion}</p>
                      <Progress value={don.porcentaje} className="h-2" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center">No se identificaron dones principales en esta categoría.</p>
              )}
            </div>
            
            <div className="mb-8">
              <h3 className="font-serif text-xl font-semibold mb-4 text-center">Áreas para desarrollar:</h3>
              {resultados.cuadroC.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
                  {resultados.cuadroC.map((don, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <h4 className="font-medium text-center">{don.nombre}</h4>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center">No se identificaron dones en esta categoría.</p>
              )}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                Recuerda que los dones espirituales están destinados a ser desarrollados y utilizados para servir a otros.
                Considera cómo puedes nutrir y aplicar estos dones en tu comunidad.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={reiniciarTest} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Volver a hacer el Test
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="mb-2">
          <Progress value={progreso} className="h-2" />
        </div>
        <CardTitle className="font-serif text-xl text-center">
          Página {paginaActual + 1} de {totalPaginas}
        </CardTitle>
        <CardDescription className="text-center">
          Responde a las siguientes preguntas según tu experiencia personal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {preguntas.map((pregunta) => (
            <div key={pregunta.indice} className="space-y-3">
              <p className="font-medium text-center">{pregunta.indice + 1}. {pregunta.texto}</p>
              <RadioGroup
                value={respuestas[pregunta.indice]?.toString()}
                onValueChange={(value) => responderPregunta(pregunta.indice, parseInt(value))}
                className="grid grid-cols-1 sm:grid-cols-5 gap-2"
              >
                {opcionesRespuesta.map((opcion) => (
                  <div key={opcion.valor} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value={opcion.valor.toString()} id={`p${pregunta.indice}-o${opcion.valor}`} />
                    <Label htmlFor={`p${pregunta.indice}-o${opcion.valor}`} className="flex-1 cursor-pointer text-sm">
                      {opcion.texto}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={paginaAnterior}
          disabled={paginaActual === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Anterior
        </Button>
        <Button
          onClick={siguientePagina}
          disabled={!todasRespondidas}
          className="flex items-center gap-2"
        >
          {paginaActual === totalPaginas - 1 ? 'Ver Resultados' : 'Siguiente'} <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}