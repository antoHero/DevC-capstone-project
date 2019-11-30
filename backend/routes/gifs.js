const express = require('express');
const router = express.Router();
const gifCtrl = require('../controllers/Gif');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, gifCtrl.viewAllGifs);
router.post('/', auth, multer, gifCtrl.addGif);
router.get('/:id', auth, gifCtrl.readOne);
router.post('/:id', auth, multer, gifCtrl.commentOnGif);
router.delete('/:id', auth, gifCtrl.deleteGif);