// Creo una clase con los siguientes atributos 
class Tarea {
  constructor(id,descripcion) {
      this.id = id;
      this.descripcion = descripcion;
      this.completada = false;
  }
}
//Creo un array y agrego 3 objetos de la clase tarea a la lista. 
const listaDeTareas = [
  new Tarea (1, "Hacer la compra"),
  new Tarea (2, "Estudiar para el examen"),
  new Tarea (3, "Llamar al médico")
];

//Creo una función para mostrar las Tareas

function mostrarTareas() {
  const listaDeTareasElement = document.getElementById("tareas-lista");
  listaDeTareasElement.innerHTML = ''; //Limpia la lista antes de mostrar las tareas nuevamente.Esto se hace para borrar cualquier contenido previo en el elemento, de modo que se pueda volver a llenar con la lista actualizada de tareas.

  for (let i = 0; i < listaDeTareas.length; i++) {
      const tarea = listaDeTareas[i];
      const tareaElement = document.createElement("li");
      tareaElement.innerHTML = 'Tarea ' + tarea.id + ': ' + tarea.descripcion + ' (Completada: ' + tarea.completada + ') ' +
  '<button onclick="marcarTareaComoCompletada(' + tarea.id + ')">Marcar como completada</button>' +
  '<button onclick="eliminarTarea(' + tarea.id + ')">Eliminar</button>';
      
      /* Se agregan dos botones al elemento tareaElement. Uno es para marcar la tarea como completada y el otro es para eliminar la tarea. Los botones tienen atributos onclick que llaman a las funciones marcarTareaComoCompletada y eliminarTarea, respectivamente, pasando el ID de la tarea como argumento.
      */
      
      listaDeTareasElement.appendChild(tareaElement); //Finalmente, el tareaElement se agrega como un elemento secundario al elemento listaDeTareasElement, lo que significa que se muestra en la lista de tareas en la página.
  }
}


function agregarTarea() {
  var descripcion = document.getElementById('descripcion-tarea').value; //Se obtiene el valor del campo de entrada de texto con el ID "descripcion-tarea" utilizando document.getElementById('descripcion-tarea').value y se almacena en la variable descripcion. Esto captura la descripción de la nueva tarea que el usuario ha ingresado en el campo de entrada.

  var id =  listaDeTareas.length + 1; //A continuación, se calcula un nuevo ID para la tarea que se va a agregar. Se hace sumando 1 al valor actual de listaDeTareas.length. Esto se hace para asegurarse de que cada tarea tenga un ID único. El nuevo ID se almacena en la variable id.
  
  const nuevaTarea = new Tarea (id, descripcion); //Se crea una nueva instancia de la clase Tarea llamada nuevaTarea pasando el ID y la descripción como argumentos.

  listaDeTareas.push(nuevaTarea); //La nueva tarea nuevaTarea se agrega al final del array listaDeTareas utilizando listaDeTareas.push(nuevaTarea).

  mostrarTareas(); //Finalmente, se llama a la función mostrarTareas(), que actualiza la vista de la lista de tareas para reflejar la adición de la nueva tarea.
}


function marcarTareaComoCompletada() {
  const tarea = listaDeTareas.find((t) => t.id === id ); //Se busca la tarea específica que se debe marcar como completada. Se utiliza el método find() en el array listaDeTareas para encontrar la tarea que tenga un ID igual al valor id. El parámetro t en la función de flecha (t) => t.id === id representa cada tarea en la lista, y esta función verifica si el ID de la tarea coincide con el valor id. La tarea encontrada se almacena en la variable tarea.
  
  if(tarea) {
      tarea.completada = true;
  } //Se verifica si la variable tarea es válida, lo que significa que se encontró una tarea con el ID proporcionado. Si tarea existe, se procede a marcarla como completada. Se establece el valor de la propiedad completada de la tarea encontrada en true. Esto indica que la tarea ha sido marcada como completada.

  mostrarTareas(); //Luego, se llama a la función mostrarTareas(). Esto actualiza la vista de la lista de tareas para reflejar el cambio en el estado de la tarea, mostrando la tarea marcada como completada.
}

function eliminarTarea(id) {
  const index = listaDeTareas.findIndex((t) => t.id === id); //La función utiliza el método findIndex() en el array listaDeTareas para encontrar el índice de la tarea que tiene un ID igual al valor id. findIndex() recorre el array y devuelve el índice del primer elemento que cumple con la condición dada. En este caso, la condición es (t) => t.id === id, lo que significa que se busca una tarea cuyo ID coincida con el id proporcionado. El índice de la tarea se almacena en la variable index.

  if(index !== -1) { //Se verifica si index no es igual a -1. Esto se hace para asegurarse de que se haya encontrado una tarea con el ID proporcionado en la lista. Si index no es -1, significa que se encontró la tarea y se puede proceder a eliminarla.

      listaDeTareas.splice(index, 1); //Utilizando el método splice(), se elimina la tarea del array listaDeTareas. El primer argumento de splice() es el índice desde el cual se debe eliminar un elemento, y el segundo argumento (en este caso, 1) especifica cuántos elementos se deben eliminar a partir de ese índice.
  }
  mostrarTareas(); //Después de eliminar la tarea de la lista, se llama a la función mostrarTareas(). Esto actualiza la vista de la lista de tareas para reflejar la eliminación de la tarea.

}



