const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

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

router.post("/post", async (req, res, next) => {
  try {
    const user = await prisma.twitter_user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      res.status(400);
      throw new Error("This email is already registered!");
    }
    await prisma.twitter_user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        DOB: req.body.DOB,
      },
    });
    res.send("Account create sucessfully...");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
