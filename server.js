import express from "express";
import mongoose from "mongoose"; 
import cors from "cors"; 

const app = express();
const PORT = 8000;

// Allow the web page to access restricted resources from a server
app.use(cors());


mongoose.connect('mongodb://localhost:27017/Real-Estate')
    .then(() => {
        console.log("Connection established");
    })
    .catch((e) => {
        console.log("Connection not established: " + e);
    });


app.use(express.json());

app.get('/listings', async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = 15; 
    const skip = (page - 1) * limit; 

    try {
        const collection = mongoose.connection.db.collection('RealEstateListing');
        
        const listings = await collection.find({}, {
            projection: {
                _id: 0,
                Title: 1,
                Price: 1,
                Location: 1,
                Images: 1,
                Source: 1,
                Date: 1,
                Link: 1,
                Surface: 1,
            }
        })
        .skip(skip) 
        .limit(limit) 
        .toArray();

        console.log(listings.length)

        const totalListings = await collection.countDocuments();
        const totalPages = Math.ceil(totalListings / limit);

        res.setHeader('Content-Type', 'application/json');
        res.json({ listings, totalPages });
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Starting the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
