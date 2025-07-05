import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
   username: {
      type: String,
      required: [true, " please add a user name"]
   },
   email: {
      type: String,
      required: [true, " please add a email address"],
      unique: [true, " Email already taken "],
   },
   password: {
      type: String,
      required: [true, " please add a user pssword "],

   },
},
   {
      timestamps: true,
   }
)

export const User = mongoose.model("User", userSchema)