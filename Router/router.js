const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const joi = require("joi");

const schema = joi.object({
  name: joi.string().min(5).required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(8),
  phone: joi.number().required(),
  DOB: joi.date(),
});

router.get("/tweetsdata", async (req, res, next) => {
  try {
    const tweets = fs.createReadStream("./Data/tweets.json");
    tweets.on("data", (chunk) => {
      tweets.pipe(res.send(chunk));
    });
  } catch (error) {
    next(error);
  }
});
router.get("/userData", async (req, res, next) => {
  try {
    const userTweets = fs.createReadStream("./Data/users.json");
    userTweets.on("data", (chunk) => {
      userTweets.pipe(res.send(chunk));
    });
  } catch (error) {
    next(error);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const user = await prisma.twitter_user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(400);
      throw new Error("Sorry, You dont't have any account!");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    const result = await prisma.twitter_user.findUnique({
      where: {
        email: value.email,
      },
    });
    if (result) {
      res.status(400);
      throw new Error("This email is already registered!");
    }
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    await prisma.twitter_user.create({
      data: value,
    });
    res.send("register successfully...");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
