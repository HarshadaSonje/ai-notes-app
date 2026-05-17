const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const Note = require("../models/Note");

const { v4: uuidv4 } =
  require("uuid");


// CREATE NOTE
exports.createNote =
  async (req, res) => {

  try {

    const note =
      await Note.create({

      userId: req.user.id,

      title: req.body.title,

      content: req.body.content,

      tags: req.body.tags

    });

    res.json(note);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};


// GET NOTES
exports.getNotes =
  async (req, res) => {

  try {

    const notes =
      await Note.find({

      userId: req.user.id,

      isArchived: false

    }).sort({
      updatedAt: -1
    });

    res.json(notes);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};


// UPDATE NOTE
exports.updateNote =
  async (req, res) => {

  try {

    const note =
      await Note.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        returnDocument: "after"
      }

    );

    res.json(note);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};


// DELETE NOTE
exports.deleteNote =
  async (req, res) => {

  try {

    await Note.findByIdAndDelete(
      req.params.id
    );

    res.json({
      msg: "Note deleted"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};


// ARCHIVE NOTE
exports.archiveNote =
  async (req, res) => {

  try {

    const note =
      await Note.findByIdAndUpdate(

      req.params.id,

      {
        isArchived: true
      },

      {
        returnDocument: "after"
      }

    );

    res.json(note);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};


// AI SUMMARY
exports.generateAI =
  async (req, res) => {

  try {

    const note =
      await Note.findById(
        req.params.id
      );

      note.aiUsed += 1;

await note.save();

    const completion =
      await groq.chat.completions.create({

      messages: [

        {
          role: "user",

          content: `
          Summarize this note.

          Also provide:
          1. Short Summary
          2. Action Items
          3. Suggested Title

          Note:
          ${note.content}
          `
        }

      ],

      model:
        "llama-3.1-8b-instant"

    });

    res.json({

      result:
        completion.choices[0]
        .message.content

    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};


// SHARE NOTE
exports.shareNote =
  async (req, res) => {

  try {

    const note =
      await Note.findById(
        req.params.id
      );

    note.isPublic = true;

    note.shareId = uuidv4();

    await note.save();

    res.json({
      shareId: note.shareId
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};


// GET SHARED NOTE
exports.getSharedNote =
  async (req, res) => {

  try {

    const note =
      await Note.findOne({

      shareId:
        req.params.id

    });

    res.json(note);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};


// DASHBOARD
exports.dashboard =
  async (req, res) => {

  try {

    const notes =
      await Note.find({

      userId:
        req.user.id,

      isArchived: false

    });

    // Total Notes
    const totalNotes =
      notes.length;

    // Recently Edited
    const recentNotes =
      notes
        .sort(
          (a, b) =>

          new Date(
            b.updatedAt
          ) -

          new Date(
            a.updatedAt
          )
        )
        .slice(0, 5);

    // Tags
    const tags =
      notes.flatMap(
        note => note.tags
      );

    const tagCount = {};

    tags.forEach(tag => {

      tagCount[tag] =
        (tagCount[tag] || 0) + 1;

    });

    // AI Usage
    const aiUsage =
      notes.reduce(

      (total, note) =>

        total + note.aiUsed,

      0
    );

    // Weekly Activity
    const oneWeekAgo =
      new Date();

    oneWeekAgo.setDate(
      oneWeekAgo.getDate() - 7
    );

    const weeklyNotes =
      notes.filter(note =>

      new Date(
        note.updatedAt
      ) > oneWeekAgo

    ).length;

    res.json({

      totalNotes,

      recentNotes,

      topTags: tagCount,

      aiUsage,

      weeklyNotes

    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};