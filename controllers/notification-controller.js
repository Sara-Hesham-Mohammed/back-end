const { getNotifications } = require('../services/notification-service');

const fetchNotificationsController = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination parameters
    const notifications = await getNotifications(req.user.id, parseInt(page), parseInt(limit));
    res.status(200).send(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = { fetchNotificationsController };
