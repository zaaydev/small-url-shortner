// 🚀 Import core packages
import express from "express";
import path from "path";

// 🧠 Database & utilities
import { urlModel } from "./model/url.js";
import { ConnectMongoDB } from "./lib/mongodb.js";
import { nanoid } from "nanoid";

// 🌱 Create express app
const app = express();

// 🔌 Connect to MongoDB
// (This runs once when server starts)
ConnectMongoDB();

// 📦 Middlewares to read request body
// - JSON (for APIs)
// - URL encoded (for HTML forms)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🎨 View engine setup (EJS)
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

/* =========================
   🏠 HOME PAGE
   ========================= */
// Shows:
// - URL input form
// - List of all shortened URLs
app.get("/", async (req, res) => {
  // 📥 Fetch all URLs from database
  const urls = await urlModel.find();

  // 🖼️ Render EJS page and pass data
  res.render("home", { urls });
});

/* =========================
   🔗 SHORT URL REDIRECT
   ========================= */
// When user opens: http://localhost:4000/abc123
// 1. Count the click
// 2. Redirect to original URL
app.get("/url/:id", async (req, res) => {
  const { id } = req.params;

  // 🧠 Find the URL by shortId
  // ➕ Also push a click timestamp
  const urlData = await urlModel.findOneAndUpdate(
    { shortId: id },
    {
      $push: {
        visitHistory: { timestamp: Date.now() }, // 👆 click tracked
      },
    },
    { new: true }, // return updated document
  );

  // 🔁 Redirect user to original long URL
  res.redirect(urlData.redirectUrl);
});

/* =========================
   ✨ CREATE SHORT URL
   ========================= */
// Triggered when form is submitted
app.post("/generateurl", async (req, res) => {
  const { userurl } = req.body;

  // 🎲 Generate random short ID
  const shortId = nanoid(8);

  // 💾 Save to database
  const newUrl = await urlModel.create({
    shortId,
    redirectUrl: userurl,
    visitHistory: [], // empty initially
  });

  console.log(newUrl); // 👀 just to see in console while learning

  // 🔄 Redirect back to home page
  res.redirect("/");
});

/* =========================
   🚦 START SERVER
   ========================= */
app.listen(4000, () => {
  console.log("🚀 Server started at http://localhost:4000");
});
