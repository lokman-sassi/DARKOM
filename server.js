import express, { json } from "express";
import { connect } from "mongoose"; 
import cors from "cors";
import apiRouter from './routes.js';
const app = express();
const PORT = 8000;

// Allow the web page to access restricted resources from a server, the parameter origin van be the IP address of this device
app.use(cors());


connect('mongodb://localhost:27017/Real-Estate')
    .then(() => {
        console.log("Connection established");
    })
    .catch((e) => {
        console.log("Connection not established: " + e);
    });


app.use(json());
app.use('/api',apiRouter);



// Starting the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
