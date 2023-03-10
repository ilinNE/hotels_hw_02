const Router = require("./router");



router.get('^/films/?$', getFilmsHandler) 
router.get('^/films/\\d+/?$', getFilmHandler)
router.get('^/genres/?$', getGenresHandler) 
router.get('^/genres/\\d+/?$', getGenreHandler)
router.post('^/films/?$', createFilmHandler) 
router.post('^/genres/?$', createGeneHandler) 
router.put('^/films/\\d+/?$', updateFilmHandler)
router.put('^/genres/\\d+/?$', updateGenreHandler)
router.delete('^/films/\\d+/?$', deleteFilmHandler)
router.delete('^/genres/\\d+/?$', deleteGenreHandler)
