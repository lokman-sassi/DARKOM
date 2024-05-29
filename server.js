// import express from "express";
// import mongoose from "mongoose"; 
// import cors from "cors"; 

const express = require("express");
const mongoose= require("mongoose") 
const cors = require("cors")
const apiRouter=require('./routes')
const app = express();
const PORT = 8000;

// Allow the web page to access restricted resources from a server, the parameter origin van be the IP address of this device
app.use(cors());


mongoose.connect('mongodb://localhost:27017/Real-Estate')
    .then(() => {
        console.log("Connection established");
    })
    .catch((e) => {
        console.log("Connection not established: " + e);
    });


app.use(express.json());
app.use('/api',apiRouter);

// app.get('/listings',
// )


// Starting the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
