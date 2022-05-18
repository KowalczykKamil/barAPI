const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
    {
        studentId:{type:String, required:true},
        drinks:[{
            drinkId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1,
            }
        }
    ],
      amount:{type:Number, required:true},
    },
    {timestamps:true}
)
module.exports = mongoose.model("Bill", BillSchema); 