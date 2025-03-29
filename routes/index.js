const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //swagger.tags-['Hello World']
    res.send('Hello World');});

router.use('/contacts', require('./contacts'));
router.use('/employment_details', require('./employment_details'));
router.use('/personal_info', require('./personal_info'));

module.exports = router;