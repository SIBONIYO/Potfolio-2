const express = require ('express');
const { route } = require('./Queries');
const router = express.Router();
const Query = require('../models/Getqueries');
const verify = require('./verifyToken');
const Getqueries = require('../models/Getqueries');


//post a Query
router.post('/', async(req,res) =>{
    const Query = new Getqueries({ 
        name: req.body.name,
        description:req.body.description,
    })
        const savedQuery = await Query.save();
        return res.status(201).json({message:'Query saved successfully'});
});

//GET BACK ALL THE QUEREIS
router.get("/",  verify, async (req, res) => {

      const queries = await Getqueries.find();
      return res.status(200).json({ message: queries })
  });
module.exports = router;
