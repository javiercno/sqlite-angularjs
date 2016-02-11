# sqlite-angularjs
Sqlite AngularJs Factory

Factoria AngularJS para trabajar con Sqlite
  ```
  $baseDatos.sql("SELECT * FROM USERS", [], function(tx, res){
    console.log(res.rows);
  },error);
  
  $baseDatos.transaction(function(){
    $baseDatos.ejecutar("SELECT * FROM USERS", [], function(tx, res){
      console.log(res.rows);
    }, error);
  });
 ```
Pronto se subirá una nueva versión para controlar las filas devueltas y trabajar directamente
con un array de objetos
