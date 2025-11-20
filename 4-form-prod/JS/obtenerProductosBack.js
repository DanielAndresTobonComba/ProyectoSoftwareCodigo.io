function insertarProductos() {

    console.log("Insertando productos desde el backend...");
    
    let contenedor = document.querySelector(".productos");
    contenedor.innerHTML = ``;

    // 🔗 CAMBIA ESTE ENDPOINT POR EL TUYO REAL
    const url = "http://localhost:8080/api/productos";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la petición: " + response.status);
            }
            return response.json(); // Convertir a JSON
        })
        .then(json => {

            // Asegurar que json.productos exista
            if (!json.productos || json.productos.length === 0) {
                contenedor.innerHTML = `<p>No hay productos disponibles.</p>`;
                return;
            }

            json.productos.forEach(producto => {
                let elemento = `
                <div class="tarjeta">
                    <div class="textoTarjeta">
                        <p>${producto.nombre}</p>
                    </div>

                    <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}">

                    <div class="detalleProducto">
                        <button class="botonDetalles" onclick="mostrar(this)">Detalles</button>

                        <section class="detalles">
                            <p>Tamaño: ${producto.caracteristicas}</p>
                            <p>Precio: $${producto.precio}</p>
                        </section>
                    </div>

                    <div class="seccionBotonOrdenar">
                        <button id="botonOrdenar" onclick="identificar(this)">Ordenar</button>
                    </div>
                </div>
                `
                contenedor.innerHTML += elemento;
            });
        })
        .catch(error => {
            console.error("Error obteniendo los productos:", error);
            contenedor.innerHTML = `<p>Error al cargar los productos.</p>`;
        });
}


insertarProductos()