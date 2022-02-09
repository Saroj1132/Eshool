const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = mongoose.Schema({
    
    Feedback_Content:{
        type:String,
        require:true
    },
    studId: {
        type: Schema.Types.ObjectId,
        ref: 'Student'

    }
});

var Feedback=mongoose.model("Feedback", FeedbackSchema)

module.exports=Feedback