const mongoose = require("mongoose");

const BartenderSchema = new mongoose.Schema(
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

      status:{type:String, default:"In preparation."},
    },
    {timestamps:true}
)
module.exports = mongoose.model("Bartender", BartenderSchema);