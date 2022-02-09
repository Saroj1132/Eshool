const stud=require('../models/Student_model')
const admintbl=require('../models/admin_model')
const jwt=require('jsonwebtoken')

var adminauth=async(req, res, next)=>{
    try{
        if(req.session.admin){
            const token=req.session.admin
            const decode=jwt.verify(token, "mykey1234")
            const Admin=await admintbl.findOne({
                _id:decode._id
            })

            req.admin=Admin

            next()
        }else{
            res.redirect('/')    
        }
    }catch(error){
        res.redirect('/')
    }
}

var studauth=async(req, res, next)=>{
    try{
        if(req.session.stud){
            const token=req.session.stud
            const decode=jwt.verify(token, "mykey123")
            const User=await stud.findOne({
                _id:decode._id
            })

            req.user=User

            next()
        }else{
            res.redirect('/loginorsignup')    
        }
    }catch(error){
        res.redirect('/loginorsignup')
    }
}




module.exports={
    adminauth,
    studauth
}
