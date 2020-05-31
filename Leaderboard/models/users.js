const mongoose =  require('mongoose')
const {Schema} = mongoose
const userSchema = new mongoose.Schema({
  
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
