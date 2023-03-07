CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30)
);

CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL, 
    flag_img VARCHAR(225) -- Путь к файлу на диске
);

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE ratings_mpaa (
    id SERIAL PRIMARY KEY,
    name VARCHAR(5),
    text_hint VARCHAR(225)
);

CREATE TABLE ratings_ru (
    id SERIAL PRIMARY KEY,
    name VARCHAR(3)
);

-- Сущность пользователя сайта в упрощенном виде
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    login VARCHAR(30),
    password VARCHAR(30)
);

CREATE TABLE films (
    id SERIAL PRIMARY KEY,
    title_ru VARCHAR(225) NOT NULL,
    poster_img VARCHAR(225),
    description TEXT,
    slogan TEXT,
    title_original VARCHAR(225) NOT NULL,
    director_id INTEGER REFERENCES persons(id) ON DELETE SET NULL,
    screenwriter_id INTEGER REFERENCES persons(id) ON DELETE SET NULL,
    producer_id INTEGER REFERENCES persons(id) ON DELETE SET NULL,
    operator_id INTEGER REFERENCES persons(id) ON DELETE SET NULL,
    composer_id INTEGER REFERENCES persons(id) ON DELETE SET NULL,
    artist_id INTEGER REFERENCES persons(id) ON DELETE SET NULL,
    editor_id INTEGER REFERENCES persons(id) ON DELETE SET NULL,
    budget INTEGER,
    marketing INTEGER,
    box_office_usa INTEGER,
    box_office_world INTEGER,
    rating_ru INTEGER REFERENCES ratings_ru(id) ON DELETE SET NULL, 
    rating_mpaa INTEGER REFERENCES ratings_mpaa(id) ON DELETE SET NULL, 
    runtime INTERVAL,
    synopsis TEXT
);

CREATE TABLE trailers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(225) NOT NULL,
    upload_date DATE NOT NULL DEFAULT CURRENT_DATE,
    video VARCHAR(225)NOT NULL, 
    preview_img VARCHAR(225) NOT NULL,
    film_id INTEGER REFERENCES films(id) ON DELETE CASCADE
);

-- Сущность оценки для получения средней оценки, количества оценок и места в рейтинге
CREATE TABLE rates (
    film_id INTEGER REFERENCES films(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rate SMALLINT,
    PRIMARY KEY (film_id, user_id)
);

/* Сущность премьеры, через нее можно получить количество зрителей по странам, 
даты премьер в России и мире, а также год производства фильма */
CREATE TABLE releases (
    id SERIAL PRIMARY KEY,
    film_id INTEGER REFERENCES films(id) ON DELETE CASCADE,
    country_id INTEGER REFERENCES countries(id) ON DELETE CASCADE,
    release_date DATE NOT NULL,
    viewers INTEGER,
    distributor VARCHAR(80) 
);

CREATE TABLE actors (
    film_id INTEGER REFERENCES films(id) ON DELETE CASCADE,
    person_id INTEGER REFERENCES persons(id) ON DELETE CASCADE,
    PRIMARY KEY (film_id, person_id)
);

CREATE TABLE dubbing_actors (
    film_id INTEGER REFERENCES films(id) ON DELETE CASCADE,
    person_id INTEGER REFERENCES persons(id) ON DELETE CASCADE,
    PRIMARY KEY (film_id, person_id)
);

CREATE TABLE film_genre (
    film_id INTEGER REFERENCES films(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (film_id, genre_id)
);

-- Раздел "Знаете ли вы, что…"
CREATE TABLE  facts (
    id SERIAL PRIMARY KEY,
    film_id INTEGER REFERENCES films(id) ON DELETE CASCADE,
    content TEXT NOT NULL
);

-- Ошибки в фильме
CREATE TABLE  bloopers (
    id SERIAL PRIMARY KEY,
    film_id INTEGER REFERENCES films(id) ON DELETE CASCADE,
    content TEXT NOT NULL
);

-- Рецензии
CREATE TABLE  reviews (
    id SERIAL PRIMARY KEY,
    film_id INTEGER REFERENCES films(id) ON DELETE CASCADE,
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    create_timestamp DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_positive BOOLEAN NOT NULL,
    content TEXT NOT NULL,
);
