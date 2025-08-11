const express = require('express');
const router = express.Router();
const { createForm, getFormById, saveResponse } = require('../controllers/formController');

router.post('/', createForm);
router.get('/:id', getFormById);
router.post('/response', saveResponse);

module.exports = router;
