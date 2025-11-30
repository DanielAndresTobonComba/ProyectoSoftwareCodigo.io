// hacerPedido.js

document.addEventListener("DOMContentLoaded", () => {
  const btnConfirmarCompra = document.getElementById("botonConfirmarCompra");
  const tablaFactura = document.querySelector(".facturaActual table tbody");
  const totalFacturaSpan = document.getElementById("valorTotalCasilla");

  btnConfirmarCompra.addEventListener("click", async () => {

    // 1️⃣ USUARIO LOGUEADO
    const usuarioLogueado = localStorage.getItem("nombre");
    if (!usuarioLogueado) {
      alert("⚠️ Debes iniciar sesión para confirmar la compra.");
      return;
    }

    // 2️⃣ OBTENER ID DEL USUARIO
    let idUsuario = null;
    try {
      const resUsuario = await fetch(`http://localhost:8080/api/registro/${usuarioLogueado}`);
      const dataUsuario = await resUsuario.json();
      idUsuario = dataUsuario.id;  // <-- ESTE SE ENVÍA EN EL JSON ABAJO
    } catch (err) {
      alert("No se pudo obtener el usuario.");
      return;
    }

    // 3️⃣ OBTENER PRODUCTOS DE LA TABLA
    const productos = [];
    tablaFactura.querySelectorAll("tr").forEach(fila => {
      // 🔥 SE LEE EL idProducto REAL:
      const idProducto = fila.getAttribute("data-idproducto");  // <---- CAMBIO IMPORTANTE

      if (!idProducto) return; // si no hay id, no lo agregamos

      const columnas = fila.querySelectorAll("td");

      const cantidad = parseInt(columnas[1].textContent.trim());
      const precioUnitario = parseFloat(columnas[2].textContent.replace(/\./g, "").replace(/,/g, "."));
      const subtotal = parseFloat(columnas[3].textContent.replace(/\./g, "").replace(/,/g, "."));

      productos.push({ idProducto, cantidad, precioUnitario, subtotal });
    });

    if (productos.length === 0) {
      alert("⚠️ Debes agregar productos antes de confirmar.");
      return;
    }

    // 4️⃣ TOTAL FACTURA
    const totalFactura = parseFloat(
      totalFacturaSpan.textContent.replace(/\./g, "").replace(/,/g, ".")
    );

    // 5️⃣ FECHA ACTUAL
    const fechaActual = new Date().toISOString().split("T")[0];

    // 6️⃣ JSON CORRECTO FINAL
    const pedidoJSON = {
      fecha: fechaActual,
      total: totalFactura,
      usuario: { id: idUsuario },  // 🔥 SE ENVÍA COMO OBJETO
      productos: productos         // 🔥 ENVÍA EL ARRAY CORRECTO
    };

    console.log("📤 JSON FINAL:", pedidoJSON);

    // 7️⃣ ENVIAR AL BACK
    try {
      const response = await fetch("http://localhost:8080/api/facturas/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedidoJSON)
      });

      if (!response.ok) throw new Error("Error HTTP: " + response.status);

      const data = await response.json();
      alert("Factura creada con éxito. N°: " + data.idFactura);
      limpiarFacturaVisual();

    } catch (error) {
      console.error("❌ Error:", error);
      alert("No se pudo guardar la factura.");
    }
  });
});

// 🔁 LIMPIAR FACTURA
function limpiarFacturaVisual() {
  document.querySelector(".facturaActual table tbody").innerHTML = "";
  document.getElementById("valorTotalCasilla").textContent = "0";
}
