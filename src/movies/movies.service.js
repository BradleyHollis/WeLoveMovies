const knex = require('../db/connection');
const mapProperties = require("../utils/map-properties");
const reduceProperties = require('../utils/reduce-properties');

function list(){
    return knex("movies").select("*");
}

function listOnlyShowing(){
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({ is_showing : true })
        .groupBy("m.movie_id")
        .orderBy("m.movie_id")
}   

function read(movie_id){
    return knex("movies").select("*").where({ movie_id }).first();
}

function listTheatersByMovieId(movie_id){
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("*")
        .where({ "mt.movie_id": movie_id })
}

function listReviewsByMovieId(movie_id){
    
    const addCritic = mapProperties({
        critic_id: "critic.critic_id",
        preferred_name: "critic.preferred_name",
        surname: "critic.surname",
        organization_name: "critic.organization_name"
    });

    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*")
        .where({ movie_id: movie_id })
        .then(reviews => reviews.map(review => addCritic(review)));
}

module.exports = {
    list,
    read,
    listOnlyShowing,
    listTheatersByMovieId,
    listReviewsByMovieId,
}