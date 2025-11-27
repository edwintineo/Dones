import { useTestStore, obtenerPreguntasPagina, obtenerTotalPaginas } from '@/store/quiz-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';

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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="glass-card border-primary/20 shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="font-heading text-3xl mb-2">¡Test Completado!</CardTitle>
            <CardDescription className="text-lg">
              Aquí están tus resultados y dones espirituales principales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-primary rounded-full" />
                Dones Principales
              </h3>
              {resultados.cuadroA.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {resultados.cuadroA.map((don, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card/50 border rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-heading text-xl font-bold text-primary">{don.nombre}</h4>
                        <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {Math.round(don.porcentaje)}%
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{don.descripcion}</p>
                      <Progress value={don.porcentaje} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center italic">No se identificaron dones principales claros. ¡Sigue explorando!</p>
              )}
            </div>

            <div>
              <h3 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-secondary rounded-full" />
                Áreas para desarrollar
              </h3>
              {resultados.cuadroC.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {resultados.cuadroC.map((don, index) => (
                    <div key={index} className="bg-secondary/10 border border-secondary/20 text-secondary-foreground px-4 py-2 rounded-lg font-medium">
                      {don.nombre}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic">No hay áreas específicas marcadas para desarrollo inmediato.</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pb-8 pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              <Link to="/dashboard">
                <Sparkles className="h-4 w-4" />
                Ver mi Dashboard Espiritual
              </Link>
            </Button>
            <Button onClick={reiniciarTest} variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <RefreshCw className="h-4 w-4" />
              Reiniciar Test
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto glass-card border-none shadow-xl">
      <CardHeader className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-muted-foreground">
            <span>Progreso</span>
            <span>{Math.round(progreso)}%</span>
          </div>
          <Progress value={progreso} className="h-2" />
        </div>
        <div className="text-center space-y-2">
          <CardTitle className="font-heading text-2xl">
            Página {paginaActual + 1} de {totalPaginas}
          </CardTitle>
          <CardDescription>
            Responde con sinceridad según tu experiencia actual
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={paginaActual}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {preguntas.map((pregunta) => (
              <div key={pregunta.indice} className="space-y-4 p-4 rounded-lg hover:bg-muted/30 transition-colors">
                <p className="font-medium text-lg text-center leading-relaxed">
                  <span className="text-primary font-bold mr-2">{pregunta.indice + 1}.</span>
                  {pregunta.texto}
                </p>
                <RadioGroup
                  value={respuestas[pregunta.indice]?.toString()}
                  onValueChange={(value) => responderPregunta(pregunta.indice, parseInt(value))}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-3"
                >
                  {opcionesRespuesta.map((opcion) => (
                    <div key={opcion.valor} className="relative">
                      <RadioGroupItem
                        value={opcion.valor.toString()}
                        id={`p${pregunta.indice}-o${opcion.valor}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`p${pregunta.indice}-o${opcion.valor}`}
                        className={cn(
                          "flex flex-col items-center justify-center h-full p-3 text-center rounded-lg border-2 cursor-pointer transition-all hover:bg-primary/5 hover:border-primary/30",
                          "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary font-medium text-sm"
                        )}
                      >
                        <span className="text-lg font-bold mb-1">{opcion.valor}</span>
                        <span className="text-xs opacity-80">{opcion.texto}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between pt-6">
        <Button
          variant="ghost"
          onClick={paginaAnterior}
          disabled={paginaActual === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Anterior
        </Button>
        <Button
          onClick={siguientePagina}
          disabled={!todasRespondidas}
          className={cn(
            "gap-2 transition-all duration-300",
            todasRespondidas ? "shadow-lg shadow-primary/25" : "opacity-50"
          )}
        >
          {paginaActual === totalPaginas - 1 ? 'Ver Resultados' : 'Siguiente'} <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}