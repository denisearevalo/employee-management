USE ems_db;

INSERT INTO department (department_name) 
VALUES 
("Management"),
("Administration"),
("Special Mechanic"),
("Inventory");

INSERT INTO roles (title, salary, department_id) 
VALUES 
("El Jefe", 90000, 1),
("Admin Assistant", 60000, 2),
("Mechanic", 60000, 3),
("Inventory Specialist", 45000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
("Dominic", "Toretto", 1, 1),
("Letty", "Ortiz", 2, 2),
("Brian", "Oconnor", 3, 3),
("Mia", "Toretto", 4, 1);

