const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Eiffel Tower",
    description: "The Eiffel Tower !!!",
    location: {
      lat: 48.85784,
      lng: 2.29423,
    },
    address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris",
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  res.json({ place: place });
});

module.exports = router;
