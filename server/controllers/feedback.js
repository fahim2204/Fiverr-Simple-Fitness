const Feedback = require("../model/feedback");
const { validationResult } = require("express-validator");

// GET All feedback
exports.getFeedback = async(req, res) => {
    await Feedback.find()
        .populate("user", "fullName")
        .then((x) => {
            res.status(200).send(x);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
};

// ADD Feedback Function
exports.postFeedback = async(req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).send(validationErrors.errors);
    } else {
        req.body.user = req.authUser.id;
        Feedback.create(req.body)
            .then((x) => {
                res.status(201).send({ message: "Successfully submitted" });
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    }
};