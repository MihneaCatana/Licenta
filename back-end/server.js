const express = require("express");
const router = require("./routes");
const app = express();
const cors = require("cors");

const port = 8085;
app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log("Server started on port " + port);
  console.log("http://localhost:" + port);
});
