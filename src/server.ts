import mongoose from "mongoose";
import config from "./utils/config";
import app from "./app";

const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseURL as string);
    console.log("⚡ Database has connected successfully");

    app.listen(config.port, () => {
      console.log(`The port is connected to ${config.port} ⚓`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectDB();
