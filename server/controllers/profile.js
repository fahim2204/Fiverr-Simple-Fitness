const jwt = require("jsonwebtoken");
const Profile = require("../model/profile");
const { validationResult } = require("express-validator");

// GET profile by Token
exports.getProfile = async(req, res) => {
    res.status(200).send(req.authUser);
};
// GET profile by Token
exports.getStatus = async(req, res) => {
    req.authUser.status ? res.sendStatus(200) : res.sendStatus(404);
};

// UPDATE Profile
exports.putProfile = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors.errors);
    } else {
        req.authUser.modifiedAt = new Date();
        req.authUser.fullName = req.body.fullName;
        req.authUser.email = req.body.email;
        req.authUser.password = req.body.password;
        req.authUser.occupation = req.body.occupation;
        req.authUser.gender = req.body.gender;
        req.authUser.country = req.body.country;
        req.authUser.city = req.body.city;
        req.authUser.profilePic = req.body.profilePic;
        req.authUser.status = 1;
        req.authUser
            .save()
            .then(() => {
                res.status(200).send({
                    message: "Profile Updated Successfully",
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Server Error",
                    error: err,
                });
            });
    }
};

// GET Profile by Name
exports.getProfileByUsername = async(req, res, next) => {
    await Profile.findOne({ username: req.params.username })
        .then((x) => {
            res.status(200).send(x);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

// REGISTER Function
exports.postRegister = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors.errors);
    } else {
        await Profile.create(req.body)
            .then((x) => {
                res.status(201).send(x);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    }
};

// LOGIN Function
exports.postLogin = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await Profile.findOne({ username });
    if (!user) {
        return res.status(404).send({
            message: "Username or password doesn't matched",
        });
    } else {
        if (user.password !== password) {
            return res.status(401).send({
                message: "Username or password doesn't matched",
            });
        } else {
            let _token;
            const generateToken = () => {
                return jwt.sign({ username: user.username }, "fahim2204", {
                    expiresIn: "2h",
                });
            };
            if (user.token) {
                isTokenExpired(user.token) ?
                    (_token = generateToken()) :
                    (_token = user.token);
            } else {
                _token = generateToken();
            }
            await Profile.findOneAndUpdate({ username }, { token: _token, lastLogin: Date.now() })
                .then((x) => {
                    res.status(200).send({
                        username: x.username,
                        token: _token,
                        fullName: x.fullName,
                        profilePic: x.profilePic,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};

//CHECK If profile exists
exports.isProfileExist = async(user) => {
    const _profile = await Profile.findOne({ username: user });
    if (_profile) {
        return true;
    }
    return false;
};

// Check if the Token is expired
const isTokenExpired = (token) => {
    try {
        jwt.verify(token, "fahim2204");
    } catch (err) {
        return true;
    }
    return false;
};