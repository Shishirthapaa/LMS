const express = require('express');
const router = express.Router();
const GroupModel = require('../models/Group');
const StudentModel = require('../models/Student');
const InstructorModel = require('../models/Instructor');
const MessageModel = require('../models/Message');

router.post('/groups', async (req, res) => {
  try {
    const { name, groupAdmin } = req.body;
    const instructor = await InstructorModel.findById(groupAdmin);
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
  }
    const group = new GroupModel({ name, groupAdmin });
    group.instructors.push(instructor);
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/groups/:groupId/members/add', async (req, res) => {
    const groupId = req.params.groupId;
    const { students, instructors, userId } = req.body;

    try{
    const group = await GroupModel.findById(groupId);
    if (!group) {
        return res.status(404).json({ message: 'Group not found' });
    }
    console.log('Group Admin:', group.groupAdmin);
    console.log('User ID:', userId);

    if (group.groupAdmin.toString() !== userId) {
      return res.status(403).json({ message: 'Only the group admin can add members' });
    }

    if (students && students.length > 0) {
        for ( const studentId of students) {
            const student = await StudentModel.findById(studentId);
            if (student) {
                group.students.push(student);
            }
        }
    }

    if (instructors && instructors.length > 0) {
        for( const instructorId of instructors) {
            const instructor = await InstructorModel.findById(instructorId);
            if (instructor) {
                group.instructors.push(instructor);
            }
        }
    }
    await group.save();

    res.json({ message: 'Members added to the group successfully' });
} catch (error){
    console.error("Error adding members to group:", error);
    res.status(500).json({error: "Internal server error"});
}
});


router.post('/messages', async (req, res) => {
  try {
    const { senderType, senderId, content, groupId } = req.body;
    const message = await MessageModel.create({ senderType, senderId, content, groupId });
    res.status(200).json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/groups', async(req, res) =>{
    try{
        const groups = await GroupModel.find();
        res.status(200).json(groups);
    } catch(error){
        console.error('Error fetching groups:', error)
        res.status(500).json({ error: 'Internal server error'});
    }

});
router.get('/students', async (req, res) => {
    try {
      const students = await StudentModel.find();
      res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/instructors', async (req, res) => {
    try {
      const instructors = await InstructorModel.find();
      res.status(200).json(instructors);
    } catch (error) {
      console.error('Error fetching instructors:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.get('/groups/:groupId/members', async (req, res) => {
    try {
        const groupId = req.params.groupId;
        
        const group = await GroupModel.findById(groupId)
        .populate({model: StudentModel, path: 'students'})
        .populate({model: InstructorModel, path: 'instructors'})
        .populate('groupAdmin');
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        
        const students = group.students;
        const instructors = group.instructors;
        const groupAdmin = group.groupAdmin;


        res.status(200).json({ students, instructors, groupAdmin });
    } catch (error) {
        console.error('Error fetching group members:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/groups/:groupId/students/:studentId', async (req, res) => {
  const { groupId, studentId } = req.params;

  try {
      const group = await GroupModel.findById(groupId);

      if (!group) {
          return res.status(404).json({ message: 'Group not found' });
      }

      const studentIndex = group.students.findIndex(student => student.toString() === studentId);
      if (studentIndex === -1) {
          return res.status(404).json({ message: 'Student not found in group' });
      }

      group.students.splice(studentIndex, 1);
      await group.save();

      res.status(200).json({ message: 'Student removed from group successfully' });
  } catch (error) {
      console.error('Error removing student from group:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/groups/:groupId/instructors/:instructorId', async (req, res) => {
  const { groupId, instructorId } = req.params;

  try {
      const group = await GroupModel.findById(groupId);

      if (!group) {
          return res.status(404).json({ message: 'Group not found' });
      }
      if (group.groupAdmin.toString() === instructorId) {
        return res.status(403).json({ message: 'Group admin cannot be removed from the group' });
    }

      const instructorIndex = group.instructors.findIndex(instructor => instructor.toString() === instructorId);
      if (instructorIndex === -1) {
          return res.status(404).json({ message: 'Instructor not found in group' });
      }

      group.instructors.splice(instructorIndex, 1);
      await group.save();

      res.status(200).json({ message: 'Instructor removed from group successfully' });
  } catch (error) {
      console.error('Error removing instructor from group:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
router.delete('/groups/:groupId', async (req, res) => {
  try {
      const groupId = req.params.groupId;
      const group = await GroupModel.findById(groupId);

      if (!group) {
          return res.status(404).json({ message: 'Group not found' });
      }

      await GroupModel.findByIdAndDelete(groupId);

      res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
      console.error('Error deleting group:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/messages/:groupId', async (req, res) => {
  try {
    const groupId = req.params.groupId;
    let messages = [];
    if (groupId) {
      messages = await MessageModel.find({ groupId }).populate('senderId');
    } else {
      messages = await MessageModel.find().populate('senderId');
    }
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
