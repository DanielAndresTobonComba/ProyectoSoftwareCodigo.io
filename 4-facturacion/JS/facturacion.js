/* document.addEventListener("DOMContentLoaded", async () => {
  const tabla = document.getElementById("tablaHistorial").querySelector("tbody");

  // Cargar datos desde facturas.json
  let facturas = [];
  try {
    const res = await fetch("./facturasFront.json");
    if (!res.ok) throw new Error("No se pudo cargar facturas.json");
    facturas = await res.json();
  } catch (err) {
    console.error("Error cargando facturas:", err);
    tabla.innerHTML = '<tr><td colspan="6">No se pudieron cargar las facturas.</td></tr>';
    return;
  }

  // Renderizar filas de facturas y detalles
  tabla.innerHTML = "";
  facturas.forEach((factura, idx) => {
    // Fila principal
    const filaFactura = document.createElement("tr");
    filaFactura.className = "filaFactura";
    filaFactura.innerHTML = `
      <td>${formatearFecha(factura.fecha)}</td>
      <td>${factura.numeroFactura}</td>
      <td>${factura.cliente}</td>
      <td>$${factura.total.toLocaleString("es-CO")}</td>
      <td><button class="btnDetalles">Detalles ▼</button></td>
    `;
    tabla.appendChild(filaFactura);

    // Fila de detalles (oculta por defecto)
    const filaDetalles = document.createElement("tr");
    filaDetalles.className = "filaDetalles oculto";
    filaDetalles.innerHTML = `
      <td colspan="5">
        <div class="detalleFactura">
          <h4>Detalles</h4>
          <table class="tablaInterna">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${factura.detalles.map(det => `
                <tr>
                  <td>${det.producto}</td>
                  <td>${det.descripcion}</td>
                  <td>${det.cantidad}</td>
                  <td>$${det.precioUnitario.toLocaleString("es-CO")}</td>
                  <td>$${det.subtotal.toLocaleString("es-CO")}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </td>
    `;
    tabla.appendChild(filaDetalles);
  });

  // Delegar eventos para los botones de detalles
  tabla.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnDetalles")) {
      const fila = e.target.closest("tr");
      const siguiente = fila.nextElementSibling;
      if (siguiente && siguiente.classList.contains("filaDetalles")) {
        siguiente.classList.toggle("oculto");
        if (siguiente.classList.contains("oculto")) {
          e.target.textContent = "Detalles ▼";
        } else {
          e.target.textContent = "Detalles ▲";
        }
      }
    }
  });

  function formatearFecha(fechaStr) {
    // Espera formato yyyy-mm-dd
    const [y, m, d] = fechaStr.split("-");
    return `${d}/${m}/${y}`;
  }
});
 */