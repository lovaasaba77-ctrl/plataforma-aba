// Esperar a que el documento cargue
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("evaluacionForm");
  const graficoCanvas = document.getElementById("graficoProgreso");
  let grafico;

  // Cargar datos almacenados
  const datosGuardados = JSON.parse(localStorage.getItem("evaluaciones")) || [];

  // Función para actualizar el gráfico
  function actualizarGrafico() {
    const categorias = ["Atención", "Comunicación", "Motricidad", "Social"];
    const promedios = categorias.map(cat => {
      const registros = datosGuardados.filter(d => d.categoria === cat);
      if (registros.length === 0) return 0;
      const suma = registros.reduce((acc, curr) => acc + curr.puntaje, 0);
      return (suma / registros.length).toFixed(1);
    });

    if (grafico) grafico.destroy(); // Reiniciar gráfico anterior

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
          ],
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 10 }
        }
      }
    });
  }

  // Inicializar gráfico al cargar
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

    const nuevaEval = { nombre, categoria, puntaje, fecha: new Date().toLocaleDateString() };
    datosGuardados.push(nuevaEval);
    localStorage.setItem("evaluaciones", JSON.stringify(datosGuardados));

    form.reset();
    actualizarGrafico();
    alert("✅ Evaluación guardada correctamente");
  });
});
