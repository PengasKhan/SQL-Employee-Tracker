USE employee_db;

INSERT INTO department (name)
VALUES ("Accounting"),
       ("Marketing"),
       ("HR"),
       ("IT");

INSERT INTO role (department_id, title, salary)
VALUES (1, "Accountant", 12),
       (2, "Loser", 10),
       (3, "Boss Person", 20),
       (4, "Computer Person", 12),
       (3, "Wrangler", 18);
       
INSERT INTO employee (role_id, last_name, first_name)
VALUES (3, "Dandleton", "Karl"),
       (5, "Archideld", "Darryl"),
       (4, "Dugnutt", "Bobson"),
       (2, "Dustice", "Willie"),
       (1, "Truk", "Mike");

UPDATE employee 
    SET `manager_id` = '1' 
WHERE employee.id = '1' OR employee.id = '2';

UPDATE employee 	
    SET `manager_id` = '2'
WHERE employee.id = '3' OR employee.id = '4' OR employee.id = '5';