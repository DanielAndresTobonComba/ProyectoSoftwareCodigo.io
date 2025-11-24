
let valorTotal = 0;
let ids = [];
/* SECCION FACTURAS */

function mostrarFactura() {
    let factura = document.querySelector(".facturaActual");
    let contenedorFactura = document.querySelector("tbody");
    let botonCompra = document.getElementById("botonConfirmarCompra");

    if (contenedorFactura.style.visibility == "visible") {
        contenedorFactura.style.visibility = "hidden";
        botonCompra.style.visibility = "hidden";
        factura.style.visibility = "hidden";
    } else {
        contenedorFactura.style.visibility = "visible";
        botonCompra.style.visibility = "visible";
        factura.style.visibility = "visible";
    }
}

function crearFactura(tarjeta, cantidad, accion) {
    let contenedor = document.querySelector(".facturaActual");
    let tabla = document.querySelector("table");

    let nombreProducto = tarjeta.children[0].children[0].textContent;
    let casillaValorTotal = document.getElementById("valorTotalCasilla");

    fetch("productos.json")
        .then(data => data.json())
        .then(json => {
            let producto = json.productos.find(p => p.nombre === nombreProducto);
            if (!producto) return;

            let id = producto.id;
            let precio = producto.precio;
            let fila = document.getElementById(id);

            if (accion === "sumar") {
                if (!fila) {
                    fila = tabla.insertRow();
                    fila.setAttribute("id", id);

                    let celdaNombre = fila.insertCell(0);
                    let celdaCantidad = fila.insertCell(1);
                    let celdaPrecio = fila.insertCell(2);

                    celdaNombre.textContent = producto.nombre;
                    celdaCantidad.textContent = 1;
                    celdaPrecio.textContent = precio;

                    contenedor.prepend(tabla);
                    ids.push(id);
                } else {
                    let celdaCantidad = fila.children[1];
                    let celdaPrecio = fila.children[2];

                    let nuevaCantidad = parseInt(celdaCantidad.textContent) + 1;
                    celdaCantidad.textContent = nuevaCantidad;
                    celdaPrecio.textContent = (nuevaCantidad * precio).toFixed(2);
                }

                valorTotal += precio;
                casillaValorTotal.textContent = valorTotal.toFixed(2);

            } else if (accion === "restar" && fila) {
                let celdaCantidad = fila.children[1];
                let celdaPrecio = fila.children[2];

                let nuevaCantidad = parseInt(celdaCantidad.textContent) - 1;

                if (nuevaCantidad <= 0) {
                    fila.remove();
                    ids = ids.filter(item => item !== id);
                } else {
                    celdaCantidad.textContent = nuevaCantidad;
                    celdaPrecio.textContent = (nuevaCantidad * precio).toFixed(2);
                }

                valorTotal -= precio;
                if (valorTotal < 0) valorTotal = 0;
                casillaValorTotal.textContent = valorTotal.toFixed(2);
            }
        });
}

function identificar(boton) {
    let padreCercano = boton.parentElement;

    if (padreCercano.children.length <= 1) {
        boton.style.display = "none";
        let seccionBotones = `
            <button onclick="restar(this)" >Retirar</button>
            <p>0</p>
            <button onclick="sumar(this)" >Añadir</button>
        `;

        let div = document.createElement("div");
        div.setAttribute("class", "seccionBotones");
        div.innerHTML = seccionBotones;
        boton.parentElement.appendChild(div);
    } else {
        boton.style.display = "flex";
    }
}

/* 🔥 NUEVO: OBTENER PRODUCTOS DE LA FACTURA */
function obtenerProductosFactura() {
    const filas = document.querySelectorAll('.facturaActual table tr');
    let productos = [];

    filas.forEach((fila, i) => {
        if (i === 0) return; // saltar encabezado
        const id = fila.getAttribute("id");
        const cantidad = parseInt(fila.children[1].textContent);

        productos.push({
            id_producto: id,
            cantidad: cantidad
        });
    });

    return productos;
}

/* 🔥 NUEVO: ENVIAR FACTURA AL BACKEND */
function confirmarCompra() {
    let usuario = localStorage.getItem("nombre");

    // Si es un objeto JSON, lo convierto. Si es solo un string, lo dejo como está
    try {
        usuario = JSON.parse(usuario);   // Si falla, se queda como string.
    } catch (e) {}

    if (!usuario) {
        mostrarAlertaBonita("Debe iniciar sesión para comprar", "#f44336");
        return;
    }

    // Si es un string tipo "Daniel", lo pongo como { nombre: "Daniel" }
    if (typeof usuario === "string") {
        usuario = { nombre: usuario };
    }

    const productosFactura = obtenerProductosFactura();
    if (productosFactura.length === 0) {
        mostrarAlertaBonita("No hay productos en la factura", "#f44336");
        return;
    }

    const total = document.getElementById("valorTotalCasilla").textContent;

    const facturaJSON = {
        nombreUsuario: usuario.nombre,  // 🔥 Ya no falla
        total: total,
        productos: productosFactura
    };

    console.log("Se enviará al backend:", facturaJSON);

    // DEJÉ EL FETCH COMENTADO HASTA QUE TENGAS BACKEND
    
    fetch("http://localhost:8080/facturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(facturaJSON)
    })
    .then(res => res.json())
    .then(data => {
        mostrarAlertaBonita("Factura guardada exitosamente");
        console.log("Respuesta del backend:", data);
        eliminarTabla();
    })
    .catch(error => console.error("Error al enviar factura:", error));
    
}


/* LIMPIAR TABLA DESPUÉS DE ENVIAR AL BACKEND */
function eliminarTabla() {
    const seccion = document.querySelector('.facturaActual');
    const tabla = seccion.querySelector('table');
    const filas = tabla.querySelectorAll('tr');

    if (filas.length <= 1) {
        mostrarAlertaBonita("No hay productos en la factura", "#f44336");
        return;
    }

    seccion.style.visibility = 'hidden';
    for (let i = filas.length - 1; i > 0; i--) {
        tabla.deleteRow(i);
    }

    document.getElementById('valorTotalCasilla').textContent = '0';
}

/* ALERTAS BONITAS */
function mostrarAlertaBonita(mensaje, colorFondo = "#4CAF50") {
    const alerta = document.createElement('div');
    alerta.textContent = mensaje;
    alerta.style.position = 'fixed';
    alerta.style.top = '50%';
    alerta.style.left = '50%';
    alerta.style.transform = 'translate(-50%, -50%)';
    alerta.style.backgroundColor = colorFondo;
    alerta.style.color = 'white';
    alerta.style.padding = '20px 40px';
    alerta.style.fontSize = '20px';
    alerta.style.borderRadius = '10px';
    alerta.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    alerta.style.zIndex = '9999';
    alerta.style.textAlign = 'center';

    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 2500);
}
