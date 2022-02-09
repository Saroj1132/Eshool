var mongoose=require("mongoose")
var Schema=mongoose.Schema
var courseschema=new Schema({
    course_name:{
        type:String,
        require:true
    },
    course_desc:{
        type:String,
        require:true
    },
    course_author:{
        type:String,
        require:true
    },
    course_img:{
        type:String,
        require:true
    },
    course_duration:{
        type:String,
        require:true
    },
    course_price:{
        type:String,
        require:true
    },
    course_original_price:{
        type:String,
        require:true
    }
})

var Course=mongoose.model("Course", courseschema)

module.exports=Course

