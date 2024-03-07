const express = require('express')
const app = express()

app.use(express.json())

const db = require('./database.js')
const bookRoutes = require('./controllers/book.controller.js')
const PORT = 3000;
app.listen(PORT,(req,res)=>{
    console.log(`the server is running on port ${PORT}`)
})
app.use('/api/books',bookRoutes);

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status||500).send('Internal Server Error')
})