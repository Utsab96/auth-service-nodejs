const success = (res, message, data = null, status = 200) => {
  res.status(status).json({ success: true, message, data });
};

module.exports = { success };
