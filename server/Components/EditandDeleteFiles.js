const express = require('express');
const router = express.Router();
const FilesModel = require('../models/Files');

router.put('/folders/files/:fileId', async (req, res) => {
  const { fileId } = req.params;
  const { newName } = req.body;

  try {
    const updatedFile = await FilesModel.findByIdAndUpdate(
      fileId,
      { name: newName },
      { new: true }
    );
    res.status(200).json(updatedFile);
  } catch (error) {
    console.error('Error renaming file:', error);
    res.status(500).json({ error: 'Error renaming file' });
  }
});


router.delete('/folders/files/:fileId', async (req, res) => {
  const { fileId } = req.params;

  if (!fileId) {
    return res.status(400).json({ error: 'File ID is required' });
  }
  
  try {
    await FilesModel.findByIdAndDelete(fileId);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Error deleting file' });
  }
});

module.exports = router;
