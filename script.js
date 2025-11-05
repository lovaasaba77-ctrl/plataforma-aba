// 🔐 LOGIN
const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", () => {
  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value.trim();
  const error = document.getElementById("loginError");

  if (usuario === "RUBEN" && clave === "ABA2025") {
    document.getElementById("login-container").classList.remove("active");
    document.getElementById("main-content").classList.remove("hidden");
  } else {
    error.textContent = "Usuario o contraseña incorrectos ❌";
  }
});

// 🧭 NAVEGACIÓN
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll("nav a").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    const sectionId = link.dataset.section;
    document.querySelectorAll("main section").forEach(s => s.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");
  });
});

// 🧮 CALCULAR EDAD
function calcularEdad(fechaNac) {
  const hoy = new Date();
  const nac = new Date(fechaNac);
  let edad = hoy.getFullYear() - nac.getFullYear();
  const m = hoy.getMonth() - nac.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
  return edad;
}

document.getElementById("fechaNac").addEventListener("change", e => {
  document.getElementById("edad").textContent = calcularEdad(e.target.value) + " años";
});
document.getElementById("fechaPadre").addEventListener("change", e => {
  document.getElementById("edadPadre").textContent = calcularEdad(e.target.value) + " años";
});

// 💾 GUARDAR DATOS
document.getElementById("clienteForm").addEventListener("submit", e => {
  e.preventDefault();
  const cliente = {
    iniciales: document.getElementById("iniciales").value,
    id: document.getElementById("idCliente").value,
    idioma: document.getElementById("idioma").value,
    fechaNac: document.getElementById("fechaNac").value,
    padre1: document.getElementById("padre1").value,
    convivencia: document.getElementById("convivencia").value
  };
  localStorage.setItem("cliente", JSON.stringify(cliente));
  alert("Cliente guardado correctamente ✅");
});

// 📊 GRÁFICO DE PROGRESO
const ctx = document.getElementById('progresoChart');
let progresoChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Atención', 'Comunicación', 'Interacción', 'Motricidad'],
    datasets: [{
      label: 'Progreso (%)',
      data: [20, 35, 40, 25],
      borderWidth: 1
    }]
  },
  options: {
    scales: { y: { beginAtZero: true, max: 100 } }
  }
});

document.getElementById("actualizarGrafico").addEventListener("click", () => {
  progresoChart.data.datasets[0].data = progresoChart.data.datasets[0].data.map(v => Math.min(100, v + Math.random() * 10));
  progresoChart.update();
});
