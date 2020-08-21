const express = require("express");
const app = express();
var cors = require('cors');

app.use(
  cors({
      credentials: true,
      origin: true
  })
);
app.options('*', cors());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  // console.log(`Listening at http://localhost:${port}`);
});
