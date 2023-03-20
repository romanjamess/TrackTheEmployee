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
    if (answer.choice === 'Update an employee role'){
        updateRole()
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
            choices: ["Engineering", 2, 3, 4],
        },
    ])
    .then(function(answer){
        let departmentId = 0
        if(answer.department === "Engineering"){
        departmentId = 1
    }
        if(answer.department === "Finance"){
        departmentId = 2
    }
        if(answer.department === "Legal"){
        departmentId = 3
    }
        if(answer.department === "Sales"){
        departmentId = 4
    }
        // console.log(answer);
        connection.query("INSERT INTO role SET ?",{
            title: answer.roles,
            salary: answer.salary,
            department_id: departmentId,
        }),function (err) {
            if (err) throw err;
        }
    });
  
    // const results = await db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?)', answer.roles, answer.salary, answer.department)
    // console.table(results)
    app()
    
}

async function addEmployee() {
    
     await inquirer.prompt([
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
            choices: ["random", 2, 3, 4],
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employees manager?',
            choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown"],
            // choices: ["john doe", 2, 3, 4, 5, 6],
        }

    ]) .then(function(answer){
        let managerId = 0 
        if (answer.manager === "john doe"){
            console.log("test")
            managerId = 1
        }
        if (answer.manager === "Mike Chan"){
            managerId = 2
        }
        if (answer.manager === "Ashley Rodriguez"){
            managerId = 3
        }
        if (answer.manager === "Kevin Tupik"){
            managerId = 4
        }
        if (answer.manager === "Kunal Singh"){
            managerId = 5
        }
        if (answer.manager === "Malia Brown"){
            managerId = 6
        }
        // console.log(answer);
        connection.query("INSERT INTO employee SET ?",{
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.role,
            manager_id: managerId,
        }),function (err) {
            if (err) throw err;
        }
    });
    
  
    // const results = await db.promise().query('INSERT INTO department (first_name, last_name) SET (?)', answer.firstName, answer.lastName)
    // console.table(results)
    app()
    
}
async function updateRole() {
    const query = connection.query("SELECT * FROM employee")
    const results = []
    console.log(query)
   
//    console.log(allEmp)
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'roles',
            message: 'Which employee role do you want to update?',
            // choices: allEmp
            choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown"],
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which role do you want to sign the selected employee?',
            choices: ["Sales Person", "Lead Engineer", "Acount Manager"],
        },
    ])
    // .then(function(answer){
    //     let 
    //     // console.log(answer);
    //     connection.query("UPDATE role SET title = {} ?",{
    //         title: answer.list,
    //         salary: answer.salary,
    //         department_id: answer.department,
    //     }),function (err) {
    //         if (err) throw err;
    //     }
    // });

}
//first query db for employees
//get response from db
//make an array of employees from db 
//

app()

