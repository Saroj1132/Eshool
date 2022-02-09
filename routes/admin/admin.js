var express = require('express');
var auth=require('../../config/auth')
var router = express.Router();
var coursetbl=require('../../models/Coursemodel')
var mkdirp=require('mkdirp');
const Student = require('../../models/Student_model');
const Admin = require('../../models/admin_model');
const Lesson=require('../../models/Lessonmodel');
const Feedback=require('../../models/Feedbackmodel')
const Courseorder = require('../../models/Courseordermodel');
const moment=require('moment')

router.get('/', auth.adminauth,(req, res)=>{
    coursetbl.find({}).count()
    .then(coursecount=>{
        Student.find({}).count().then(studcount=>{
            Courseorder.find({}).count().then(soldcount=>{
                Courseorder.find({}).populate("studId").then(doc=>{
                    res.render("admin/admin_dashboard", {
                        coursecount:coursecount, 
                        studcount:studcount, 
                        soldcount:soldcount, 
                        record:doc,
                        moment:moment
                    })
                })
            })
        })
    })
})



router.get('/courses', auth.adminauth,(req, res)=>{
    coursetbl.find()
    .exec().then(doc=>{
        res.render("admin/admin_Courses", {record:doc})
    })
})

router.get('/admin_add_Courses', auth.adminauth,(req, res)=>{
    res.render("admin/admin_add_Courses", {msg:''})
})

router.post('/admin_add_Courses', auth.adminauth,(req, res)=>{
    const {course_name, course_desc, course_author, course_duration, course_price, course_original_price}=req.body

    var imageFile = typeof req.files.course_img !== "undefined" ? req.files.course_img.name : "";
    const add_course=new coursetbl({
        course_name,
        course_desc,
        course_author,
        course_img:imageFile,
        course_duration,
        course_price,
        course_original_price
    })
    add_course.save()
    .then(doc=>{
        mkdirp('public/images/', function (err) {
            return console.log(err);
          });
          if (imageFile != "") {
            var productImage = req.files.course_img;
            var path = 'public/images/' + imageFile;

            productImage.mv(path, function (err) {
                return console.log(err);
            });
        }  

        res.render("admin/admin_add_Courses", {msg:"Courses add succesfully"})
    })

})

router.get('/admin_edit_Courses/:id', auth.adminauth,(req, res)=>{
    const {_id, course_name, course_desc, course_author, course_duration, course_price, course_original_price}=req.body

    coursetbl.findById({_id:req.params.id})
    .exec()
    .then(doc=>{
        res.render("admin/admin_edit_Courses", {msg:'', com:doc})
    })
})

router.post('/admin_edit_Courses/:id', auth.adminauth,(req, res)=>{
    const {_id, course_name, course_desc, course_author, course_img, course_duration, course_price, course_original_price}=req.body
    var imageFile = typeof req.files.course_img !== "undefined" ? req.files.course_img.name : "";

    if(imageFile==""){
        coursetbl.findByIdAndUpdate({_id:_id},{
            course_name,
            course_desc,
            course_author,
            course_duration,
            course_price,
            course_original_price
        }).exec().then(doc=>{
            res.render("admin/admin_edit_Courses", {msg:'Course Edit Sucessfully', com:''})            
        })
    }else{
        coursetbl.findByIdAndUpdate({_id:_id},{
            course_name,
            course_desc,
            course_author,
            course_img:imageFile,
            course_duration,
            course_price,
            course_original_price
        }).exec().then(doc=>{
            mkdirp('public/images/', function (err) {
                return console.log(err);
              });
              if (imageFile != "") {
                var productImage = req.files.course_img;
                var path = 'public/images/' + imageFile;
    
                productImage.mv(path, function (err) {
                    return console.log(err);
                });
            }
            res.render("admin/admin_edit_Courses", {msg:'Course Edit Sucessfully', com:''})            
        })

    }
})


router.get('/admin_delete_Courses/:id', auth.adminauth,(req, res)=>{
    coursetbl.findByIdAndDelete({_id:req.params.id})
    .exec().then(doc=>{
        res.redirect('/admin/courses')
    })
})


router.get('/students', auth.adminauth,(req, res)=>{
    Student.find()
    .exec().then(doc=>{
        res.render("admin/admin_Student", {record:doc})
    })
})

router.get('/admin_add_Student', auth.adminauth,(req, res)=>{
    res.render("admin/admin_add_Student", {msg:''})
})

router.post('/admin_add_Student', auth.adminauth,(req, res)=>{
    const {Student_Name, Student_Email, Student_Password, Student_Occupation} = req.body
    const studreg=new Student({
        Student_Name,
        Student_Email,
        Student_Password,
        Student_Occupation
      })
      studreg.save()
      .then(doc=>{
        console.log(doc)
        res.render("admin/admin_add_Student", {msg:'Student add sucessfully'})
      })
})



router.get('/admin_edit_Student/:id', auth.adminauth,(req, res)=>{

    Student.findById({_id:req.params.id})
    .exec()
    .then(doc=>{
        res.render("admin/admin_edit_Student", {msg:'', com:doc})
    })
})

router.post('/admin_edit_Student/:id', auth.adminauth,(req, res)=>{
    const {_id, Student_Name, Student_Email, Student_Password, Student_Occupation} = req.body

        Student.findByIdAndUpdate({_id:_id},{
            Student_Name,
            Student_Email,
            Student_Password,
            Student_Occupation
                
        }).exec().then(doc=>{
            res.render("admin/admin_edit_Student", {msg:'Student Edit Sucessfully', com:''})            
        })
    
})

router.get('/admin_edit_Password', auth.adminauth,(req, res)=>{

    Admin.findOne({_id:req.admin._id})
    .exec()
    .then(doc=>{
        res.render("admin/admin_edit_Password", {msg:'', com:doc})
    })
})

router.post('/admin_edit_Password', auth.adminauth,(req, res)=>{
    const {admin_password} = req.body

        Admin.findOneAndUpdate({admin_email:req.admin.admin_email},{
            admin_password
            
        }).exec().then(doc=>{
            res.render("admin/admin_edit_Password", {msg:'Password Change Sucessfully', com:''})            
        })
    
})


router.get('/admin_delete_Student/:id', auth.adminauth,(req, res)=>{
    Student.findByIdAndDelete({_id:req.params.id})
    .exec().then(doc=>{
        res.redirect('/admin/students')
    })
})

router.get('/admin_lesson', auth.adminauth,(req, res)=>{
    res.render("admin/admin_lesson", {result:"false"})
    
})

router.post('/admin_lesson', auth.adminauth, (req, res)=>{
    var data=req.session
    coursetbl.find({course_name:req.body.course_name})
    .exec().then(doc=>{
        req.session.lesson=doc

        data.course_name=doc[0].course_name
        data._id=doc[0]._id
        


        console.log("ss" + data.course_name + "  d" + data._id )
        console.log(doc)
        Lesson.find({course_name:req.body.course_name})
        .exec()
        .then(lesson=>{
            res.render("admin/admin_lesson", {record:doc, result:"true", lesson:lesson})
        })
    })
})

router.get('/admin_add_Lesson', auth.adminauth,(req, res)=>{
    var data=req.session
    res.render("admin/admin_add_Lesson", {course_id:data._id, course_name:data.course_name, msg:''})
})

router.post('/admin_add_Lesson', auth.adminauth,(req, res)=>{
    var videoFile = typeof req.files.lesson_link !== "undefined" ? req.files.lesson_link.name : "";
    var data=req.session
    const {course_id, course_name, lesson_name, lesson_desc} = req.body
    const lessonmodel=new Lesson({
        course_id,
        course_name,
        lesson_name,
        lesson_desc,
        lesson_link:videoFile
    })
    lessonmodel.save()
    .then(doc=>{
        console.log(doc)
        mkdirp('public/videos/', function (err) {
            return console.log(err);
          });
          if (videoFile != "") {
            var productVideo = req.files.lesson_link;
            var path = 'public/videos/' + videoFile;

            productVideo.mv(path, function (err) {
                return console.log(err);
            });
        }
        res.render("admin/admin_add_Lesson", {course_id:data._id, course_name:data.course_name, msg:'Lesson Added Sucessfully !!'})
    })
})


router.get('/admin_edit_Lesson/:id', auth.adminauth,(req, res)=>{
    var data=req.session

    Lesson.findById({_id:req.params.id})
    .exec()
    .then(doc=>{
        res.render("admin/admin_edit_Lesson", {course_id:data._id, course_name:data.course_name, msg:'', com:doc})
    })
})


router.post('/admin_edit_Lesson/:id', auth.adminauth,(req, res)=>{
    var videoFile = typeof req.files.lesson_link !== "undefined" ? req.files.lesson_link.name : "";
    var data=req.session
    const {_id, course_id, course_name, lesson_name, lesson_desc} = req.body

        if(videoFile==""){
            Lesson.findByIdAndUpdate({_id:_id},{
                course_id,
                course_name,
                lesson_name,
                lesson_desc
                    
            }).exec().then(doc=>{
                
                res.render("admin/admin_edit_Lesson", {course_id:data._id, course_name:data.course_name, msg:'Lesson Edited Sucessfully !!', com:''})
            })
        }else{
            Lesson.findByIdAndUpdate({_id:_id},{
                course_id,
                course_name,
                lesson_name,
                lesson_desc,
                lesson_link:videoFile
                    
            }).exec().then(doc=>{
                mkdirp('public/videos/', function (err) {
                    return console.log(err);
                  });
                  if (videoFile != "") {
                    var productVideo = req.files.lesson_link;
                    var path = 'public/videos/' + videoFile;
        
                    productVideo.mv(path, function (err) {
                        return console.log(err);
                    });
                }
                res.render("admin/admin_edit_Lesson", {course_id:data._id, course_name:data.course_name, msg:'Lesson Edited Sucessfully !!', com:''})
            })
        }
        
    
})


router.get('/admin_delete_Lesson/:id', auth.adminauth,(req, res)=>{
    Lesson.findByIdAndDelete({_id:req.params.id})
    .exec().then(doc=>{
        res.redirect('/admin/admin_lesson')
    })
})


router.get('/admin_Feedback', auth.adminauth,(req, res)=>{
    Feedback.find()
    .exec().then(doc=>{
        res.render("admin/admin_Feedback", {record:doc})
    })
})

router.get('/admin_delete_Feedback/:id', auth.adminauth,(req, res)=>{
    Feedback.findByIdAndDelete({_id:req.params.id})
    .exec().then(doc=>{
        res.redirect('/admin/admin_Feedback')
    })
})

router.get('/admin_SellReport', auth.adminauth, (req, res)=>{
    Courseorder.find({$and: [{order_date: {$gte: req.body.startdate}}, {order_date: {$lte: req.body.enddate}}]})
    .sort({_id: -1})
    .populate("studId")
    .then(doc=>{
        res.render("admin/admin_SellReport", {record:doc, moment:moment})
    })
})


router.post('/admin_SellReport', auth.adminauth, (req, res)=>{
    Courseorder.find({$and: [{order_date: {$gte: req.body.startdate}}, {order_date: {$lte: req.body.enddate}}]})
    .sort({_id: -1})
    .populate("studId")
    .then(doc=>{
        res.render("admin/admin_SellReport", {record:doc, moment:moment})
    })
})

router.get('/logout', (req, res)=>{
    delete req.session.admin
  
    res.redirect('/')
})
  

module.exports = router;
