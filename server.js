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
/* ===============================
   MOTEUR DE VARIATION AVANCÉ
================================*/

function randomFrom(array){
  return array[Math.floor(Math.random()*array.length)];
}

const postures = [
  "standing confidently",
  "walking dynamically",
  "sitting casually",
  "heroic power pose",
  "mid action movement",
  "looking over the shoulder",
  "crossed arms dominant stance",
  "relaxed cinematic posture"
];

const cameraDistances = [
  "full body shot",
  "medium shot",
  "close portrait",
  "wide cinematic frame",
  "dramatic close-up",
  "low angle hero shot",
  "ultra wide perspective"
];

const lightingStyles = [
  "dramatic cinematic lighting",
  "soft studio lighting",
  "golden hour sunlight",
  "neon cyberpunk glow",
  "high contrast shadows",
  "volumetric lighting",
  "rim light glow effect"
];

const artisticStyles = [
  "hyper realistic",
  "ultra detailed",
  "8K resolution",
  "professional photography",
  "sharp focus",
  "depth of field",
  "cinematic composition"
];

function lockedQuality(){
  return `
  ultra high resolution,
  perfect anatomy,
  professional color grading,
  detailed textures,
  high dynamic range,
  realistic shadows,
  sharp focus,
  masterpiece quality
  `;
}
