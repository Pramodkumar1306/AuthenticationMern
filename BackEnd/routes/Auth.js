 

import express from 'express';
// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../module/User.js'; // Make sure to include .js extension in ESM
import bcrypt from 'bcrypt';
import auth from '../middleWare/authMiddleware.js'

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET ||"your_super_secret_very_long_1234567890_string";

router.get('/gett',(req,res) => {
  console.log("gettinbg the data");
  res.send("done")
})

router.get("/dashboard", auth, (req, res) => {
  res.json({ msg: "Welcome to dashboard!" });
});


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received:", name, email, password);
  console.log("JWT_SECRET:", JWT_SECRET);

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log("❌ User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ name, email, password });
    await user.save();
    console.log("✅ User saved:", user);

    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("✅ Token generated:", token);

    const responseData = {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };

    console.log("✅ About to send response:", responseData);
    return res.status(200).json(responseData);
  } catch (err) {
    console.error("❌ Register Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});




// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default router; // ✅ ES Module export
