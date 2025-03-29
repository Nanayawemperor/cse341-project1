const express = require('express');
const router = express.Router();

const employment_detailsController = require('../controllers/employment_details');

router.get('/', employment_detailsController.getAll);

router.get('/:id', employment_detailsController.getSingle);

router.post('/', employment_detailsController.createEmployment_details);

router.put('/:id', employment_detailsController.updateEmployment_details);

router.delete('/:id', employment_detailsController.deleteEmployment_details);



module.exports = router;

