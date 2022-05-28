import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";
import path from "path";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uri ="mongodb+srv://cluster0.fzjnv.mongodb.net/PharmaEasy --apiVersion 1 --username PharmaEasy"
  
 mongoose.connect(process.env.MONGODB_URL,{  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then((err) =>{
  console.log('connection sccessful');
}).catch((err)=> console.log('no connection'));

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.get("/", (req, res) => {
  res.send("Server is ready!");
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(5000, () => {
  console.log("Server at https://127.0.0.1:5000/");
});
