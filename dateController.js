import FinalDB from "./listings.js";

export async function fetchData(req,res,next){
    const page = parseInt(req.query.page) || 1; 
    const limit = 15; 
    const skip = (page - 1) * limit; 
    
    const filters = {};
    if (req.query.FLOOR) filters.FLOOR = req.query.FLOOR;
    if (req.query.ROOMS) filters.ROOMS = req.query.ROOMS;
    //if (req.query.minSurface) { filters.SURFACE = { $regex: new RegExp(req.query.minSurface) }; }
    //if (req.query.maxSurface) { filters.SURFACE.$regex = new RegExp(req.query.maxSurface);} 
    
    
    // Surface filtering
if (req.query.minSurface || req.query.maxSurface) {
    const surfaceConditions = [];
    if (req.query.minSurface) {
        surfaceConditions.push({
            $gte: [
                { 
                    $convert: {
                        input: "$$surface",
                        to: "double",
                        onError: null,
                        onNull: null
                    }
                },
                Number(req.query.minSurface)
            ]
        });
    }
    if (req.query.maxSurface) {
        surfaceConditions.push({
            $lte: [
                { 
                    $convert: {
                        input: "$$surface",
                        to: "double",
                        onError: null,
                        onNull: null
                    }
                },
                Number(req.query.maxSurface)
            ]
        });
    }
    filters.$expr = filters.$expr || {};
    filters.$expr.$and = filters.$expr.$and || [];
    filters.$expr.$and.push({
        $anyElementTrue: {
            $map: {
                input: "$SURFACE",
                as: "surface",
                in: {
                    $and: surfaceConditions
                }
            }
        }
    });
}

    // if (req.query.minPrice) {filters.PRICE = { $gte: Number(req.query.minPrice) };}
    // if (req.query.maxPrice) {filters.PRICE = { ...filters.PRICE, $lte: Number(req.query.maxPrice) };}

    // Price filtering
if (req.query.minPrice || req.query.maxPrice) {
    const priceConditions = [];
    if (req.query.minPrice) {
        priceConditions.push({
            $gte: [
                { 
                    $convert: {
                        input: "$$price",
                        to: "double",
                        onError: null,
                        onNull: null
                    }
                },
                Number(req.query.minPrice)
            ]
        });
    }
    if (req.query.maxPrice) {
        priceConditions.push({
            $lte: [
                { 
                    $convert: {
                        input: "$$price",
                        to: "double",
                        onError: null,
                        onNull: null
                    }
                },
                Number(req.query.maxPrice)
            ]
        });
    }
    filters.$expr = filters.$expr || {};
    filters.$expr.$and = filters.$expr.$and || [];
    filters.$expr.$and.push({
        $anyElementTrue: {
            $map: {
                input: "$PRICE",
                as: "price",
                in: {
                    $and: priceConditions
                }
            }
        }
    });
}
      

    if (req.query.SaleType) filters.SaleType = req.query.SaleType;
    if (req.query.CATEGORY) filters.CATEGORY = req.query.CATEGORY;

    // Location filtering
    if (req.query.Location) {
        filters.Location = { $regex: new RegExp(req.query.Location, "i") };
    }

    try {
        //const collection = connection.db.collection('RealEstateListing');
        
        const listings = await FinalDB.find(filters)
        .skip(skip) 
        .limit(limit);

        console.log(listings.length)

        // const totalListings = await FinalDB.countDocuments();
        const totalListings = await FinalDB.countDocuments(filters);
        const totalPages = Math.ceil(totalListings / limit);

        res.setHeader('Content-Type', 'application/json');
        res.json({ listings, totalPages });
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}