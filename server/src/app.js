const express = require("express");
const cors = require("cors");
const app = express();
const validId = require("./utils/validId");
const RestaurantModel = require("./models/RestaurantModel");
const formatRestaurant = require("./formatRestaurant");
const { celebrate, Joi, errors, Segments } = require("celebrate");

const ReservationModel = require("./models/ReservationModel");
const formatReservation = require("./formatReservation");
const { auth } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
  audience: 'unique identifier',
  issuerBaseURL: 'https://dev-4xodr7e0fq238q7z.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});
app.use(cors(
  {
    origin : ["https://dine-easy-backend.vercel.app/"],
    methods:["POST","GET"],
    credentials: true
  }
));
app.use(express.json());

app.get("/restaurants", async (request, response) => {
  const restaurants = await RestaurantModel.find({});
  return response.status(200).send(restaurants.map(formatRestaurant));
});

app.get("/restaurants/:id", async (request, response) => {
  const { id } = request.params;
  const isIdValid = validId(id);
  if (isIdValid) {
    const restaurant = await RestaurantModel.findById(id);
    if (restaurant) {
      return response.status(200).send(formatRestaurant(restaurant));
    } else {
      return response.status(404).send({
        error: "restaurant not found",
      });
    }
  } else {
    return response.status(400).send({ error: "invalid id provided" });
  }
});

app.get("/reservations", checkJwt, async (request, response) => {
  const { auth } = request;

  const reservations = await ReservationModel.find({
    userId: auth.payload.sub,
  });
  const formattedReservations = reservations.map(formatReservation);
  response.send(formattedReservations).status(200);
});

app.get("/reservations/:id", checkJwt, async (request, response) => {
  const { id } = request.params;
  const { auth } = request;
  const userId = auth.payload.sub;

  const isIdValid = validId(id);

  if (isIdValid) {
    const reservation = await ReservationModel.findById(id);

    if (reservation) {
      if (reservation.userId === userId) {
        return response.send(formatReservation(reservation));
      } else {
        return response.status(403).send({
          error: "user does not have permission to access this reservation",
        });
      }
    } else {
      return response.status(404).send({
        error: "not found",
      });
    }
  } else {
    return response.status(400).send({ error: "invalid id provided" });
  }
});
/* Changed date */
app.post(
  "/reservations",
  checkJwt,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      date: Joi.date().greater("now").required(),
      partySize: Joi.number().min(1).required(),
      restaurantName: Joi.string().required(),
    }),
  }),
  async (request, response, next) => {
    try {
      const { body, auth } = request;
      const reservationBody = {
        userId: auth.payload.sub,
        ...body,
      };

      const reservation = new ReservationModel(reservationBody);
      await reservation.save();
      return response.status(201).send(formatReservation(reservation));
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

app.delete("/deleteBooking/:id",async(req,res)=>{
  const {id} = req.params;
  try {
    await ReservationModel.deleteOne(
      {_id: id}
    )
    console.log(id);
  } catch (error) {
    console.log(error); 
  }
});

app.use(errors());
module.exports = app;
