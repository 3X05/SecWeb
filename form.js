var intento;

function PrimeroQueLlamo() {
    intento = 0;
    document.getElementById("dni").value = '99999999';
    document.getElementById("dni").style.backgroundColor = "blue" ;
}


function validoLetras(evento){
    if ( evento.keyCode < 96 || evento.keyCode > 105){
        evento.key = "";
    }    
}


function EnviarPass() {
    var pass = document.getElementById("pass").value;
    var nombre = document.getElementById("nombre").value;
    //obtenermos los datos

    if (nombre == '') {
        alert("Complete el nombre");
        return;
    }

    if (pass == '') {
        alert("Complete la contraseña");
        return;
    }

    if(intento == 3)
    {
        //redirigir a olvido contraseña
        alert("No podra acceder por los proximos 15 minutos");
        return;
    }

    intento++;
   
    //armo el body
    var cuerpo =  '{"nombre":"' + nombre + '","pass":"' + pass + '"}';
    //Armo el objeto que envia la peticion 
    var xmlhttp = new XMLHttpRequest();
    //escucho los cambios de estado de la peticion 
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            //si es 4 entonces ya respondió
            validaPass(xmlhttp.status, xmlhttp.responseText)
        }
    }
    
    //abro la conexion especificando el metodo (post/Get), la ruta del servidor, y si espero la respuesta (false: espero, true: ascincronico )
    xmlhttp.open("POST", 'http://localhost:3000/form', true);
    //Seteo como se envia los datos 
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    //envío la petición
    xmlhttp.send(cuerpo);
}


function validaPass(estado, texto) {
    if (estado == 200) {
        //cambio de pagina
        alert(texto);
        window.open(`${location}main.html`);
        window.close();
    }
    else {
        //esto es un error
        alert("error " + texto);
    }
}
