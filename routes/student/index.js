var express = require('express');
var auth=require('../../config/auth')
var router = express.Router();
var coursetbl=require('../../models/Coursemodel')
var mkdirp=require('mkdirp');
const Student = require('../../models/Student_model');
const Feedback=require('../../models/Feedbackmodel')
const Admin = require('../../models/admin_model');
const Lesson=require('../../models/Lessonmodel');
var CourseOdrer_model=require('../../models/Courseordermodel')

router.get('/head', auth.studauth, (req, res)=>{
    res.render("Student/Partials/header", {Image:req.user.Image})
})


router.get('/Student_Profile', auth.studauth, (req, res)=>{
    res.render("Student/Student_Profile", {Image:req.user.Image, doc:req.user, msg:''})
})

router.post('/Student_Profile', auth.studauth, (req, res)=>{
    const {Student_Name, Student_Email, Student_Occupation} = req.body
    var imageFile = typeof req.files.Image !== "undefined" ? req.files.Image.name : "";

    if(imageFile==""){
        Student.findOneAndUpdate({_id:req.user._id},{
            Student_Name,
            Student_Email,
            Student_Occupation
        })
        .exec()
        .then(doc=>{

            res.redirect('/Student/Student_Profile')
        })
    }else{
        Student.findOneAndUpdate({_id:req.user._id},{
            Student_Name,
            Student_Email,
            Student_Occupation,
            Image:imageFile
        })
        .exec()
        .then(doc=>{
            mkdirp('public/stuimages/', function (err) {
                return console.log(err);
              });
              if (imageFile != "") {
                var productImage = req.files.Image;
                var path = 'public/stuimages/' + imageFile;
    
                productImage.mv(path, function (err) {
                    return console.log(err);
                });
            }  
    
            res.redirect('/Student/Student_Profile')
        })
    }
})

router.get('/Student_Feedback', auth.studauth, (req, res)=>{
        res.render("Student/Student_Feedback", {msg:'', Image:req.user.Image})
})


router.post('/Student_Feedback', auth.studauth, (req, res)=>{
    const {Feedback_Content}=req.body
    const Feedbackmodel=new Feedback({
        Feedback_Content,
        studId:req.user._id
    })
    Feedbackmodel.save()
    .then(doc=>{
        res.render("Student/Student_Feedback", {msg:'Feedback Submitted Sucessfully !!', Image:req.user.Image})
    })
})


router.get('/student_edit_Password', auth.studauth, (req, res)=>{
    res.render("Student/student_edit_Password", {msg:'', Image:req.user.Image})
})

router.post('/student_edit_Password', auth.studauth,(req, res)=>{
    const {Student_Password} = req.body

        Student.findOneAndUpdate({_id:req.user._id},{
            Student_Password
            
        }).exec().then(doc=>{
            res.render("Student/Student_edit_Password", {msg:'Password Change Sucessfully', Image:req.user.Image})            
        })
    
})

router.get('/Student_MyCourse', auth.studauth, (req, res)=>{
    CourseOdrer_model.find({studId:req.user._id})
    .populate("course_id")
    .then(doc=>{
        res.render("Student/Student_MyCourse", {record:doc, Image:req.user.Image})
    })
})

router.get('/WatchCourse/:id', auth.studauth, (req, res)=>{
    Lesson.find({course_id:req.params.id})
    .exec()
    .then(doc=>{
        console.log(doc)
        res.render("Student/Student_WatchCourse", {record:doc})
    })
})

router.get('/logout', (req, res)=>{
    delete req.session.stud
  
    res.redirect('/')
})

module.exports = router;
