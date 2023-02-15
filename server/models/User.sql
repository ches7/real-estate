CREATE DATABASE users_app;
USE users_app;

CREATE TABLE users_1 (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `isAgent` BOOLEAN NOT NULL,
    `created` TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE saved_properties_1 (
`user_id` INT NOT NULL,
`saved_property` VARCHAR(30) NOT NULL,
PRIMARY KEY(`user_id`, `saved_property`)
);


INSERT INTO users_1 (username, email, password, isAgent)
VALUES 
('john', 'john@gmail.com', 'John.123', '12345', 1);

INSERT INTO saved_properties_1 (user_id, saved_property)
VALUES
('1', "638786eef8f1c0572067c59f"),
('1', "638786eef8f1c0572067c5ab");
