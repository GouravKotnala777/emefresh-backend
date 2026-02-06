import mongoose from "mongoose";

async function connectDatabase(DATABASE_URI:string|undefined){
    try {
        if (!DATABASE_URI) {
            throw new Error(`DATABASE_URI is undefined ${DATABASE_URI}`);
        }
        const db = await mongoose.connect(DATABASE_URI);

        //console.log(db);
        console.log("database...");
        
    } catch (error) {
        console.log(error);
    }
};

export default connectDatabase;