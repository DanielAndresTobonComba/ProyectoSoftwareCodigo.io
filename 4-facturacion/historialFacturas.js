// Archivo: historialFacturas.js

document.addEventListener("DOMContentLoaded", () => {
    const nombre = localStorage.getItem("nombre");

    console.log("Usuario logueado:", nombre);

    if (nombre) {
        // Petición GET con el nombre en la URL
        fetch(`http://localhost:8080/api/facturaAlqueria/historialFacturas/${nombre}`)
            .then(res => {
                if (!res.ok) throw new Error("Error en la petición " + res.status);
                return res.json();
            })
            .then(data => {
                console.log("Facturas recibidas:", data);

                // Renderizar en la tabla
                renderTablaFacturas(data);
            })
            .catch(err => {
                console.error("Error obteniendo historial:", err);
            });
    } else {
        console.log("No hay usuario logueado en localStorage");
    }
});

function renderTablaFacturas(facturas) {
    const tbody = document.querySelector("#tablaHistorial tbody");
    tbody.innerHTML = ""; // Limpiar tabla antes de llenarla

    facturas.forEach(factura => {
        const fila = document.createElement("tr");
        fila.classList.add("filaFactura");

        fila.innerHTML = `
            <td>${factura.fecha ? factura.fecha : "Sin fecha"}</td>
            <td>${factura.numeroFactura}</td>
            <td>${factura.cliente}</td>
            <td>$${factura.total.toLocaleString("es-CO")}</td>
            <td><button class="btnDetalles">Detalles ▼</button></td>
        `;

        tbody.appendChild(fila);

        // fila detalles (oculta al inicio)
        const filaDetalles = document.createElement("tr");
        filaDetalles.classList.add("filaDetalles", "oculto");

        let detallesHTML = `
            <td colspan="6">
                <div class="detalleFactura">
                    <h4>Detalles</h4>
                    <table class="tablaInterna">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        factura.detalles.forEach(det => {
            detallesHTML += `
                <tr>
                    <td>${det.producto}</td>
                    <td>${det.cantidad}</td>
                    <td>$${det.precioUnitario.toLocaleString("es-CO")}</td>
                    <td>$${det.subtotal.toLocaleString("es-CO")}</td>
                </tr>
            `;
        });

        detallesHTML += `</tbody></table></div></td>`;
        filaDetalles.innerHTML = detallesHTML;
        tbody.appendChild(filaDetalles);
    });

    // Activar botones
    activarBotonesDetalles();
}

function activarBotonesDetalles() {
    const botones = document.querySelectorAll(".btnDetalles");

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            const filaFactura = btn.closest("tr");
            const filaDetalles = filaFactura.nextElementSibling;

            filaDetalles.classList.toggle("oculto");
            btn.textContent = filaDetalles.classList.contains("oculto") ? "Detalles ▼" : "Detalles ▲";
        });
    });
}
