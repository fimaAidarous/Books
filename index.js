import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodels.js";
import booksRoute from './routes/booksRoute.js';

const app = express();

// MidleWare for parsing request body

app.use(express.json());

// MidleWare for hadling CORS POlicy
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
app.use(
    cors({
        origin: 'http://localhost:5577',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['content-type'],
    })
);

app.get("/", (request, response) => {
  console.log(request);
  return request.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use('/books', booksRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`App is Listening to port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
