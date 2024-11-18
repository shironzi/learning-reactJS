const express = require("express");

const router = express.Router();

const {
  getData,
  petAdoptionList,
  updateAdoptionRequest,
} = require("../Controller/adminController");

router.get("/getData", getData);

router.get("/adoptionRequest", petAdoptionList);

router.post("/updateAdoptionRequest", updateAdoptionRequest);

module.exports = router;
