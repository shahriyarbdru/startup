const User = require('../models/userModel.js');

const createUser = async(req, res) =>{
    try{
        const newUser = new User(req.body);
        const {email} = newUser;

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message: "User already exists"})
        }
        const saveData = await newUser.save();
        res.status(200).json({message: "User created successfully"});
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getAllUsers = async(req, res)=>{
    try{
        const userData = await User.find();
        if(!userData || userData.length === 0){
            return res.status(404).json({message: "No data found"})
        }
        res.status(200).json(userData);
    }catch(error){
        res.status(500).json({message: error.message})
    }
};

const getUserById = async(req, res)=>{
    try{
        const id = req.params.id;
        const userData  = await User.findById(id);
        if(!userData){
            return res.status(404).json({message: "No data found"})
        }
        res.status(200).json(userData);
    }  catch(error){
        res.status(500).json({message: error.message})
    }
}

const updateUser = async(req, res)=>{
    try{
        const id = req.params.id;
        const updateData = req.body;
        const userData = await User.findByIdAndUpdate(id, updateData, {new: true}); // new: true is used to return the updated data
        if(!userData){
            return res.status(404).json({message: "No data found"})
        }
        res.status(200).json({message: "User updated successfully"});
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const deleteUser = async(req, res)=>{
    try{
        const id = req.params.id;
        const userData = await User.findByIdAndDelete(id); // new: true is used to return the updated data 
        if(!userData){
            return res.status(404).json({message: "No data found"})
        }
        res.status(200).json({message: "User deleted successfully"});
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = { createUser,
                   getAllUsers,
                   getUserById,
                   updateUser,
                   deleteUser};