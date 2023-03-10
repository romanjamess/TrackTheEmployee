const inquirer = require("inquirer")
const db = require('./db/connection');


async function app() {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit',
            ],
        },
    ])
    if (answer.choice === 'View all departments') {
        viewDepartments()
    }
    if (answer.choice === 'View all roles') {
        viewRoles()
    }
    if (answer.choice === 'View all employees') {
        viewEmployees()
    }
    if (answer.choice === 'Add a department') {
        addDepartment()
    }

}
async function viewDepartments() {
    const results = await db.promise().query('SELECT * FROM department;')
    console.table(results[0])
    app()
    
}
async function viewRoles() {
    const results = await db.promise().query('SELECT * FROM role;')
    console.table(results[0])
    app()
    
}
async function viewEmployees() {
    const results = await db.promise().query('SELECT * FROM employee;')
    console.table(results[0])
    app()
    
}
async function addDepartment() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What department would you like to add?',
        },
    ])
  
    const results = await db.promise().query('INSERT INTO department (name) VALUES (?)', answer.addDepartment)
    console.table(results)
    app()
    
}

app()

