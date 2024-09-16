const express = require('express');
const JobController = require('../controller/job');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// READ (Protected)
router.get('/', verifyToken, JobController.getAllJob);

// CREATE (Protected)
router.post('/', verifyToken, JobController.createNewJob);

// UPDATE (Protected)
router.patch('/:id', verifyToken, JobController.updateJob);

// UPDATE STATUS (Protected)
router.patch('/:id/status', verifyToken, JobController.updateJobStatus);

// DELETE (Protected)
router.delete('/:id', verifyToken, JobController.deleteJob);

module.exports = router;
