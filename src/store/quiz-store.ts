import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { preguntasTest, categoriasDones, descripcionesDones } from '@/lib/data';

interface ResultadoDon {
  nombre: string;
  puntaje: number;
  porcentaje: number;
  descripcion: string;
}

interface EstadoTest {
  paginaActual: number;
  respuestas: number[];
  resultados: {
    cuadroA: ResultadoDon[]; // Dones que ya usas
    cuadroC: ResultadoDon[]; // Áreas de responsabilidad
  };
  completado: boolean;

  responderPregunta: (preguntaIndex: number, valor: number) => void;
  siguientePagina: () => void;
  paginaAnterior: () => void;
  calcularResultados: () => void;
  reiniciarTest: () => void;
}

// Número de preguntas por página
const PREGUNTAS_POR_PAGINA = 10;

export const useTestStore = create<EstadoTest>()(
  persist(
    (set, get) => ({
      paginaActual: 0,
      respuestas: new Array(preguntasTest.length).fill(0),
      resultados: {
        cuadroA: [],
        cuadroC: []
      },
      completado: false,

      responderPregunta: (preguntaIndex: number, valor: number) => {
        set((state) => {
          const nuevasRespuestas = [...state.respuestas];
          nuevasRespuestas[preguntaIndex] = valor;
          return { respuestas: nuevasRespuestas };
        });
      },

      siguientePagina: () => {
        const { paginaActual } = get();
        const totalPaginas = Math.ceil(preguntasTest.length / PREGUNTAS_POR_PAGINA);

        if (paginaActual < totalPaginas - 1) {
          set({ paginaActual: paginaActual + 1 });
        } else {
          get().calcularResultados();
        }
      },

      paginaAnterior: () => {
        const { paginaActual } = get();
        if (paginaActual > 0) {
          set({ paginaActual: paginaActual - 1 });
        }
      },

      calcularResultados: () => {
        const { respuestas } = get();
        const resultadosDones: Record<string, ResultadoDon> = {};

        // Inicializar resultados para cada don
        Object.entries(categoriasDones).forEach(([nombreDon, indices]) => {
          const numPreguntas = indices.length;
          const puntajeMaximo = numPreguntas * 5; // 5 es el valor máximo por pregunta

          // Calcular puntaje sumando las respuestas de las preguntas asociadas
          const puntaje = indices.reduce((suma, indice) => suma + respuestas[indice], 0);
          const porcentaje = (puntaje / puntajeMaximo) * 100;

          resultadosDones[nombreDon] = {
            nombre: nombreDon,
            puntaje,
            porcentaje,
            descripcion: descripcionesDones[nombreDon as keyof typeof descripcionesDones] || ""
          };
        });

        // Clasificar los dones en cuadros A y C
        const cuadroA: ResultadoDon[] = [];
        const cuadroC: ResultadoDon[] = [];

        Object.entries(resultadosDones).forEach(([nombreDon, resultado]) => {
          const indices = categoriasDones[nombreDon as keyof typeof categoriasDones];
          const puntajeMaximo = indices.length * 5;
          const umbral = puntajeMaximo * 0.5;

          if (resultado.puntaje >= umbral) {
            cuadroA.push(resultado);
          } else {
            cuadroC.push(resultado);
          }
        });

        // Ordenar cuadroA por puntaje (de mayor a menor)
        cuadroA.sort((a, b) => b.puntaje - a.puntaje);

        set({
          resultados: { cuadroA, cuadroC },
          completado: true
        });
      },

      reiniciarTest: () => {
        set({
          paginaActual: 0,
          respuestas: new Array(preguntasTest.length).fill(0),
          resultados: {
            cuadroA: [],
            cuadroC: []
          },
          completado: false
        });
      }
    }),
    {
      name: 'dones-test-storage', // nombre único para localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Función auxiliar para obtener las preguntas de la página actual
export const obtenerPreguntasPagina = (pagina: number) => {
  const inicio = pagina * PREGUNTAS_POR_PAGINA;
  const fin = Math.min(inicio + PREGUNTAS_POR_PAGINA, preguntasTest.length);
  return preguntasTest.slice(inicio, fin).map((pregunta, idx) => ({
    indice: inicio + idx,
    texto: pregunta
  }));
};

// Función para obtener el número total de páginas
export const obtenerTotalPaginas = () => {
  return Math.ceil(preguntasTest.length / PREGUNTAS_POR_PAGINA);
};