const router = require("express").Router();
const Bartender = require("../models/Bartender");
const {verifyJwt, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyJwt");


 //Create order from the bartender
 router.post("/", verifyJwt,  async (req,res)=>{
    const newBartender= new Bartender(req.body)
    try {
        const savedBartender = await newBartender.save();
        res.status(200).json(savedBartender)
    } catch (error) {
        res.status(500).json(error)
    }
    })
    
    
    //Update order from the bartender
    router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
      
        try {
          const updatedBartender = await Bartender.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedBartender);
        } catch (error) {
          res.status(500).json(error);
        }
      });
    
    
    //Delete order from the bartender
    router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
        try {
          await Bartender.findByIdAndDelete(req.params.id);
          res.status(200).json("Drinks from bartender has been deleted.");
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
    
      //Get order order from the bartender
      router.get("/:studentId", verifyTokenAndAuthorization , async (req, res) => {
        try {
          const bartender= await Bartender.findOne({studentId: req.params.studentId});
          res.status(200).json(bartender);
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
      //Get orders from the bartender
      router.get("/", verifyTokenAndAdmin, async (req, res) => {
       try {
           const bartenders = await Bartender.find();
           res.status(200).json(bartenders);
       } catch (error) {
           res.status(500).json(error);
       }
      });
      

module.exports = router 