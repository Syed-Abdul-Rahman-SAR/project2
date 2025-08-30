const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;
    //validation: check if all field are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //check if user already exists
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Emain already registered" });

    // //Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    //Create user
    const newUser = new User({ name, email, password: password, bio });
    await newUser.save();

    //create token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        bio: newUser.bio,
        createdAt: newUser.createdAt,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  console.log("Login route hit"); 
  try {
    const { email, password } = req.body;

    //validation : check if all fields are provided
    if(!email||!password){
        return res.status(400).json({message:"All fields are required"})
    }
    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    //check password
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    //create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


