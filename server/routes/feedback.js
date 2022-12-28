const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const feedbackController = require("../controllers/feedback");
const Auth = require("../middleware/auth");

router.get("/", feedbackController.getFeedback);
router.post(
    "/", Auth.authenticateJWT ,[
        check("opinion")
        .not()
        .isEmpty()
        .withMessage("Select an opinion"),
        check("category")
        .not()
        .isEmpty()
        .withMessage("Select a category"),
        check("feedText")
        .not()
        .isEmpty()
        .withMessage("Feedback text shouldn't be empty"),
    ],
    feedbackController.postFeedback
);

module.exports = router;