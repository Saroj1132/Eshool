var mongoose=require("mongoose")
var Schema=mongoose.Schema
var courseorderschema=new Schema({
    Order_Id:{
        type:String,
        require:true
    },
    studId: {
        type: Schema.Types.ObjectId,
        ref: 'Student'

    },
    course_id:{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    respmsg:{
        type:String,
        default:"Txn Success"
    },
    status:{
        type:String,
        default:"Txn_Success"
    },
    Amount:{
        type:String,
        require:true
    },
    order_date:{
        type:Date,
        default:Date.now()
    }
})

var Courseorder=mongoose.model("Courseorder", courseorderschema)

module.exports=Courseorder

