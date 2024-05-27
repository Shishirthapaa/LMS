const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', 
        required: true
    },
    
}, { timestamps: true }); 

const FolderModel = mongoose.model('Folders', FolderSchema);


module.exports = FolderModel;
