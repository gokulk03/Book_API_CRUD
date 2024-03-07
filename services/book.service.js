const db = require('../database.js');
module.exports.getAllBooks = async()=>{
    try{
        const [records]=await db.query('SELECT * FROM bookstore');
        if(records.length===0){
            console.log('There are not books present')
        }else{
            return [records];
        }
    }
    catch(error){
        console.error(error);
        throw new Error('Failed to fetch all the records in the bookstore');
    }
    
}

module.exports.getSingleBook = async(id)=>{
    try{
        const book = await db.query('SELECT * FROM bookstore WHERE id = ?',[id])
        if(book!=null){
            console.log('Successfully fetched the book from the bookstore db');
            return book;
        }
    }
    catch(error){
        console.log(error);
        throw new Error('Failed to fetch the selected book from the database');
    }
}

module.exports.addBook = async(book_name,book_author,published_date,copies_present,copies_sold)=>{
    try{
        const newbook = await db.query('INSERT INTO bookstore (book_name,book_author,published_date,copies_present,copies_sold) VALUES (?,?,?,?,?)',[book_name,book_author,published_date,copies_present,copies_sold]);
        return [newbook];
    }
    catch(error){
        throw new Error('The values could not be inserted into the database')
    }
}

module.exports.updateBook = async(id,book_name,book_author,published_date,copies_present,copies_sold)=>{
    try{
        const newdata = {book_name,book_author,published_date,copies_present,copies_sold};
        const [result]= await db.query('UPDATE bookstore SET book_name = ?, book_author=?,published_date = ?,copies_present=?,copies_sold=? WHERE id = ?',[book_name,book_author,published_date,copies_present,copies_sold,id])
        return {message:'Updated the selected book id'};
    }
    catch(error){
        console.log(error);
        throw new Error('Failed to update the book');
    }
}

module.exports.deleteBook = async(id)=>{
    const deletedRows = await db.query('DELETE FROM bookstore WHERE id = ?',[id])
        .catch(err=>console.error(err))
    return deletedRows;
}

