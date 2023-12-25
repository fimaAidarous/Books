import express, { request, response } from "express"
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookmodels.js';

const app = express();

// MidleWare for parsing request body

app.use(express.json());

app.get('/', (request,response) =>{
   console.log(request)
   return request.status(234).send('Welcome to MERN Stack Tutorial') 
});

//Route for save
app.post('/books', async (request,response) => {
 try{
    if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publisherYear
    )
    {
        return response.status(400).send({
            message:'Send all required fileds:title,author,publisher',
        });
    }
    const newBook = {
        title:request.body.title,
        author:request.body.author,
        publisherYear:request.body.publisherYear,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
 }catch (error) {
    console.log(error.message);
    response.status(500).send({message:error.message});
 }
});

//Route for Get All Books from database
app.get('/books', async(request,response) => {
    try{
        const books = await Book.find({});

    return response.status(200).json({
        count: books.length,
        data:books
    });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});



mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to Database');
    app.listen(PORT, () => {
        console.log(`App is Listening to port:${PORT}`);
    })    
}).catch((error) => {
    console.log(error);
});
