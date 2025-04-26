const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.get('/requests', requestController.getServiceRequests);
router.post('/request-service', requestController.requestService);
router.post('/request-action', requestController.handleRequestAction);
router.get('/customer-requests', requestController.getCustomerRequests);
router.post('/complete-request', requestController.completeRequest);
router.delete('/delete-request',requestController.deleteRequest);
module.exports = router;
