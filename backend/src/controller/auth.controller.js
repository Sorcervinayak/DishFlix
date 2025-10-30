const userModel = require("../models/user.modle"); // ✅ fix file name
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodPartner.modle")

async function registerUser(req, res) {
  try {
    const { fullname, email, password } = req.body;

    // Check for existing user
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10); // ✅ await added

    // Create new user
    const user = await userModel.create({
      fullname,
      email,
      password: hashPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "fallback_secret_key", // ✅ use env variable
      { expiresIn: "7d" } // optional expiration
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Send success response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "fallback_secret_key",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function logoutUser(req,res) {
  res.clearCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  path: "/", // Include if you set it during login
});
res.status(200).json({ message: "User logged out successfully" });
}

async function registerFoodPartner(req, res) {
  try {
    const { name, email, password, phone, address, contactName } = req.body;
    const accountExists = await foodPartnerModel.findOne({ email });
    if (accountExists) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const foodPartner = await foodPartnerModel.create({ name, email, password: hashPassword,phone,address,contactName });

    const token = jwt.sign(
      { id: foodPartner._id },
      process.env.JWT_SECRET || "fallback_secret_key",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      message: "Food partner registered successfully",
      foodPartner: {
        _id: foodPartner._id,
        email: foodPartner.email,
        name: foodPartner.name,
        phone: foodPartner.phone,
        address: foodPartner.address,
        contactName: foodPartner.contactName
      }
    });
  } catch (error) {
    console.error("Error in registerFoodPartner:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginFoddPartner(req, res) {
  try {
    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({ email });
    if (!foodPartner) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: foodPartner._id },
      process.env.JWT_SECRET || "fallback_secret_key",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      foodPartner: {
        _id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Logout Food Partner
async function logoutFoodPartner(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res.status(200).json({
      message: "Food partner logged out successfully"
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      message: "Something went wrong during logout"
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoddPartner,
  logoutFoodPartner
};
