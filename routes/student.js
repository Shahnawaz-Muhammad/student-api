const express = require('express');
const router = express.Router();

const Student = require('../models/student');

router.get('/', (req, res) => {
  Student.find()
    .sort({ date: -1 })
    .then((students) => res.json(students))
    .catch((err) =>
      res.status(404).json({ nostudentsfound: 'No students found' })
    );
});

router.post('/', (req, res) => {
  Student.findOne({ email: req.body.email })
    // .populate('class')
    .then((student) => {
      if (student) {
        return res.status(400).json({ error: 'Student already exists' });
      } else {
        const newStudent = new Student({
          name: req.body.name,
          email: req.body.email,
          dateOfBirth: req.body.dateOfBirth,
          facebookProfile: req.body.facebookProfile,
        });
        newStudent
          .save()
          .then((student) => res.json(student))
          .catch((err) => console.log(err));
      }
    });
});

router.get('/:id', (req, res) => {
  Student.findById(req.params.id)
    .then((student) => res.json(student))
    .catch((err) => res.status(404).json(err));
});

router.delete('/:id', (req, res) => {
  Student.findById(req.params.id)
    .then((student) => {
      student.remove().then(() => res.json({ success: true }));
    })
    .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
});

router.patch('/:id', async (req, res) => {
  try {
    const updateStudent = await Student.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          dateOfBirth: req.body.dateOfBirth,
          facebookProfile: req.body.facebookProfile,
        },
      }
    );
    res.send(updateStudent);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
