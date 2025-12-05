document.addEventListener("DOMContentLoaded", async () => {
  const tabla = document.querySelector("#tablaProductos tbody");
  const totalGeneral = document.querySelector("#totalGeneral");
  const btnAgregar = document.querySelector("#btnAgregar");
  const dataList = document.querySelector("#listaProductos");

  // ====== 1️⃣ FECHA AUTOMÁTICA ======
  const inputFecha = document.querySelector("#fecha");
  const hoy = new Date().toISOString().split("T")[0];
  inputFecha.value = hoy;
  inputFecha.setAttribute("readonly", true);

  // ====== 2️⃣ Cargar productos DESDE EL BACKEND ======
  let productosJSON = [];
  try {
    const response = await fetch("http://localhost:8080/api/productoAlqueria");
    if (!response.ok) throw new Error("Error HTTP: " + response.status);

    productosJSON = await response.json();

    productosJSON.forEach(prod => {
      const option = document.createElement("option");
      option.value = prod.nombre;
      option.dataset.precio = prod.precio;              // <-- Guardamos el número REAL Aquí
      option.dataset.id = prod.idProductoAlqueria;
      dataList.appendChild(option);
    });

    console.log("Productos cargados desde el backend:", productosJSON);
  } catch (error) {
    console.error("ERROR al cargar productos del backend:", error);
  }

  // 🧠 === Helper para convertir "1.234,56" => 1234.56 ===
  function parseLocaleNumber(str) {
    if (!str) return 0;
    str = str.replace(/\./g, "").replace(/,/g, ".");
    return parseFloat(str) || 0;
  }

  // ====== 3️⃣ ACTUALIZAR TOTALES ======
  function actualizarTotales() {
    let total = 0;
    tabla.querySelectorAll("tr").forEach((fila) => {
      const cantidad = parseFloat(fila.querySelector(".cantidad").value) || 0;

      const precioSpan = fila.querySelector(".precioTexto");

      // 🔹 Primero intento leer el precio REAL desde dataset
      let precio = precioSpan.dataset.precio
        ? parseFloat(precioSpan.dataset.precio)
        : parseLocaleNumber(precioSpan.textContent);

      const subtotal = cantidad * precio;

      // 🧾 Formato con puntos de miles para mostrar
      fila.querySelector(".subtotal").textContent = subtotal.toLocaleString("es-CO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      total += subtotal;
    });

    totalGeneral.textContent = total.toLocaleString("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  tabla.addEventListener("input", actualizarTotales);

  // ====== 4️⃣ AGREGAR FILA ======
  btnAgregar.addEventListener("click", () => {
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
      <td><input type="text" list="listaProductos" class="producto"></td>
      <td><input type="number" class="cantidad" value="1" min="1"></td>
      <td><span class="precioTexto" data-precio="0">0</span></td>
      <td class="subtotal">0</td>
      <td><button type="button" class="btnEliminar">X</button></td>
    `;
    tabla.appendChild(nuevaFila);
  });

  // ====== 🚫 NO PERMITE REPETIR PRODUCTO ======
  tabla.addEventListener("change", (e) => {
    if (e.target.classList.contains("producto")) {
      const input = e.target;
      const fila = input.closest("tr");
      const nombreProd = input.value.trim().toLowerCase();

      const repetido = Array.from(tabla.querySelectorAll(".producto"))
        .filter(p => p !== input)
        .some(p => p.value.trim().toLowerCase() === nombreProd);

      if (repetido) {
        alert(`⚠️ El producto "${input.value}" ya está en la tabla.`);
        input.value = "";
        fila.querySelector(".precioTexto").textContent = "0";
        fila.querySelector(".precioTexto").dataset.precio = "0";
        actualizarTotales();
        return;
      }

      // 🔍 Buscar en productos del backend
      const prod = productosJSON.find(p => p.nombre.toLowerCase() === nombreProd);

      const precioSpan = fila.querySelector(".precioTexto");
      if (prod) {
        precioSpan.dataset.precio = prod.precio; // guardamos el número REAL
        precioSpan.textContent = prod.precio.toLocaleString("es-CO", {  
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      } else {
        precioSpan.dataset.precio = "0";
        precioSpan.textContent = "0";
      }
      actualizarTotales();
    }
  });

  // ====== 🗑️ ELIMINAR FILA ======
  tabla.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnEliminar")) {
      e.target.closest("tr").remove();
      actualizarTotales();
    }
  });

  // ====== 🧹 CANCELAR → BORRAR TODO ======
  document.querySelector("#btnCancelar").addEventListener("click", () => {
    tabla.innerHTML = "";
    totalGeneral.textContent = "0";
  });
});
