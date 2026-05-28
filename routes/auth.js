const express =
  require("express");

const router =
  express.Router();

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");


const User = require("../models/User.js");


// REGISTER

router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        fullname,
        email,
        password
      } = req.body;

      // CHECK EXISTING USER

      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {

        return res.json({
          message:
            "Email already registered."
        });

      }

      // HASH PASSWORD

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // CREATE USER

      const user =
        new User({

          fullname,
          email,

          password:
            hashedPassword

        });

      await user.save();

      res.json({

        message:
          "Registration successful!"

      });

    } catch (error) {

      console.log(error);

      res.json({
        message:
          "Registration failed."
      });

    }

  }
);



// LOGIN

router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      const user =
        await User.findOne({
          email
        });

      if (!user) {

        return res.json({
          message:
            "User not found."
        });

      }

      const validPassword =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!validPassword) {

        return res.json({
          message:
            "Invalid password."
        });

      }

      const token =
        jwt.sign(

          {
            id: user._id
          },

          "SECRETKEY"

        );

      res.json({

        message:
          "Login successful!",

        token,

        credits:
          user.credits,

          isPaid:
  user.isPaid

      });

    } catch (error) {

      console.log(error);

      res.json({
        message:
          "Login failed."
      });

    }

  }
);

// GET ALL USERS

router.get(
  "/users",
  async (req, res) => {

    try {

      const users =
        await User.find();

      res.json(users);

    } catch (error) {

      console.log(error);

      res.json({
        message:
          "Failed to load users."
      });

    }

  }
);

// ADD CREDITS

router.put(
  "/add-credits/:id",
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      user.credits += 50;

      await user.save();

      res.json({

        message:
          "Credits added successfully"

      });

    } catch (error) {

      console.log(error);

      res.json({

        message:
          "Failed to add credits"

      });

    }

  }
);

module.exports =
  router;