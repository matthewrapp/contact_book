const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890', 3);
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'matt1', // username that created db
    host: 'localhost', // host where the db server is hosted on
    database: 'contact_book', // db name
    password: 'password', // username that created db password
    port: 5432 // port the db server is on | '5432' is default
});

// ALL ADMIN ROUTES/QUERIES

// get all admins
const getAdmins = (req, res, next) => {
    // select all rows from admin table and order from earliest to latest, Ascending by ID
    pool.query('SELECT * FROM admin ORDER BY id ASC', (err, results) => {
        // if error, throw the error in terminal
        if (err) throw err;
        // else, send 200 response with result
        res.status(200).json(results.rows);
    })
};

// get single admin by ID
const getAdmin = (req, res, next) => {
    // get id from params/query
    const id = parseInt(req.query.id);
    // select all rows from admin table where the id === paramId
    pool.query('SELECT * FROM admin WHERE id = $1', [id], (err, results) => {
        // if error, throw the error in terminal
        if (err) throw err;
        // else, send 200 response with result
        res.status(200).json(results.rows);
    })
};

// create admin
const postCreateAdmin = (req, res, next) => {
    // create random Id
    const id = nanoid();
    // get the values from body
    const { firstName, lastName, email, password } = req.body;
    // add values in admin table
    pool.query(
        'INSERT INTO admin (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
        [id, firstName, lastName, email, password],
        (err, results) => {
            // if error, throw the error in terminal
            if (err) throw err;
            // else, send 201 response with result message
            res.status(201).json({message: `Admin added with ID: ${id}`});
        })
}

// update data within admin
const updateAdmin = (req, res, next) => {
    // get id from params/query
    const id = parseInt(req.query.id);
    // get the values from body
    const { firstName, lastName, email, password } = req.body;
    // update values in admin table
    pool.query(
        'UPDATE admin SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5',
        [firstName, lastName, email, password, id],
        (err, results) => {
            // if error, throw the error in terminal
            if (err) throw err;
            // else, send 200 response with result message
            res.status(200).send(`Admin modified with ID: ${id}`);
        })
}

// delete admin
const deleteAdmin = (req, res, next) => {
    // get id from params/query
    const id = parseInt(req.query.id);
    // delete all rows from admin table where the id === paramId
    pool.query('DELETE FROM admin WHERE id = $1', [id], (err, results) => {
        // if error, throw the error in terminal
        if (err) throw err;
        // else, send 200 response with result message
        res.status(200).send(`Admin deleted with ID: ${id}`);
    })
};

// delete ALL admins || testing purposes only
const deleteAllAdmins = (req, res, next) => {
    // delete all rows from admin table
    pool.query('DELETE FROM admin', (err, result) => {
        // if error, throw the error in terminal
        if (err) throw err;
        // else, send 200 response with result message
        res.status(200).send('All admins deleted.');
    })
}

// ALL CONTACT ROUTES/QUERIES

// get all contacts
const getContacts = (req, res, next) => {
    // select all rows from contact table and order from earliest to latest, Ascending by ID
    pool.query('SELECT * FROM contact ORDER BY id ASC', (err, results) => {
        // if error, throw the error in terminal
        if (err) throw err;
        // else, send 200 response with result
        res.status(200).send(results.rows);
    })
}

// get contact info with id in params
const getContact = (req, res, next) => {
    // get id from params/query
    const id = parseInt(req.query.id);
    // select all rows from cotnact table where the id === paramId
    pool.query('SELECT * FROM contact WHERE id = $1', [id], (err, results) => {
        // if error, throw the error in terminal
        if (err) throw err;
        // else, send 200 response with result
        res.status(200).json(results.rows);
    })
}

// create contact with adminId (FK) passed in with the data in body
const postCreateContact = (req, res, next) => {
    // get id from params/query
    const id = nanoid();
    // get the values from body
    const { firstName, lastName, email, phoneNumber, imageUrl, adminId } = req.body;
    // add values in contact table
    pool.query(
        'INSERT INTO contact (id, first_name, last_name, email, phone_number, image_url, admin_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [id, firstName, lastName, email, phoneNumber, imageUrl, adminId],
        (err, results) => {
            // if error, throw the error in terminal
            if (err) throw err;
            // else, send 200 response with result message
            res.status(201).json({message: `Contact added with ID: ${id}`});
        })
}

// update contact with ID in params
const updateContact = (req, res, next) => {
    // get id from params/query
    const id = parseInt(req.query.id);
    // get the values from body
    const { firstName, lastName, email, phoneNumber, imageUrl } = req.body;
    // update values in contact table
    pool.query(
        'UPDATE contact SET first_name = $1, last_name = $2, email = $3, phone_number = $4, image_url = $5 WHERE id = $6',
        [firstName, lastName, email, phoneNumber, imageUrl, id],
        (err, results) => {
            // if error, throw the error in terminal
            if (err) throw err;
            // else, send 200 response with result message
            res.status(200).send(`Contact modified with ID: ${id}`);
        })
}

// delete contact
const deleteContact = (req, res, next) => {
    // get id from params/query
    const id = parseInt(req.query.id);
    // delete all rows from contact table where the id === paramId
    pool.query('DELETE FROM contact WHERE id = $1', [id], (err, results) => {
        // if error, throw the error in terminal
        if (err) throw err;
        // else, send 200 response with result message
        res.status(200).send(`Contact deleted with ID: ${id}`);
    })
};

// delete ALL contacts || testing purposes only
const deleteAllContacts = (req, res, next) => {
    // delete all rows from contact table
    pool.query('DELETE FROM contact', (err, result) => {
        // if error, throw the error in terminal
        if (err) throw err;
        // else, send 200 response with result message
        res.status(200).send('All contacts deleted.');
    })
}

module.exports = { getAdmins, getAdmin, postCreateAdmin, updateAdmin, deleteAdmin, deleteAllAdmins, getContacts, getContact, postCreateContact, updateContact, deleteContact, deleteAllContacts};