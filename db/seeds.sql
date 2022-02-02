USE system_db;

INSERT INTO department (department_name) 
VALUES 
("Management"),
("Administration"),
("Mechanic"),
("Inventory");

INSERT INTO role (title, salary, department_id) 
VALUES 
("El Jefe", "90000", "1"),
("Admin Assistant", "60000", "2"),
("Mechanic", "60000", "2"),
("Inventory Specialist", "45000", "3");

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
("Dominic", "Toretto", "1", NULL);
("Letty", "Ortiz", "2"),
("Brian", "Oconnor", "3"),
("Mia", "Toretto", "4");