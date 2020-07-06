const router = require("express").Router();
const { Element, User } = require("../models");
const passport = require("passport");
const jwt = require('jsonwebtoken');

router.get("/elements", passport.authenticate("jwt"), (req, res) => {
  Element.find()
    .populate("user")
    .then((elements) => res.json(elements))
    .catch((err) => console.error(err));
});

router.post("/elements", passport.authenticate("jwt"), (req, res) => {
  Element.create({
    type: req.body.type,
    attributes: req.body.attributes,
    user: req.user._id
  })
    .then((element) => {
      User.findByIdAndUpdate(req.user._id, { $push: { elements: element._id } })
        .then(() =>
          res.json({
            text: req.body.text,
            user: req.user,
          })
        )
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

router.put('/elements/:id', passport.authenticate("jwt"), (req, res) => {
  Element.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err))
})

router.delete("/elements/:id", passport.authenticate("jwt"), (req, res) => {
  Element.delete({ id: req.body.id }, (err) => console.error(err));
});

module.exports = router
