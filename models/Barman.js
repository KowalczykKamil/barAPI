const mongoose = require("mongoose");

const BarmanSchema = new mongoose.Schema(
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
      status:{type:String, default:"In preparation."},
    },
    {timestamps:true}
)
module.exports = mongoose.model("Barman", BarmanSchema);