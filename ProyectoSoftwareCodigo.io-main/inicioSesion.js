
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

/* Seccion tarjeta incio sesion */

function iniciarSesion() {

    let tarjetaInicioSesion = document.getElementById("tarjetaIniciarSesion")

    console.log(localStorage.getItem("nombre"))
    console.log(localStorage.getItem("contraseña"))

    if (localStorage.getItem("nombre") != null && localStorage.getItem("contraseña") != null) {
        console.log("Existen los datos")
    } else {
        tarjetaInicioSesion.style.visibility = "visible"
    }
}




function cerrarInicioSesion() {

    let tarjetaInicioSesion = document.getElementById("tarjetaIniciarSesion")
    tarjetaInicioSesion.style.visibility = "hidden"

    document.getElementById("usuarioInicioSesion").value = ""
    document.getElementById("contraseñaInicioSesion").value = ""



}


/* Seccion mostrarDatosIS */

function mostrarDatosIS() {

    /* tarjeta de mostrar los datos del usuario */
    let tarjetaMostrarDatos = document.getElementById("seccionMostrarDatos")


    /* obtengo los datos de inicioDeSesion */
    let usuarioIS = document.getElementById("usuarioInicioSesion").value
    let contraseñaIS = document.getElementById("contraseñaInicioSesion").value


    /* obtengo las span de la tarjeta mostrarDatos */
    let spanUsuario = document.getElementById("spanUsuario")
    let spanContraseña = document.getElementById("spanContraseña")


    console.log("usuarioIS: " + usuarioIS)
    console.log("contraseñaIS: " + contraseñaIS)

    /* inputs de la tarjeta inicio sesion */
    let inputNombre = document.getElementById("usuarioInicioSesion")
    let inputContraseña = document.getElementById("contraseñaInicioSesion")


    if (usuarioIS != "" && contraseñaIS != "") {

        fetch("../usuarios.json")
            .then(data => data.json())
            .then(json => {

                json.usuarios.forEach(usuario => {

                    if (usuario.nombre == usuarioIS && usuario.contraseña == contraseñaIS) {

                        localStorage.setItem("nombre", usuarioIS)
                        localStorage.setItem("contraseña", contraseñaIS)

            
                        cerrarInicioSesion()

                        tarjetaMostrarDatos.style.visibility = "visible"
                        spanUsuario.textContent = localStorage.getItem("nombre")

                        spanContraseña.textContent = localStorage.getItem("contraseña")


                        console.log("Datos de inicio de sesion Guardados")
                        console.log(localStorage.getItem("nombre"))
                        console.log(localStorage.getItem("contraseña"))
                    }
                    else if (usuario.nombre != usuarioIS && usuario.contraseña != contraseñaIS) {

                        inputNombre.value = "el nombre no existe"

                        inputContraseña.value = ""
                        inputContraseña.placeholder = "la contraseña no existe"

                        

                        
                


                    } 
                })
            })

            

           


    } else{
        
        tarjetaMostrarDatos.style.visibility = "visible"
        spanUsuario.textContent = localStorage.getItem("nombre")
        spanContraseña.textContent = localStorage.getItem("contraseña")
    }
    /*  else {

        let nombreGuardado = localStorage.getItem("nombre")
        let contraseñaGuardada = localStorage.getItem("contraseña")

        console.log("entre a datosregistro")
        console.log(nombreGuardado + contraseñaGuardada)

        fetch("../usuarios.json")
            .then(data => data.json())
            .then(json => {

                json.usuarios.forEach(usuario => {

                    console.log("nombre" + usuario.nombre)

                    if (usuario.nombre.toLowerCase() == nombreGuardado.toLowerCase()) {
                        
                        let input = document.getElementById("nombreRegistro")
                        input.value = "ese nombre ya existe"



                    } else if (usuario.contraseña == contraseñaGuardada) {
                        
                        let input = document.getElementById("contraseñaRegistro")
                        input.value = "ya existe esa contraseña"

                    }
                    else {
                        console.log("usuario Valido")

                        cerrarInicioSesion()

                        tarjetaMostrarDatos.style.visibility = "visible"

                        spanUsuario.textContent = localStorage.getItem("nombre")

                        spanContraseña.textContent = localStorage.getItem("contraseña")

                        localStorage.setItem("nombre", usuarioIS)
                        localStorage.setItem("contraseña", contraseñaIS)

                        console.log("Datos de inicio de sesion Guardados")

                        console.log(localStorage.getItem("nombre"))
                        console.log(localStorage.getItem("contraseña"))
                    }
                })
            }) 
            
        }*/


      




    
}


function cerrarDatos() {
    let padre = document.getElementById("seccionMostrarDatos")
    padre.style.visibility = "hidden"
}







/* seccion registro persona */

function registro(enlace) {

    /* esconder tarjeta inicioSesion */
    let padre = enlace.parentElement.parentElement
    padre.style.visibility = "hidden"


    let contenido = `

            <h2>Registro</h2>

            <input placeholder="Nombre" type="text" name="nombreRegistro" id="nombreRegistro" >
            <br><br>

        
            <input placeholder="Correo" type="text" name="correo" id="correo">
            <br><br>

            
            <input placeholder="Telefono" type="text" name="Telefono" id="Telefono">
            <br><br>

            <input placeholder="Contraseña" type="text" name="contraseñaRegistro" id="contraseñaRegistro">
            <br><br>

            <section id="botonesRegistro">

                <button onclick="salirRegistro(this)">Cerrar</button>
                <button id="botonRegistro" onclick="tomarDatosRegistro()" type="">Enviar</button>
               
                
            </section>`

    let contenedor = document.getElementById("seccionRegistro")
    contenedor.innerHTML = contenido

    contenedor.style.visibility = "visible"
}




function tomarDatosRegistro() {

    let tarjetaRegistro = document.getElementById("seccionRegistro")

    let nombreUsuario = document.getElementById("nombreRegistro").value;
    let correoUsuario = document.getElementById("correo").value;
    let telefonoUsuario = document.getElementById("Telefono").value;
    let contraseñaUsuario = document.getElementById("contraseñaRegistro").value;

    fetch("../usuarios.json")
        .then(data => data.json())
        .then(json => {
            let tamaño = json.usuarios.length
            let caracterTamaño = tamaño.toString()

            if (nombreUsuario === "") {
                document.getElementById("nombreRegistro").value = "Dato Invalido";
                return;
            } else if (correoUsuario === "") {
                document.getElementById("correo").value = "Dato Invalido";
                return;
            } else if (telefonoUsuario === "") {
                document.getElementById("Telefono").value = "Dato Invalido";
                return;
            } else if (contraseñaUsuario === "") {
                document.getElementById("contraseñaRegistro").value = "Dato Invalido";
                return;
            } else if (tamaño == 0){
        
                fetch("http://localhost:3000/usuarios", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        id: caracterTamaño,
                        nombre: nombreUsuario,
                        contraseña: contraseñaUsuario,
                        telefono: telefonoUsuario,
                        correo: correoUsuario
                    })
                })
                    .then(response => response.json())
                    .then(json => console.log(json))
                    .catch(error => console.error("Error !!!" + error));
        
            } else { 

                fetch("../usuarios.json")
                .then(data => data.json())
                .then(json => {
        
                    let tamaño = json.usuarios.length
                    let caracterTamaño = tamaño.toString()
                    
        
                    json.usuarios.forEach(usuario => {
        
                        console.log("nombre" + usuario.nombre)
        
                        if (usuario.nombre.toLowerCase() == nombreUsuario.toLowerCase()) {
                            console.log("esxiste ese nombre")
                            document.getElementById("nombreRegistro").value = "ese nombre ya existe"
        
                        } else if (usuario.contraseña == contraseñaUsuario) {
                            console.log("existe esa contraseña")
                            document.getElementById("contraseñaRegistro").value = "ya existe esa contraseña"
        
                        }else if(tamaño == usuario.id + 1){
        
                            console.log("datos tomados");
                            console.log(nombreUsuario + correoUsuario + telefonoUsuario + contraseñaUsuario)
                    
                            /* Escondo la tarjeta de registro */
                            tarjetaRegistro.style.visibility = "hidden"
                    
                            /* Guardo los datos */
                            localStorage.setItem("nombre", nombreUsuario)
                            localStorage.setItem("contraseña", contraseñaUsuario);
        
                            
                            fetch("http://localhost:3000/usuarios", {
                                method: "POST",
                                headers: {
                                    "Content-type": "application/json; charset=UTF-8"
                                },
                                body: JSON.stringify({
                                    id: caracterTamaño,
                                    nombre: nombreUsuario,
                                    contraseña: contraseñaUsuario,
                                    telefono: telefonoUsuario,
                                    correo: correoUsuario 
                                })
                            })
                                .then(response => response.json())
                                .then(json => console.log(json))
                                .catch(error => console.error("Error !!!" + error));
                            
                        }
                    })
        
                })
                
            
            
            
               
        
        
            }
            
        })

  


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




