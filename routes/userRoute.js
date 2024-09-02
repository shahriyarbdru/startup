const express = require('express');

const { createUser,
        getAllUsers,
        getUserById,
        updateUser,
        deleteUser} = require('../controllers/userController.js');
const route = express.Router();

route.post("/create", createUser);
route.get('/all', getAllUsers);
route.get('/get-by-id/:id', getUserById);
route.put('/update/:id', updateUser);
route.delete('/delete/:id', deleteUser);

module.exports = route;