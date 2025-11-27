import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { useTestStore } from '@/store/quiz-store';

export function ResultsChart() {
    const { resultados } = useTestStore();

    // Preparar datos para el gráfico (top 5 o todos si son pocos)
    const data = resultados.cuadroA.slice(0, 6).map(don => ({
        subject: don.nombre,
        A: don.porcentaje,
        fullMark: 100,
    }));

    if (data.length === 0) return <div className="text-center text-muted-foreground p-8">Completa el test para ver tu gráfico</div>;

    return (
        <div className="w-full h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="currentColor" strokeOpacity={0.2} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Mis Dones"
                        dataKey="A"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
