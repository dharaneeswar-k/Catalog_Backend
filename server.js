const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const projectsRouter = require('./routes/projects');
const adminRouter = require('./routes/admin');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/projects', projectsRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => res.send({ ok: true, msg: 'WebNest API running' }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error' });
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log('Server listening on', PORT));
  }).catch(err => {
    console.error('MongoDB connection error', err);
  });
