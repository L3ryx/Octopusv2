const express = require("express");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

/* =========================
   🔑 TOKEN
========================= */

const HF_TOKEN = process.env.Banana;
const HF_API = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

/* =========================
   🔥 UTILS
========================= */

function randomFrom(array){
return array[Math.floor(Math.random()*array.length)];
}

/* =========================
   🌟 ROUTE GENERATION
========================= */

app.post("/generate", async (req,res)=>{

const {genre,age,haut,bas,fond,angle}=req.body;

let basePrompt=`
Create a professional AI image prompt.

Subject:
Gender:${genre}
Age:${age}
Top:${haut}
Bottom:${bas}

Environment:
Background:${fond}
Angle:${angle}

MANDATORY RULE:
The model MUST wear the sunglasses from the attached image.
They must be placed correctly on the face.
They cannot be removed.
They must match shape and position.

Quality:
Ultra high resolution
Professional photography
Cinematic lighting
Sharp focus
Masterpiece quality
`;

try{

const response=await fetch(HF_API,{
method:"POST",
headers:{
Authorization:`Bearer ${HF_TOKEN}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
inputs:basePrompt,
parameters:{
max_new_tokens:600,
temperature:1.7,
top_p:0.99,
top_k:60,
repetition_penalty:1.4,
do_sample:true
}
})
});

const data=await response.json();

let generated=data[0]?.generated_text || basePrompt;

res.json({prompt:generated});

}catch(err){
res.json({prompt:"ERROR GENERATING"});
}

});

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
console.log("🚀 SERVER RUNNING");
});
