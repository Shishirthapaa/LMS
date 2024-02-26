const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const AdminModel = mongoose.model('Admin', AdminSchema);

// Created a default admin user
AdminModel.create({
  email: 'admin@gmail.com',
  password: 'admin@123',
})
  .then(admin => console.log('Default admin user created:', admin))
  .catch(error => console.error('Error creating default admin user:', error));

module.exports = AdminModel;