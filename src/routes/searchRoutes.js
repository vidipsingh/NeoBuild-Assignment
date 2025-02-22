const express = require('express');
const { searchResumes } = require('../controllers/searchController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/search', authenticateToken, searchResumes);

module.exports = router;