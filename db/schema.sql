DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(20) NOT NULL
);
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title varchar(30),
    salary DECIMAL,
    department_id INT, 
    FOREIGN KEY (department_id) references department (id) ON DELETE CASCADE
);
CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) references role (id) ON DELETE CASCADE,
    manager_id INT,
    FOREIGN KEY (manager_id) references employee (id) ON DELETE
    SET NULL
);