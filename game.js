// ======================================================
// SUPABASE
// ======================================================

const SUPABASE_URL =
    "https://pqmlwbsafihcwfobvjud.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_xoORP9IGxU6xSNDGtCG77w_52ECZyHq";

let supabaseClient = null;

if (window.supabase) {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );
}


// ======================================================
// PREGUNTAS
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
        pregunta: "¿Cuál es el nombre del protagonista de la obra?",
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

const TOTAL_PREGUNTAS = preguntas.length;

let preguntaActual = 0;
let puntos = 0;
let nombreJugador = "";


// ======================================================
// ELEMENTOS
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
// COMENZAR
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

    nombreJugadorElemento.textContent =
        nombreJugador;

    mostrarPantalla(quiz);

    cargarPregunta();
}


// ======================================================
// CARGAR PREGUNTA
// ======================================================

function cargarPregunta() {

    const datos =
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
        `${progreso}%`;

    preguntaElemento.textContent =
        datos.pregunta;

    respuestas.innerHTML = "";

    mensaje.textContent = "";

    siguiente.classList.add("oculto");

    datos.opciones.forEach(
        function(texto, indice) {

            const boton =
                document.createElement("button");

            boton.classList.add("respuesta");

            const letra =
                document.createElement("span");

            letra.classList.add("letra");

            letra.textContent =
                String.fromCharCode(65 + indice);

            const textoRespuesta =
                document.createElement("span");

            textoRespuesta.classList.add("texto");

            textoRespuesta.textContent =
                texto;

            boton.appendChild(letra);
            boton.appendChild(textoRespuesta);

            boton.addEventListener(
                "click",
                function() {

                    responder(
                        boton,
                        indice
                    );

                }
            );

            respuestas.appendChild(boton);

        }
    );
}


// ======================================================
// RESPONDER
// ======================================================

function responder(
    botonSeleccionado,
    respuestaSeleccionada
) {

    const datos =
        preguntas[preguntaActual];

    const botones =
        document.querySelectorAll(".respuesta");

    botones.forEach(
        function(boton) {

            boton.disabled = true;

        }
    );

    if (
        respuestaSeleccionada ===
        datos.correcta
    ) {

        puntos++;

        botonSeleccionado.classList.add(
            "correcta"
        );

        mensaje.textContent =
            "✦ ¡Respuesta correcta!";

    } else {

        botonSeleccionado.classList.add(
            "incorrecta"
        );

        botones[
            datos.correcta
        ].classList.add(
            "correcta"
        );

        mensaje.textContent =
            "✦ Respuesta incorrecta.";
    }

    siguiente.classList.remove("oculto");

    if (
        preguntaActual ===
        TOTAL_PREGUNTAS - 1
    ) {

        siguiente.textContent =
            "Ver mi resultado ❧";

    } else {

        siguiente.textContent =
            "Siguiente pregunta ❧";
    }
}


// ======================================================
// SIGUIENTE
// ======================================================

siguiente.addEventListener(
    "click",
    function() {

        preguntaActual++;

        if (
            preguntaActual <
            TOTAL_PREGUNTAS
        ) {

            cargarPregunta();

        } else {

            mostrarResultado();
        }
    }
);


// ======================================================
// RESULTADO
// ======================================================

async function mostrarResultado() {

    nombreResultado.textContent =
        nombreJugador;

    puntosElemento.textContent =
        puntos;

    const nota =
        Number(
            (
                (puntos /
                TOTAL_PREGUNTAS) * 5
            ).toFixed(1)
        );

    if (puntos === 5) {

        mensajeFinal.textContent =
            "¡Excelente! Conoces muy bien la obra de Werther.";

    } else if (puntos >= 3) {

        mensajeFinal.textContent =
            "¡Buen trabajo! Has demostrado buenos conocimientos.";

    } else {

        mensajeFinal.textContent =
            "Buen intento. Puedes volver a revisar la obra.";
    }


    // Guardar resultado
    if (supabaseClient) {

        const { error } =
            await supabaseClient
                .from("resultados")
                .insert({
                    nombre: nombreJugador,
                    puntos: puntos,
                    nota: nota
                });

        if (error) {

            console.error(
                "Error guardando resultado:",
                error
            );

        } else {

            console.log(
                "Resultado guardado correctamente"
            );
        }

    } else {

        console.error(
            "Supabase no se pudo cargar."
        );
    }

    mostrarPantalla(resultado);
}


// ======================================================
// VOLVER AL INICIO
// ======================================================

volverInicio.addEventListener(
    "click",
    function() {

        nombreInput.value = "";

        nombreInput.placeholder =
            "Tu nombre...";

        mostrarPantalla(inicio);
    }
);


// ======================================================
// CAMBIAR PANTALLA
// ======================================================

function mostrarPantalla(pantalla) {

    inicio.classList.remove("activa");

    quiz.classList.remove("activa");

    resultado.classList.remove("activa");

    pantalla.classList.add("activa");
}


// ======================================================
// ROMANOS
// ======================================================

function convertirNumeroRomano(numero) {

    const romanos = [
        "I",
        "II",
        "III",
        "IV",
        "V"
    ];

    return romanos[numero - 1];
}
