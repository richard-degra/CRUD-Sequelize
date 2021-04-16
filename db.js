const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb3',
  password: 'postgres',
  port: 5432,
})

// Rotas do app //

const getPessoas = (request, response) => {
    pool.query('SELECT * FROM pessoas ORDER BY id DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getPessoaById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM pessoas WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createPessoa = (request, response) => {
    const { nome, email, telefone } = request.body
  
    pool.query('INSERT INTO pessoas (nome, email, telefone) VALUES ($1, $2, $3)', [nome, email, telefone], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Cadastro criado com sucesso.`)
    })
  }
  
  const updatePessoa = (request, response) => {
    const id = parseInt(request.params.id)
    const { nome, email, telefone } = request.body
  
    pool.query(
      'UPDATE pessoas SET nome = $1, email = $2, telefone = $3 WHERE id = $4',
      [nome, email, telefone, id],
      (error, result) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Cadastro ${id} atualizado com sucesso.`)
      }
    )
  }
  
  const deletePessoa = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM pessoas WHERE id = $1', [id], (error, result) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Cadastro ${id} removido com sucesso `)
    })
  }
  
  module.exports = {
    getPessoas,
    getPessoaById,
    createPessoa,
    updatePessoa,
    deletePessoa, 
}

