document.addEventListener("DOMContentLoaded", () => {
  const btnGuardarEnviar = document.getElementById("btnGuardarEnviar");
  const tabla = document.querySelector("#tablaProductos tbody");
  const totalGeneral = document.getElementById("totalGeneral");

  btnGuardarEnviar.addEventListener("click", async () => {

    // 🧍 1. OBTENER USUARIO LOGUEADO
    const usuarioLogueado = localStorage.getItem("nombre");
    if (!usuarioLogueado) {
      alert("⚠️ No hay usuario logueado.");
      return;
    }

    // 📌 2. OBTENER ID DEL USUARIO POR NOMBRE 📌
    let idUsuario = null;
    try {
      const resUsuario = await fetch(`http://localhost:8080/api/registro/${usuarioLogueado}`);
      if (!resUsuario.ok) throw new Error("Usuario no encontrado");
      const dataUsuario = await resUsuario.json();
      idUsuario = dataUsuario.id;
      console.log("🆔 ID del usuario encontrado:", idUsuario);
    } catch (error) {
      console.error("❌ No se pudo obtener el usuario:", error);
      alert("No se encontró el usuario en el sistema.");
      return;
    }

    // 🧾 3. ARMAR ARRAY DE PRODUCTOS (ahora incluye precioUnitario)
    const productos = [];
    tabla.querySelectorAll("tr").forEach(fila => {
      const nombre = fila.querySelector(".producto").value.trim();
      const cantidad = parseInt(fila.querySelector(".cantidad").value);
      const opcion = document.querySelector(`#listaProductos option[value="${nombre}"]`);
      // Tomar el precio unitario desde el span correspondiente
      let precioUnitario = 0;
      const precioSpan = fila.querySelector(".precioTexto");
      if (precioSpan) {
        // Intentar leer el precio desde el dataset, si no, desde el texto
        if (precioSpan.dataset && precioSpan.dataset.precio) {
          precioUnitario = parseFloat(precioSpan.dataset.precio);
        } else {
          // Quitar puntos de miles y cambiar coma por punto
          precioUnitario = parseFloat(precioSpan.textContent.replace(/\./g, "").replace(/,/g, "."));
        }
      }
      // Tomar el subtotal desde la celda correspondiente
      let subtotal = 0;
      const subtotalCell = fila.querySelector(".subtotal");
      if (subtotalCell) {
        subtotal = parseFloat(subtotalCell.textContent.replace(/\./g, "").replace(/,/g, "."));
      }
      if (opcion) {
        productos.push({
          idProducto: opcion.dataset.id,
          cantidad: cantidad,
          precioUnitario: precioUnitario,
          subtotal: subtotal
        });
      }
    });

    if (productos.length === 0) {
      alert("⚠️ Debes agregar al menos un producto.");
      return;
    }

    // 💰 4. TOTAL
    const totalFactura = parseFloat(totalGeneral.textContent.replace(/\./g, "").replace(/,/g, "."));

    // � 4.5 FECHA DE LA FACTURA (desde el input). Si no hay fecha, usar hoy.
    const fechaInput = document.getElementById("fecha");
    const fechaFactura = (fechaInput && fechaInput.value) ? fechaInput.value : new Date().toISOString().split("T")[0];

    // �📦 5. JSON FINAL: añadimos la fecha a la factura y, por cada producto, añadimos la misma fecha y la cantidad
    const facturaJSON = {
      usuario: { id: idUsuario }, // 🔥 CLAVE CORRECTA
      fecha: fechaFactura,
      total: totalFactura,
      productos: productos.map(p => ({
        idProducto: p.idProducto,
        cantidad: p.cantidad,
        precioUnitario: p.precioUnitario,
        subtotal: p.subtotal
      }))
    };

    console.log("📤 JSON FINAL a enviar:", facturaJSON);

    // 🚀 6. ENVIAR POST
    try {
      const response = await fetch("http://localhost:8080/api/facturaAlqueria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(facturaJSON)
      });

      if (!response.ok) throw new Error("Error HTTP " + response.status);

      const data = await response.json();
      alert("Factura guardada con éxito ✔️");
      console.log("🧾 Respuesta del backend:", data);

      document.querySelector("#formFactura").reset();
      tabla.innerHTML = "";
      totalGeneral.textContent = "0";

    } catch (error) {
      console.error("❌ Error al guardar la factura:", error);
      alert("No se pudo guardar la factura.");
    }
  });
});
