import e from "express";
import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const ValidToken = AsyncHandler((req, res, next) => {
   let token;
   const authHeader = req.headers.authorization || req.headers.authorization;
   if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
         if (err) {
            res.status(401);
            throw new Error(" user is not authrorized")
         }

         req.user = decoded.user;
         next();
         if (!token) {
            res.status(401)
            throw new Error("user is not authrorized or token is missing ")
         }

      });
   }

})

export default ValidToken;