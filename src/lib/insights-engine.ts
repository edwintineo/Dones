

interface ResultadoDon {
    nombre: string;
    puntaje: number;
    porcentaje: number;
    descripcion: string;
}

export interface Insight {
    arquetipo: string;
    descripcion: string;
    consejo: string;
    ministeriosSugeridos: string[];
}

export const generarInsight = (topDones: ResultadoDon[]): Insight => {
    if (!topDones || topDones.length === 0) {
        return {
            arquetipo: "Explorador Espiritual",
            descripcion: "Estás en el inicio de tu viaje para descubrir cómo Dios te ha diseñado.",
            consejo: "Sigue explorando diferentes áreas de servicio para ver dónde sientes más pasión.",
            ministeriosSugeridos: ["Voluntariado general", "Grupos de conexión"]
        };
    }

    const donPrincipal = topDones[0].nombre;
    const donSecundario = topDones.length > 1 ? topDones[1].nombre : null;

    // Lógica de combinaciones para arquetipos
    let arquetipo = "Servidor Fiel";
    let descripcion = "Tienes un corazón dispuesto a servir y edificar a la iglesia.";
    let consejo = "Busca roles donde puedas ver el impacto directo de tu servicio.";
    let ministeriosSugeridos = ["Ujieres", "Limpieza", "Ayuda comunitaria"];

    // Reglas de ejemplo (se pueden expandir)
    if (donPrincipal === "Liderazgo" || donPrincipal === "Administración") {
        if (donSecundario === "Enseñanza" || donSecundario === "Predicación") {
            arquetipo = "Lider Visionario";
            descripcion = "Tienes la capacidad de ver el futuro y guiar a otros hacia él con claridad bíblica.";
            consejo = "Busca mentorear a líderes más jóvenes y comunicar la visión de la iglesia.";
            ministeriosSugeridos = ["Liderazgo de jóvenes", "Planificación estratégica", "Enseñanza"];
        } else if (donSecundario === "Misericordia" || donSecundario === "Pastorado") {
            arquetipo = "Pastor Estratega";
            descripcion = "Combinas la estructura con el cuidado de las personas. Creas sistemas que cuidan a la gente.";
            consejo = "Asegúrate de no perder el contacto personal por enfocarte solo en la organización.";
            ministeriosSugeridos = ["Coordinación de grupos pequeños", "Ministerio de cuidado", "Administración eclesial"];
        } else {
            arquetipo = "Organizador del Reino";
            descripcion = "Traes orden y dirección donde hay caos. Tu don hace que los ministerios sean eficientes.";
            ministeriosSugeridos = ["Administración", "Logística de eventos", "Coordinación de voluntarios"];
        }
    } else if (donPrincipal === "Misericordia" || donPrincipal === "Servicio" || donPrincipal === "Hospitalidad") {
        if (donSecundario === "Intercesión") {
            arquetipo = "Corazón de Siervo Orante";
            descripcion = "Sirves con tus manos y sostienes con tus oraciones. Eres el motor invisible de la iglesia.";
            consejo = "No olvides cuidar tu propio corazón mientras cuidas el de los demás.";
            ministeriosSugeridos = ["Ministerio de oración", "Visitas a hospitales", "Hospitalidad"];
        } else {
            arquetipo = "Manos de Jesús";
            descripcion = "Reflejas el amor de Cristo a través de acciones tangibles y cuidado personal.";
            ministeriosSugeridos = ["Banco de alimentos", "Bienvenida", "Ayuda social"];
        }
    } else if (donPrincipal === "Enseñanza" || donPrincipal === "Profecía" || donPrincipal === "Predicación") {
        arquetipo = "Voz de la Verdad";
        descripcion = "Tienes una pasión por la verdad de Dios y su comunicación clara.";
        consejo = "Recuerda siempre hablar la verdad en amor (Efesios 4:15).";
        ministeriosSugeridos = ["Escuela dominical", "Predicación", "Estudios bíblicos"];
    } else if (donPrincipal === "Evangelismo") {
        arquetipo = "Embajador del Evangelio";
        descripcion = "Tu pasión es alcanzar a los perdidos. Ves oportunidades donde otros ven obstáculos.";
        ministeriosSugeridos = ["Misiones", "Evangelismo callejero", "Redes sociales"];
    }

    return {
        arquetipo,
        descripcion,
        consejo,
        ministeriosSugeridos
    };
};
