const mongoose = require("mongoose");

const DrinkSchema = new mongoose.Schema(
    {
        title:{type:String, required:true, unique:true},
        categoriesOfAlkohol:{type:Array, required:true},
        ingredients:{type:Array, required:true},
        size:{type:Number, required:true},
        price:{type:Number, required:true}  
    },
    {timestamps:true}
)
module.exports = mongoose.model("Drink", DrinkSchema);