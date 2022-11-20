const express = require("express");
const app = express();
const port = 9000;

const apiRoutes = require("./routes/apiRoutes");

app.get("/", async (req, res, next) => {
  res.json({ message: "Sup" });
});

const connectDB = require("./config/db");
connectDB();

app.use("/api", apiRoutes);

app.use((error, req, res ) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
