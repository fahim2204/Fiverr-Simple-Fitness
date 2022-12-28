const jwt = require("jsonwebtoken");
const Gallery = require("../model/gallery");
const { validationResult } = require("express-validator");

// GET All Gallery
exports.getGallery = async(req, res) => {
    await Gallery.find({ isPublic: 1 })
        .then((x) => {
            res.status(200).send(x);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
};

// GET ALL Private gallery by Token
exports.getPrivateGallery = async(req, res) => {
    await Gallery.find({ user: req.authUser.id, isArchived: 0 })
        .then((x) => {
            res.status(200).send(x);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
};


// GET ALL Private gallery by Token
exports.getPrivateArchivedGallery = async(req, res) => {
    await Gallery.find({ user: req.authUser.id, isArchived: 1 })
        .then((x) => {
            res.status(200).send(x);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
};

// ADD Gallery Image Function
exports.postGallery = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors.errors);
    } else {
        req.body.user = req.authUser.id;
        await Gallery.create(req.body)
            .then((x) => {
                res.status(201).send(x);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    }
};