const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//todo lo que entre desde http://localhost:3000/pagina/ devuelve el archivo fisico

//ej: http://localhost:3000/pagina/form.html devuelve la pagina
app.get('/pagina/*', enviarForm);

//form espera el ajax
app.post('/form/', leerDato);

//form llenarcampo
app.post('/opciones/', leerDato);


app.listen(port, escuchar);

function escuchar() {
    console.log(`Estoy escuchando el puerto http://localhost:${port}/pagina/`);
}

function enviarForm(req, res) {
    //remplazo de la llamada la parte de /pagina/ por vacio
    var pagina = req.path.replace("/pagina/", "");
    //si no trajo la pagina que busca muestro el formulario
    if (pagina == "") { pagina = "form.html"; }
    //envio el archivo que llego despues de /pagina/
    res.sendFile(pagina, { root: __dirname })
}

function leerDato(req, res) {

    //Me fijo que usuario y pass llegaron
    if (req.body.nombre == 'Admin' && req.body.pass == 'istrador') {
        //si es ok retorno valido        
        res.send("Usuario Valido");
    } else {
        //si es error envio un 401
        res.status(401).send("usuario invalido");
    }
    
}