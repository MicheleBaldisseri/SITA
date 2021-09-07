-- Database: sita-rdb
CREATE TABLE kpi_element
(
    name character varying(255) ,
    label character varying(255) ,
    type character varying(255) ,
    CONSTRAINT kpi_element_pkey PRIMARY KEY (name)
);
CREATE TABLE users
(
    email character varying(255) ,
    password character varying(255) ,
    username character varying(255) ,
    roles character varying(255) ,
    CONSTRAINT users_pkey PRIMARY KEY (email)
);
INSERT INTO kpi_element(name, label, type) VALUES ('ts_Voli', 'Tempo Schedulato', 'int');
INSERT INTO kpi_element(name, label, type) VALUES ('ta_Voli', 'Tempo Atteso', 'int');
INSERT INTO users(email, password, username, roles) VALUES ('admin', 'admin', 'admin', 'admin');
INSERT INTO users(email, password, username, roles) VALUES ('guest', 'guest', 'guest', 'guest');
