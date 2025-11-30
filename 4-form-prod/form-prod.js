

let nombreUsuario = localStorage.getItem("nombre")
let contraseñaUsuario = localStorage.getItem("contraseña")

console.log("Nombre: " + localStorage.getItem("nombre"))
console.log("Contraseña: " + localStorage.getItem("contraseña"))


let aviso = document.getElementById("aviso")

if (nombreUsuario == null || contraseñaUsuario == null) {

    aviso.style.visibility = "visible"

} else {

    aviso.style.visibility = "hidden"
}




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


/* function historialFacturas(accion = "") {

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
 */



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









/* function datos() {
    let entrada = document.getElementById("busqueda")
    let datos = entrada.value
    if (datos != "") {
        filtrar(datos)
    } else {
        insertarProductos()
    }

}
 */