const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const Auth = require("../middleware/auth");
const galleryController = require("../controllers/gallery");

router.get("/", galleryController.getGallery);
router.get("/private", Auth.authenticateJWT, galleryController.getPrivateGallery);
router.get("/archive", Auth.authenticateJWT, galleryController.getPrivateArchivedGallery);
router.post(
    "/",
    Auth.authenticateJWT, [
        check("categoryName").not().isEmpty().withMessage("Category Name can not be empty"),
        check("uploadedImage").not().isEmpty().withMessage("Uploaded Image can not be empty"),
        check("resultantImage").not().isEmpty().withMessage("Resultant Image can not be empty"),
    ],
    galleryController.postGallery
);

module.exports = router;