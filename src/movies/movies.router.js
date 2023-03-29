const router = require('express').Router();
const controller = require('./movies.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route("/:movieId/reviews").get(controller.listReviewsByMovieId)
router.route("/:movieId/theaters").get(controller.listTheatersByMovieId).all(methodNotAllowed)
router.route('/').get(controller.list).all(methodNotAllowed);
router.route('/:movieId([0-9]+)').get(controller.read).all(methodNotAllowed);

module.exports = router;