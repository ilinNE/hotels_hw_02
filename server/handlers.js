const [db, pgp] = require('./db');


async function sendOK(response, result) {
    response.writeHeader(200, {'Content-Type': "application/json"});
    response.end(result)
}

async function createFilmHandler(req, res) {
    const {name, year, genres} = req.body;
    const newFilm = await db.one(
        `INSERT INTO films(name, year) VALUES ($1, $2) RETURNING *`, [name, year]
    );
    newFilm.genres = await db.any(`SELECT id, name FROM genres WHERE id in ($1:csv)`,[genres] )
    const cs = new pgp.helpers.ColumnSet(['film_id', 'genre_id'], {table: 'film_genre'});
    const values = genres.map(item => {return {"film_id": newFilm.id, "genre_id": item}})
    const query = pgp.helpers.insert(values, cs);
    await db.none(query);
    await sendOK(res, JSON.stringify(newFilm));
};

async function createGeneHandler(req, res) {
    const {name} = req.body;
    const newGenre = await db.one(`INSERT INTO genres(name) VALUES ($1) RETURNING *`, [name]);
    await sendOK(res, JSON.stringify(newGenre));
};

async function getFilmsHandler(req, res) {
    await db.any('SELECT * FROM films')
    .then( async (films) => {return Promise.all(films.map(async (film) => {
        let genres = await db.any(
            `SELECT genre_id AS id, name
            FROM film_genre
            JOIN genres ON film_genre.genre_id = genres.id
            WHERE film_id = $1`, [film.id]
        )
        film.genres = genres
        return film
    }))})
    .then((films) => sendOK(res, JSON.stringify(films)));
};

async function getFilmHandler(req, res) {
    const id = req.url.match(/\d+/)[0];
    const film = await db.one(`SELECT * FROM films WHERE id = $1`, [id]);
    const genres = await db.any(
        `SELECT genre_id AS id, name
         FROM film_genre
         JOIN genres ON film_genre.genre_id = genres.id
         WHERE film_id = $1`, [id]
    )
    film.genres = genres
    await sendOK(res, JSON.stringify(film));
};

async function getGenresHandler(req, res) {
    const genres = await db.query('SELECT * FROM genres');
    await sendOK(res, JSON.stringify(genres));
};

async function getGenreHandler(req, res) {
    const id = req.url.match(/\d+/)[0];
    const genre = await db.one(`SELECT * FROM genres WHERE id = $1`, [id]);
    await sendOK(res, JSON.stringify(genre));
};

async function deleteFilmHandler(req, res) {
    const id = req.url.match(/\d+/)[0];
    await db.none(`DELETE FROM films WHERE id = $1`, [id]);
    await sendOK(res, null);
};

async function deleteGenreHandler(req, res) {
    const id = req.url.match(/\d+/)[0];
    await db.none(`DELETE FROM genres WHERE id = $1`, [id]);
    await sendOK(res, null);
};

async function updateGenreHandler(req, res) {
    const id = req.url.match(/\d+/)[0];
    const {name} = req.body;
    const updatedGenre = await db.one(
        `UPDATE genres SET name = $1 WHERE id = $2 RETURNING *`, [name, id]
    );
    await sendOK(res, JSON.stringify(updatedGenre));
};

async function updateFilmHandler(req, res) {
    const id = req.url.match(/\d+/)[0];
    const {name, year, genres} = req.body;
    const updatedFilm = await db.one(
        `UPDATE films SET name = $1, year =  $2 WHERE id = $3 RETURNING *`, [name, year, id]
    );
    updatedFilm.genres = await db.any(`SELECT id, name FROM genres WHERE id in ($1:csv)`,[genres] )
    db.none(`DELETE FROM filmgenre WHERE filmid = $1`, [id])
    const cs = new pgp.helpers.ColumnSet(['film_id', 'genre_id'], {table: 'film_genre'});
    const values = genres.map(item => {return {"film_id": updatedFilm.id, "genre_id": item}})
    const query = pgp.helpers.insert(values, cs);
    await db.none(query);
    await sendOK(res, JSON.stringify(updatedFilm));
};

module.exports = [
    createFilmHandler,
    createGeneHandler,
    getFilmHandler,
    getFilmsHandler,
    getGenreHandler,
    getGenresHandler,
    updateFilmHandler,
    updateGenreHandler,
    deleteFilmHandler,
    deleteGenreHandler    
]