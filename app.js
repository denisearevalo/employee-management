const inquirer = require("inquirer");
const db = require('./db/connection');

// options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function startUp() {
    inquirer.prompt([{
        name: "question",
        type: "list",
        message: "Welcome to Employee Management System. What would you like to do?",
        choices: ["View all Departments", "View all Roles", "View all Employees", "Add Department", "Add Role", "Add employee", "Update Employee role", "Close the app!"]
    }])
    .then(answers => {
        switch (answers.question) {
            case "View all Departments":
                console.log("Viewing departments")
                viewDepartments();
                break;
            case "View all Roles":
                console.log("Viewing roles")
                viewRoles();
                break;
            case "View all Employees":
                console.log("Viewing employees")
                viewEmployees();
                break;
            case "Add Department":
                console.log("Adding a department")
                addDepartment();
                break;
            case "Add Role":
                console.log("Adding Role")
                 addRole();
                break;
            case "Add Employee":
                console.log("Adding employees")
                addEmployee();
                break;
            case "Update Employee role":
                console.log("Updating employee role")
                updateEmployee();
                break;
            default:
                console.log("Thanks for using EMS")
                break;
        }
    })
}
function viewDepartments() {
    db.query("SELECT * FROM department", function (err, result) {
        if (err) throw err;
        console.table(result);
        startUp();
    })
}
function viewRoles() {
    db.query("SELECT title AS `Title`, salary AS `Salary`, department_id AS `Department Id` FROM roles", function (err, result) {
        if (err) throw err;
        console.table(result);
        startUp();
    })
}
function viewEmployees() {
    db.query("SELECT first_name AS `First Name`, last_name AS `Last Name`, role_id AS `Role Id` FROM employee, manager_id AS `Manager Id`", function (err, result) {
        if (err) throw err;
        console.table(result);
        startUp();
    })
}
function addDepartment() {
    inquirer.prompt({
        name: "newDepartment",
        message: "What is the department's name?",
        type: "input"
    })
    .then(function (answer) {
        db.query("INSERT INTO department SET ?", {department_name: answer.newDepartment}, function (err) {
        if (err) throw err;
        startUp(); 
        })
    })
}
function addRole() {
    inquirer.prompt([
        {
            name: "newRoleTitle",
            message: "What is the role's name?",
            type: "input"
        },
        {
            name: "newRoleSalary",
            message: "What is the salary for this role?",
            type: "input"
        },
        {
            name: "newRoleDepartmentId",
            message: "What is the department's id for this role?",
            type: "input"
        }
    ])
    .then(function (answer) {
        db.query("INSERT INTO roles SET ?", {title:answer.newRoleTitle,
            salary: answer.newRoleSalary, department_id: answer.newRoleDepartmentId}, function (err,result) {
            if (err) throw err;
            console.table(result);
            startUp(); 
        })
    })
}
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the new Employee?",
            name: "firstName",
        },
        {
            type: "input",
            message: "What is the last name of the new Employee?",
            name: "lastName",
        },
        {
            type: "list",
            message: "What is the role that the new Employee belongs to?",
            name: "roleId",
        },
        {
            type: "list",
            message: "Who is the new Employees manager?",
            name: "managerId",
        },
    ]).then(function (answer){
        db.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              role_id: answer.roleId,
              manager_id: answer.managerId,
            },
            function(err,result) {
                if (err) throw err;
                console.table(result);
                startUp(); 
            }
        )
    })
}
function updateEmployee() {
    db.query("SELECT * FROM roles", function (err,data){
        if (err) throw err;
        const roleArr = data.map(function (role) {
        return { name: role.title, value: role.id };
        })
    db.query("SELECT * FROM employee", function (err,data){
        if (err) throw err;
        const employeeArr = data.map(function (employee) {
        return {
            name:employee.first_name+" "+employee.last_name,
            value: employee.id,};
        })
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to update?",
            name: "employeeUpdate",
            choices: employeeArr,
        },
        {
            type: "list",
            message: "What new role would you like to give them?",
            name: "roleUpdate",
            choices: roleArr,
        },
    ])
})
}).then(function (update){
        const roleUpdate = update.roleUpdate;
        const employeeUpdate = update.employeeUpdate;
        db.query("UPDATE employee SET role_id=? WHERE id=?", [roleUpdate,employeeUpdate], function (err,result) {
            if (err) throw err;
            console.table(result);
            startUp(); 
        })
    })

}

startUp();
