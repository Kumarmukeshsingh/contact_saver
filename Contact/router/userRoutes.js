
import e from "express";
import { currentUser, loginUser, registerUser } from "../controller/userController.js";
import ValidToken from "../middleware/validateTokenHandler.js";
const router = e.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/current").post(ValidToken, currentUser)

export const router1 = router;