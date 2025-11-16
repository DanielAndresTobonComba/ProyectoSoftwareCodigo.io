let ids = []
let valorTotal = 0



function restar(boton) {
    let tarjeta = boton.closest('.tarjeta');
    let seccionBotonOrdenar = boton.closest('.seccionBotonOrdenar');
    let botonOrdenar = seccionBotonOrdenar.querySelector('#botonOrdenar');

    let padre = boton.parentElement;
    let parrafo = padre.querySelector('p'); // <p> con el número
    let numero = parseInt(parrafo.textContent, 10);
    let accion = "restar";

    if (numero <= 1) {
        // Quita contador y muestra botón "Ordenar"
        padre.remove();
        parrafo.textContent = 0;
        botonOrdenar.style.display = "block";
    } else {
        numero--;
        parrafo.textContent = numero;
    }

    crearFactura(tarjeta, numero, accion);
}

function sumar(boton) {
    let tarjeta = boton.closest('.tarjeta');
    let padre = boton.parentElement;
    let parrafo = padre.querySelector('p');
    let numero = parseInt(parrafo.textContent, 10);
    numero++;
    parrafo.textContent = numero;

    let accion = "sumar";
    crearFactura(tarjeta, numero, accion);
}


function cerrarHistorial(){


    let seccionHistorial = document.getElementById("contenedorHistorial")
    let botonSumar = document.getElementById("botonSumar")
    let botonRestar = document.getElementById("botonRestar")

    seccionHistorial.style.visibility = "hidden"
    botonRestar.style.visibility = "hidden"
    botonSumar.style.visibility = "hidden"

    
}


function historialFacturas(accion = "") {

    let seccionHistorial = document.getElementById("contenedorHistorial")
    let contenedor = document.getElementById("factura")
    let contenedorProductos = document.getElementById("facturaProductos")

    seccionHistorial.style.visibility = "visible"

    let nombreUsuario = localStorage.getItem("nombre")
    let botonSumar = document.getElementById("botonSumar")
    let botonRestar = document.getElementById("botonRestar")

    botonRestar.style.visibility = "visible"
    botonSumar.style.visibility = "visible"

    


    fetch("../usuarios.json")
        .then(data => data.json())
        .then(json => {

            
            
            if (accion == "" || accion == "sumar") {

                json.usuarios.forEach(usuario => {
                    if (usuario.nombre == nombreUsuario) {

                        let ident = usuario.id

                        //console.log(usuario)
                        //console.log(ident)

                        fetch(`http://localhost:3000/facturas/?_embed=${ident}`)

                            .then(data => data.json())
                            .then(json => {
                                console.log("longitud json: " + json.length)

                                let valorTotal = 0

                                if (json.length == 0){
                                    let titulo = `<h2>No tiene ninguna factura</h2>`
                                    contenedor.innerHTML = titulo
                                    return
                                }
                                

                                if( numero >= json.length - 1){
                                    botonSumar.style.visibility = "hidden"
                                   
                                }else if(numero > 0){
                                    botonRestar.style.visibility = "visible"
                                    botonSumar.style.visibility = "visible"
                                }

                                
                                console.log("numero: mas " + numero)

                                let elemento = `
    
                                <p>Factura Numero: <span>${json[numero].idFactura}</span></p>
                                <p>Comprador: <span>${json[numero].comprador}</span></p>
                                <p>Id comprador: <span>${json[numero].id}</span></p>
                                <p>Detalles</p>
    
                                
                                
                                `

                                contenedor.innerHTML = elemento


                                let productos = ""

                                for (let i = 0; i < json[numero].datalles.length; i++) {

                                    fila = `
    
                                    
                                    <p>-- <span>${json[numero].datalles[i].cantidadProducto}</span> <span>${json[numero].datalles[i].nombreProducto}:</span> <span>$${json[numero].datalles[i].valorUnidad}</span></p>`

                                    productos += fila
                                    valorTotal += json[numero].datalles[i].cantidadProducto * json[numero].datalles[i].valorUnidad

                                }

                                let filaValorTotal = `<p>Valor Total: <span>$ ${valorTotal}</span></p>`
                                

                                console.log(productos)

                                contenedorProductos.innerHTML = productos
                                contenedorProductos.innerHTML += filaValorTotal
                                valorTotal = 0

                                numero++

                            })

                    }
                })

                

            }else{ 

                numero--

                if(numero < 0){
                    botonRestar.style.visibility = "hidden"
                    
                    numero++
    
                }else{
                    botonSumar.style.visibility = "visible"
                }
                
                console.log("numero menos: " + numero)

                json.usuarios.forEach(usuario => {
                    if (usuario.nombre == nombreUsuario) {

                        let ident = usuario.id

                        //console.log(usuario)
                        //console.log(ident)

                        fetch(`http://localhost:3000/facturas/?_embed=${ident}`)

                            .then(data => data.json())
                            .then(json => {
                                console.log(json)

                                let elemento = `
    
                                <p>Factura Numero: <span>${json[numero].idFactura}</span></p>
                                <p>Comprador: <span>${json[numero].comprador}</span></p>
                                <p>Id comprador: <span>${json[numero].id}</span></p>
                                <p>Detalles</p>
    
                                
                                
                                `

                                contenedor.innerHTML = elemento


                                let productos = ""

                                for (let i = 0; i < json[numero].datalles.length; i++) {

                                    fila = `
    
                                    
                                    <p>-- <span>${json[numero].datalles[i].cantidadProducto}</span> <span>${json[numero].datalles[i].nombreProducto}:</span> <span>$${json[numero].datalles[i].valorUnidad}</span></p>`

                                    productos += fila

                                }

                                console.log(productos)

                                contenedorProductos.innerHTML = productos

                            })

                    }
                })
                

            }


        })



}

console.log("Nombre: " + localStorage.getItem("nombre"))
console.log("Contraseña: " + localStorage.getItem("contraseña"))

let nombreUsuario = localStorage.getItem("nombre")
let contraseñaUsuario = localStorage.getItem("contraseña")

let aviso = document.getElementById("aviso")

if (nombreUsuario == null || contraseñaUsuario == null) {

    aviso.style.visibility = "visible"

} else {

    aviso.style.visibility = "hidden"
}

function mostrarFactura() {
    let factura = document.querySelector(".facturaActual")
    let contenedorFactura = document.querySelector("tbody")
    let botonCompra = document.getElementById("botonConfirmarCompra")

    if (contenedorFactura.style.visibility == "visible") {
        contenedorFactura.style.visibility = "hidden"
        botonCompra.style.visibility = "hidden"
        factura.style.visibility = "hidden"
    } else {
        contenedorFactura.style.visibility = "visible"
        botonCompra.style.visibility = "visible"
        factura.style.visibility = "visible"
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
                    // No existe aún, crear fila
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
                    // Ya existe, aumentar cantidad
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






function filtrar(contenido) {
    console.log("entre a filtrar con : " + contenido)
    let contenedor = document.querySelector(".productos")
    contenedor.innerHTML = `
            `

    fetch("productos.json")
        .then(data => data.json())
        .then(json => {
            json.productos.forEach(producto => {

                if (producto.nombre.includes(contenido)) {

                    let elemento = `

                    <div class="tarjeta" >

                        <div class="textoTarjeta">
                            
                            <p>${producto.nombre}</p>
                            
                        </div>

                    
                        <img src="${producto.imagen}" alt="">
                        

                        

                        <div class="detalleProducto">
                            
                            <button class="botonDetalles" onclick="mostrar(this)" >Detalles </button>

                            <section
                            
                                class="detalles" >
                                <p>Tamaño: ${producto.caracteristicas}</p>

                                <p>Precio: $ ${producto.precio}</p>

                                <p></p>

                            </section>
                        
                            
                        </div>
                        

                        <div class="seccionBotonOrdenar">

                            <button id="botonOrdenar" onclick="identificar(this)" >Ordenar</button>

            
                        </div>

                    </div>
                    `
                    contenedor.innerHTML += elemento

                } else if (contenedor.innerHTML === "") {
                    contenedor.innerHTML = ` 
                   <h1>No hay productos con su preferencias de filtro</h1>`
                }
            })
        })

}

function datos() {
    let entrada = document.getElementById("busqueda")
    let datos = entrada.value
    if (datos != "") {
        filtrar(datos)
    } else {
        insertarProductos()
    }



}


function insertarProductos() {

    let contenedor = document.querySelector(".productos")
    contenedor.innerHTML = ``
    fetch("productos.json")
        .then(data => data.json())
        .then(json => {

            json.productos.forEach(producto => {
                //console.log(producto)

                let elemento = `

                <div class="tarjeta" >

                    <div class="textoTarjeta">
                        
                        <p>${producto.nombre}</p>
                        
                    </div>

                   
                    <img src="${producto.imagen}" alt="">
                    

                    

                    <div class="detalleProducto">
                        
                        <button class="botonDetalles" onclick="mostrar(this)" >Detalles </button>

                        <section
                         
                            class="detalles" >
                            <p>Tamaño: ${producto.caracteristicas}</p>

                            <p>Precio: $ ${producto.precio}</p>

                            <p></p>

                        </section>
                       
                        
                    </div>
                    

                    <div class="seccionBotonOrdenar">

                        <button id="botonOrdenar" onclick="identificar(this)" >Ordenar</button>

        
                    </div>

                </div>
            `
                contenedor.innerHTML += elemento

            })
        })





}




function identificar(boton) {
    //console.log(boton);
    let padre = boton.parentElement.parentElement;

    //console.log(padre);
    let padreCercano = boton.parentElement

    //console.log(padreCercano)

    if (padreCercano.children.length <= 1) {
        numero = 0
        boton.style.display = "none"
        let seccionBotones =
            `
            <button onclick="restar(this)" >Retirar</button>
            <p>0</p>
            <button onclick="sumar(this)" >Añadir</button>
        `;

        let div = document.createElement("div");

        div.setAttribute("class", "seccionBotones");
        div.innerHTML = seccionBotones; // Utiliza innerHTML para asignar el contenido HTML

        boton.parentElement.appendChild(div); // Usa parentElement para acceder al padre del botón

        // Alternativamente, si quieres agregar el div como el último hijo del padre, puedes usar:
        // padre.appendChild(div);



    } else {
        boton.style.display = "flex"
    }



}


function eliminarTabla() {
    const seccion = document.querySelector('.facturaActual');
    const tabla = seccion.querySelector('table');
    const filas = tabla.querySelectorAll('tr');

    // Validar si hay al menos un producto (más de 1 fila = cabecera + producto)
    if (filas.length <= 1) {
        mostrarAlertaBonita("No hay productos en la factura", "#f44336"); // rojo
        return;
    }

    // Si hay productos:
    seccion.style.visibility = 'hidden';

    // Borrar filas (excepto encabezado)
    for (let i = filas.length - 1; i > 0; i--) {
        tabla.deleteRow(i);
    }

    // Resetear total
    document.getElementById('valorTotalCasilla').textContent = '0';

    // Mostrar alerta
    mostrarAlertaBonita("Factura completada", "#4CAF50"); // verde
}

// Función para mostrar alerta bonita en el centro
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

    setTimeout(() => {
        alerta.remove();
    }, 2500);
}


function enviar(caracterTamaño, caracterIdent, nombre, productos) {

    fetch(`http://localhost:3000/facturas/`, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({

            id: caracterIdent,
            idFactura: caracterTamaño,
            comprador: nombre,
            datalles: productos,


        })
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.error("Error !!!" + error));
}

/* function generarFactura() {

    let productos = []
    let datos = new Object()

    console.log("entre a generar factura")

    let contenedor = document.querySelector("tbody")
    let hijos = contenedor.children

    let nombreUsuario = localStorage.getItem("nombre")


    console.log("Contraseña: " + localStorage.getItem("contraseña"))


    for (let i = 1; i < hijos.length; i++) {



        console.log(hijos[i].children)

        let fila = hijos[i].children

        let nombre = fila[0].textContent
        let cantidad = fila[1].textContent
        let precio = fila[2].textContent

        console.log("Nombre: " + nombre)
        console.log("Cantidad: " + cantidad)
        console.log("Precio: " + precio)

        



        datos = {
            nombreProducto: nombre,
            cantidadProducto: Number(cantidad),
            valorUnidad: precio / cantidad,
            precioTotal: Number(precio)

        }

        productos.push(datos)

        datos = {}


    }

    console.log(productos)

    if(productos.length == 0){
        return
    }

    fetch("../usuarios.json")

        .then(data => data.json())
        .then(json => {


            json.usuarios.forEach(usuario => {

                if (usuario.nombre === nombreUsuario) {

                    let tamaño = json.facturas.length
                    let caracterTamaño = tamaño.toString()

                    let ident = usuario.id

                    let caracterIdent = ident.toString()
                    let nombre = usuario.nombre

                    enviar(caracterTamaño, caracterIdent, nombre, productos)


                }


            })
        })

} */

/* function crearFactura(tarjeta, cantidad, accion) {

    console.log(accion)
    let contenedor = document.querySelector(".facturaActual");
    let tabla = document.querySelector("table");

    let hijos = tarjeta.children;
    let padre = hijos[0];
    let parrafo = padre.children;
    let nombreProducto = parrafo[0].textContent;
    let tbody = document.querySelector("tbody")

    let casillaValorTotal = document.getElementById("valorTotalCasilla")

    fetch("productos.json")
        .then(data => data.json())
        .then(json => {

            if (accion === "sumar") {
                //tbody.style.visibility = "visible"
                json.productos.forEach(producto => {

                    if (producto.nombre == nombreProducto) {

                        let id = producto.id

                        if (ids.includes(id) == false) {

                            let codigo = producto.id;
                            let nombre = producto.nombre;
                            let precio = producto.precio;


                            let fila = tabla.insertRow();

                            let celdaNombre = fila.insertCell(0);
                            let celdaCantidad = fila.insertCell(1);
                            let celdaPrecio = fila.insertCell(2);


                            celdaNombre.textContent = nombre;
                            celdaPrecio.textContent = precio * cantidad;
                            celdaCantidad.textContent = cantidad;

                            valorTotal += precio
                            casillaValorTotal.textContent = valorTotal

                            fila.setAttribute("id", codigo)
                            contenedor.prepend(tabla);
                            console.log("No esta en el arreglo")
                            ids.push(id)

                        } else {
                            let precio = producto.precio;
                            let fila = document.getElementById(id)
                            let casillaPrecio = fila.children[2]
                            let cant = fila.children[1]

                            let nuevoPrecio = precio * cantidad;

                            casillaPrecio.textContent = nuevoPrecio;

                            cant.textContent = cantidad

                            valorTotal += precio
                            casillaValorTotal.textContent = valorTotal
                        }

                    }


                })

            } else if (accion == "restar") {
                json.productos.forEach(producto => {
                    let tbody = document.querySelector("tbody")
                    if (producto.nombre == nombreProducto) {

                        let id = producto.id


                        let precio = producto.precio;
                        let fila = document.getElementById(id)
                        let casillaPrecio = fila.children[2]
                        let cant = fila.children[1]

                        let nuevoPrecio = parseFloat(precio) * (cantidad);

                        casillaPrecio.textContent = nuevoPrecio;

                        cant.textContent = cantidad

                        valorTotal -= precio
                        casillaValorTotal.textContent = valorTotal

                        if (cant.textContent == "0") {
                            fila.remove()
                            ids = ids.filter(item => item !== id);
                        }




                    }


                })


            }

        })

} */

        
/* function restar(boton) {

    let tarjeta = boton.parentElement.parentElement.parentElement;

    let seccionBotonOrdenar = boton.parentElement.parentElement;
    let hijosSeccionBotonOrdenar = seccionBotonOrdenar.children
    let botonOrdenar = hijosSeccionBotonOrdenar[0]

    let padre = boton.parentElement;
    let hijos = padre.children;
    let parrafo = hijos[1];

    let numero = parseInt(parrafo.textContent, 10); // Asegúrase de convertir el texto a un número
    let accion = "restar"

    if (numero == 0) {
        padre.remove();
        numero = 0
        botonOrdenar.style.display = "block"

    } else {
        parrafo.textContent = --numero;
        crearFactura(tarjeta, numero, accion)
    }
}


function sumar(boton) {
    let tarjeta = boton.parentElement.parentElement.parentElement;
    //console.log(tarjeta)
    //console.log(boton);
    let padre = boton.parentElement;
    //console.log(padre);

    let hijos = padre.children;
    let parrafo = hijos[1]
    let cantidad = parrafo.textContent = ++numero
    let accion = "sumar"

    crearFactura(tarjeta, cantidad, accion)
} */
        insertarProductos()

