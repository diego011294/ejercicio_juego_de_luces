//VARIABLES GLOBALES
let filas = 5;
let columnas = 6;
let lucesIniciales = 10;
let intentos = 0;
let tiempo = 0;
let juegoTerminado = false;

//FUNCION PARA CREAR EL TABLERO CON BOTONES
function crearTablero() {
    const tablero = document.getElementById("tablero");
    tablero.innerHTML = "";

    //RECORREMOS CON BUCLES FOR TANTO FILAS COMO COLUMNAS
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const boton = document.createElement("button"); //CREAMOS LOS BOTONES
            boton.className = "boton";
            boton.addEventListener("click", () => {
                if (!juegoTerminado) { //SI ES VERDADERO YA QUE LO DEFINIMOS EN FALSE
                    cambiarEstadoVentana(i, j);
                    actualizarIntentos();
                    verificarFindeJuego();
                }
            });
            /*AGREGA BOTONES Y LINEAS DE SALTO DE LINEA COMO ELEMENTOS
            HIJO AL ELEMENTO TABLERO*/
            tablero.appendChild(boton);
        }
        tablero.appendChild(document.createElement("br"));
    }
    //METODO PARA GENERAR LUCES ALEATORIAS
    generarLucesAleatorias();
}
//FUNCION PARA CAMBIAR ESTADO DE VENTANA Y VECINAS
function cambiarEstadoVentana(fila, columna) {
    const botones = document.querySelectorAll(".boton"); //COGE TODAS LAS CLASS BOTON Y ALMACENA EN CONSTANTE
    const index = fila * columnas + columna; //INDICE UNICO PARA FILAS Y COLUMNAS
    const yField = Math.floor(index / columnas); //CALCULO COORDENADAS FILA
    const xField = index % columnas; //CALCULO COORDENADAS COLUMNA

    //CAMBIAR EL ESTADO/COLOR DE LA VENTANA SELECCIONADA, ELEMENTO TERNARIO (FUNCIONA COMO UN IF)
    botones[index].style.backgroundColor = botones[index].style.backgroundColor === "yellow" ? "black" : "yellow";

    //CAMBIAR ESTADO DE LAS VENTANAS VECINAS (ARRAY BIDIMENSIONAL)
    const vecinas = [
        [yField - 1, xField], //ARRIBA
        [yField + 1, xField], //ABAJO
        [yField, xField - 1], //IZQUIERDA
        [yField, xField + 1], //DERECHA
    ];

    //ITERA A TRAVES DE LAS VENTANAS VECINAS
    vecinas.forEach(([y, x]) => {
        //VERIFICA SI LAS COORDENADAS ESTAN DENTRO DE LA CUADRÍCULA
        if (y >= 0 && y < filas && x >= 0 && x < columnas) {
            //CALCULA EL ÍNDICE DE LA VENTANA VECINA EN EL ARRAY DE BOTONES
            const vecinaIndex = y * columnas + x;
            //CAMBIA EL COLOR DE LA VENTANA VECINA ENTRE NEGRO Y AMARILLO
            botones[vecinaIndex].style.backgroundColor = botones[vecinaIndex].style.backgroundColor === "yellow" ? "black" : "yellow";
        }
    });
}


//FUNCION PARA ACTUALIZAR EL CONTADOR DE INTENTOS
function actualizarIntentos() {
    intentos++;
    document.getElementById("intentos").textContent = intentos;
}

//FUNCION PARA GENERAR LUCES ALEATORIAS 
function generarLucesAleatorias() {
    const botones = document.getElementsByTagName(".boton");
    const botonesAleatorios = [];
    for (let i = 0; i < lucesIniciales; i++) {
        let botonAleatorio;
        do {
            botonAleatorio = Math.floor(Math.random() * (filas * columnas));
        } while (botonesAleatorios.includes(botonAleatorio));
        botonesAleatorios.push(botonAleatorio);
        cambiarEstadoVentana(Math.floor(botonAleatorio / columnas), botonAleatorio % columnas);
    }
}

//FUNCIÓN PARA INICIAR EL JUEGO CON LA DIFICULTAD SELECCIONADA
document.getElementById("iniciarJuego").addEventListener("click", () => {
    //REINICIAR VARIABLES
    intentos = 0;
    tiempo = 0;
    juegoTerminado = false;
    document.getElementById("intentos").textContent = intentos;
    document.getElementById("tiempo").textContent = tiempo;

    //OBTENER LA DIFICULTAD SELECCIONADA
    const dificultadSeleccionada = document.querySelector("input[name='dificultad']:checked").value;
    if (dificultadSeleccionada === "facil") {
        filas = 5;
        columnas = 6;
        lucesIniciales = 10;
    } else if (dificultadSeleccionada === "medio") {
        filas = 6;
        columnas = 6;
        lucesIniciales = 6;
    } else if (dificultadSeleccionada === "dificil") {
        filas = 10;
        columnas = 10;
        lucesIniciales = 20;
    } else if (dificultadSeleccionada === "personalizado") {
        const filasPersonalizadas = parseInt(document.getElementById("filas").value);
        const columnasPersonalizadas = parseInt(document.getElementById("columnas").value);
        const lucesPersonalizadas = parseInt(document.getElementById("luces").value);

        //VALIDAR ENTRADAS PERSONALIZADAS
        if (!Number.isNaN(filasPersonalizadas) && !Number.isNaN(columnasPersonalizadas) && !Number.isNaN(lucesPersonalizadas) && lucesPersonalizadas <= filasPersonalizadas * columnasPersonalizadas) {
            filas = filasPersonalizadas;
            columnas = columnasPersonalizadas;
            lucesIniciales = lucesPersonalizadas;
        } else {
            alert("Por favor, ingrese valores válidos para filas, columnas y luces personalizadas.");
            return;
        }
    }

    //CREAR UN NUEVO TABLERO
    crearTablero();
});

//FUNCION PARA ACTUALIZAR EL CONTADOR DE TIEMPO CADA SEGUNDO
setInterval(() => {
    if (!juegoTerminado) {
        tiempo++;
        document.getElementById("tiempo").textContent = tiempo + " segundos";
    }
}, 1000);

//INICIAR EL JUEGO CON LA DIFICULTAD PREDETERMINADA AL CARGAR LA PÁGINA
crearTablero();

//FUNCION PARA SIMULAR UN TIEMPO DE CARGA INICIAL.
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        var loaders = document.querySelectorAll('#loader-wrapper');
        loaders.forEach(function (loader) {
            loader.style.opacity = '0';
            setTimeout(function () {
                loader.style.display = 'none';
            }, 500);
        });

        var contents = document.querySelectorAll('.contenedor');
        contents.forEach(function (contenedor) {
            contenedor.style.transition = 'opacity 1s ease-in-out';
            contenedor.style.opacity = '1';
            contenedor.style.visibility = 'visible';
        });
    }, 3000);
});