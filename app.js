const express  = require('express');
const mongoose = require('mongoose');
const path     = require('path');
const app = express();

const stuffRoutes = require('./routes/stuff');
const userRoutes  = require('./routes/user');

app.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

const uri = "mongodb+srv://backend-user:backend@mlecoustre.ndcnk.mongodb.net/mlecoustre?retryWrites=true&w=majority";
const client = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()  => console.log('Connexion MongoDB réussie !'))
    .catch(() => console.error('Connexion MongoDB échouée'));

app.use(express.json());

app.use('/api/stuff', stuffRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth',  userRoutes);

module.exports = app;