import { Schema } from 'mongoose';
import mongoose from "mongoose";

const ListingSchema = new Schema({
    Title: {
        type: String,
        // required: true
    },
    Price: {
        type: String,
        // required: true
    },
    Location: {
        type: String,
        // required: true

    },
    Description: {
        type: String,
        // required: true
    },
    Images: [{
        type: String,
        // // required: true
    }],
    Source: {
        type: String,
        // required: true
    },
    Date: {
        type: String,
        // // required: true
    },
    Link: {
        type: String,
        // required: true
    },
    Category: {
        type: String,
      }      
}, { timestamps: true })


const RealEstateListing = mongoose.model('RealEstateListing', ListingSchema);
export default RealEstateListing;
