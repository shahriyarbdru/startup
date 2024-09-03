const Order = require('../models/orderModel.js');

const createOrder = async(req, res) =>{
    try{
        let json = req.body;
        const newOrder = new Order({ data: json });

        const saveData = await newOrder.save();
        res.status(200).json(saveData);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = { createOrder };