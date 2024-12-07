const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required:[true,"Email is required"],
    unique:true,
    validate:[validator.isEmail,"please provide a valid email"]
  },
  password:{
    type:String,
    required:[true,"Password is required"],
    minlength:[8,"password must be at least 8 characters long"]
  }
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

userSchema.methods.comparePassword = async function (password){
    return bcrypt.compare(password,this.password);
};



const User = mongoose.model('User',userSchema);


module.exports = User;