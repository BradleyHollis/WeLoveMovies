const moviesService = require('./movies.service');

async function movieExists(req, res, next){
    const movie = await moviesService.read(req.params.movieId);
    if(movie){
        res.locals.movie = movie;
        return next();
    }

    next({ status: 404, message: `Movie cannot be found.`});
}

async function list(req, res){
  res.json({ data: await moviesService.list() })
}

async function read(req, res){
    const { movie: data } = res.locals; 
    res.json({ data })
}

module.exports = {
    read: [ movieExists, read ],
    list,
}