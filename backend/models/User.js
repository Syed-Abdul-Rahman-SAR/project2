const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "", //optional field
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//pre save hook to hash password
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    try{
        const salt = await bcrypt.genSalt(10);//generate salt
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }catch(err){
        next(err);
    }
});
//create model
const User = mongoose.model('User',userSchema);
module.exports = User;