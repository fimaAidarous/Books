import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodels.js";

const app = express();

// MidleWare for parsing request body

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return request.status(234).send("Welcome to MERN Stack Tutorial");
});

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
