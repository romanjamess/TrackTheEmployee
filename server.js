const inquirer = require("inquirer");
const connection = require("./db/connection");
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
    if (answer.choice === 'Add a role') {
        addRole()
    }
    if (answer.choice === 'Add an employee'){
        addEmployee()
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
async function addRole() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'roles',
            message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does the role belong to',
            choices: ["Engineering", "Finance", "Legal", "Sales"],
        },
    ])
    .then(function(answer){
        // console.log(answer);
        connection.query("INSERT INTO role (title, salary, department_id) VALUES ?",{
            roles: answer.roles,
            salary: answer.salary,
            department: answer.department_id,
        }),function (err) {
            if (err) throw err;
        }
    });
  
    // const results = await db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?)', answer.roles, answer.salary, answer.department)
    // console.table(results)
    app()
    
}

async function addEmployee() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employees last name?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employees role?',
            choices: ["Engineering", "Finance", "Legal", "Sales"],
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employees manager?',
            choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown"],
        }
    ])
  
    const results = await db.promise().query('INSERT INTO department (name) VALUES (?)', answer.addDepartment)
    console.table(results)
    app()
    
}

app()

