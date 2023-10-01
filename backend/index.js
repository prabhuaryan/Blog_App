const express= require('express');
const app=express();
const dotenv=require('dotenv');
const connection =require('./config/db');
const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const postRoute=require('./routes/posts');
const categoryRoute=require('./routes/categories');
const multer = require("multer");
const path = require("path");
const morgan=require('morgan');

//Middleware
dotenv.config();

//DB connection 
connection();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/users',userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


app.listen(process.env.PORT,()=>{
    console.log(`Development server is started at http://localhost:${process.env.PORT}`)
})