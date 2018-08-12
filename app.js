console.log("Start the server");

//viene instanziato una pirma costante  con una dipendenza 
const express = require('express');
//Instanziamo il body parse, dopo aver installato la dipendenza associata per node.js
//poichè dobbiamo dire ad expressjs come salvare ed estrarre i dati dal body+
var bodyParser = require('body-parser'); 
//Instanzio un applicazione  di tipo express
const app = express();

//inizilizzo session
var session = require('express-session');

//Definiamo il coockieSession e il cookieParser visto che andranno ad essere 
//utilizzati per la session
var coockieSession = require('cookie-session');
var cookieParser = require('cookie-parser');

//Chaiamta al modulo
var sqllite = require("./module/sqlite.js");

//Creo un oggetto (variabile) statico che si chiama admin_user
const admin_user = {
    user:"admin@admin.it",
    password: "admin"
}

//Ci creaimo il nostro "Template"
app.set('view engine','ejs');       // utilizzo il metodo set per dire che la view engine è 'ejs'

//Configurazione per il bodyParser affinchè accetti .json e dati che gli vengono passati da un Form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//Dopo aver aggiunto all'handler del login la gestione di autenticazione diciamo al server di usare il cookie di sessione
app.use(coockieSession({
    name: 'session',
    keys: ['username']
}));





/**
 * Ejs uses by default the views in the 'view' folder  
 */

/** 
app.get('/', function(req,res){     // app è il root point(server) e quando arriva la richiesta get() sull' indirizzo "/" invocherà questa funzione
    var objPassedToView = {user: "James Bond" + Math.random(), title:"test di esempio Unicam"}; //function è una funzione standard con una request e response
    res.render('index',objPassedToView);        // la response reindirizza index (la view), file .ejs che è al interno di views. Convenzionalmente

});
*/

//Definiamo la funzione checkAuthentication , e vede se esiste un utente (se è definito procedi(next()altrimenti viene reindirizzara "/" che in questo caso è login)
var checkAutentication = function(req, res, next){
    if(req.session && req.session.admin_user){
        next();
    }
    else{
        //user doesn't have access, return an HTTP 401 response
        res.redirect("/");              // ridirigi l'utente sulla pagaina di login
    }
};


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
    session = req.session;
    console.log("session",session);
    
    if(user== admin_user.user && password == admin_user.password) { //*riferimento all'oggetto statico sopra dichairato admin_user
        session.admin_user = admin_user;
        console.log("is authenticated")
        res.redirect('/students');      //reindirizzami alla pagina students
    } else{
        res.redirect('/');      // di default è il login, pagina iniziale
    }

    

});

//Definiamo l'handler della pagina students, 
app.get('/students',checkAutentication, function(req, res){
    
    sqllite.getStudents( function(students) { // richiamo il metodo di questo modulo sqlite.js
        res.render('students', {                // a cui passo il callback, che è la funzione che prende
            "students": students                // come parametro gli studenti e reinderizza il template studenti passando la variabile student
        });
    });
});


//Initialize the server
//Ascoltami a quel indirizzo , 3000
app.listen(3000,function(){             // questo metodo accetta come parametri una porta dove può girare 
    console.log("Live at Port 3000");   // e una funzione di callback, che sarà la funzione che ci serve 
});                                     // per dirci cosa fare quando si raggiunge un indirizzo specifico. 