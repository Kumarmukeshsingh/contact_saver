
import AsyncHandler from "express-async-handler"
import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

// register user
// api/user/reister
// public access
export const registerUser = AsyncHandler(async (req, res) => {

   const { username, email, password } = req.body;
   console.log(username, email, password);
   if (!username || !email || !password) {
      res.status(400);
      throw new Error("All failds are mandatory ")
   }
   const userAvaliable = await User.findOne({ email });
   if (userAvaliable) {
      res.status(400);
      throw new Error("user alrady register ")
   }
   const hashedpassword = await bcrypt.hash(password, 10);

   const user = await User.create({
      username,
      email,
      password: hashedpassword,
   });
   console.log(" user is :", user);
   if (user) {
      res.status(201).json({ _id: user.id, email: user.email, password: user.password })

   } else {
      res.status(400);
      throw new Error("user data is not valid")
   }

   res.json({ message: " user create successfylly  " })

})

// login userSelect:
// api/user/login
export const loginUser = AsyncHandler(async (req, res) => {
   const { email, password } = req.body;
   if (!email || !password) {
      res.status(400);
      throw new Error(" all failds are madatory ")
   }

   const user = await User.findOne({ email });
   if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = await jwt.sign({
         user: {
            username: user.username,
            email: user.email,
            id: user.id,
         }

      }, process.env.ACCESS_TOKEN, {
         expiresIn: "15m",
      })
      res.status(200).json({ accessToken, user });
   }
   if (!user && !(await bcrypt.compare(password, user.password))) {
      res.status(400)
      throw new Error("password and email is not valid ")
   }
   // res.json({ message: "login the user" })
})

// current user
// api/user/currnt
// private access
export const currentUser = AsyncHandler(async (req, res) => {
   res.json(req.user)
})



