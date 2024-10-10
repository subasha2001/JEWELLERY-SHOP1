import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.router";
import { dbConnect } from './configs/db.config';
import bannerRouter from './routes/banner.router';
import userRouter from './routes/user.router';
import path from 'path';
dbConnect();

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/products", productsRouter)
app.use("/api/banner", bannerRouter)
app.use("/api/users", userRouter);

import multer from "multer"
const upload = multer({
    dest:'/public/assets2/gold/'
})
// app.post('/stats', upload.single('imageDis'), (req, res, next)=>{
//     const data = req.body;
//     const file = req.file;
//     console.log(data, file);
//     res.send(file)
// })
app.post('/upload', upload.single('imageDis'), (req,res)=>{
    res.send(req.body);
})

const port = 3000;

app.listen(port,()=>{
    console.log('connected to '+ port);
});