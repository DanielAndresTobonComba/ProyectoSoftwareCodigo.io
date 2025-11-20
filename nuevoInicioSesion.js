/* Seccion tarjeta incio sesion si no esta logueado muestre la tarjeta de logueo */

function datosiniciarSesion() {

    console.log("ENTRE AL NUEVO INICIO 1")
    let tarjetaInicioSesion = document.getElementById("tarjetaIniciarSesion")

    console.log(localStorage.getItem("nombre"))
    console.log(localStorage.getItem("contraseña"))

    if (localStorage.getItem("nombre") != null && localStorage.getItem("contraseña") != null) {
        console.log("Existen los datos")
    } else {
        tarjetaInicioSesion.style.visibility = "visible"
    }
}


/* Tomamos los datos de logueo y manda la peticion al backend si hay respuesta positiva logueo exitoso y muestra los datos de logueo */
function iniciosesion() {

    console.log("ENTRE AL NUEVO INICIO 2")

    let tarjetaMostrarDatos = document.getElementById("seccionMostrarDatos");

    let usuarioIS = document.getElementById("usuarioInicioSesion").value;
    let contraseñaIS = document.getElementById("contraseñaInicioSesion").value;

    let spanUsuario = document.getElementById("spanUsuario");
    let spanContraseña = document.getElementById("spanContraseña");

    let inputNombre = document.getElementById("usuarioInicioSesion");
    let inputContraseña = document.getElementById("contraseñaInicioSesion");

    if (usuarioIS !== "" && contraseñaIS !== "") {
        
        // 📌 Armamos el JSON para enviarlo al backend
        const data = {
            nombre: usuarioIS,
            contraseña: contraseñaIS
        };

        console.log("Enviando datos al servidor:", data);

        // 📌 Endpoint al que se envía la petición (CÁMBIALO POR EL TUYO REAL)
        const url = "http://localhost:8080/api/auth/login"; 

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  // 📌 Se envía JSON
            },
            body: JSON.stringify(data) // 📌 Convertimos el objeto en JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la petición " + response.status);
            }
            return response.json(); // 📌 El backend debe responder JSON
        })
        .then(res => {

            // 📌 Si el backend dice que el usuario existe
            if (res.existe === true) {

                localStorage.setItem("nombre", usuarioIS);
                localStorage.setItem("contraseña", contraseñaIS);

                cerrarInicioSesion();
                tarjetaMostrarDatos.style.visibility = "visible";
                spanUsuario.textContent = localStorage.getItem("nombre");
                spanContraseña.textContent = localStorage.getItem("contraseña");

                console.log("Inicio de sesión exitoso");
            } 
            // 📌 Si NO existe el usuario
            else {
                inputNombre.value = "El usuario no existe";
                inputContraseña.value = "";
                inputContraseña.placeholder = "Contraseña incorrecta";
            }
        })
        .catch(error => console.error("Error:", error));

    } 
    else {
        // Si los campos estaban vacíos, se usan los del localStorage
        tarjetaMostrarDatos.style.visibility = "visible";
        spanUsuario.textContent = localStorage.getItem("nombre");
        spanContraseña.textContent = localStorage.getItem("contraseña");
    }
}
