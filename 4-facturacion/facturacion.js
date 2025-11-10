document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".btnDetalles");

  botones.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const fila = e.target.closest("tr");
      const siguiente = fila.nextElementSibling;

      // Si el siguiente es una fila de detalles, alternar visibilidad
      if (siguiente && siguiente.classList.contains("filaDetalles")) {
        siguiente.classList.toggle("oculto");

        // Cambia el símbolo del botón según el estado
        if (siguiente.classList.contains("oculto")) {
          e.target.textContent = "Detalles ▼";
        } else {
          e.target.textContent = "Detalles ▲";
        }
      }
    });
  });
});
