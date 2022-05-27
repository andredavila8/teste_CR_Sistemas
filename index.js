const express = require('express')
const app = express()


const Product = require('./models/Product')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// rotas
app.post('/product', async (req, res) => {
  const { prodId, prodUnidId, prodCodigo, prodCodigoBarras, prodDescricao, prodOrigem, prodRecStatus, prodCreatedAt, prodUpdatedAt, prodOrigemDesc, prodRecStatusDesc} = req.body

  const product = {
    prodId,
    prodUnidId,
    prodCodigo,
    prodCodigoBarras,
    prodDescricao,
    prodOrigem,
    prodRecStatus,
    prodCreatedAt,
    prodUpdatedAt,
    prodOrigemDesc,
    prodRecStatusDesc
  }

  try {
    await Product.create(product)

    res.status(200).json({ message: 'Produto cadastrado com sucesso!' })
  } catch (error) {
    res.status(404).json({ erro: error })
  }
})

app.get('/product', async (req, res) => {
  try {
    const product = await Product.find()

    res.status(200).json(people)
  } catch (error) {
    res.status(404).json({ erro: error })
  }
})

app.get('/product/:id', async (req, res) => {
  const id = req.params.id

  try {
    const product = await Product.findOne({ _id: id })

    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado!' })
      return
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(404).json({ erro: error })
  }
})

app.patch('/product/:id', async (req, res) => {
  const id = req.params.id

  const { prodId, prodUnidId, prodCodigo, prodCodigoBarras, prodDescricao, prodOrigem, prodRecStatus, prodCreatedAt, prodUpdatedAt, prodOrigemDesc, prodRecStatusDesc} = req.body
  
  const product = {
    prodId,
    prodUnidId,
    prodCodigo,
    prodCodigoBarras,
    prodDescricao,
    prodOrigem,
    prodRecStatus,
    prodCreatedAt,
    prodUpdatedAt,
    prodOrigemDesc,
    prodRecStatusDesc
  }

  try {
    const updatedProduct = await Product.updateOne({ _id: id }, product)

    if (updatedProduct.matchedCount === 0) {
      res.status(404).json({ message: 'Produto não encontrado!' })
      return
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(404).json({ erro: error })
  }
})

app.delete('/product/:id', async (req, res) => {
  const id = req.params.id

  const product = await Product.findOne({ _id: id })

  if (!product) {
    res.status(404).json({ message: 'Produto não encontrado!' })
    return
  }

  try {
    await Product.deleteOne({ _id: id })

    res.status(200).json({ message: 'Produto removido com sucesso!' })
  } catch (error) {
    res.status(404).json({ erro: error })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Testando o Express!' })
})