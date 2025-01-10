import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  try {
    await connect(process.env.MONGODB_URI).then(() => {
      console.log("database connected successfully");
    });
  } catch (error) {
    console.error("error occured while connecting to databse", error);
  }
};

export default dbConnect;
