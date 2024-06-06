import FinalDB from "./listings.js";
//import pkg from "mongoose"; 
//const { connection } = pkg;


export async function fetchData(req,res,next){
    const page = parseInt(req.query.page) || 1; 
    const limit = 15; 
    const skip = (page - 1) * limit; 

    try {
        //const collection = connection.db.collection('RealEstateListing');
        
        const listings = await FinalDB.find(
        //     {}, {
        //     projection: {
        //         _id: 1,
        //         Title: 1,
        //         Price: 1,
        //         Location: 1,
        //         Images: 1,
        //         Source: 1,
        //         Date: 1,
        //         Link: 1,
        //         Surface: 1,
        //     }
        // }
    )
        .skip(skip) 
        .limit(limit) 
        /*.toArray()*/;

        console.log(listings.length)

        const totalListings = await FinalDB.countDocuments();
        const totalPages = Math.ceil(totalListings / limit);

        res.setHeader('Content-Type', 'application/json');
        res.json({ listings, totalPages });
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}