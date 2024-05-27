const express = require('express');
const router = express.Router();
const FolderModel = require('../models/Folders');

// Edit folder name
router.put('/folders/:folderId', async (req, res) => {
  const { folderId } = req.params;
  const { folderName } = req.body;

  try {
    const updatedFolder = await FolderModel.findByIdAndUpdate(
      folderId,
      { name: folderName },
      { new: true }
    );
    res.status(200).json(updatedFolder);
  } catch (error) {
    console.error('Error updating folder:', error);
    res.status(500).json({ error: 'Error updating folder' });
  }
});

// Delete folder
router.delete('/folders/:folderId', async (req, res) => {
  const { folderId } = req.params;

  try {
    await FolderModel.findByIdAndDelete(folderId);
    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (error) {
    console.error('Error deleting folder:', error);
    res.status(500).json({ error: 'Error deleting folder' });
  }
});

module.exports = router;
