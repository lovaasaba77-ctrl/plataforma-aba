// Guardar evaluación
const form = document.getElementById("form-evaluacion");
const lista = document.getElementById("lista-evaluaciones");
const ctx = document.getElementById("grafico");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fecha = document.getElementById("fecha").value;
  const tipo = document.getElementById("tipo").value;
  const hipotesis = Array.from(document.querySelectorAll("input[name='hipotesis']:checked"))
    .map(h => h.value);

  const evaluacion = { fecha, tipo, hipotesis };
  let datos = JSON.parse(localStorage.getItem("evaluaciones")) || [];
  datos.push(evaluacion);
  localStorage.setItem("evaluaciones", JSON.stringify(datos));

  mostrarEvaluaciones();
  actualizarGrafico();
  form.reset();
});

function mostrarEvaluaciones() {
  let datos = JSON.parse(localStorage.getItem("evaluaciones")) || [];
  lista.innerHTML = "";
  datos.forEach((ev) => {
    const div = document.createElement("div");
    div.className = "border-b py-2";
    div.innerHTML = `
      <p><b>${ev.fecha}</b> - ${ev.tipo}</p>
      <p class="text-gray-600 text-sm">Hipótesis: ${ev.hipotesis.join(", ")}</p>
    `;
    lista.appendChild(div);
  });
}

function actualizarGrafico() {
  let datos = JSON.parse(localStorage.getItem("evaluaciones")) || [];
  const conteo = { "Escape": 0, "Atención": 0, "Acceso a objetos": 0, "Automática": 0 };

  datos.forEach(ev => {
    ev.hipotesis.forEach(h => {
      if (conteo[h] !== undefined) conteo[h]++;
    });
  });

  const etiquetas = Object.keys(conteo);
  const valores = Object.values(conteo);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: etiquetas,
      datasets: [{
        label: "Frecuencia de Hipótesis",
        data: valores
      }]
    },
    options: { responsive: true }
  });
}

mostrarEvaluaciones();
actualizarGrafico();
