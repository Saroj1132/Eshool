var mongoose=require("mongoose")
var Schema=mongoose.Schema
var lessonschema=new Schema({
    lesson_name:{
        type:String,
        require:true
    },
    lesson_desc:{
        type:String,
        require:true
    },
    lesson_link:{
        type:String,
        require:true
    },
    course_id:{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    course_name:{
        type:String,
        require:true
    }
})

var Lesson=mongoose.model("Lesson", lessonschema)

module.exports=Lesson

