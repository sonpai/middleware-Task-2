const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

//Logs the current date, request method, and URL for every incoming request
function logger(req, res, next) {
  const currentDate = new Date().toISOString();
  console.log(`[${currentDate}] ${req.method} ${req.url}`);
  next();
}

//checks if the query parameter `user` equals "admin" if not it sends a 403
function checkPermissions(req, res, next) {
  const user = req.query.user;
  if (user !== "admin") {
    return res.status(403).send("Access Denied");
  }
  next();
}

app.use(logger);

//Home Page
app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

//Admin Page
app.get("/admin", checkPermissions, (req, res) => {
  res.send("Welcome to the administration page!");
});

//Public Page
app.get("/public", (req, res) => {
  res.send("This is a public page.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
