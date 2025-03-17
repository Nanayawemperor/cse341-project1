const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve contacts" });
    }
};

const getSingle = async (req, res) => {
    try {
        const contactId = req.params.id;

        // ✅ Validate ID before converting
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: "Invalid contact ID format" });
        }

        const result = await mongodb.getDatabase().db().collection('contacts').findOne({ _id: new ObjectId(contactId) });

        if (!result) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve contact" });
    }
};

const createContact = async (req, res) => {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favColor: req.body.favColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);

        if (response.acknowledged) {
            res.status(201).json({ message: "Contact created successfully" });
        } else {
            res.status(500).json({ error: "Failed to create contact" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;

        // ✅ Validate ID before converting
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: "Invalid contact ID format" });
        }

        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favColor: req.body.favColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: new ObjectId(contactId) }, contact);

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "Contact updated successfully" });
        } else {
            res.status(404).json({ error: "Contact not found or no changes made" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update contact" });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;

        // ✅ Validate ID before converting
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: "Invalid contact ID format" });
        }

        const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: new ObjectId(contactId) });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: "Contact deleted successfully" });
        } else {
            res.status(404).json({ error: "Contact not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete contact" });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
