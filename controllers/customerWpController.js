const Customer = require('../models/customerModel.js');

const createWpCustomer = async(req, res) =>{
    try{
        const newCustomer = new Customer({ data: req.body });

        const saveData = await newCustomer.save();
        res.status(200).json(saveData);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = { createWpCustomer};