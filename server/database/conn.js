import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connect() {
  try {
    const atlasURI = process.env.MONGODB_URI;

    mongoose.set("strictQuery", true);
    await mongoose.connect(atlasURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
    return mongoose.connection;
  } catch (error) {
    console.error("Database Connection Error:", error);
    throw error;
  }
}

export default connect;
