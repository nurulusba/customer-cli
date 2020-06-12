#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const { addCustomer, findCustomer, updateCustomer, removeCustomer, listCustomer } = require('./app');

// customer questions 

const questions = [
    {
        type: 'input',
        name: 'firstName',
        message: 'Customer First Name:'
    },

    {
        type: 'input',
        name: 'lastName',
        message: 'Customer Last Name:'
    },

    {
        type: 'input',
        name: 'phone',
        message: 'Customer Phone Number:'
    },

    {
        type: 'input',
        name: 'email',
        message: 'Customer Email Address:'
    }
];
program
    .version('1.0.0')
    .description('Customer Management System')
    
/* program
    .command('add <firstName> <lastName> <phone> <email>')
    .alias('a')
    .description('add a customer')
    .action((firstName, lastName, phone, email) => {
        addCustomer({firstName, lastName, phone, email})
    });
    */

program
    .command('add')
    .alias('a')
    .description('add a customer')
    .action(() => {
        prompt(questions).then(answers => addCustomer(answers));
    });

    // find customer
program
    .command('find <name>')
    .alias('f')
    .description('find a customer')
    .action(name => findCustomer(name));

    // update customer
program
    .command('update <_id>')
    .alias('u')
    .description('update a customer')
    .action((_id) => {
        prompt(questions).then(answers => updateCustomer(_id, answers)); 
    });
    
    // remove customer
    program
    .command('remove <_id>')
    .alias('r')
    .description('remove a customer')
    .action(_id => removeCustomer(_id));

     // list customer
    program
     .command('list')
     .alias('l')
     .description('list all customer')
     .action(() => listCustomer());

program.parse(process.argv);