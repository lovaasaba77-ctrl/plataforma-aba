<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Plataforma ABA</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-gray-50 min-h-screen text-gray-800">

  <!-- NAV -->
  <nav class="bg-blue-600 text-white shadow-lg">
    <div class="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
      <h1 class="text-xl font-bold">Plataforma ABA</h1>
      <ul class="flex gap-6">
        <li><a href="#inicio" class="hover:text-blue-200">Inicio</a></li>
        <li><a href="#evaluaciones" class="hover:text-blue-200">Evaluaciones</a></li>
        <li><a href="#progreso" class="hover:text-blue-200">Progreso</a></li>
      </ul>
    </div>
  </nav>

  <!-- INICIO -->
  <section id="inicio" class="max-w-4xl mx-auto mt-8 text-center">
    <h2 class="text-2xl font-semibold mb-2">Bienvenido a la Plataforma ABA</h2>
    <p class="text-gray-600">Registra evaluaciones funcionales y visualiza el progreso terapéutico.</p>
  </section>

  <!-- EVALUACIONES -->
  <section id="evaluaciones" class="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
    <h3 class="text-xl font-bold mb-4 text-blue-700">Registrar Evaluación Funcional</h3>

    <form id="form-evaluacion" class="space-y-4">
      <div>
        <label class="block font-semibold">Fecha</label>
        <input type="date" id="fecha" class="border p-2 rounded w-full" required>
      </div>

      <div>
        <label class="block font-semibold">Tipo de Evaluación</label>
        <select id="tipo" class="border p-2 rounded w-full">
          <option value="Inicial">Inicial</option>
          <option value="Seguimiento">Seguimiento</option>
          <option value="Final">Final</option>
        </select>
      </div>

      <div>
        <label class="block font-semibold mb-2">Hipótesis Conductuales</label>
        <div class="space-y-1">
          <label><input type="checkbox" name="hipotesis" value="Escape"> Escape</label><br>
          <label><input type="checkbox" name="hipotesis" value="Atención"> Atención</label><br>
          <label><input type="checkbox" name="hipotesis" value="Acceso a objetos"> Acceso a objetos</label><br>
          <label><input type="checkbox" name="hipotesis" value="Automática"> Automática</label>
        </div>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Guardar Evaluación
      </button>
    </form>

    <div id="lista-evaluaciones" class="mt-6"></div>
  </section>

  <!-- PROGRESO -->
  <section id="progreso" class="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
    <h3 class="text-xl font-bold mb-4 text-blue-700">Gráfico de Progreso</h3>
    <canvas id="grafico"></canvas>
  </section>

  <script src="script.js"></script>
</body>
</html>
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
/* Archivo base de estilos - puedes personalizar más adelante */
