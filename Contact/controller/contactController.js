import AsyncHandler from "express-async-handler"
import { Contact } from "../model/contactModel.js";



// get all contect  get method
// user
// private
export const getAllContact = AsyncHandler(async (req, res) => {


   const contacts = await Contact.find({ user_id: req.user.id });
   // const contacts = await Contact.find();
   console.log(contacts);

   res.status(200).json(contacts);


})

// create contact with the help of post method
// user/create
// private
export const createContact = AsyncHandler(async (req, res) => {
   const { name, email, phone } = req.body;
   if (!name || !email || !phone) {
      res.status(400);
      throw new Error("all fildes are maditaory ")
   }
   const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id,
   })
   if (!contact) {
      res.status(404)
      throw new Error(" contact not created ")
   }
   res.status(201).json({ message: "ok", contact })
})



// find one contact get/:id method
// user/id
// private
export const getContact = AsyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);
   if (!contact) {
      res.status(404);
      throw new Error(" contact not found ")
   }

   res.status(200).json({ contact })
})

// updata with put method
// user/updte/:id
// private
export const updateContact = AsyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);
   console.log(contact);
   if (!contact) {
      res.status(404);
      throw new Error(" contact not found  ")
   }
   if (contact.user_id.toString() !== req.user.id) {
      throw new Error(" user do not have permision to update other user contacts ");
   }
   const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true
   })
   res.status(200).json({ message: `updated successfully `, updatedContact })
})

// delte method
// user/delete/:id
// private
export const deleteContact = AsyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);
   if (!contact) {
      res.status(404);
      throw new Error(" contact not found ")
   }
   if (contact.user_id.toString() !== req.user.id) {
      throw new Error(" user do not have permision to update other user contacts ");
   }
   await Contact.findOneAndDelete(contact)
   res.status(200).json({ message: ` remove successfully`, contact })
})






