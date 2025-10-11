import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import mongoose from 'mongoose'

 
const connect= async(req,res) => {
    try{
       const uri = process.env.MONGO_URI
        
        const conn = await mongoose.connect(uri);
     console.log(`MongoDB Connected: ${conn.connection.host}`);

    }
    catch(error){
        console.log('error connecting db : ',error.message)

    }

}

export default connect