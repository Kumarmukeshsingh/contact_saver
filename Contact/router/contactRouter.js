import e from "express";
import { createContact, deleteContact, getAllContact, getContact, updateContact } from "../controller/contactController.js";
import ValidToken from "../middleware/validateTokenHandler.js";
const router = e.Router();

router.use(ValidToken);
router.route('/').get(getAllContact);
router.route('/:id').get(getContact)
router.route('/create').post(createContact)
router.route('/update/:id').put(updateContact)
router.route('/delete/:id').delete(deleteContact)



export default router;