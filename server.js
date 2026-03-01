const express = require("express");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

/* =====================================================
   🔑 HUGGING FACE TOKEN
===================================================== */

const HF_TOKEN = process.env.Banana;
const HF_API = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

/* =====================================================
   🎲 RANDOM UTILS
===================================================== */

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/* Lire fichier JSON dynamique */
function getRandomFromFile(fileName) {
  const filePath = path.join(__dirname, "data", fileName + ".json");
  const data = JSON.parse(fs.readFileSync(filePath));
  return randomFrom(data);
}

/* Phrases bonus dynamiques */
function generateExtraSentence() {
  const phrases = [
    "Ultra cinematic lighting with perfect shadows.",
    "Professional photography level detail.",
    "High dynamic range rendering.",
    "Masterpiece visual composition.",
    "Ultra sharp focus with depth of field.",
    "Realistic texture and advanced shading.",
    "Award winning artistic style."
  ];

  return randomFrom(phrases);
}

/* =====================================================
   🎨 PARAMÈTRES VERROUILLÉS QUALITÉ
===================================================== */

const postures = [
  "standing confidently",
  "walking dynamically",
  "heroic power pose",
  "casual sitting",
  "dynamic movement",
  "looking over shoulder"
];

const cameraDistances = [
  "full body shot",
  "medium cinematic shot",
  "close portrait",
  "wide angle perspective",
  "dramatic low angle shot"
];

const lightingStyles = [
  "dramatic cinematic lighting",
  "soft studio lighting",
  "golden hour light",
  "neon glow lighting",
  "volumetric light",
  "high contrast shadow lighting"
];

const artisticStyles = [
  "hyper realistic",
  "ultra detailed",
  "8K resolution",
  "professional photography",
  "cinematic rendering"
];

function lockedQuality() {
  return `
ultra high resolution,
perfect anatomy,
sharp focus,
professional color grading,
depth of field,
realistic shadows,
masterpiece quality
`;
}

/* =====================================================
   🌍 PAGE PRINCIPALE
===================================================== */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* =====================================================
   🚀 GENERATION INTELLIGENTE
===================================================== */

app.post("/generate", async (req, res) => {

  const { genre, age, haut, bas, fond, angle } = req.body;

  /* RANDOM INTELLIGENT SI ACTIVÉ */
  let finalHaut = haut === "RANDOM" ? getRandomFromFile("hauts") : haut;
  let finalBas = bas === "RANDOM" ? getRandomFromFile("bas") : bas;
  let finalFond = fond === "RANDOM" ? getRandomFromFile("fonds") : fond;
  let finalAngle = angle === "RANDOM" ? getRandomFromFile("angles") : angle;

  let posture = randomFrom(postures);
  let camera = randomFrom(cameraDistances);
  let lighting = randomFrom(lightingStyles);
  let style = randomFrom(artisticStyles);
  let quality = lockedQuality();
  let extraSentence = generateExtraSentence();

  /* PROMPT ULTRA OPTIMISÉ */

  const basePrompt = `
Create a Nano Banana professional image prompt.

Subject:
Gender: ${genre}
Age: ${age}
Top: ${finalHaut}
Bottom: ${finalBas}

Environment:
Background: ${finalFond}
Camera Angle: ${finalAngle}

Advanced Visual Settings:
Posture: ${posture}
Camera Distance: ${camera}
Lighting: ${lighting}
Style: ${style}

Quality Rules:
${quality}

Extra Enhancement:
${extraSentence}

Always output optimized for AI image generation.
`;

  /* ===============================
     ENVOI VERS HUGGING FACE
  =============================== */

  try {

    const response = await fetch(HF_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: basePrompt,
        parameters: {
          max_new_tokens: 300,
          temperature: 1.2,
          top_p: 0.95,
          do_sample: true
        }
      })
    });

    const data = await response.json();

    res.json({
      prompt: data[0]?.generated_text || basePrompt
    });

  } catch (err) {

    res.json({
      prompt: "🔥 ERROR GENERATING PROMPT"
    });

  }

});

/* =====================================================
   🚀 LANCEMENT SERVEUR
===================================================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Banana V2 Server Running on Port", PORT);
});
