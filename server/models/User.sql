CREATE DATABASE real_estate_users;
USE real_estate_users;

CREATE TABLE users (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `agentName` VARCHAR(100),
    `agentPhoto` VARCHAR(100),
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `isAgent` BOOLEAN NOT NULL,
    `created` TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE saved_properties (
`user_id` INT NOT NULL,
`saved_property` VARCHAR(50) NOT NULL,
PRIMARY KEY(`user_id`, `saved_property`)
);

INSERT INTO users (agentName, email, password, isAgent)
VALUES 
('default', 'default@gmail.com', 'password', 1);

INSERT INTO saved_properties (user_id, saved_property)
VALUES
('1', "638786eef8f1c0572067c59f"),
('1', "638786eef8f1c0572067c5ab");