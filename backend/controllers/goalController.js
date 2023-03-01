const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');



const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user._id});
    res.status(200).json(goals);
})

const setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Text is required')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user._id,

    })
    res.status(200).json(goal)
})

const updateGoals = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString()!== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(goal)
})  

const deleteGoals = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found')
        
    }
    if(goal.user.toString()!== user.id){
        res.status(401)
        throw new Error('User not authorized')
        
    }
    const goal = await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json(goal)
})



module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}