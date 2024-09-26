import express from "express";
import {
  addNewAdmin,
  addNewStadium,
  getAllStadiums,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPlayer,
  playerRegister,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isPlayerAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/player/register", playerRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.post("/stadium/addnew", isAdminAuthenticated, addNewStadium);
router.get("/stadiums", getAllStadiums);
router.get("/player/me", isPlayerAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/player/logout", isPlayerAuthenticated, logoutPlayer);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router;
