require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

// Routers
const authRouter = require('./src/routes/auth');
const jobsRouter = require('./src/routes/job');

const middlewareLogRequest = require('./src/middleware/logs');

const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/auth', authRouter);
app.use('/job', jobsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
