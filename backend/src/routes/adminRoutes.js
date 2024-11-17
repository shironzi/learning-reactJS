const express = require("express");

const router = express.Router();

const { getData } = require("../Controller/adminController");

router.get("/getData", getData);

router.get("/adoptionRequest");

module.exports = router;
