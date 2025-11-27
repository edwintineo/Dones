import { useEffect, useState } from 'react';
import { useTestStore } from '@/store/quiz-store';
import { useUserStore } from '@/store/user-store';
import { generarInsight, Insight } from '@/lib/insights-engine';
import { ResultsChart } from '@/components/dashboard/ResultsChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, BookOpen, Target, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

export function Dashboard() {
    const { resultados, completado } = useTestStore();
    const { name } = useUserStore();
    const [insight, setInsight] = useState<Insight | null>(null);

    useEffect(() => {
        if (completado && resultados.cuadroA.length > 0) {
            setInsight(generarInsight(resultados.cuadroA));
        }
    }, [resultados, completado]);

    if (!completado) {
        return (
            <div className="container py-20 text-center">
                <Card className="max-w-md mx-auto glass-card">
                    <CardHeader>
                        <CardTitle className="font-heading text-2xl">¡Comienza tu Viaje!</CardTitle>
                        <CardDescription>Aún no has completado el test de dones espirituales.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild size="lg" className="w-full rounded-full">
                            <Link to="/#test">Hacer el Test Ahora</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container py-12 space-y-8">
            {/* Header del Dashboard */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="font-heading text-3xl md:text-4xl font-bold">
                        Hola, <span className="text-primary">{name || "Viajero"}</span>
                    </h1>
                    <p className="text-muted-foreground">Bienvenido a tu panel espiritual personal.</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Award className="h-4 w-4" />
                    Certificado Digital
                </Button>
            </div>

            {/* Arquetipo Principal */}
            {insight && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid gap-6 md:grid-cols-3"
                >
                    <Card className="md:col-span-2 glass-card border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-primary mb-2">
                                <Sparkles className="h-5 w-5" />
                                <span className="font-bold text-sm uppercase tracking-wider">Tu Arquetipo Espiritual</span>
                            </div>
                            <CardTitle className="font-heading text-3xl md:text-4xl text-foreground">{insight.arquetipo}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {insight.descripcion}
                            </p>
                            <div className="bg-background/50 p-4 rounded-lg border border-primary/10">
                                <p className="font-medium text-primary flex items-start gap-2">
                                    <Target className="h-5 w-5 shrink-0 mt-0.5" />
                                    {insight.consejo}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="font-heading text-xl">Ministerios Sugeridos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {insight.ministeriosSugeridos.map((ministerio, idx) => (
                                    <li key={idx} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                                        <div className="h-8 w-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
                                            <BookOpen className="h-4 w-4" />
                                        </div>
                                        <span className="font-medium">{ministerio}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button variant="ghost" className="w-full mt-4 gap-2 text-primary hover:text-primary/80">
                                Ver más oportunidades <ArrowRight className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* Gráficos y Detalles */}
            <Tabs defaultValue="grafico" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="grafico">Mapa de Dones</TabsTrigger>
                    <TabsTrigger value="detalles">Detalles Completos</TabsTrigger>
                </TabsList>

                <TabsContent value="grafico" className="mt-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle>Tu Mapa de Dones</CardTitle>
                            <CardDescription>Una visualización de tus fortalezas espirituales</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResultsChart />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="detalles" className="mt-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {resultados.cuadroA.map((don, idx) => (
                            <Card key={idx} className="hover:shadow-md transition-all">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="font-heading text-lg">{don.nombre}</CardTitle>
                                        <span className="font-bold text-primary">{Math.round(don.porcentaje)}%</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Progress value={don.porcentaje} className="h-2 mb-3" />
                                    <p className="text-sm text-muted-foreground line-clamp-3">{don.descripcion}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
