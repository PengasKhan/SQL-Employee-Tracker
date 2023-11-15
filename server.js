const inquirer = require("inquirer");
const mysql = require("mysql2");
const { printTable } = require("console-table-printer");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

const menuPrompt = {
  type: "list",
  name: "menu",
  message: "What do you want to do?",
  choices: [
    "View All Employees",
    "Add Employee",
    "Update Employee Role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department",
    "Quit",
  ],
};

const viewEmployees = async () => {
  db.query(
    `SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS "Job Title", department.name AS "Department", role.salary AS "Salary", CONCAT(managerTable.first_name, ' ', managerTable.last_name) AS "Manager" FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee managerTable ON employee.manager_id = managerTable.id`,
    (err, data) => {
      printTable(data);
      menu();
    }
  );
};

const viewRoles = async () => {
  db.query(
    `SELECT role.id AS "id", role.title AS "Job Title", department.name AS Department, salary FROM role
    LEFT JOIN department ON role.department_id = department.id`,
    (err, data) => {
      printTable(data);
      menu();
    }
  );
};

const viewDepartments = async () => {
  db.query(
    "SELECT department.name AS department, department.id FROM department",
    (err, data) => {
      printTable(data);
      menu();
    }
  );
};

const addEmployee = async () => {
  const postEmployee = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter first name of new employee:",
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter last name of new employee:",
    },
    {
      type: "input",
      name: "employeeRole",
      message: "Enter Role ID of new employee:",
    },
    {
      type: "input",
      name: "employeeManager",
      message: "Enter Manager ID of new employee:",
    },
  ]);

  db.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
    [
      postEmployee.firstName,
      postEmployee.lastName,
      postEmployee.employeeRole,
      postEmployee.employeeManager,
    ],
    (err) => {
      viewEmployees();
    }
  );
};

const addRole = async () => {
  const postRole = await inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "Enter title of new role:",
    },
    {
      type: "input",
      name: "roleSalary",
      message: "Enter salary of new role (in USD):",
    },
    {
      type: "input",
      name: "roleDepartment",
      message: "Enter Department ID of new role:",
    },
  ]);

  db.query(
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
    [postRole.roleName, postRole.roleSalary, postRole.roleDepartment],
    (err) => {
      viewRoles();
    }
  );
};

const addDepartment = async () => {
  const postDepartment = await inquirer.prompt({
    type: "input",
    name: "departmentName",
    message: "Enter name of new department:",
  });

  db.query(
    "INSERT INTO department (name) VALUES (?)",
    [postDepartment.departmentName],
    (err) => {
      viewDepartments();
    }
  );
};

const updateRole = async () => {
  const putRole = await inquirer.prompt([
    {
      type: "input",
      name: "employeeID",
      message: "Enter ID of employee to update:",
    },
    {
      type: "input",
      name: "roleID",
      message: "Enter new role ID for updated employee",
    },
  ]);

  db.query(
    "UPDATE employee SET role_id = ? WHERE employee.id = ?",
    [putRole.roleID, putRole.employeeID],
    (err) => {
      viewEmployees();
    }
  );
};

function logTable(data) {
  const output = table(data);
  console.log(output);
}

function start() {
  console.log(`
_////////_//       _//_///////  _//          _////     _//      _//_////////_////////
_//      _/ _//   _///_//    _//_//        _//    _//   _//    _// _//      _//      
_//      _// _// _ _//_//    _//_//      _//        _//  _// _//   _//      _//      
_//////  _//  _//  _//_///////  _//      _//        _//    _//     _//////  _//////  
_//      _//   _/  _//_//       _//      _//        _//    _//     _//      _//      
_//      _//       _//_//       _//        _//     _//     _//     _//      _//      
_////////_//       _//_//       _////////    _////         _//     _////////_////////
                                                                                     
_/////          _/       _/// _//////      _/       _// _//         _/         _// //  _////////
_//   _//      _/ //          _//         _/ //     _/    _//      _/ //     _//    _//_//      
_//    _//    _/  _//         _//        _/  _//    _/     _//    _/  _//     _//      _//      
_//    _//   _//   _//        _//       _//   _//   _/// _/      _//   _//      _//    _//////  
_//    _//  _////// _//       _//      _////// _//  _/     _//  _////// _//        _// _//      
_//   _//  _//       _//      _//     _//       _// _/      _/ _//       _// _//    _//_//      
_/////    _//         _//     _//    _//         _//_//// _// _//         _//  _// //  _////////
                                                                                                
`);
  menu();
}

const menu = async () => {
  const menuAnswer = await inquirer.prompt(menuPrompt);

  switch (menuAnswer.menu) {
    case "View All Employees":
      viewEmployees();
      break;
    case "View All Roles":
      viewRoles();
      break;
    case "View All Departments":
      viewDepartments();
      break;
    case "Add Employee":
      addEmployee();
      break;
    case "Add Role":
      addRole();
      break;
    case "Add Department":
      addDepartment();
      break;
    case "Update Employee Role":
      updateRole();
      break;
    default:
      console.log("Goodbye.");
      process.exit(0);
  }
};

start();
