const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

/* =====================================================
   🔑 TOKEN
===================================================== */

const HF_TOKEN = process.env.Banana;

const HF_API = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

/* =====================================================
   🚀 GENERATION ROUTE
===================================================== */

app.post("/generate", async (req, res) => {

const { genre, age, haut, bas, fond, angle } = req.body;

const basePrompt = `
Create a professional image prompt.

Gender: ${genre}
Age: ${age}
Top: ${haut}
Bottom: ${bas}
Background: ${fond}
Angle: ${angle}

MANDATORY RULE:
The model MUST wear the sunglasses from the attached image.
They must be positioned correctly on the face.
They cannot be removed.

Quality:
Ultra realistic
Cinematic lighting
Ultra detailed
Professional photography
`;

try {

/* ✅ FETCH NATIF (NODE 18/20/22) */

const response = await fetch(HF_API, {
method: "POST",
headers: {
Authorization: `Bearer ${HF_TOKEN}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
inputs: basePrompt,
parameters: {
max_new_tokens: 600,
temperature: 1.7,
top_p: 0.99,
repetition_penalty: 1.4,
do_sample: true
}
})
});

const data = await response.json();

let generated = data[0]?.generated_text || basePrompt;

res.json({ prompt: generated });

} catch (err) {

console.error("❌ ERROR:", err);

res.json({ prompt: "ERROR GENERATING PROMPT" });

}

});

/* =====================================================
   🚀 START SERVER
===================================================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("🚀 Server running on port", PORT);
});
