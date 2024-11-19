const express = require("express");
const { getProfile } = require("../Controller/userController");

const router = express.Router();

router.get("/profile", getProfile);
router.get("/", getProfile);

module.exports = router;
