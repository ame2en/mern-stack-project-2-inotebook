import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title : {
        type:String,
        required : true
    },
    description:{
        type:String,
        unique:true,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default: Date.now
    }

});

const Notes =  mongoose.model('notes',NoteSchema);
export default Notes;