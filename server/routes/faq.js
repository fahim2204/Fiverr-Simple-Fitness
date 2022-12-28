const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const faqController = require("../controllers/faq");

router.get("/", faqController.getFaq);
router.post(
  "/",
  [
    check("question").not().isEmpty().withMessage("Question can not be empty"),
    check("answer").not().isEmpty().withMessage("Answer can not be empty"),
  ],
  faqController.postFaq
);

module.exports = router;
