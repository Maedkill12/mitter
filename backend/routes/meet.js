const express = require("express");
const {
  createMeet,
  getMeets,
  getMeet,
  updateMeet,
  deleteMeet,
} = require("../controllers/meet");
const router = express.Router();

router.route("/").post(createMeet).get(getMeets);
router.route("/:id").get(getMeet).patch(updateMeet).delete(deleteMeet);

module.exports = router;
