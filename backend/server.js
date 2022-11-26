const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
const port = 9000;

app.use(express.json());
app.use(fileUpload());

const apiRoutes = require("./routes/apiRoutes");

app.get("/", async ( req, res ) => {
  res.json({ message: "Sup" });
});

const connectDB = require("./config/db");
connectDB();

app.use("/api", apiRoutes);

// app.use((error, req, res ) => {
//   res.json({
//     message: error.message,
//     stack: error.stack,
//   });
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
