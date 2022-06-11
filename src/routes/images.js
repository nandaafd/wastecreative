const router = require('express').Router();
const imageController = require('../controllers/controller-image');
const imageUploader = require('./helpers/image-uploader');

// router.post('/uploads', imageUploader.upload.single('foto'), imageController.upload);

module.exports = router;