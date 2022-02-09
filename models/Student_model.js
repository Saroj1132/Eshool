var mongoose=require("mongoose")
var studschema=mongoose.Schema({
    
    Student_Name:{
        type:String,
        require:true
    },
    Student_Email:{
        type:String,
        require:true
    },
    Student_Password:{
        type:String,
        require:true
    },
    Student_Occupation:{
        type:String,
        require:true
    },
    Image:{
        type:String
    }
})

var Student=mongoose.model("Student", studschema)

module.exports=Student

