import express, { Router } from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
const app= express();

app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);
mongoose.connect(
    "mongodb+srv://admin:K9U5BouVIR64lth3@cluster0.wqizlfx.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => app.listen(5000))
.then(()=> console.log("connected to database and listening to localhost 5000")
)
.catch((err) =>console.log(err));
