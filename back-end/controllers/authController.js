const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = (req, res) => {
  try {
    const { email, password } = req.body;

    const user = {
      name: "Admin",
      email: "admin@example.com",
      password: "password123",
      role: "Administrator",
    };

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    if (email === user.email && password === user.password) {

      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
      });
    }

    return res.status(401).json({
      message: "Invalid credentials",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const logout = (req, res) => {
  try {
    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};

module.exports = { login, logout };