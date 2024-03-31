import express from "express";
import User from "../models/user.js";
import { body, validationResult } from "express-validator";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from "../middlewares/fetchuser.js";

const j_secret = "ameenb$";

const router = express.Router();

// Create User using :post/auth/createuser. no login required
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors return bad response and errors
    //  validating the name , email,password section using express-validator
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    let success = false;
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "sorry this email already exits" });
      }
      //   creating salt for password and hashing using bcyrptjs;

      const slat = await bycrypt.genSalt(10);
      const pswd = await bycrypt.hash(req.body.password, slat);

      //   creating user using mongoose
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: pswd,
      });

      //   creating jwt token
      const d = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(d, j_secret);
      success = true;
      res.json({ success, authtoken });
      //catching errors
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }

    // check wheather user exists already
  }
);

// authenticate the user using post/auth/login
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannotbe blank").isLength({ min: 1 }),
  ],
  async (req, res) => {
    // validating the email and password
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    // const {enteredemail,enteredpassword} = req.body;
    // string enteredemail = req.body.email;
    // String enteredpassword = req.body.password;

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({success, error: "please Login with correct credentials 1" });
      }
      // comparing user entered password with password in database

      const comparingpass = await bycrypt.compare(
        req.body.password,
        user.password
      );
      if (!comparingpass) {
        return res
          .status(400)
          .json({ success, error: "please Login with correct credentials 2" });
      }
      const d = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(d, j_secret);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error);
      res.status(500).send("internal server error");
    }
  }
);

// route 3 get user detials "/api/auth/getuser".
// fetchuser is a middleware through which we are accesing user data by passing auth-token to the middleware
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user1 = await User.findById(userid).select("-password");
    res.send(user1);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error");
  }
});

export default router;
export { j_secret };
