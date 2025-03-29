const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Personal_Info']
    const result = await mongodb.getDatabase().db().collection('personal_info').find();
    result.toArray().then((personal_info) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(personal_info);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['personal_info']
    const personal_infoId = new ObjectId.isValid(req.params.id);
    const result = await mongodb.getDatabase().db().collection('personal_info').find({ _id: personal_infoId});
    result.toArray().then((personal_info) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(personal_info[0]);
    })
};

const createPersonal_info = async (req, res) => {
    //#swagger.tags = ['personal_info']
    const personal_info = {
        fullName: req.body.fullName,
        date_of_birth: req.body.date_of_birth,
        addressId: req.body.addressId,
        contact: req.body.contact,
        email: req.body.createPersonal_info,
        emergency_Contact: req.body.emergency_Contact
        

    };
    const response = await mongodb.getDatabase().db().collection('personal_info').insertOne(personal_info);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the personal_info.');
    }
};

const updatePersonal_info = async (req, res) => {
    //#swagger.tags = ['personal_infos']
    const personal_infoId = new ObjectId.isValid(req.params.id);
    const personal_info = {
        fullName: req.body.fullName,
        date_of_birth: req.body.date_of_birth,
        addressId: req.body.addressId,
        contact: req.body.contact,
        emergency_Contact: req.body.emergency_Contact
    };
    const response = await mongodb.getDatabase().db().collection('personal_info').replaceOne({ _id: personal_infoId}, personal_info);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the personal_info.');
    }
};

const deletePersonal_info = async (req, res) => {
    //#swagger.tags = ['personal_info']
    const personal_infoId = new ObjectId.isValid(req.params.id);
    const response = await mongodb.getDatabase().db().collection('personal_info').deleteOne({ _id: personal_infoId}, true);
    if (response.deleteCount > 0) {
        res.status(204).send();

    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the personal_info');
    }
        
}; 
module.exports = {
    getAll,
    getSingle,
    createPersonal_info,
    updatePersonal_info,
    deletePersonal_info
}