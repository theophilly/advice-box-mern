import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import Category from "./models/categoryModel.js";
import adviceRoute from "./routes/adviceRoute.js";

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.egm3f.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log("database conection succesfully"))
  .catch((err) => console.log(err));

app.use("/api/user", userRoute);
app.use("/api", adviceRoute);

app.get("/api/advice", async (req, res) => {
  //   const m = new Category({
  //     categories: ["all", "programming", "life", "relationships", "investment"],
  //   });

  //   const ewcategories = await m.save();
  //   console.log(ewcategories);

  const m = await Category.find({});
  console.log(m);

  return res.status(200).send(m);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("app running on port 5000"));
