const moviesService = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function movieExists(req, res, next){
    const movie = await moviesService.read(req.params.movieId);
    if(movie){
        res.locals.movie = movie; 
        return next();
    }
    next({ status: 404, message: `Movie cannot be found.` });
}

async function list(req, res){
  const data = await moviesService.list();
  res.json({ data });
}

async function read(req, res){
    const { movie: data } = res.locals; 
    res.json({ data })
}

module.exports = {
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    list: [asyncErrorBoundary(list)],
}