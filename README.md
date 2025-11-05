<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Plataforma ABA</title>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-gray-100 text-gray-800">

  <!-- Barra de navegación -->
  <nav class="bg-blue-700 text-white p-4 flex justify-between items-center shadow">
    <h1 class="text-2xl font-bold">Plataforma ABA</h1>
    <ul class="flex space-x-4">
      <li><a href="#inicio" class="hover:text-gray-300">Inicio</a></li>
      <li><a href="#evaluaciones" class="hover:text-gray-300">Evaluaciones</a></li>
      <li><a href="#progreso" class="hover:text-gray-300">Progreso</a></li>
    </ul>
  </nav>

  <!-- Sección Inicio -->
  <section id="inicio" class="p-6">
    <h2 class="text-2xl font-bold mb-2">Bienvenido a la Plataforma ABA</h2>
    <p>Desde aquí podrás registrar observaciones, evaluar avances y visualizar el progreso de tus pacientes.</p>
  </section>

  <!-- Sección Evaluaciones -->
  <section id="evaluaciones" class="p-6 bg-white shadow rounded m-4">
    <h2 class="text-xl font-semibold mb-4">Registrar Evaluación</h2>
    <form id="evaluacionForm" class="space-y-4">
      <div>
        <label class="block mb-1 font-medium">Nombre del Paciente</label>
        <input type="text" id="nombrePaciente" class="w-full border rounded p-2" required />
      </div>
      <div>
        <label class="block mb-1 font-medium">Categoría</label>
        <select id="categoria" class="w-full border rounded p-2">
          <option value="Atención">Atención</option>
          <option value="Comunicación">Comunicación</option>
          <option value="Motricidad">Motricidad</option>
          <option value="Social">Social</option>
        </select>
      </div>
      <div>
        <label class="block mb-1 font-medium">Puntaje (0 - 10)</label>
        <input type="number" id="puntaje" min="0" max="10" class="w-full border rounded p-2" required />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar Evaluación</button>
    </form>
  </section>

  <!-- Sección Progreso -->
  <section id="progreso" class="p-6 bg-white shadow rounded m-4">
    <h2 class="text-xl font-semibold mb-4">Progreso del Paciente</h2>
    <canvas id="graficoProgreso" width="400" height="200"></canvas>

    <!-- Historial de Evaluaciones -->
    <h3 class="text-lg font-semibold mt-6 mb-2">Historial de Evaluaciones</h3>
    <table id="tablaHistorial" class="min-w-full border border-gray-300 rounded">
      <thead class="bg-blue-100">
        <tr>
          <th class="border p-2">Fecha</th>
          <th class="border p-2">Paciente</th>
          <th class="border p-2">Categoría</th>
          <th class="border p-2">Puntaje</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </section>

  <!-- Script principal -->
  <script>
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("evaluacionForm");
    const graficoCanvas = document.getElementById("graficoProgreso");
    const tablaHistorial = document.querySelector("#tablaHistorial tbody");
    let grafico;

    // Cargar datos guardados
    const datosGuardados = JSON.parse(localStorage.getItem("evaluaciones")) || [];

    // Función para actualizar tabla
    function actualizarTabla() {
      tablaHistorial.innerHTML = "";
      datosGuardados.forEach(d => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td class="border p-2">${d.fecha}</td>
          <td class="border p-2">${d.nombre}</td>
          <td class="border p-2">${d.categoria}</td>
          <td class="border p-2 text-center">${d.puntaje}</td>
        `;
        tablaHistorial.appendChild(fila);
      });
    }

    // Función para actualizar gráfico
    function actualizarGrafico() {
      const categorias = ["Atención", "Comunicación", "Motricidad", "Social"];
      const promedios = categorias.map(cat => {
        const registros = datosGuardados.filter(d => d.categoria === cat);
        if (registros.length === 0) return 0;
        const suma = registros.reduce((acc, curr) => acc + curr.puntaje, 0);
        return (suma / registros.length).toFixed(1);
      });

      if (grafico) grafico.destroy();

      grafico = new Chart(graficoCanvas, {
        type: "bar",
        data: {
          labels: categorias,
          datasets: [{
            label: "Promedio de Puntajes",
            data: promedios,
            borderWidth: 1,
            backgroundColor: [
              "rgba(59,130,246,0.7)",
              "rgba(16,185,129,0.7)",
              "rgba(245,158,11,0.7)",
              "rgba(239,68,68,0.7)"
            ]
          }]
        },
        options: {
          scales: { y: { beginAtZero: true, max: 10 } }
        }
      });
    }

    // Inicializar tabla y gráfico
    actualizarTabla();
    actualizarGrafico();

    // Guardar nueva evaluación
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombrePaciente").value.trim();
      const categoria = document.getElementById("categoria").value;
      const puntaje = parseFloat(document.getElementById("puntaje").value);

      if (!nombre || isNaN(puntaje)) {
        alert("Por favor completa todos los campos.");
        return;
      }

      const nuevaEval = { 
        nombre, 
        categoria, 
        puntaje, 
        fecha: new Date().toLocaleDateString()
      };

      datosGuardados.push(nuevaEval);
      localStorage.setItem("evaluaciones", JSON.stringify(datosGuardados));

      form.reset();
      actualizarGrafico();
      actualizarTabla();
      alert("✅ Evaluación guardada correctamente");
    });
  });
  </script>
</body>
</html>
