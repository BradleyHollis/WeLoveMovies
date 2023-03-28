const router = require('express').Router();
const controller = require('./movies.controller');

router.route('/').get(controller.list);
router.route('/:movieId([0-9]+)').get(controller.read)

module.exports = router;