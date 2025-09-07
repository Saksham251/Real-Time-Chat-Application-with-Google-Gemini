import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        unique: [ true, 'Project name must be unique' ],
        trim:true,
        lowercase:true,
        required:true
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    // fileTree: {
    //     type: Object,
    //     default: {}
    // },
});

const projectModel = mongoose.model("project",projectSchema);

export default projectModel;