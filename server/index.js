const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 8080;
var corsOrigin = {
    origin: ["http://localhost:3000", "https://pass.fahimfaisal.net"],
};
app.use(cors(corsOrigin));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.listen(port, () =>
    console.log(`Server Started :: http://localhost:${port}`)
);

mongoose.connect(
    "mongodb+srv://fahim2204:fahim2204@cluster0.md64krj.mongodb.net/camouflagedb",
    () => console.log("Connected To DB"),
    (e) => console.log("Error DB>> ", e)
);

// Requiring all Routers
const profileRouter = require("./routes/profile");
const rootRouter = require("./routes/root");
const galleryRouter = require("./routes/gallery");
const feedbackRouter = require("./routes/feedback");
const faqRouter = require("./routes/faq");

app.use("/", rootRouter)
app.use("/profile", profileRouter)
app.use("/gallery", galleryRouter)
app.use("/feedback", feedbackRouter)
app.use("/faq", faqRouter)
app.use((req, res) => { res.status(404).send("Not Found: No such route"); });