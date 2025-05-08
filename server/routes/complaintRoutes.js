const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.post('/', complaintController.submitComplaint);
router.get('/unresolved', complaintController.getUnresolvedComplaints);
router.get('/resolved', complaintController.getResolvedComplaints);

router.put('/resolve', complaintController.resolveComplaint);

router.put('/pending', complaintController.pendingComplaint);

router.delete('/delete/:id', complaintController.deleteComplaint);

module.exports = router;
