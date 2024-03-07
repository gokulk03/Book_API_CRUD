const express = require('express')
const router = express.Router()
const service = require('../services/book.service.js')

router.get('/',async (req,res)=>{
    try{
        const books = await service.getAllBooks();
        res.send(books);
        console.log(books);
    }
    catch(error){
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const book = await service.getSingleBook(req.params.id);
        res.send(book);
        console.log(book);
    }
    catch(error){
        res.status(500).send({message:'Internal Server Error'})
    }

});

router.post('/',async(req,res)=>{
    try{
        const {book_name,book_author,published_date,copies_present,copies_sold} = req.body;
        if(!book_name || !book_author || !published_date || !copies_present || !copies_sold){
            res.status(400).json({message:'pls enter all fields'})
        }
        const newbook = await service.addBook(book_name,book_author,published_date,copies_present,copies_sold);
        res.status(201).send('New Book created at the bookstore db');
        return [newbook];
    } 
    catch(error){
        console.log(error);
        throw new Error('Internal Server Error');
    }
});


router.put('/:id',async(req,res)=>{
    try{
        const {id}= req.params;
        const {book_name,book_author,published_date,copies_present,copies_sold}=req.body;
        if(!book_name||!book_author||!published_date||!copies_present||!copies_sold){
            res.status(400).json({message:'Please fill in all fields'});
        }
        else{
            const updatedBook = await service.updateBook(id,book_name,book_author,published_date,copies_present,copies_sold);
            res.status(200).send('The selected Book got updated')
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Internal Server Error'});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const deletedrows = await service.deleteBook(req.params.id);
        if(deletedrows===0){
            res.status(404).json('no record found with the given id : '+req.params.id)
        }else{
            res.send('Book with the given id deleted successfully')
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send('the selected book could not be deleted');
    }
    

});

module.exports = router;