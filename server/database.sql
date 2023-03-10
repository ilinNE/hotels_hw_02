CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE films (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    year SMALLINT 
);

CREATE TABLE filmGenre (
    filmId INTEGER REFERENCES films(id) ON DELETE CASCADE,
    genreId INTEGER REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (filmId, genreId)
);
