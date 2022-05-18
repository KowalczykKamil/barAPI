const router = require("express").Router();
const Student = require("../models/Student");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//Register

router.post("/register", async (req, res)=>{
    const newStudent = new Student({
        username:req.body.username,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString(),
        email:req.body.email,
    });
    try{
        const savedStudent =  await newStudent.save()
        res.status(201).json(savedStudent) 
    }
    catch(error){
        res.status(500).json(error);
    }
   
});
//Login
router.post("/login", async(req,res)=>{
    try{
        const student = await Student.findOne(
            {
                username: req.body.username
            }
        );

        if(!student){
            res.status(401).json("Wrong username.");
        } 

        const descryptedPassword = CryptoJS.AES.decrypt(
            student.password,
            process.env.PASSWORD_SECRET
        );

        const password = descryptedPassword.toString(CryptoJS.enc.Utf8)

        if(password!==req.body.password){
            res.status(401).json("Wrong password.");
        }
        const jwtToken = jwt.sign({
            id:student._id,
            isAdmin:student.isAdmin,
            
        }, process.env.JWT_SECRET,
        {expiresIn:"1d"}
        );


        const {newPassword, ...others}=student._doc;
        res.status(200).json({...others, jwtToken});


    }
   
    catch(error){
        res.status(400).json(error)
    }
})

module.exports = router