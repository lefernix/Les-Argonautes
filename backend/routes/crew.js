const router = require("express").Router();
const { Router } = require("express");
let Crew = require("../models/crew.model");

// READ
router.route("/").get((req, res) => {
  Crew.find()
    .then((members) => res.json(members))
    .catch((err) => res.status(400).json("Error: " + err));
});

// CREATE
router.route("/add").post((req, res) => {
  const member = req.body.member;

  const newMember = new Crew({ member });

  newMember
    .save()
    .then(() => res.json("Member added !"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// UPDATE

// DELETE
router.route("/:id").delete((req, res) => {
  Crew.findByIdAndDelete(req.params.id)
    .then(() => res.json("Membre supprimé !"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
