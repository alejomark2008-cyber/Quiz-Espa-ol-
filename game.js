// ======================================================
// QUIZ: LAS AVENTURAS DE WERTHER
// Wolfgang von Goethe
// ======================================================

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

comenzar.addEventListener("click", comenzarQuiz);

nombreInput.addEventListener("keydown", function(evento) {

if (evento.key === "Enter") {  
    comenzarQuiz();  
}

});

function comenzarQuiz() {

nombreJugador = nombreInput.value.trim();  

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
// MOSTRAR PREGUNTA
// ======================================================

function cargarPregunta() {

const preguntaActualDatos =  
    preguntas[preguntaActual];  


// Número de pregunta  

numeroPregunta.textContent =  
    `${preguntaActual + 1} / ${TOTAL_PREGUNTAS}`;  


numeroRomantico.textContent =  
    `PREGUNTA ${convertirNumeroRomano(preguntaActual + 1)}`;  


// Barra de progreso  

const progreso =  
    ((preguntaActual + 1) / TOTAL_PREGUNTAS) * 100;  

barraProgreso.style.width =  
    `${progreso}%`;  


// Pregunta  

preguntaElemento.textContent =  
    preguntaActualDatos.pregunta;  


// Limpiar respuestas anteriores  

respuestas.innerHTML = "";  

mensaje.textContent = "";  

siguiente.classList.add("oculto");  


// Crear respuestas  

preguntaActualDatos.opciones.forEach(  
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
// COMPROBAR RESPUESTA
// ======================================================

function responder(
botonSeleccionado,
respuestaSeleccionada
) {

const datos =  
    preguntas[preguntaActual];  

const botones =  
    document.querySelectorAll(".respuesta");  


// Evitar que pueda responder varias veces  

botones.forEach(function(boton) {  

    boton.disabled = true;  

});  


// Respuesta correcta  

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


    // Mostrar cuál era la correcta  

    botones[  
        datos.correcta  
    ].classList.add(  
        "correcta"  
    );  


    mensaje.textContent =  
        "✦ Respuesta incorrecta.";  

}  


// Mostrar botón siguiente  

siguiente.classList.remove(  
    "oculto"  
);  


// Cambiar texto en última pregunta  

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
// SIGUIENTE PREGUNTA
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
// MOSTRAR RESULTADO
// ======================================================

function mostrarResultado() {

nombreResultado.textContent =  
    nombreJugador;  


puntosElemento.textContent =  
    puntos;  


// Mensaje según puntuación  

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
// CAMBIAR DE PANTALLA
// ======================================================

function mostrarPantalla(pantalla) {

inicio.classList.remove("activa");  

quiz.classList.remove("activa");  

resultado.classList.remove("activa");  


pantalla.classList.add("activa");

}

// ======================================================
// NÚMEROS ROMANOS
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
