const path = require('path');
const express = require('express');
const app = express() ;
const bodyParser = require('body-parser')
const Users = require('../models/users');

require('./db/mongoose');
 require('../models/users');


//Defining paths

const viewspath = path.join(__dirname,'../templates')

const urlencoderParser = bodyParser.urlencoded({extended:false});
//setting up all paths
app.set('view engine','ejs')
app.set('views',viewspath);

app.get('',(req,res)=>{
  res.render('index',{
    message:'WELCOME TO HOME PAGE'
  });
})

app.get('/usersubmission',(req,res)=>{
  res.render('usersubmission');
})

app.post('/usersubmission',urlencoderParser,(req,res)=>{
  console.log(req.body.fname);

  const user = Users.findOne({userName:req.body.fname});

  if(!user)
  {
    const newuser = new Users({
      userName:req.fname,
      submissions:req.subcount
    })
    newuser.save().then(res=>{
      console.log("Created the user in db");
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  else {
    user.updateOne({submissions:req.body.subcount});
  }

  res.render('success',{message:req.body});
})


app.get('/leaderboard',(req,res)=>{

  const list = Users.aggregate([
    {
      $group: { _id: '$submissions', Users: { $push: '$userName' } }
    }
  ])
  list = list.sort(function (a, b) { return b._id - a._id; });

  res.render('leaderboard',list);

})



app.get('*',(req,res)=>{
  res.render('errorpage',{
    message:"404 Not Found"
  })

})

app.listen(3000,()=>{
  console.log("Server is running");
})

