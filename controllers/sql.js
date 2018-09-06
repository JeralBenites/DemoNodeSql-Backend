
var env = process.env.NODE_ENV || 'development';
const config = require('../config/db')[env];
const sql = require('mssql')

const sqlController = {

    listar() {
        return new Promise((resolve, reject) => { 
           //Async/Await
           (async function () {
                    try {
                        let pool = await sql.connect(config)
                        let result1 = await pool.request()
                            .execute('[eqcartafianza].[PA_LISTAR_MONEDA_COMBO]')
                        resolve(result1);
                    } catch (err) {
                        reject(err);
                    } finally{
                        sql.close();
                    }
                })()
                sql.on('error', err => {
                    reject(err);
                })

            //Promises
            /*sql.connect(config).then(pool => {
                return pool.request()
                    .execute('[eqcartafianza].[PA_LISTAR_MONEDA_COMBO]')
            }).then(result => {
                sql.close();
                resolve(result);
            }).catch(err => {
                sql.close();
                reject(err);
            });
            sql.on('error', err => {
                sql.close();
                reject(err);
            });*/

            //ES6 Tagged template literals
           /* sql.connect(config).then(() => {
                return sql.query`[eqcartafianza].[PA_LISTAR_MONEDA_COMBO]`
            }).then(result => {
                sql.close();
                resolve(result);
            }).catch(err => {
                sql.close();
                reject(err);
            })
             
            sql.on('error', err => {
                sql.close();
                reject(err);
            })*/

            //Callbacks
            /*sql.connect(config, err => {
                new sql.Request().query('[eqcartafianza].[PA_LISTAR_MONEDA_COMBO]', 
                (err, result) => {
                    sql.close();
                    resolve(result);
                })
            })
             
            sql.on('error', err => {
                sql.close();
                reject(err);
            })*/


            //Streaming
            /*sql.connect(config, (err) => {
                if (err) reject(err);
                var request = new sql.Request();
                //request.stream = true; // You can set streaming differently for each request
                request.multiple = true 
                //request.input('UserID', req.params.id);
                request.execute('[eqcartafianza].[PA_LISTAR_MONEDA_COMBO]'
                ,(err, result)=> {
                    sql.close();
                    if (err) reject(err);
                    resolve(result);
                });
            });*/

            //Connection Pools            
            /*const pool1 = new sql.ConnectionPool(config, err => {
                pool1.request() // or: new sql.Request(pool1)
                .query('[eqcartafianza].[PA_LISTAR_MONEDA_COMBO]', (err, result) => {
                    sql.close();
                    resolve(result);
                })

            })

            pool1.on('error', err => {
                sql.close();
                reject(err);
            })*/
        })
    },
    Insertar(body) {
        return new Promise((resolve, reject) => {
            sql.connect(db).then(pool => {
                return pool.request()
                    .input('vRUC', sql.VarChar(11), body.vRUC)
                    .input('vRazonSocial', sql.VarChar(1000), body.vRazonSocial)
                    .input('vDireccion', sql.VarChar(50), body.vDireccion)
                    .input('vTelefono', sql.VarChar(9), body.vTelefono)
                    .execute('[eqcartafianza].[PA_INSERTAR_EMPRESA]')
            }).then(result => {
                sql.close();
                resolve(result);
            }).catch(err => {
                sql.close();
                reject(err);
            });

            sql.on('error', err => {
                sql.close();
                reject(err);
            });
        })
    },

    exportExcel() {
        return new Promise((resolve, reject) => {
            sql.connect(db).then(pool => {
                return pool.request()
                .input('iCodEmpresa', sql.Int, "0")
                .input('piPageSize', sql.Int, "100")
                .input('piCurrentPage', sql.Int, "1")
                .input('pvSortColumn', sql.VarChar(30),"vRazonSocial" )
                .input('pvSortOrder', sql.VarChar(4),"ASC" )
                .input('pvRUC', sql.VarChar(20), "")
                .input('pvRazonSocial', sql.VarChar(20),"" )
                .execute('[eqcartafianza].[PA_LISTAR_EMPRESA]')
            }).then(result => {
                sql.close();
                resolve(result.recordset);
            }).catch(err => {
                sql.close();
                reject(err);
            });

            sql.on('error', err => {
                sql.close();
                reject(err);
            });
        });
    }
}



module.exports = sqlController;