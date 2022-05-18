const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
    {
        username:{type:String, required:true, unique:true},
        password:{type: String, required:true},
        email:{type:String, required:true, unique:true },
        isAdmin:{
            type:Boolean,
            default:false,
        },
        studentCard:{
            type:Boolean,
            default:true,
        }
    },
    {timestamps:true}
)
module.exports = mongoose.model("Student", StudentSchema); 