const hauts=["T-shirt","Hoodie","Blazer"];
const bas=["Jean","Cargo","Short"];
const fonds=["Studio","Plage","Rooftop"];
const angles=["Face","Profil","3/4"];

/* Remplir les selects */

function fill(id,list){
let select=document.getElementById(id);
list.forEach(item=>{
let opt=document.createElement("option");
opt.textContent=item;
select.appendChild(opt);
});
}

fill("haut",hauts);
fill("bas",bas);
fill("fond",fonds);
fill("angle",angles);

let ageSelect=document.getElementById("age");
for(let i=18;i<=60;i++){
let opt=document.createElement("option");
opt.textContent=i;
ageSelect.appendChild(opt);
}

/* Generate */

async function generate(){

let data={
genre:document.getElementById("genre").value,
age:document.getElementById("age").value,
haut:document.getElementById("haut").value,
bas:document.getElementById("bas").value,
fond:document.getElementById("fond").value,
angle:document.getElementById("angle").value
};

let res=await fetch("/generate",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
});

let json=await res.json();
document.getElementById("output").value=json.prompt;
}
