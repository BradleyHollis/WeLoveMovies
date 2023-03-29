const service = require('./reviews.service');
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next){
    const foundReview = await service.read(Number(req.params.reviewId));

    if (foundReview) {
      res.locals.review = foundReview;
      return next();
    }
  
    return next({
      status: 404,
      message: `Review cannot be found for id: ${req.params.reviewId}`,
    });
}

async function list(req, res){
    res.json({ data: await service.list() });
}

async function read(req, res){
    res.json({ data: res.locals.review })
}

async function update(req, res, next){
    const toUpdate = {
        ...res.locals.review,
        ...req.body.data
    };

    await service.update(toUpdate);
    const updatedReview = await service.read(toUpdate.review_id);
    updatedReview.critic = await service.getCriticById(toUpdate.critic_id);
    res.json({ data: updatedReview })
}

async function destroy(req, res){
    const { review } = res.locals; 
    await service.delete(Number(review.review_id));
    res.sendStatus(204);
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}