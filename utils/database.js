import Mongoose from "mongoose";

const connectDataBase = async () => {
  return Mongoose.connect(process.env.MONGODB_URL);
};

export { connectDataBase };
