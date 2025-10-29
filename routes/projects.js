const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// GET all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find({ status: 'active' }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) { next(err); }
});

// GET single by PRID
router.get('/:prid', async (req, res, next) => {
  try {
    const p = await Project.findOne({ prid: req.params.prid });
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) { next(err); }
});

// SEARCH query
router.get('/search', async (req, res, next) => {
  try {
    const q = req.query.query || '';
    const regex = new RegExp(q, 'i');
    const projects = await Project.find({
      status: 'active',
      $or: [{ prid: regex }, { title: regex }, { description: regex }, { techStack: regex }]
    });
    res.json(projects);
  } catch (err) { next(err); }
});

// Admin protected routes
router.post('/', auth, async (req, res, next) => {
  try {
    const data = req.body;
    const created = await Project.create(data);
    res.json(created);
  } catch (err) { next(err); }
});
router.put('/:prid', auth, async (req, res, next) => {
  try {
    const updated = await Project.findOneAndUpdate({ prid: req.params.prid }, req.body, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
});
router.delete('/:prid', auth, async (req, res, next) => {
  try {
    const deleted = await Project.findOneAndDelete({ prid: req.params.prid });
    res.json({ ok: true, deleted });
  } catch (err) { next(err); }
});

module.exports = router;
