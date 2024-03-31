import express from "express";
import fetchuser from "../middlewares/fetchuser.js";
import Notes from "../models/Notesschema.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Route 1 fetch all the notes from : "./auth/notes/fetchallnotes"

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error occured");
  }
});

// Route 2 add a new note from : "./auth/notes/addanote"
router.post(
  "/addanote",
  fetchuser,
  [
    body("title", "title cannnot be empty").isLength({ min: 1 }),
    body(
      "description",
      "enter a valid description of atleast 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.send(400).json({ errors: error.array });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savednote = await note.save();

      res.json(savednote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// route 3 updating an existing note with put or patch or delete options
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }
  if (tag) {
    newnote.tag = tag;
  }

  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(400).send("note not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed to make changes");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
});

// route 4 deleting a note /api/notes/delete/:id
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // let note = await Notes.findById(req.params.id);
  // if(!note){return res.status(400).send()}

  try {
    // fint the id of the note
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(400).send("note not found");
    }
    // see if the user is authorized to do the deletion
    if (note == null || note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed to make changes");
    }
    //
    note = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).send("note succesfully deleted");
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
});
export default router;
