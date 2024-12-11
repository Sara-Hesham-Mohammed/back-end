const { Router } = require('express');
const { fetchNotificationsController } = require('../controllers/notification-controller');
const notificationsRouter = Router();

// Fetch notifications for a user
notificationsRouter.get('/', fetchNotificationsController);

module.exports = notificationsRouter;
