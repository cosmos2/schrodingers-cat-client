const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json("done");
});

app.get("/test", (req, res) => {
  res.json({ token: "asldfkjasldfjalsdfjeij239402938skdjssflkajlk" });
});

app.listen(app.get("port"), () => {
  console.log("listening on " + app.get("port"));
});
