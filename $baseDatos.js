angular.module('sqliteAngularjs', [])

    .factory('$baseDatos', function() {

    /**
     * Declaramos la clase Base de datos
     * para manejar las sentencias SQL
     */
    var BD = function(){
        var that = this;
        that.db = openDatabase("app.db","1.0","app",-1);
    };

    /**
     * Variable db, objeto database
     */
    BD.prototype.db;

    /**
     * Variable tx, transaccion
     */
    BD.prototype.tx;

    /**
     * Ejecuta una sencencia sql
     */
    BD.prototype.sql = function(consulta, datos, sucess, error){
        var sql = consulta;
        var that = this;
        var data = datos || [];
        this.db.transaction(function(tx) {
            that.tx = tx;
            that.ejecutar(sql,data,sucess,error)
        });
    };

    /**
     * Ejecuta una sencencia sql
     */
    BD.prototype.transaction = function(ok){
        var that = this;
        var success = ok;
        this.db.transaction(function(tx) {
            that.tx = tx;
            success();
        });
    };

    /**
     * Ejecuta una sencencia sql
     * es llamada desde la funcion sql
     */
    BD.prototype.ejecutar = function(consulta,datos,sucess, error){
        this.tx.executeSql(consulta, datos, (sucess ? sucess : this.okConsulta) , (error ? error : this.errorConsulta));
    };

    /**
     * Funcion por defecto para una consulta ok
     */
    BD.prototype.okConsulta = function(res){
        console.log('Consulta Ok')
    };

    /**
     * Funcion por defecto al recibir un error en una consulta
     */
    BD.prototype.errorConsulta = function(e,err){
        console.log('Consulta error: ' + err.message)
    };

    return new BD();
});
