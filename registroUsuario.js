/* Genera la tarjeta para que la persona digite los datos */

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
                <button id="botonRegistro" onclick="tomarEnviarDatosRegistro()" type="">Enviar</button>
               
                
            </section>`

    let contenedor = document.getElementById("seccionRegistro")
    contenedor.innerHTML = contenido

    contenedor.style.visibility = "visible"
}

/* Cuando le da al boton de Enviar tomas los datos de la tarjeta los reviza y los envia al backend */

function tomarEnviarDatosRegistro() {

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
