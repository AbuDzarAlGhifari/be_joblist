const dbPool = require('../config/database');

// Get all jobs for a specific user
const getAllJob = (user_id) => {
  const SQLQuery = `SELECT * FROM job WHERE user_id = ?`;
  return dbPool.execute(SQLQuery, [user_id]);
};

// Create a new job for a specific user
const createNewJob = (body, user_id) => {
  const SQLQuery = `INSERT INTO job (perusahaan, lokasi, posisi, tanggal_lamar, tanggal_batas_lamaran, platform, status_lamar, keterangan, link, user_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  return dbPool.execute(SQLQuery, [
    body.perusahaan,
    body.lokasi,
    body.posisi,
    body.tanggal_lamar,
    body.tanggal_batas_lamaran,
    body.platform,
    body.status_lamar,
    body.keterangan,
    body.link,
    user_id,
  ]);
};

// Update a job for a specific user
const updateJob = (body, id, user_id) => {
  const SQLQuery = `UPDATE job 
                    SET perusahaan = ?, lokasi = ?, posisi = ?, tanggal_lamar = ?, tanggal_batas_lamaran = ?, platform = ?, status_lamar = ?, keterangan = ?, link = ?
                    WHERE id = ? AND user_id = ?`;
  return dbPool.execute(SQLQuery, [
    body.perusahaan,
    body.lokasi,
    body.posisi,
    body.tanggal_lamar,
    body.tanggal_batas_lamaran,
    body.platform,
    body.status_lamar,
    body.keterangan,
    body.link,
    id,
    user_id,
  ]);
};

// Update job status for a specific user
const updateJobStatus = (body, id, user_id) => {
  const SQLQuery = `UPDATE job 
                    SET status_lamar = ? 
                    WHERE id = ? AND user_id = ?`;
  return dbPool.execute(SQLQuery, [body.status_lamar, id, user_id]);
};

// Delete a job for a specific user
const deleteJob = (id, user_id) => {
  const SQLQuery = `DELETE FROM job WHERE id = ? AND user_id = ?`;
  return dbPool.execute(SQLQuery, [id, user_id]);
};

module.exports = {
  getAllJob,
  createNewJob,
  updateJobStatus,
  updateJob,
  deleteJob,
};
