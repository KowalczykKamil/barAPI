const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authorizationRoute = require("./routes/authoriaztion");
const studentRoute = require("./routes/student");
const drinkRoute = require("./routes/drink");
const bartenderRoute = require("./routes/bartender");


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
app.use("/api/students", studentRoute);
app.use("/api/drinks", drinkRoute);
app.use("/api/bartender", bartenderRoute);



app.listen(3000 , ()=>{
     console.log(`The Server is running.`);
})