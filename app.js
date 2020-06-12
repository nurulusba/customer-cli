const mongoose = require('mongoose');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// connect to db
const db = mongoose.connect('<MONGODB_LOCATION>/customercli', {
    useNewUrlParser : true, 
    useUnifiedTopology : true
});

// import model 
const Customer = require('./customer');

// add customer
const addCustomer = (customer) => {
    Customer.create(customer)
    .then(customer => {
        console.info('New Customer Added :)');
        process.exit(1);
      });
    }
// find customer
const findCustomer = (name) => {
    // make case insensitive
    const search = new RegExp(name, 'i');
    Customer.find({$or: [{firstName: search}, {lastName: search}]})
    .then(customer => {
        console.info(customer);
        console.info(`${customer.length} matches`);
    });
} 
// update customer
const updateCustomer = (_id , customer) => {
    Customer.update({_id} , customer)
        .then(customer => {
            console.info('Custome Updates');
            process.exit(1);

        });
}

// remove customer 
const removeCustomer = (_id) => {
    Customer.remove({_id})
        .then(customer => {
            console.info('Customer Is Removed');
            process.exit(1);

        });
}

// list all customer
const listCustomer = () => {
    Customer.find()
        .then(customer => {
            console.info(customer);
            console.info(`${customer.length} Customer`);
            process.exit(1);

        });
}

// export all modules
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomer
}