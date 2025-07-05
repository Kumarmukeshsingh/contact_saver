import mongoose from "mongoose"


export const connectDB = async () => {
   try {
      const connect = await mongoose.connect(process.env.MONGODB_URL);
      console.log(" db connection success :", connect.connection.host, connect.connection.name);
   } catch (error) {
      console.log(error);

      process.exit(1);

   }
}
