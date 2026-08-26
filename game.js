// ======================================================
// QUIZ: LAS AVENTURAS DE WERTHER
// Wolfgang von Goethe
// ======================================================


// ======================================================
// CONEXIÓN CON SUPABASE
// ======================================================

const SUPABASE_URL =
    "https://pqmlwbsafihcwfobvjud.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_xoORP9IGxU6xSNDGtCG77w_52ECZyHq";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


// ======================================================
// AQUÍ PUEDES CAMBIAR LAS PREGUNTAS
// ======================================================

const preguntas = [

    {
        pregunta: "¿En qué año fue publicada por primera vez la obra de Goethe?",
        opciones: [
            "1774",
            "1789",
            "1802",
            "1815"
        ],
        correcta: 0
    },

    {
        pregunta: "¿Cuál es el nombre completo del protagonista?",
        opciones: [
            "Johann Werther",
            "Werther von Goethe",
            "Werther",
            "Wilhelm Werther"
        ],
        correcta: 2
    },

    {
        pregunta: "¿De quién se enamora profundamente Werther?",
        opciones: [
            "Charlotte",
            "Sophie",
            "Clara",
            "Elisabeth"
        ],
        correcta: 0
    },

    {
        pregunta: "¿Qué movimiento literario representa principalmente esta obra?",
        opciones: [
            "Realismo",
            "Romanticismo",
            "Naturalismo",
            "Modernismo"
        ],
        correcta: 1
    },

    {
        pregunta: "¿Qué característica representa mejor los sentimientos de Werther?",
        opciones: [
            "La razón por encima de las emociones",
            "La indiferencia ante el amor",
            "La intensidad de sus emociones y su amor imposible",
            "El interés por conseguir riqueza"
        ],
        correcta: 2
    }

];


// ======================================================
// CONFIGURACIÓN
// ======================================================

const TOTAL_PREGUNTAS = 5;

let preguntaActual = 0;
let puntos = 0;
let nombreJugador = "";
let resultadoGuardado = false;


// ======================================================
// ELEMENTOS DEL HTML
// ======================================================

const inicio = document.getElementById("inicio");
const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");

const nombreInput = document.getElementById("nombre");
const comenzar = document.getElementById("comenzar");

const nombreJugadorElemento =
    document.getElementById("nombreJugador");

const numeroPregunta =
    document.getElementById("numeroPregunta");

const barraProgreso =
    document.getElementById("barraProgreso");

const numeroRomantico =
    document.querySelector(".numero-romantico");

const preguntaElemento =
    document.getElementById("pregunta");

const respuestas =
    document.getElementById("respuestas");

const mensaje =
    document.getElementById("mensaje");

const siguiente =
    document.getElementById("siguiente");

const nombreResultado =
    document.getElementById("nombreResultado");

const puntosElemento =
    document.getElementById("puntos");

const mensajeFinal =
    document.getElementById("mensajeFinal");

const volverInicio =
    document.getElementById("volverInicio");


// ======================================================
// COMENZAR QUIZ
// ======================================================

comenzar.addEventListener(
    "click",
    comenzarQuiz
);


nombreInput.addEventListener(
    "keydown",
    function(evento) {

        if (evento.key === "Enter") {
            comenzarQuiz();
        }

    }
);


function comenzarQuiz() {

    nombreJugador =
        nombreInput.value.trim();


    if (nombreJugador === "") {

        nombreInput.focus();

        nombreInput.placeholder =
            "Primero escribe tu nombre...";

        return;
    }


    preguntaActual = 0;
    puntos = 0;
    resultadoGuardado = false;


    nombreJugadorElemento.textContent =
        nombreJugador;


    mostrarPantalla(quiz);

    cargarPregunta();
}


// ======================================================
// MOSTRAR PREGUNTA
// ======================================================

function cargarPregunta() {

    const preguntaActualDatos =
        preguntas[preguntaActual];


    numeroPregunta.textContent =
        `${preguntaActual + 1} / ${TOTAL_PREGUNTAS}`;


    numeroRomantico.textContent =
        `PREGUNTA ${convertirNumeroRomano(
            preguntaActual + 1
        )}`;


    const progreso =
        ((preguntaActual + 1) /
        TOTAL_PREGUNTAS) * 100;


    barraProgreso.style.width =
        `${pro
