const express = require('express');
const router = express.Router();
const mysql = require('../connect/mysql').pool;
const login = require('../middleware/login')

/* Get TODOS OS DADOS ENCONTRADOS SEM FILTRO POR PARAMETRO */
router.get('/', login.verifyToken, (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM tabelaMotorista;',
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
                            statusFinal: prod.statusFinal,
                            escolaridade: prod.escolaridade,
                            PIS: prod.PIS,
                            nacionalidadePaís: prod.nacionalidadePaís,
                            nacionalidadeEstado: prod.nacionalidadeEstado,
                            nacionalidadeCidade: prod.nacionalidadeCidade,
                        }

                    })
                }
                return res.status(200).json(response)
            }
        )
    })
});

/* GET DE TODOS OS FAVORITOS */
router.get('/favoritos/favoritos', login.verifyToken, (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM tabelaMotorista WHERE favorito = "Sim";',
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
                            statusFinal: prod.statusFinal,
                            escolaridade: prod.escolaridade,
                            PIS: prod.PIS,
                            nacionalidadePaís: prod.nacionalidadePaís,
                            nacionalidadeEstado: prod.nacionalidadeEstado,
                            nacionalidadeCidade: prod.nacionalidadeCidade,
                        }

                    })
                }
                return res.status(200).json(response)
            }
        )
    })
});

/* Get SOMENTE DE UM DADO RETORNADO PELO SEU ID */
router.get('/:id', login.verifyToken, (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM tabelaMotorista WHERE id = ?;',
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado nenhum registro com esse id'
                    })
                }

                const response = {
                    pregistro: {
                        id: result[0].id,
                        nomeCompleto: result[0].nomeCompleto,
                        CPF: result[0].CPF,
                        telefoneContato: result[0].telefoneContato,
                        email: result[0].email,
                        cidade: result[0].cidade,
                        CEP: result[0].CEP,
                        estado: result[0].estado,
                        bairro: result[0].bairro,
                        rua: result[0].rua,
                        numeroCasa: result[0].numeroCasa,
                        complemento: result[0].complemento,
                        nomeEmpresa1: result[0].nomeEmpresa1,
                        cargoEmpresa1: result[0].cargoEmpresa1,
                        dataInicioEmpresa1: result[0].dataInicioEmpresa1,
                        dataFinalEmpresa1: result[0].dataFinalEmpresa1,
                        EmpregoAtualEmpresa1: result[0].EmpregoAtualEmpresa1,
                        semExperienciaEmpresa1: result[0].semExperienciaEmpresa1,
                        exercicioCargoAntigoEmpresa1: result[0].exercicioCargoAntigoEmpresa1,
                        nomeEmpresa2: result[0].nomeEmpresa2,
                        cargoEmpresa2: result[0].cargoEmpresa2,
                        dataInicioEmpresa2: result[0].dataInicioEmpresa2,
                        dataFinalEmpresa2: result[0].dataFinalEmpresa2,
                        exercicioCargoAntigoEmpresa2: result[0].exercicioCargoAntigoEmpresa2,
                        nomeEmpresa3: result[0].nomeEmpresa3,
                        cargoEmpresa3: result[0].cargoEmpresa3,
                        dataInicioEmpresa3: result[0].dataInicioEmpresa3,
                        dataFinalEmpresa3: result[0].dataFinalEmpresa3,
                        exercicioCargoAntigoEmpresa3: result[0].exercicioCargoAntigoEmpresa3,
                        vagaPretendida: result[0].vagaPretendida,
                        numeroCNH: result[0].numeroCNH,
                        categoriaCNH: result[0].categoriaCNH,
                        validadeCNH: result[0].validadeCNH,
                        aceitoTermo: result[0].aceitoTermo,
                        status: result[0].status,
                        favorito: result[0].favorito,
                        dataEnvioCurriculo: result[0].dataEnvioCurriculo,
                        statusFinal: result[0].statusFinal,
                        escolaridade: result[0].escolaridade,
                        PIS: result[0].PIS,
                        nacionalidadePaís: result[0].nacionalidadePaís,
                        nacionalidadeEstado: result[0].nacionalidadeEstado,
                        nacionalidadeCidade: result[0].nacionalidadeCidade,
                    }
                }
                return res.status(200).json(response)
            }
        )
    })
});

/* ROTA DE PESQUISA */
router.get('/pesquisar/pesquisar', login.verifyToken, (req, res, next) => {

    const { nomeCompleto, CPF, vagaPretendida, cidade, favorito, status, statusFinal } = req.query;

    let query = 'SELECT * FROM tabelaMotorista';
  
    if (nomeCompleto || CPF || vagaPretendida || cidade || favorito || status || statusFinal) {
      query += ' WHERE';
  
      if (nomeCompleto) {
        query += ` nomeCompleto LIKE '%${nomeCompleto}%' AND`;
      }
  
      if (CPF) {
        query += ` CPF LIKE '%${CPF}%' AND`;
      }
  
      if (vagaPretendida) {
        query += ` vagaPretendida LIKE '%${vagaPretendida}%' AND`;
      }
  
      if (cidade) {
        query += ` cidade LIKE '%${cidade}%' AND`;
      }

      if (status) {
        query += ` status LIKE '%${status}%' AND`;
      }

      if (statusFinal) {
        query += ` statusFinal LIKE '%${statusFinal}%' AND`;
      }

      if (favorito) {
        query += ` favorito LIKE '%${favorito}%' AND`;
      }
      
      // remove o último operador AND adicionado
      query = query.slice(0, -4);
    }

    // executar a query no banco de dados
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(query, (error, result, fields) => {
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
                        statusFinal: prod.statusFinal,
                        escolaridade: prod.escolaridade,
                        PIS: prod.PIS,
                        nacionalidadePaís: prod.nacionalidadePaís,
                        nacionalidadeEstado: prod.nacionalidadeEstado,
                        nacionalidadeCidade: prod.nacionalidadeCidade,
                    }
                })
            }

            return res.status(200).json(response);
        })
    });
});

/* PATCH ALTERAR REGISTRO POR PARAMETRO DA URL */
router.patch('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `UPDATE tabelaMotorista SET 
            nomeCompleto = ?, CPF = ?, telefoneContato = ?, email = ?, cidade = ?, CEP = ?, estado = ?, bairro = ?, rua = ?, numeroCasa = ?, complemento = ?, nomeEmpresa1 = ?, cargoEmpresa1 = ?, dataInicioEmpresa1 = ?, dataFinalEmpresa1 = ?, EmpregoAtualEmpresa1 = ?, semExperienciaEmpresa1 = ?, exercicioCargoAntigoEmpresa1 = ?, nomeEmpresa2 = ?, cargoEmpresa2 = ?, dataInicioEmpresa2 = ?,dataFinalEmpresa2 = ?, exercicioCargoAntigoEmpresa2 = ?, nomeEmpresa3 = ?, cargoEmpresa3 = ?, dataInicioEmpresa3 = ?,dataFinalEmpresa3 = ?, exercicioCargoAntigoEmpresa3 = ?, vagaPretendida = ?, aceitoTermo = ?, status = ?, favorito = ?, dataEnvioCurriculo = ?, statusFinal = ?, escolaridade = ?, PIS = ?, nacionalidadePaís = ?, nacionalidadeEstado = ?, nacionalidadeCidade = ? WHERE id = ?`,
            [
                req.body.nomeCompleto,
                req.body.CPF,
                req.body.telefoneContato,
                req.body.email,
                req.body.cidade,
                req.body.CEP,
                req.body.estado,
                req.body.bairro,
                req.body.rua,
                req.body.numeroCasa,
                req.body.complemento,
                req.body.nomeEmpresa1,
                req.body.cargoEmpresa1,
                req.body.dataInicioEmpresa1,
                req.body.dataFinalEmpresa1,
                req.body.EmpregoAtualEmpresa1,
                req.body.semExperienciaEmpresa1,
                req.body.exercicioCargoAntigoEmpresa1,
                req.body.nomeEmpresa2,
                req.body.cargoEmpresa2,
                req.body.dataInicioEmpresa2,
                req.body.dataFinalEmpresa2,
                req.body.exercicioCargoAntigoEmpresa2,
                req.body.nomeEmpresa3,
                req.body.cargoEmpresa3,
                req.body.dataInicioEmpresa3,
                req.body.dataFinalEmpresa3,
                req.body.exercicioCargoAntigoEmpresa3,
                req.body.vagaPretendida,
                req.body.aceitoTermo,
                req.body.status,
                req.body.favorito,
                req.body.dataEnvioCurriculo,
                req.body.statusFinal,
                req.body.escolaridade,
                req.body.PIS,
                req.body.nacionalidadePaís,
                req.body.nacionalidadeEstado,
                req.body.nacionalidadeCidade,
                req.params.id
            ],

            (error, result, fields) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    mensagem: 'Registro atualizado com sucesso',
                    produtoAtualizado: {
                        id_registro: req.body.id,
                    }
                }
                return res.status(202).send({response});
            }
        )
    })
});

/* PATCH PARA ALTERAR O FAVORITO */
router.patch('/favorito/:id', login.verifyToken, (req, res, next) => {
    const id = req.params.id;
    const favorito = req.body.favorito;

    if (!id || !favorito) {
        return res.status(400).send({ mensagem: 'Parâmetros inválidos' });
    }

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }

        conn.query(
            `UPDATE tabelaMotorista SET favorito = ? WHERE id = ?`,
            [favorito, id],
            (error, result, fields) => {
                conn.release();

                if (error) {
                    return res.status(500).send({ error: error });
                }

                const response = {
                    mensagem: 'Registro atualizado com sucesso',
                    produtoAtualizado: {
                        id_registro: id,
                        favorito: favorito
                    }
                };

                return res.status(202).send(response);
            }
        )
    })
});

/* PATCH PARA ALTERAR O STATUS */
router.patch('/status/:id', login.verifyToken, (req, res, next) => {
    const id = req.params.id;
    const status = req.body.status;

    if (!id || !status) {
        return res.status(400).send({ mensagem: 'Parâmetros inválidos' });
    }

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }

        conn.query(
            `UPDATE tabelaMotorista SET status = ? WHERE id = ?`,
            [status, id],
            (error, result, fields) => {
                conn.release();

                if (error) {
                    return res.status(500).send({ error: error });
                }

                const response = {
                    mensagem: 'Registro atualizado com sucesso',
                    produtoAtualizado: {
                        id_registro: id,
                        status: status
                    }
                };

                return res.status(202).send(response);
            }
        )
    })
});

/* PATCH PARA ALTERAR O STATUS FINAL */
router.patch('/statusfinal/alterar/:id', login.verifyToken, (req, res, next) => {
    const id = req.params.id;
    const statusFinal = req.body.statusFinal;

    if (!id || !statusFinal) {
        return res.status(400).send({ mensagem: 'Parâmetros inválidos' });
    }

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }

        conn.query(
            `UPDATE tabelaMotorista SET statusFinal = ? WHERE id = ?`,
            [statusFinal, id],
            (error, result, fields) => {
                conn.release();

                if (error) {
                    return res.status(500).send({ error: error });
                }

                const response = {
                    mensagem: 'Registro atualizado com sucesso',
                    produtoAtualizado: {
                        id_registro: id,
                        status: statusFinal
                    }
                };

                return res.status(202).send(response);
            }
        )
    })
});

/* DELETA PRODUTO POR PARAMETRO DA URL */
router.delete('/deletar', login.verifyToken, (req, res, next) => {
    const ids = req.query.ids.split(','); // transforma a string em um array de ids
    
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
  
      // itera sobre o array de ids, executando a query de delete para cada um
      ids.forEach(id => {
        conn.query(
          'DELETE FROM tabelaMotorista WHERE id = ?',
          [id],
          (error, result, fields) => {
            if (error) {
              console.log(error);
            }
          }
        )
      })
  
      conn.release();
  
      const response = {
        mensagem: 'Registros removidos com sucesso!',
      }
      return res.status(202).send({ response });
    })
  });

module.exports = router;