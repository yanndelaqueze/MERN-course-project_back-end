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

  if (!place) {
    return res
      .status(404)
      .json({ message: "Couldn't find a place for the provided id" });
  }

  res.json({ place: place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    return res
      .status(404)
      .json({ message: "Couldn't find a place for the provided user id" });
  }

  res.json({ place: place });
});

module.exports = router;
