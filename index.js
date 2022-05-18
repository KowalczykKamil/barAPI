const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authorizationRoute = require("./routes/authoriaztion");

const app = express();
dotenv.config();



mongoose.connect(
    process.env.MONGO_URL
    ).then(()=>console.log("MongoDBConnection is successsfull."))
     .catch((error)=>{
         console.log(error);
     });

app.use(express.json());

app.use("/api/authorization", authorizationRoute);



app.listen(3000 , ()=>{
     console.log(`The Server is running.`);
})