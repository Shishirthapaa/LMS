const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folders',
        required: true
    },
});

const FilesModel = mongoose.model('Files', FileSchema);

module.exports = FilesModel;