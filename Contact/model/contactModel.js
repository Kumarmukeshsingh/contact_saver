import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
   user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
   },
   name: {
      type: String,
      required: [true, " please add the contact name"]
   },
   email: {
      type: String,
      required: [true, " please add the vaild email"]
   },
   phone: {
      type: String,
      required: [true, " please enter phone number "]
   },
}, {
   timestamps: true,
})

export const Contact = mongoose.model("Contact", contactSchema);
