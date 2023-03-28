const knex = require('../db/connection');

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

module.exports = {
    list,
    read,
    listOnlyShowing
}