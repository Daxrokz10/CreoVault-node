import mongoose from 'mongoose';
import env from 'dotenv';
env.config();

const db = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Atlas Database Connected!..");    
  } catch (error) {
    console.log(error);    
  }
}

export default db();