console.log("Start the server");

//viene instanziato una pirma costante  con una dipendenza 
const express = require('express');
//Instanziamo il body parse, dopo aver installato la dipendenza associata per node.js
//poichè dobbiamo dire ad expressjs come salvare ed estrarre i dati dal body+
var bodyParser = require('body-parser'); 
//Instanzio un applicazione  di tipo express
const app = express();

//Ci creaimo il nostro "Template"
app.set('view engine','ejs');       // utilizzo il metodo set per dire che la view engine è 'ejs'

//Configurazione per il bodyParser affinchè accetti .json e dati che gli vengono passati da un Form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));





/**
 * Ejs uses by default the views in the 'view' folder  
 */

/** 
app.get('/', function(req,res){     // app è il root point(server) e quando arriva la richiesta get() sull' indirizzo "/" invocherà questa funzione
    var objPassedToView = {user: "James Bond" + Math.random(), title:"test di esempio Unicam"}; //function è una funzione standard con una request e response
    res.render('index',objPassedToView);        // la response reindirizza index (la view), file .ejs che è al interno di views. Convenzionalmente

});
*/

//Gestione del login.ejs3
app.get('/', function(req,res){ 
    res.render('login');        

});

//Handler = gestore
app.post('/login', function(req,res){
    console.log(req.body);
    user = req.body.email;
    password = req.body.password;
    session = req.session;
    console.log(user,password);
    return null;

    

});


//Initialize the server
//Ascoltami a quel indirizzo , 3000
app.listen(3000,function(){             // questo metodo accetta come parametri una porta dove può girare 
    console.log("Live at Port 3000");   // e una funzione di callback, che sarà la funzione che ci serve 
});                                     // per dirci cosa fare quando si raggiunge un indirizzo specifico. 