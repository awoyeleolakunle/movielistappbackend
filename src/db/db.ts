import mongoose from "mongoose";

const connectToDatabase = () => {
  const mongoUrl = "mongodb://127.0.0.1:27017/moviedb";

  mongoose.Promise = global.Promise;

  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", async () => {
    console.log("Connected to MongoDB");
  });
};

export default connectToDatabase;
