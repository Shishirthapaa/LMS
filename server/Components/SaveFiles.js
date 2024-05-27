
const express = require('express');
const multer = require('multer');
const path = require('path');
const FilesModel = require('../models/Files');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/folders/:folderId/upload', upload.array('files'), async (req, res) => {
  try {
    const folderId = req.params.folderId;
    const files = req.files;
    
    console.log('Received files:', files);
    const savedFiles = [];

    for (const file of files) {
      const newFile = new FilesModel({
        name: file.originalname,
        path: file.filename,
        folderId: folderId,
      });
      const savedFile = await newFile.save();
      savedFiles.push(savedFile);
    }

    res.status(200).json({ files: savedFiles });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/folders/:folderId/files', async (req, res) => {
  try {
    const folderId = req.params.folderId;
    const files = await FilesModel.find({ folderId: folderId });
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
