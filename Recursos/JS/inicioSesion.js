
function cerrarTarjeta(){
    let tarjeta = document.getElementById("tarjetaCerrarSesion")
    tarjeta.style.visibility = "hidden"
}

function mostrarTarjeta (){
    let tarjeta = document.getElementById("tarjetaCerrarSesion")
    let nombreUsuario = localStorage.getItem("nombre")
    let contraseñaUsuario = localStorage.getItem("contraseña")

    

    if (nombreUsuario == null || contraseñaUsuario == null){
        return
    }

    tarjeta.style.visibility = "visible"
}


function cerrarInicioSesion() {

    let tarjetaInicioSesion = document.getElementById("tarjetaIniciarSesion")
    tarjetaInicioSesion.style.visibility = "hidden"

    document.getElementById("usuarioInicioSesion").value = ""
    document.getElementById("contraseñaInicioSesion").value = ""

}


function cerrarDatos() {
    let padre = document.getElementById("seccionMostrarDatos")
    padre.style.visibility = "hidden"
}


function salirRegistro() {

    let tarjetaRegistro = document.getElementById("seccionRegistro")
    tarjetaRegistro.style.visibility = "hidden"
}



/* Seccion cerrar Sesion */

function cerrarSesion() {

    let tarjeta = document.getElementById("tarjetaCerrarSesion")
    tarjeta.style.visibility = "hidden"

    localStorage.clear()
    console.log(localStorage.getItem("nombreIS"))
    console.log(localStorage.getItem("contraseñaIS"))
    console.log("Datos removidos")

    

    document.getElementById("usuarioInicioSesion").value = ""
    document.getElementById("contraseñaInicioSesion").value = ""

}




