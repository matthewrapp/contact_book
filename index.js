const express = require('express');
const bodyParser = require('body-parser');
const db = require('./routes/queries');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// routes
app.get('/', (req, res, next) => { res.json({ info: 'Contact book, made with Node.js, Express, and PostgreSQL' }) });

app.get('/admins', db.getAdmins);
app.get('/admin?:id', db.getAdmin);
app.get('/contacts', db.getContacts);
app.get('/contact?:id', db.getContact);

app.post('/create-admin', db.postCreateAdmin);
app.post('/create-contact', db.postCreateContact);

app.put('/update-admin?:id', db.updateAdmin);
app.put('/update-contact?:id', db.updateContact);

app.delete('/delete-admin?:id', db.deleteAdmin);
app.delete('/delete-all-admins', db.deleteAllAdmins);
app.delete('/delete-contact?:id', db.deleteContact);
app.delete('/delete-all-contacts', db.deleteAllContacts);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});