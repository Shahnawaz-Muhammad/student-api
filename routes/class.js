const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Class = require('../models/class');

router.post('/', (req, res) => {
  Class.findOne({ subject: req.body.subject })
    .populate('student')
    .then((cls) => {
      if (cls) {
        return res.status(400).json({ error: 'Class already exists' });
      } else {
        const newClass = new Class({
          subject: req.body.subject,
          teacherName: req.body.teacherName,
          duration: req.body.duration,
          time: req.body.time,
        });
        newClass
          .save()
          .then((cls) => res.json(cls))
          .catch((err) => console.log(err));
      }
    });
});

router.get('/', (req, res) => {
  Class.find({ student: req.body.id })
    .populate('student')
    .then((cls) => {
      if (!cls) {
        return res.status(404).json({ errors: 'Not found' });
      }
      res.json(cls);
    })
    .catch((err) => res.status(404).json(err));
});

router.get('/:id', async (req, res) => {
  try {
    const className = await Class.findById(req.params.id).populate('student');
    res.send(className);
  } catch (err) {
    res.send({ message: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removeClass = await Class.remove({ _id: req.params.id });
    res.send(removeClass);
  } catch (err) {
    res.send({ message: err });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updateClass = await Class.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          subject: req.body.subject,
          teacherName: req.body.teacherName,
          duration: req.body.duration,
          time: req.body.time,
        },
      }
    );
    res.send(updateClass);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
