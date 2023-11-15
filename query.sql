USE employee_db;

SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS "Job Title", department.name AS "Department", role.salary AS "Salary", CONCAT(managerTable.first_name, ' ', managerTable.last_name) AS "Manager" FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee managerTable ON employee.manager_id = managerTable.id;

SELECT role.id AS "id", role.title AS "Job Title", department.name AS Department, salary FROM role
LEFT JOIN department ON role.department_id = department.id;

SELECT department.name AS department, department.id FROM department;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?)