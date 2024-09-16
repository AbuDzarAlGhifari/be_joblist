const JobModel = require('../models/job');

const getAllJob = async (req, res) => {
  const user_id = req.user.id; // Get user_id from token
  try {
    const [data] = await JobModel.getAllJob(user_id);
    res.json({
      message: 'GET all jobs success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const createNewJob = async (req, res) => {
  const { body } = req;
  const user_id = req.user.id; // Get user_id from token
  try {
    await JobModel.createNewJob(body, user_id);
    res.json({
      message: 'CREATE New Job success',
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const user_id = req.user.id; // Get user_id from token
  try {
    await JobModel.updateJob(body, id, user_id);
    res.json({
      message: 'UPDATE Job Success',
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const updateJobStatus = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const user_id = req.user.id; // Get user_id from token
  try {
    await JobModel.updateJobStatus(body, id, user_id);
    res.json({
      message: 'UPDATE Job Status Success',
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id; // Get user_id from token
  try {
    await JobModel.deleteJob(id, user_id);
    res.json({
      message: 'DELETE Job Success',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllJob,
  createNewJob,
  updateJob,
  updateJobStatus,
  deleteJob,
};
