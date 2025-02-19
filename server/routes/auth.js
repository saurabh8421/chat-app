const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User.js");

const router = express.Router();


router.post('/register',async (req,res)=>{
    const {name,email,password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    //check for email existance also use blank fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"Email already exists"})
        }
        
    await user.save()
    res.send("User created")
    

})



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Return user ID and token
        res.json({ token, userId: user._id });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Server error' });
    }
});


  //code to get all members data for chat list
  router.get('/getallmembers', async (req, res) => {
    const users = await User.find().select('name email');
    res.json(users);
    });

// code to get current user data
router.get('/getuser',  async (req, res) => {
    const userId = req.user;
    const user = await User.findById(userId).select('name email');
    res.json(user);
    });


  module.exports =router;
  
