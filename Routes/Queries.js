const express = require ('express');
const { route } = require('./Queries');
const router = express.Router();
const Query = require('../models/Getqueries');
const verify = require('./verifyToken');
const Getqueries = require('../models/Getqueries');


//post a Query
router.post('/', verify, async(req,res) =>{
    const Query = new Getqueries({ 
        name: req.body.name,
        description:req.body.description,
    })
    try{
        const savedQuery = await Query.save();
        return res.status(201).json({message:'Query saved successfully'});
    }catch (err) {
        console.log(err);
        return res.status(404).json({message:'An error found while saving your query!'});
    };
});

//GET BACK ALL THE QUEREIS
router.get("/",  verify, async (req, res) => {
    console.log("queries");
    try {
      const queries = await Getqueries.find();
      return res.status(200).json({ message: queries });
    } catch (err) {
      console.log(err);
      return res.json({ message: "Querylist not found" });
    }
  });
module.exports = router;
