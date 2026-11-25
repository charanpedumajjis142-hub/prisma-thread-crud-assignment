const express = require("express");
const router = express.Router();
const prisma = require("../prisma/client");

// GET all threads
router.get("/", async (req, res, next) => {
  try {
    const threads = await prisma.thread.findMany();
    res.json(threads);
  } catch (error) {
    next(error);
  }
});

// POST create a new thread
router.post("/", async (req, res, next) => {
  try {
    const thread = await prisma.thread.create({
      data: {
        title: req.body.title,
        body: req.body.body,
      },
    });

    res.status(201).json(thread);
  } catch (error) {
    next(error);
  }
});

// PUT update an existing thread
router.put("/:id", async (req, res, next) => {
  try {
    const thread = await prisma.thread.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        title: req.body.title,
        body: req.body.body,
      },
    });

    res.json(thread);
  } catch (error) {
    next(error);
  }
});

// DELETE a thread
router.delete("/:id", async (req, res, next) => {
  try {
    const thread = await prisma.thread.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json(thread);
  } catch (error) {
    next(error);
  }
});

module.exports = router;