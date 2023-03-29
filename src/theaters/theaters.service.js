const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

function list(){
    const reduceMovies = reduceProperties("theater_id", {
        title: ["movies", null, "title"],
        runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
        rating: ["movies", null, "rating"],
    });
    
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select("*")
        .then((data) => {
            return reduceMovies(data)
        })
}

module.exports = {
    list,
}