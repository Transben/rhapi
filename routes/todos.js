const express = require('express');
const router = express.Router();
const mysql = require('../connect/mysql').pool;
const login = require('../middleware/login')

/* 
    Retorna em um numero a soma de duas tabelas
    Return in one number a sum of the two tables
*/
router.get('/somadosAsTabelas', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT SUM(total_linhas) as total_linhas_somadas FROM (SELECT COUNT(*) as total_linhas FROM tabelaEscritorio UNION ALL SELECT COUNT(*) as total_linhas FROM tabelaMotorista) as tabela_temporaria;',
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).json(result)
            }
        )
    })
});

/* 
    Retorna em uma tabela todos os registradores, de duas tabelas
    Return in one table all registers, from two tables 
*/
router.get('/totalRegistros', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM (SELECT * FROM tabelaEscritorio UNION ALL SELECT * FROM tabelaMotorista) AS tabela_combinada ORDER BY dataEnvioCurriculo DESC;',
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    quantidade: result.length,
                    registros: result.map(prod => {

                        return {
                            id: prod.id,
                            nomeCompleto: prod.nomeCompleto,
                            CPF: prod.CPF,
                            telefoneContato: prod.telefoneContato,
                            email: prod.email,
                            cidade: prod.cidade,
                            CEP: prod.CEP,
                            estado: prod.estado,
                            bairro: prod.bairro,
                            rua: prod.rua,
                            numeroCasa: prod.numeroCasa,
                            complemento: prod.complemento,
                            nomeEmpresa1: prod.nomeEmpresa1,
                            cargoEmpresa1: prod.cargoEmpresa1,
                            dataInicioEmpresa1: prod.dataInicioEmpresa1,
                            dataFinalEmpresa1: prod.dataFinalEmpresa1,
                            EmpregoAtualEmpresa1: prod.EmpregoAtualEmpresa1,
                            semExperienciaEmpresa1: prod.semExperienciaEmpresa1,
                            exercicioCargoAntigoEmpresa1: prod.exercicioCargoAntigoEmpresa1,
                            nomeEmpresa2: prod.nomeEmpresa2,
                            cargoEmpresa2: prod.cargoEmpresa2,
                            dataInicioEmpresa2: prod.dataInicioEmpresa2,
                            dataFinalEmpresa2: prod.dataFinalEmpresa2,
                            exercicioCargoAntigoEmpresa2: prod.exercicioCargoAntigoEmpresa2,
                            nomeEmpresa3: prod.nomeEmpresa3,
                            cargoEmpresa3: prod.cargoEmpresa3,
                            dataInicioEmpresa3: prod.dataInicioEmpresa3,
                            dataFinalEmpresa3: prod.dataFinalEmpresa3,
                            exercicioCargoAntigoEmpresa3: prod.exercicioCargoAntigoEmpresa3,
                            vagaPretendida: prod.vagaPretendida,
                            aceitoTermo: prod.aceitoTermo,
                            numeroCNH: prod.numeroCNH,
                            categoriaCNH: prod.categoriaCNH,
                            validadeCNH: prod.validadeCNH,
                            status: prod.status,
                            favorito: prod.favorito,
                            dataEnvioCurriculo: prod.dataEnvioCurriculo,
                        }

                    })
                }
                return res.status(200).json(response)
            }
        )
    })
});

/*
    Get somente do dia de hoje 
    Get ony registers only a date 
*/
router.get('/dataEnvio/:paramDataUm', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `SELECT DISTINCT * FROM tabelaEscritorio WHERE dataEnvioCurriculo = ? UNION SELECT DISTINCT * FROM tabelaMotorista WHERE dataEnvioCurriculo = '${req.params.paramDataUm}'`,
            [
                req.params.paramDataUm,
            ],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    quantidade: result.length,
                }
                return res.status(200).json(response)
            }
        )
    })
});

module.exports = router;