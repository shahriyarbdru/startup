const Customer = require('../models/customerModel.js');

const createCustomer = async(req, res) =>{
    try{
        const newCustomer = new Customer(req.body);

        const saveData = await newCustomer.save();
        res.status(200).json(saveData);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = { createCustomer};