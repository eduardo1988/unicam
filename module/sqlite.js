//MODULO PER CHIAMARE sqlite, e gestire i dati di un database per la nostra app web
//per interfacciarsi al database sqlite

const sqlite3 = require('sqlite3').verbose();   // salvami qst e cariamelo
const database = './students.db';        // creiamo una variabile

//faremo una chiamata sqlite,da client al database del server 

module.exports = {                              // ABBIAMO FATTO TUTTO IN UN  MODULO CHE ESPONE
    getStudents: function(callback) {           // UNA FUNZIONE DI ALTO LIVELLO ,quindi quando hai caricato i dati dal db esegui qualco astro,(callback)
        let db = new sqlite3.Database(database);    // oss: il callback sarà reindirizzamento pagina

        var students = []

        let sql = 'SELECT * FROM STUDENT ORDER BY NAME DESC';

        db.all(sql,[], (err, rows) => {
            if (err){
                throw err;
            }
            rows.forEach((row) => {      //Per ogni riga crea un ogetto student dove     
                console.log("row", row);        //si prende i campi del database
                var student = {};
                student.id = row.STUDENT_ID;
                student.name = row.NAME;
                student.surname = row.SURNAME;
                console.log("student", student);

                students.push(student);
            
            });
            //call the callback
            callback(students); // l'invocazione avviene qui,passando l'array di ogetti appena creati 

        });
    
        db.close();

    }


}