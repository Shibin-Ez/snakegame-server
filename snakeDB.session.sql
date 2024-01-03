--@block
use defaultdb;

--@block
CREATE TABLE records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    time INT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--@block see all tables in defaultdb
SHOW TABLES;

--@block
SELECT * FROM records;

--@block edit empty name by "anonymous"
UPDATE records SET name = 'anonymous' WHERE id = 5; 

