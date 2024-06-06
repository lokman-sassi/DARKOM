import { Schema } from 'mongoose';
import mongoose from "mongoose";

const ListingSchema = new Schema({
    Title: {
        type: String,
    },
    Price: {
        type: String,
    },
    Location: {
        type: String,

    },
    Description: {
        type: String,
    },
    Images: [{
        type: String,
    }],
    Source: {
        type: String,
    },
    Date: {
        type: String,
    },
    Link: {
        type: String,
    },
    Category: {
        type: String,
      },
    CATEGORY: [{
        type: String,
    }],   
    FLOOR: [{
        type: String,
    }],  
    LOCATION: [{
        type: String,
    }],       
    PRICE: [{
        type: String,
    }], 
    ROOMS: [{
        type: String,
    }], 
    SALE_TYPE: [{
        type: String,
    }],   
    SURFACE: [{
        type: String,
    }],       
}, { timestamps: true })


const FinalDB = mongoose.model('FinalDB', ListingSchema);
export default FinalDB;
