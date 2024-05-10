import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 8000;

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/Real-Estate')
    .then(() => {
        console.log("Connection established");
    })
    .catch((e) => {
        console.log("Connection not established: " + e);
    });

// Middleware
app.use(express.json());

// Route to fetch real estate listings with pagination
app.get('/listings', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 15; // Default to 15 listings per page if not specified

    try {
        const collection = mongoose.connection.db.collection('RealEstateListing');
        
        // Calculate the total number of documents in the collection
        const totalListings = await collection.countDocuments();
        
        // Calculate the total number of pages
        const totalPages = Math.ceil(totalListings / limit);

        // Fetch the listings for the requested page
        const listings = await collection.find({}, {
            projection: {
                _id: 0,
                Title: 1,
                Price: 1,
                Location: 1,
                Images: {$slice: 1},
                Source: 1,
                Date: 1,
                Link: 1,
                Surface: 1,
            }
        })
        .skip((page - 1) * limit) // Skip the listings from previous pages
        .limit(limit) // Limit the number of listings returned
        .toArray();

        // Send the listings and total number of pages in the response
        res.json({ listings, totalPages });
        console.log(totalListings)
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
