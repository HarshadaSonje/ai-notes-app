const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const noteController = require("../controllers/noteController");

router.post("/", auth, noteController.createNote);

router.get("/", auth, noteController.getNotes);

router.patch(
  "/:id/archive",
  auth,
  noteController.archiveNote
);


router.patch("/:id", auth, noteController.updateNote);

router.delete(
  "/:id",
  auth,
  noteController.deleteNote
);

// AI Route
router.post("/:id/ai", auth, noteController.generateAI);

router.post("/:id/share", auth, noteController.shareNote);

router.get("/shared/:id", noteController.getSharedNote);

router.get("/dashboard/stats", auth, noteController.dashboard);


module.exports = router;