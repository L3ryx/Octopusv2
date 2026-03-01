const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers frontend
app.use(express.static(path.join(__dirname, "public")));

// Page principale
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API Generate
app.post("/generate", (req, res) => {

  const data = req.body;

  const lockedRules = `
Resolution 800x1000px.
Cinematic lighting.
Always centered.
Output in English.
`;

  const prompt = `
Age: ${data.age}
Genre: ${data.genre}
Top: ${data.haut}
Bottom: ${data.bas}
Background: ${data.fond}
Angle: ${data.angle}

${lockedRules}
`;

  res.json({ prompt });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
