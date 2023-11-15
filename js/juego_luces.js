//VARIABLES GLOBALES
let filas = 5;
let columnas = 6;
let lucesIniciales = 10;
let intentos = 0;
let tiempo = 0;
let juegoTerminado = false;

//FUNCION PARA CREAR EL TABLERO CON BOTONES
function crearTablero(){
    const tablero = document.getElementById("tablero");
    tablero.innerHTML = "";

//RECORREMOS CON BUCLES FOR TANTO FILAS COMO COLUMNAS
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
        const boton = document.createElement("button"); //CREAMOS LOS BOTONES
        boton.className = "boton";
        boton.addEventListener("click", () =>{
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