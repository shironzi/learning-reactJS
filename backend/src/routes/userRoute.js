const express = require("express");
const { getProfile } = require("../Controller/userController");

const router = express.Router();

router.get("/profile", getProfile);

module.exports = router;
