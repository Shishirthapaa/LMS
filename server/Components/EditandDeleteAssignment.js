const express = require('express');
const router = express.Router();
const AssignmentModel = require('../models/Assignments');


router.put('/assignments/:assignmentId', async (req, res) => {
  const { assignmentId } = req.params;
  const { assignmentName, assignmentDescription, assignmentDate } = req.body;

  try {
    const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
      assignmentId,
      { name: assignmentName ,
       description: assignmentDescription ,
       date: assignmentDate
      },
    {new: true }
    );
    res.status(200).json(updatedAssignment);
  } catch (error) {
    console.error('Error updating assignment:', error);
    res.status(500).json({ error: 'Error updating assignment' });
  }
});

router.delete('/assignments/:assignmentId', async (req, res) => {
  const { assignmentId } = req.params;

  try {
    await AssignmentModel.findByIdAndDelete(assignmentId);
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).json({ error: 'Error deleting assignment' });
  }
});

module.exports = router;
