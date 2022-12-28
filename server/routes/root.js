const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const profileController = require("../controllers/profile");

router.post(
    "/register", [
        check("username")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters")
        .custom((username) => {
            return profileController
                .isProfileExist(username)
                .then((res) => {
                    if (res) {
                        return Promise.reject("User already exists");
                    }
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        }),
        check("password")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Password must be at least 4 characters"),
        check("fullName")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Full name must be at least 3 characters"),
        check("confirmPassword")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Confirm Password could not be empty")
        .custom((value, { req }) => {
            return value != req.body.password ?
                Promise.reject("Password mismatch") :
                true;
        }),
    ],
    profileController.postRegister
);
router.post(
    "/login", [
        check("username")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters"),
        check("password")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Password must be at least 4 characters"),
    ],
    profileController.postLogin
);

module.exports = router;