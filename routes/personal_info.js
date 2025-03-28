const express = require('express');
const router = express.Router();
const personal_infoController = require('../controllers/personal_info')

router.get('/', personal_infoController.getAll);

router.get('/:id', personal_infoController.getSingle);

router.post('/', personal_infoController.createPersonal_info);

router.put('/:id', personal_infoController.updatePersonal_info);

router.delete('/:id', personal_infoController.deletePersonal_info);



module.exports = router;