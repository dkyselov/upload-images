const express = require('express');
const router = express.Router();
const files = require('../controllers/filesController');

router.get('/', (req, res) => {
    res.send('API FILES UPLOAD');
});
router.post('/img/upload', (req, res) => {
    files.uploadFiles(req, res);
});

module.exports = router;