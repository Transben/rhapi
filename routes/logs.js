const express = require('express');
const router = express.Router();
const mysql = require('../connect/mysql').pool;
const login = require('../middleware/login')

/* Get TODOS OS logs ENCONTRADOS */
router.get('/', login.verifyToken, (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM logs;',
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    quantidade: result.length,
                    registros: result.map(prod => {

                        return {
                            id: prod.id,
                            usuario: prod.usuario,
                            logText: prod.logText,
                            data: prod.data,
                        }

                    })
                }
                return res.status(200).json(response)
            }
        )
    })
});

/* CRIAR LOG */
router.post('/criarlog', login.obrigatorio, (req, res)=> {
    mysql.getConnection((error, conn) => {

        if(error) {return res.status(500).send({error: error})}

        conn.query(
            'INSERT INTO logs (usuario, logText, data) VALUES (?,?,?)',
            [
                req.body.usuario, req.body.logText, req.body.data,
            ],
            (error, result, fields) => {
                conn.release();

                if(error) {return res.status(500).send({error: error})}

                const response = {
                    mensagem: 'Log criado com sucesso!',
                    produtoCriado: {

                        id: `Log: criada com sucesso!`,
                        
                    }
                }

                return res.status(201).send({response});
            }
        )
    })
});

module.exports = router;