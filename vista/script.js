fetch("https://todo-api-gjik.onrender.com/todos/")
  .then((res) => res.json())
  .then((data) => {
    // data es un array, usamos map para recorrerlo
    const html = data.map((item) => `<li class="todos">${item.title}</li>`).join("");
    document.getElementById("contenido").innerHTML = html;
  })
  .catch((err) => {
    document.getElementById("contenido").innerHTML =
      "<li>Error al cargar los datos</li>";
    console.error("Error:", err);
  });

document.getElementById("miFormulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const data = {
    title: formData.get("title"),
    task: formData.get("task"),
    done: formData.get("done") === "on"
  };

  fetch("https://todo-api-gjik.onrender.com/todos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(todo => {
      agregarTodoAlDOM(todo); // 🔁 actualiza el DOM sin recargar
      form.reset(); // limpia el formulario
    })
    .catch(err => {
      console.error("Error al enviar:", err);
      alert("Hubo un error al guardar");
    });
});

function agregarTodoAlDOM(todo) {
  const contenedor = document.getElementById("contenido");

  const item = document.createElement("li");
  item.classList.add("todos");
  item.textContent = todo.title; // Usa el valor correcto

  contenedor.prepend(item);
}