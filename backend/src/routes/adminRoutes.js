const express = require("express");

const router = express.Router();

const { getData, petAdoptionList } = require("../Controller/adminController");

router.get("/getData", getData);

router.get("/adoptionRequest", petAdoptionList);

module.exports = router;
