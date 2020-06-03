//model for user

const mongoose =  require('mongoose')
const {Schema} = mongoose
const userSchema = new mongoose.Schema({

//making changes
hello
  userName:{
    type:String
  },
  submissions:{
    type:Number,
    default:0
  }
})

const Users = mongoose.model('Users',userSchema)

module.exports = Users ;
