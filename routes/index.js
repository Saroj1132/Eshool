var express = require('express');
var router = express.Router();
var Student_model=require('../models/Student_model')
var admin_model=require('../models/admin_model')
var Course_model=require('../models/Coursemodel')
var CourseOdrer_model=require('../models/Courseordermodel')
var Feedback_model=require('../models/Feedbackmodel')
var lesson_model=require('../models/Lessonmodel.js')
var auth=require('../config/auth')
var jwt=require('jsonwebtoken');
const { studauth } = require('../config/auth');
const Courseorder = require('../models/Courseordermodel');

/* GET home page. */



router.get('/', function(req, res, next) {
  // if(req.session.stud){
  //   res.render('index', {success: req.flash('success'), 
  // errors: req.flash('errors')});
  // }else{
  //   res.redirect('/k')
  // }

  Course_model.find({}).sort({_id: -1}).limit(6)
  .exec()
  .then(doc=>{
    Feedback_model.find({}).populate("studId").then(feedback=>{
      res.render('index', {success: req.flash('success'), 
      errors: req.flash('errors'), record:doc, feedback:feedback});
    })
  })
});

router.post('/checkmail' , (req, res)=>{
  Student_model.find({Student_Email:req.body.studregemail})
  .exec()
  .then(emailfound=>{
    if(emailfound.length > 0){
      res.json({emailfound:true})
    }else if(emailfound.length < 0){
      res.json({emailfound:false})
    }
})

router.post('/StudentRegistraion', (req, res)=>{
      const studreg=new Student_model({
        Student_Name:req.body.studregname,
        Student_Email:req.body.studregemail,
        Student_Password:req.body.studregpassword
      })
      studreg.save()
      .then(doc=>{
        console.log(doc)
        res.json({doc: true})
        // req.flash('success', "Registartion Sucessfully !!")
        // res.redirect('/')
      })
    
  })
  
})

router.post('/Studentlogin', (req, res)=>{
  Student_model.findOne({Student_Email:req.body.studlogemail, Student_Password:req.body.studlogpassword})
  .exec((err, doc)=>{
    if(err){
      res.json("failed")
    }else{
    if(!doc){
      req.flash('errors', "Username and password was Incorrected !!")
      return res.json("not found")
    }
    if(doc){
      const token=jwt.sign({_id:doc._id},
        "mykey123"
      )
      req.session.stud=token
      
      res.json({doc: true})
  
      // req.flash('errors', "login Failed !!")
      // res.redirect('/')
      }
    }
  })
  
})

router.post('/adminlogin', (req, res)=>{
  admin_model.findOne({admin_email:req.body.adminlogemail, admin_password:req.body.adminlogpassword})
  .exec()
  .then(doc=>{
    if(!doc){
      req.flash('errors', "Username and password was Incorrected !!")
      return res.json("not found")
    }
    if(doc){
      const token=jwt.sign({_id:doc._id},
        "mykey1234"
      )
      req.session.admin=token
      res.json({doc: true})

      // req.flash('success', "Login Sucessfully !!")
      // res.redirect('/admin')
    }
  })
})

router.get('/Course', (req, res)=>{
  Course_model.find({}).sort({_id: -1})
  .exec()
  .then(doc=>{
    res.render('Course', {record:doc})
  })
})


router.get('/Course_Details/:id', (req, res)=>{
  Course_model.find({_id:req.params.id})
  .exec().then(doc=>{
    req.session.price=doc.course_price
    lesson_model.find({course_id:req.params.id})
    .exec()
    .then(lesson=>{
      res.render('Course_Details', {record:doc, lesson:lesson})
    })
  })
})


router.get('/loginorsignup', (req, res)=>{
  res.render("loginorsignup")
})


router.post('/Course_Checkout/:id', (req, res)=>{
  const {price, coursename, courseid}=req.session
  Course_model.find({_id:req.params.id})
  .exec().then(doc=>{
    req.session.price=doc[0].course_price
    req.session.coursename=doc[0].coursename
    req.session.courseid=doc[0]._id
      console.log(doc[0].course_price)
      res.redirect('/Course_Checkout')
    
  })
})

router.get('/Course_Checkout', auth.studauth, (req, res)=>{
  
  r=Math.floor(1000 + Math.random() *1000000)
  req.session.r=r
  res.render("Checkout", {msg:'', Orderno:r, user:req.user, Amount:req.session.price})
})

router.post('/placeorder', auth.studauth, (req, res)=>{
  
  const {Order_Id, Amount}=req.body

  const courseOrder=new CourseOdrer_model({
    Order_Id, 
    Amount, 
    studId:req.user._id,
    course_id:req.session.courseid
  })
  courseOrder.save()
  .then(doc=>{
    res.redirect('/pgReposnse')
  })
})

router.get('/pgReposnse', auth.studauth, (req, res)=>{
  
  res.render("pgReposnse")
  
})

router.get('/logout', (req, res)=>{
  delete req.session.stud

  res.redirect('/')
})



router.get('/PaymentStatus', (req, res)=>{
  Courseorder.find({Order_Id:req.body.Order_Id}).exec()
  .then(doc=>{
    res.render('Payment Status', {record:doc})
  })
})


router.post('/PaymentStatus', (req, res)=>{
  Courseorder.find({Order_Id:req.body.Order_Id}).exec()
  .then(doc=>{
    res.render('Payment Status', {record:doc})
  })
})


module.exports = router;
