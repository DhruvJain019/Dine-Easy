const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 5001;
const app = require("./app");

const mongoDbUri = process.env.MONGO_URI;
mongoose.connect(mongoDbUri);

app.listen(port, () => {
  console.log(`API server started at ${port}`);
});
