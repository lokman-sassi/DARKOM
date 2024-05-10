import mongoose from 'mongoose';

// Define the schema for your collection
const RealEstateListingSchema = new mongoose.Schema({
    title: String,
    price: String,
    location: String,
    description: String,
    images: [String],
    source: String,
    date: String,
    link: String,
    category: String,
    surface: String,
});

const RealEstateListing = mongoose.model('RealEstateListing', RealEstateListingSchema);



export { RealEstateListing };
