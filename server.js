const express = require('express');
const bodyParser = require('body-parser');
const contactsRoutes = require('./routes/contacts');
const employment_detailsRoutes = require('./routes/employment_details');
const personal_infoRoutes = require('./routes/personal_info');

const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT, DELTE, OPTIONS');
    next();
});
app.use('/', require('./routes'));


app.use('/contacts', contactsRoutes);
app.use('/employment_details', employment_detailsRoutes);
app.use('/personal_info', personal_infoRoutes);

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening, Running on port ${port}`)});
    }
});



