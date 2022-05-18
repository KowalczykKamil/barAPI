const router = require("express").Router();
const Student = require("../models/Student");
const {verifyJwt, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyJwt");



//Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET
      ).toString();
    }
  
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json(error);
    }
  });


//Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Student.findByIdAndDelete(req.params.id);
      res.status(200).json("Student has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });

  
  //Get student
  router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      const { password, ...others } = student._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  //Get students
  router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router 