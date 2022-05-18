const router = require("express").Router();
const Drink = require("../models/Drink");
const { verifyTokenAndAdmin} = require("./verifyJwt");



 //Create drink
router.post("/", verifyTokenAndAdmin,  async (req,res)=>{
const newDrink = new Drink(req.body)
try {
    const savedDrink = await newDrink.save();
    res.status(200).json(savedDrink)
} catch (error) {
    res.status(500).json(error)
}
})


 //Update drink
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  
    try {
      const updatedDrink = await Drink.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedDrink);
    } catch (error) {
      res.status(500).json(error);
    }
  });


 //Delete drink
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Drink.findByIdAndDelete(req.params.id);
      res.status(200).json("Drink has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

  //Get drink
  router.get("/:id", async (req, res) => {
    try {
      const drink = await Drink.findById(req.params.id);
      res.status(200).json(drink);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //Get drinks
  router.get("/",  async (req, res) => {
    const categoryOfAlkoholQuery = req.query.category;
    const ingredientsQuery = req.query.ingredients;
    try {
      let drinks;
   if(categoryOfAlkoholQuery){
        drinks = await Drink.find({categoriesOfAlkohol:{
              $in:[categoryOfAlkoholQuery],
          },
    });
      }
      else if(ingredientsQuery){
        drinks = await Drink.find({ingredients:{
            $in:[ingredientsQuery],
        }, });}
    else{
          drinks = await Drink.find();
      }
      res.status(200).json(drinks);
    } catch (error) {
      res.status(500).json(error);
    }
  });


module.exports = router 
