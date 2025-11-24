document.addEventListener("DOMContentLoaded", () => {
  const btnGuardarEnviar = document.getElementById("btnGuardarEnviar");
  const tabla = document.querySelector("#tablaProductos tbody");
  const totalGeneral = document.getElementById("totalGeneral");

  btnGuardarEnviar.addEventListener("click", async () => {

    // 🧍 1. OBTENER USUARIO LOGUEADO DESDE LOCALSTORAGE
    const usuarioLogueado = localStorage.getItem("nombre");  
    if (!usuarioLogueado) {
      alert("⚠️ No hay usuario logueado.");
      return;
    }

    // 🧾 2. ARMAR ARRAY DE PRODUCTOS DE LA TABLA
    const productos = [];
    tabla.querySelectorAll("tr").forEach(fila => {
      const nombre = fila.querySelector(".producto").value.trim();
      const cantidad = parseInt(fila.querySelector(".cantidad").value);
      const precio = fila.querySelector(".precioTexto").dataset.precio;  // el REAL

      // Buscar en datalist el ID del producto
      const opcion = document.querySelector(`#listaProductos option[value="${nombre}"]`);
      if (opcion) {
        productos.push({
          idProducto: opcion.dataset.id,
          cantidad: cantidad
        });
      }
    });

    if (productos.length === 0) {
      alert("⚠️ Debes agregar al menos un producto.");
      return;
    }

    // 💰 3. TOTAL
    const totalFactura = parseFloat(totalGeneral.textContent.replace(/\./g, "").replace(/,/g, "."));

    // 📦 4. JSON FINAL PARA ENVIAR
    const facturaJSON = {
      nombreUsuario: usuarioLogueado,   // BACK buscará idUsuario con esto
      total: totalFactura,
      productos: productos
    };

    console.log("📤 JSON a enviar:", facturaJSON);

    // 🚀 5. ENVIAR POST AL BACKEND
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

      // 🧹 Limpiar si quieres después de guardar
      document.querySelector("#formFactura").reset();
      tabla.innerHTML = "";
      totalGeneral.textContent = "0";

    } catch (error) {
      console.error("❌ Error al guardar la factura:", error);
      alert("No se pudo guardar la factura.");
    }
  });
});


/* {
  "nombreUsuario": "juan",
  "total": 75000,
  "productos": [
    { "idProducto": "P001", "cantidad": 3 },
    { "idProducto": "P005", "cantidad": 1 }
  ]
} */