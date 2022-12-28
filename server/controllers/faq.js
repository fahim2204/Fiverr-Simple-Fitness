const Faq = require("../model/faq");
const { validationResult } = require("express-validator");

// GET All FAQs
exports.getFaq = async(req, res) => {
    await Faq.find()
        .then((x) => {
            res.status(200).send(x);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
};

// ADD Faq Image Function
exports.postFaq = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors.errors);
    } else {
        await Faq.create(req.body)
            .then((x) => {
                res.status(201).send(x);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    }
};
