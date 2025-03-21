const express = require('express');
const bodyParser = require('body-parser');
const contactsRoutes = require('./routes/contacts');
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

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening, Running on port ${port}`)});
    }
});



