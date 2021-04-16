const express = require('express')
const parser = require('body-parser')
const app = express()
const port = 3000
const db = require('./db')

app.use(parser.json())
app.use(
    parser.urlencoded({
      extended: true,
    })
  )

app.listen(port, () => {
   console.log(`Servidor rodando na porta de conexão ${port}.`)
})
   
// rota get //

app.get('/pessoas', db. getPessoas)

// get por id //

app.get('/pessoas/:id', db.getPessoaById)

// inserir dados // 
app.post('/pessoas', db.createPessoa)

// atualizar dados //

app.put('/pessoas/:id', db.updatePessoa)

// deletar dados //

app.delete('/pessoas/:id', db.deletePessoa)

