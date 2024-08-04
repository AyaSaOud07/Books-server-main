require("dotenv").config();
require("./db");
const express = require("express");
const { auth } = require("./middelware/auth");
const app = express();
const cors = require("cors");


const bookRouter = require("./routes/book.router");
const userRouter = require("./routes/user.router");

const mongoose = require("mongoose");
app.use(cors());

app.use(express.json());


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.get("/Welcome", (req, res) => {
  res.render("index", { title: "WELCOME TO EJS", message: "HELLO ITI!" });
});
app.get("/try-redirect", (req, res) => {
  res.redirect("/about.html");
});

app.use("/api/users", userRouter);
app.use(auth);
app.use("/api/books",bookRouter );





const port = process.env.PORT || 3000;
mongoose.connection.once("open", () => {
  console.log("DB Connection stablished...");
  app.listen(port, () => {
    console.log(`listening to port ${port}`);
  });
});
