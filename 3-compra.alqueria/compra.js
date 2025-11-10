document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.querySelector("#tablaProductos tbody");
  const totalGeneral = document.querySelector("#totalGeneral");
  const btnAgregar = document.querySelector("#btnAgregar");

  function actualizarTotales() {
    let total = 0;
    tabla.querySelectorAll("tr").forEach((fila) => {
      const cantidad = parseFloat(fila.querySelector(".cantidad").value) || 0;
      const precio = parseFloat(fila.querySelector(".precio").value) || 0;
      const subtotal = cantidad * precio;
      fila.querySelector(".subtotal").textContent = subtotal.toFixed(2);
      total += subtotal;
    });
    totalGeneral.textContent = total.toFixed(2);
  }

  tabla.addEventListener("input", actualizarTotales);

  btnAgregar.addEventListener("click", () => {
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
      <td><input type="text" class="producto"></td>
      <td><input type="number" class="cantidad" value="1" min="1"></td>
      <td><input type="number" class="precio" value="0" min="0"></td>
      <td class="subtotal">0</td>
      <td><button type="button" class="btnEliminar">X</button></td>
    `;
    tabla.appendChild(nuevaFila);
  });

  tabla.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnEliminar")) {
      e.target.closest("tr").remove();
      actualizarTotales();
    }
  });
});
