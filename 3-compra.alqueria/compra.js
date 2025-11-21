document.addEventListener("DOMContentLoaded", async () => {
  const tabla = document.querySelector("#tablaProductos tbody");
  const totalGeneral = document.querySelector("#totalGeneral");
  const btnAgregar = document.querySelector("#btnAgregar");
  const dataList = document.querySelector("#listaProductos");

  // ====== 1️⃣ FECHA AUTOMÁTICA ======
  const inputFecha = document.querySelector("#fecha");
  const hoy = new Date().toISOString().split("T")[0]; // “2025-02-13”
  inputFecha.value = hoy;
  inputFecha.setAttribute("readonly", true);

  // ====== 2️⃣ Cargar productos desde JSON ======
  let productosJSON = [];
  try {
    const response = await fetch("productos.json");
    productosJSON = await response.json();

    productosJSON.forEach(prod => {
      const option = document.createElement("option");
      option.value = prod.nombre;
      dataList.appendChild(option);
    });
  } catch (error) {
    console.error("ERROR al cargar productos.json:", error);
  }

  // ====== 3️⃣ ACTUALIZAR TOTALES ======
  function actualizarTotales() {
    let total = 0;
    tabla.querySelectorAll("tr").forEach((fila) => {
      const cantidad = parseFloat(fila.querySelector(".cantidad").value) || 0;
      const precio = parseFloat(fila.querySelector(".precioTexto").textContent) || 0;
      const subtotal = cantidad * precio;
      fila.querySelector(".subtotal").textContent = subtotal.toFixed(2);
      total += subtotal;
    });
    totalGeneral.textContent = total.toFixed(2);
  }

  tabla.addEventListener("input", actualizarTotales);

  // ====== 4️⃣ AGREGAR FILA ======
  btnAgregar.addEventListener("click", () => {
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
      <td><input type="text" list="listaProductos" class="producto"></td>
      <td><input type="number" class="cantidad" value="1" min="1"></td>
      <td><span class="precioTexto">0</span></td>
      <td class="subtotal">0</td>
      <td><button type="button" class="btnEliminar">X</button></td>
    `;
    tabla.appendChild(nuevaFila);
  });

  // ====== ❌ NO PERMITE REPETIR PRODUCTO ======
  tabla.addEventListener("change", (e) => {
    if (e.target.classList.contains("producto")) {
      const input = e.target;
      const fila = input.closest("tr");
      const nombreProd = input.value.trim().toLowerCase();

      // 🔍 Verificar si ya EXISTE en otra fila
      const repetido = Array.from(tabla.querySelectorAll(".producto"))
        .filter(p => p !== input) // evitar que se compare consigo mismo
        .some(p => p.value.trim().toLowerCase() === nombreProd);

      if (repetido) {
        alert(`⚠️ El producto "${input.value}" ya está en la tabla.`);
        input.value = ""; // lo borra
        fila.querySelector(".precioTexto").textContent = "0";
        actualizarTotales();
        return;
      }

      // Si existe en JSON → poner precio
      const prod = productosJSON.find(p => p.nombre.toLowerCase() === nombreProd);
      fila.querySelector(".precioTexto").textContent = prod ? prod.precio : "0";
      actualizarTotales();
    }
  });

  // ====== 5️⃣ ELIMINAR FILA ======
  tabla.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnEliminar")) {
      e.target.closest("tr").remove();
      actualizarTotales();
    }
  });

  // ====== 6️⃣ CANCELAR → BORRAR TODO ======
  document.querySelector("#btnCancelar").addEventListener("click", () => {
    tabla.innerHTML = "";
    totalGeneral.textContent = "0";
  });
});
