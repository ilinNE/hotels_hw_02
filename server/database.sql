CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE films (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    year SMALLINT 
);

CREATE TABLE film_genre (
    film_id INTEGER REFERENCES films(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (film_id, genre_id)
);
