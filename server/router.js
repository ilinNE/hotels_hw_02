const [
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
 ] = require("./handlers.js");

class Router {
    constructor() {
        this.endpoints = {}
    }

    getPath(url) {
        const path = Object.keys(this.endpoints).find(path => {
            let match = url.match(path);
            if (!match) {
                return false;
            }
            return true; 
        })

        return this.endpoints[path];
    }

    _addPath(method, path, handler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {}
        };
        const endpoint = this.endpoints[path]; 
        if (!endpoint[method]) {
            endpoint[method] = handler;
        }
    }
    get(path, handler) {
        this._addPath("GET", path, handler)
    }
    post(path, handler) {
        this._addPath("POST", path, handler)
    }
    put(path, handler) {
        this._addPath("PUT", path, handler)
    }
    delete(path, handler) {
        this._addPath("DELETE", path, handler)
    }
};

router = new Router();

router.get('^/films/?$', getFilmsHandler);
router.get('^/films/\\d+/?$', getFilmHandler);
router.get('^/genres/?$', getGenresHandler); 
router.get('^/genres/\\d+/?$', getGenreHandler);
router.post('^/films/?$', createFilmHandler); 
router.post('^/genres/?$', createGeneHandler); 
router.put('^/films/\\d+/?$', updateFilmHandler);
router.put('^/genres/\\d+/?$', updateGenreHandler);
router.delete('^/films/\\d+/?$', deleteFilmHandler);
router.delete('^/genres/\\d+/?$', deleteGenreHandler);

module.exports = router;
