// Función para crear una tarjeta
function crearTarjeta(datos) {
  const tarjeta = document.createElement("div");
  tarjeta.id = "todos";

  const titulo = document.createElement("h3");
  titulo.textContent = datos.title;

  const descripcion = document.createElement("p");

  const check = document.createElement("span");
  check.textContent = datos.done ? "Completado" : "Pendiente";
  check.id = datos.done?"completado":"pendiente";

  titulo.textContent = datos.title;
  descripcion.textContent = datos.task;


  titulo.className = "title";
  descripcion.className = "description";
  

  // Agregar al DOM
  tarjeta.appendChild(titulo);
  tarjeta.appendChild(descripcion);
  tarjeta.appendChild(check);

  return tarjeta;
}
async function cargarTarjetasOptimizado() {
  try {
    const response = await fetch("https://todo-api-gjik.onrender.com/todos/");
    const datos = await response.json();

    const fragment = document.createDocumentFragment();

    datos.forEach((item) => {
      const tarjeta = crearTarjeta(item);
      fragment.appendChild(tarjeta);
    });

    // Una sola operación DOM
    document.getElementById("contenido").appendChild(fragment);
  } catch (error) {
    console.error("Error:", error);
  }
}

document.addEventListener('DOMContentLoaded', function() {
    cargarTarjetasOptimizado();
});

document
  .getElementById("miFormulario")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const data = {
      title: formData.get("title"),
      task: formData.get("task"),
      done: formData.get("done") === "on",
    };

    fetch("https://todo-api-gjik.onrender.com/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((todo) => {
        agregarTodoAlDOM(todo);
        form.reset();
      })
      .catch((err) => {
        console.error("Error al enviar:", err);
        alert("Hubo un error al guardar");
      });
  });

function agregarTodoAlDOM(todo) {
  const newtodo = crearTarjeta(todo);
  const body = document.getElementById("contenido");
  console.log(newtodo);
  body.prepend(newtodo);
}
