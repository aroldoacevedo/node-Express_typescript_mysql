import mysql   = require('mysql');

export default class MySQL{

    private static _instances: MySQL;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor(){

        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345678',
            database: 'db_node'
        });

       this.conectarDB();
    }

    public static get instance(){
        return this._instances || (this._instances = new this());
    }

    static ejecutarQuery(query: string, callback: Function){

        this.instance.cnn.query(query, (err, results: Object[], fiels)=> {
            if(err){
                console.log('Error en query');
                console.log(err);
                callback( err );
                return;
            }

            if(results.length === 0){
                callback('El registro solicitado no existe');
            }else{
                callback(null, results);
            }

        });
    }

    private conectarDB(){
        this.cnn.connect(( err: mysql.MysqlError ) =>{
            if(err){
                console.log(err.message);
                return
            }

            this.conectado = true;
            console.log('Base de datos online!');
        });
    }

}