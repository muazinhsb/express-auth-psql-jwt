CREATE DATABASE ukur;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE admin(
  _id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);



CREATE TABLE members
(
  _id TEXT PRIMARY KEY,
  index INTEGER,
  guid TEXT NOT NULL,
  isActive BOOLEAN NOT NULL,
  name TEXT NOT NULL,
  balance INTEGER NOT NULL,
  greeting TEXT NOT NULL,
  favoriteTransportation TEXT NOT NULL
);












SELECT *
FROM members;












INSERT INTO members
  (_id, name, password, balance, transportation)
VALUES
  ('112233', 'Muazin', '123456', 55250, 'bike');

INSERT INTO members
  (_id, name, password, balance, transportation)
VALUES
  ('222445', 'Ryan', '439721', 23141, 'plane');

--psql -U postgres
--\c ukur
--\dt
--heroku pg:psql