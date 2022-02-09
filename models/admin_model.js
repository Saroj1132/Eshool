var mongoose=require("mongoose")
var adminschema=mongoose.Schema({
    
    admin_name:{
        type:String,
        require:true
    },
    admin_email:{
        type:String,
        require:true
    },
    admin_password:{
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

var Admin=mongoose.model("admin", adminschema)

module.exports=Admin

