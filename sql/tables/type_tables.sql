CREATE TABLE role_types (
    role_id                 SERIAL PRIMARY KEY,
    role_description        VARCHAR(50) NOT NULL
);

CREATE TABLE hash_algorithm_types (
    algorithm_id            SERIAL PRIMARY KEY,
    algorithm_description   VARCHAR(20) NOT NULL
);

CREATE TABLE relationship_types (
    type_id                 SERIAL PRIMARY KEY,
    type_description        VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE series_types (
    type_id                 SERIAL PRIMARY KEY,
    type_description        VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE venue_types (
    type_id                 SERIAL PRIMARY KEY,
    type_description        VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE event_types (
    type_id                 SERIAL PRIMARY KEY,
    type_description        VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE artist_types (
    type_id                 SERIAL PRIMARY KEY,
    type_description        VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE genre_types (
    type_id                 SERIAL PRIMARY KEY,
    type_description        VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE subgenres_types (
    type_id                 SERIAL PRIMARY KEY,
    genre_id                INT NOT NULL REFERENCES genre_types(type_id),
    type_description        VARCHAR(255) NOT NULL UNIQUE
);
