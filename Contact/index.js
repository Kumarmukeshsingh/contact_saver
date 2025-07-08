
import express from "express";
import dotenv from "dotenv";
import router from "./router/contactRouter.js";
import { router1 } from "./router/userRoutes.js";

import { errorHandler } from "./middleware/errorHandler.js";
import { connectDB } from "./config.js/dbConnection.js";
import cors from "cors"
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const Port = process.env.PORT || 5000;


const corsOption = {
   origin: "http://localhost:5173",
   methods: "POST,GET,PUT,DELETE",
   credentials: true,
}
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();
app.use(express.json());
app.use(errorHandler);
app.use("/api/contact", router);
app.use("/api/user", router1)
app.use("/", (req, res) => {
   res.send("i am from the server");
})

app.listen(Port, () => {
   console.log(`server is running on port ${Port}`);

})