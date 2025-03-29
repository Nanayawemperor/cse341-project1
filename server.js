const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');

const port = process.env.PORT || 3000;
const app = express();

const contactsRoutes = require('./routes/contacts');
const employment_detailsRoutes = require('./routes/employment_details');
const personal_infoRoutes = require('./routes/personal_info');

app
    .use(bodyParser.json())
    .use((req, res, next) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT, DELTE, OPTIONS');
        next();
})
    .use('/', require('./routes'));

app
    .use('/contacts', contactsRoutes)
    .use('/employment_details', employment_detailsRoutes)
    .use('/personal_info', personal_infoRoutes)
    .use((err, req, res, next) => {
        console.error(err.stack);

    res.status(500).send('Something broke!');
    });

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening, Running on port ${port}`)});
    }
});



