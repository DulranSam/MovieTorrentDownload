const express = require("express");
const router = express.Router();
const ganiduController = require("../controllers/ganiduController");
const defaultModel = require("../model/defaultModel");

router.route("/").get(ganiduController.getJSON);

router.route("/achira").get(ganiduController.getFromApi);

router.route("/sub").get(async (req, res) => {
  try {
    const data = await defaultModel.find();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
