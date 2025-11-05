<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Plataforma ABA</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-gray-100 text-gray-800">
  <!-- Navegación -->
  <nav class="bg-blue-700 text-white p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold">Plataforma ABA</h1>
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
  </section>

  <script src="script.js"></script>
</body>
</html>
