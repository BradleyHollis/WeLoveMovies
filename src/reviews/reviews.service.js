const knex = require('../db/connection');
const mapProperties = require("../utils/map-properties");

function list(){
    return knex("reviews").select("*");
}

function read(review_id){
    return knex("reviews").select("*").where({ review_id }).first();
}

function getCriticById(critic_id){
    return knex("critics").select("*").where({ critic_id }).first();
}

function update(updatedReview){
    return knex("reviews")
        .select("*")
        .where({ review_id : updatedReview.review_id })
        .update(updatedReview, "*")
        .then((data) => data[0]);
}

function destroy(review_id){
    return knex("reviews").where({ review_id }).del();
}

module.exports = {
    list,
    read,
    update,
    delete: destroy,
    getCriticById,
}
    