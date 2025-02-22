const express = require('express');
const { enrichResume } = require('../controllers/resumeController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/enrich', authenticateToken, enrichResume);

module.exports = router;