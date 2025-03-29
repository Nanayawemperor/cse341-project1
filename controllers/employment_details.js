const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Employment_details']
    const result = await mongodb.getDatabase().db().collection('employment_details').find();
    result.toArray().then((employment_details) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(employment_details);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Employment_details']
    const employment_detailsId = new ObjectId.isValid(req.params.id);
    const result = await mongodb.getDatabase().db().collection('employment_details').find({ _id: employment_detailsId});
    result.toArray().then((employment_details) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(employment_details[0]);
    })
};

const createEmployment_details = async (req, res) => {
    //#swagger.tags = ['employment_details']
    const employment_details = {
        jobTitle: req.body.jobTitle,
        department: req.body.department,
        employeeId: req.body.employeeId,
        dateOfHire: req.body.dateOfHire,
        employment_status: req.body.employment_status
    };
    const response = await mongodb.getDatabase().db().collection('employment_details').insertOne(employment_details);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the employment_details.');
    }
};

const updateEmployment_details = async (req, res) => {
    //#swagger.tags = ['employment_detailss']
    const employment_detailsId = new ObjectId.isValid(req.params.id);
    const employment_details = {
        jobTitle: req.body.jobTitle,
        department: req.body.department,
        employeeId: req.body.employeeId,
        dateOfHire: req.body.dateOfHire,
        employment_status: req.body.employment_status
    };
    const response = await mongodb.getDatabase().db().collection('employment_details').replaceOne({ _id: employment_detailsId}, employment_details);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the employment_details.');
    }
};

const deleteEmployment_details = async (req, res) => {
    //#swagger.tags = ['employment_details']
    const employment_detailsId = new ObjectId.isValid(req.params.id);
    const response = await mongodb.getDatabase().db().collection('employment_details').deleteOne({ _id: employment_detailsId}, true);
    if (response.deleteCount > 0) {
        res.status(204).send();

    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the employment_details');
    }
        
}; 
module.exports = {
    getAll,
    getSingle,
    createEmployment_details,
    updateEmployment_details,
    deleteEmployment_details
}