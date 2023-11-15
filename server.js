const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

// View all Departments
app.get("/api/departments", (req, res) => {
  const sql = `SELECT name AS department, id FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      data: rows,
    });
  });
});

// View all Roles
app.get("/api/roles", (req, res) => {
  const sql = `SELECT title AS "Job Title", id AS "Role id", department.name AS Department, salary FROM role`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      data: rows,
    });
  });
});

// View all Employees
app.get("/api/employees", (req, res) => {
  const sql = `SELECT id, first_name AS "First Name", last_name AS "Last Name", role.title AS "Job Title", role.department.name AS "Department", role.salary AS "Salary", employee.last_name AS "Manager" FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      data: rows,
    });
  });
});

// Add a department
app.post("/api/new-department", ({ body }, res) => {
  const sql = `INSERT INTO department (name)
      VALUES (?)`;
  const params = [body.name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      data: body,
    });
  });
});

// Add a role
app.post("/api/new-role", ({ body }, res) => {
  const sql = `INSERT INTO role (title, salary, department_id)
      VALUES (?)`;
  const params = [body.title, body.salary, body.department_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      data: body,
    });
  });
});

// Add an employee
app.post("/api/new-employee", ({ body }, res) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?)`;
  const params = [
    body.first_name,
    body.last_name,
    body.role_id,
    body.manager_id,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      data: body,
    });
  });
});

// Update employee role
app.put("/api/employee/:id", (req, res) => {
  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

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
await fetch("/api/departments", {
  method: "GET",
})
  menu;
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
menu;
};

const menu = async () => {
    const menuAnswer = await inquirer.prompt(menuPrompt);

    switch (menuAnswer.menu) {
      case "View All Employees":
        viewEmployees;
        break;
      case
    }
    }

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

start();