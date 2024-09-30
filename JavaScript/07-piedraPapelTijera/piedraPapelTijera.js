

// Obtenemos los elementos 'button' y los guardamos en una variable
const botones = document.getElementsByTagName("button");

//Agrega oyentes de eventos a cada botón utilizando las variables 'procesarPerfil' 'generarTirada' y 'resetear'
botones[0].addEventListener("click", procesarPerfil, false);
botones[1].addEventListener("click", generarTirada, false);
botones[2].addEventListener("click", resetear, false);


//Establecemos las opciones disponibles para el jugador y asignamos identificadores a las imágenes,rutas y configuramos eventos de clic para cada opción haciendo que estos llamen a la función "tiradaJugador"

const opciones = document.getElementsByTagName("img"); 
var posibilidades = ["piedra", "papel", "tijera"];

const opcionesArray = Array.from(opciones); // Convertimos la colección de elementos 'img' en un array para poder utilizar métodos como 'entries'

for (const [index, opcion] of opcionesArray.entries()) {// Iteramos sobre el array de opciones
	opcion.id = posibilidades[index]; // Asignamos un identificador (id) a cada opción basado en su posición en el array 'posibilidades'
	opcion.src = rutaImagen(opcion.id, "Jugador"); // Configuramos la ruta de la imagen de la opción, llamando a la función 'rutaImagen' con la jugada y el jugador
	opcion.addEventListener("click", tiradaJugador, false); // Agregamos un evento de clic a cada opción, que llamará a la función 'tiradaJugador'
}


///////////////////////////////////////////////////////// LÓGICA DE PERMITIR AL JUGADOR JUGAR ////////////////////////////


var nombre = "";

function checkNombre(nombre) { //Comprueba las reglas de que el nombre del jugador sea válido.
	if ((nombre.length > 3) && (isNaN(nombre[0]))) { //Si es mayor de tres letras el nombre y no esta vacío devuelve true
		return true;
	} else { //Sino devolverá false
		return false;
	}
}

function procesarPerfil() { //Creamos la función de perfilJugador donde guardamos los elementos introducidos por el input de manera ordenada en dos variables y creamos un bucle ifelse el cual llama a la función 'checkNombre'
	let inputNombre = document.getElementsByTagName("input")[0];
	let inputPartidas = document.getElementsByTagName("input")[1];
	
	if (!checkNombre(inputNombre.value)) { // Si el nombre no es válido, aplicar estilo de fondo rojo al campo de nombre.
		inputNombre.classList.add("fondoRojo");
	} else if (inputPartidas.value <= 0) {// En caso contrario, si el número de partidas es inválido, aplicar estilo de fondo rojo al campo de partidas.
		inputNombre.classList.remove("fondoRojo");
		inputPartidas.classList.add("fondoRojo");
	} else { // Si la validación es exitosa, quitar el estilo de fondo rojo, almacenar el nombre globalmente, establecer el valor total de partidas
		// y deshabilitar ambos campos de entrada para evitar cambios adicionales.
		inputNombre.classList.remove("fondoRojo");
		inputPartidas.classList.remove("fondoRojo");
		nombre = inputNombre.value;
		document.getElementById("total").textContent = inputPartidas.value;
		inputNombre.disabled = true;
		inputPartidas.disabled = true;
		console.log("he llegado hasta aqui")
	}
}
////////////////////////////////////////////////////////// TIRADAS DE LA MÁQUINA Y DEL JUGADOR //////////////////////////////



var imagenes = document.getElementsByTagName("img"); // Obtención de la colección de elementos 'img'
var maquina = imagenes[imagenes.length - 1]; // Se obtiene el último elemento

function valorRandom(opciones) { //función que genera un valor random para pasarlo por la máquina para su elección
	let randomNum = Math.floor(Math.random() * opciones.length);
	return opciones[randomNum] ;
	
}


function rutaImagen(jugada, jugador) { //función que escoge la ruta de las imágenes a seleccionar
	return "img/" + jugada + jugador + ".png";
}

function generarTirada() {
	if (actual.innerHTML < total.innerHTML) { // Verifica si el número actual de tiradas es menor al total permitido
		tiradaMaquina = valorRandom(posibilidades) ;// Genera una tirada aleatoria para la máquina a partir de las posibilidades llamando a la función valorRandom
		maquina.src = rutaImagen(tiradaMaquina, "Ordenador"); // Actualiza la imagen de la máquina con la ruta correspondiente a la tirada generada
		maquina.id = tiradaMaquina; // Asigna la tirada como identificador de la imagen de la máquina
		actual.innerHTML = Number(actual.innerHTML) + 1; // Incrementa el número actual de tiradas
		comprobarResultado(tiradaMaquina); // Calcula y muestra el resultado de la tirada
	}
}

function tiradaJugador(t) {
    
    t.target.classList.add("seleccionada"); // Agrega la clase "seleccionada" y quita la clase "noSeleccionada" al elemento clicado.
    t.target.classList.remove("noSeleccionada");
    
    for (var k = 0; k < opciones.length-1; k++) { // Cambia la apariencia de las otras opciones que no han sido clicadas.
        if (opciones[k] != t.target) {
            opciones[k].classList.remove("seleccionada");
            opciones[k].classList.add("noSeleccionada");
        }
    }
}


//////////////////////////////////////////////////////////// LISTA DE PARTIDAS JUGADAS /////////////////////////////////////

function comprobarResultado(tirada) {
	for (var j = 0; j < opciones.length-1; j++) {  // Recorre las opciones disponibles para encontrar la opción seleccionada por el jugador
		if (opciones[j].classList == "seleccionada") {
			var seleccionado = opciones[j].id;
			break;  // Salir del bucle una vez que se encuentra una opción seleccionada
		}
	}

// Compara la tirada de la máquina con la selección del jugador para determinar el resultado y actualizar el historial
	if ((posibilidades.indexOf(maquina.id) == posibilidades.indexOf(seleccionado)-1) || ((posibilidades.indexOf(maquina.id) == posibilidades.length-1) && (posibilidades.indexOf(seleccionado) == 0))) {
		historial.innerHTML += "<li>Gana " + nombre +"</li>\n";
	} else if (posibilidades.indexOf(maquina.id) == posibilidades.indexOf(seleccionado)) {
		historial.innerHTML += "<li>Empate</li>\n";
	} else {
		historial.innerHTML += "<li>Gana la máquina</li>\n";
	}
}

function resetear() {
	// Obtener referencias a los elementos de entrada
	let nombreIntroducido = document.getElementsByTagName("input")[0];
	let partidas = document.getElementsByTagName("input")[1];

	// Habilitar los campos de entrada y establecer valores iniciales
	nombreIntroducido.disabled = false;
	partidas.disabled = false;
	partidas.value = 0;

	// Restablecer las etiquetas de estado actual y total
	total.innerHTML = "0";
	actual.innerHTML = "0";

	// Restablecer la apariencia de las opciones
	for (var k = 0; k < opciones.length-1; k++) {
		opciones[k].classList.remove("seleccionada");
		opciones[k].classList.remove("noSeleccionada");
	}

	// Establecer la primera opción como seleccionada y la última con la imagen por defecto
	opciones[0].classList.add("seleccionada");
	opciones[opciones.length-1].src = rutaImagen("", "defecto");

	// Agregar una entrada en el historial indicando que se ha iniciado una nueva partida
	historial.innerHTML += "<li>Nueva partida</li>\n";
}
