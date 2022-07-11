const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

const articles = [];

app.get("/articles", (_, res) => {
  res.json(articles?.slice(0, 5));
});

app.post("/articles", (req, res) => {
  const article = req.body;
  articles.unshift(article);
  res.json(article);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
