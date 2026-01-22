import mongoose from "mongoose";

// 🔗 URL Schema
// One document = one shortened URL
const urlSchema = new mongoose.Schema(
  {
    // 🎯 Short unique ID used in the URL
    // Example: short.ly/aB9xK2
    shortId: {
      type: String,
      required: true,
      unique: true, // 🚨 prevents duplicate short links
    },

    // 🌍 Original long URL
    // This is where user will be redirected
    redirectUrl: {
      type: String,
      required: true,
    },

    // 📊 Visit history
    // Each click adds a timestamp entry
    visitHistory: [
      {
        timestamp: Number, // 🕒 Date.now()
      },
    ],
  },
  {
    // ⏱️ Automatically adds:
    // createdAt → when URL was created
    // updatedAt → last update time
    timestamps: true,
  }
);

// 🧠 Create MongoDB model
// Collection name will be: urls
export const urlModel = mongoose.model("url", urlSchema);
