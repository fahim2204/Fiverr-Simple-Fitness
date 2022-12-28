const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const { check } = require("express-validator");
const profileController = require("../controllers/profile");

router.get("/", Auth.authenticateJWT, profileController.getProfile);
router.get("/status", Auth.authenticateJWT, profileController.getStatus);
router.put("/", Auth.authenticateJWT, [
    check("fullName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),
    check("profilePic").not().isEmpty()
    .withMessage("Must select a profile picture"),
    check("occupation").not().isEmpty()
    .withMessage("Occupation can not be empty"),
    check("email").not().isEmpty()
    .withMessage("Email can not be empty"),
    check("country").not().isEmpty()
    .withMessage("Country can not be empty"),
    check("city").not().isEmpty()
    .withMessage("City can not be empty"),
    check("gender").not().isEmpty()
    .withMessage("Select a gender"),
    check("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),

], profileController.putProfile);
router.get("/:username", profileController.getProfileByUsername);

module.exports = router;