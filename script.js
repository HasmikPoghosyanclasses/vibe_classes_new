/* Minimal interactivity for PawMatch demo */

// Seed profiles (royalty-free style placeholder images via patterns/gradients)
const PROFILES = [
  {
    name: "Bear", species: "Cat", age: 1, distance: "1.2 km",
    vibe: "Calm • Cuddly",
    photo: "linear-gradient(120deg,#f9d5e5,#d6ecff), url('https://images.unsplash.com/photo-1595433707802-6b2626ef6b46?q=80&w=1200&auto=format&fit=crop')"
  },
  {
    name: "Luna", species: "Dog", age: 3, distance: "2.0 km",
    vibe: "Playful • Social",
    photo: "linear-gradient(120deg,#cdecdc,#fff3b0), url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop')"
  },
  {
    name: "Pip", species: "Parrot", age: 2, distance: "3.5 km",
    vibe: "Chirpy • Curious",
    photo: "linear-gradient(120deg,#d6ecff,#cdecdc), url('https://images.unsplash.com/photo-1501706362039-c06b2d715385?q=80&w=1200&auto=format&fit=crop')"
  },
  {
    name: "Nori", species: "Rabbit", age: 1, distance: "0.9 km",
    vibe: "Gentle • Shy",
    photo: "linear-gradient(120deg,#fff3b0,#f9d5e5), url('https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop')"
  },
  {
    name: "Mocha", species: "Dog", age: 4, distance: "4.1 km",
    vibe: "Chill • Outdoorsy",
    photo: "linear-gradient(120deg,#f9d5e5,#cdecdc), url('https://images.unsplash.com/photo-1558944351-c6ae4e5d4935?q=80&w=1200&auto=format&fit=crop')"
  },
  {
    name: "Saffron", species: "Cat", age: 2, distance: "1.5 km",
    vibe: "Sassy • Smart",
    photo: "linear-gradient(120deg,#d6ecff,#fff3b0), url('https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1200&auto=format&fit=crop')"
  }
];

let index = 0;
const liked = [];
const passed = [];

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

function renderDemoCard(){
  const card = $("#demoCard");
  if(!card) return;

  const p = PROFILES[index % PROFILES.length];
  card.innerHTML = `
    <div class="photo" style="background-image:${p.photo};"></div>
    <span class="badge">${p.species}</span>
    <div class="info">
      <div class="name">${p.name}, ${p.age}</div>
      <div class="meta">${p.vibe} • ${p.distance}</div>
    </div>
  `;
}

function renderGrid(){
  const list = $("#cardList");
  if(!list) return;
  list.innerHTML = PROFILES.map(p => `
    <div class="card">
      <div class="card-photo" style="background-image:${p.photo};"></div>
      <div class="card-body">
        <div class="card-name">${p.name} • ${p.species}</div>
        <div class="card-meta">${p.vibe} • ${p.distance}</div>
      </div>
    </div>
  `).join("");
}

function like(){
  liked.push(PROFILES[index % PROFILES.length]);
  index++;
  renderDemoCard();
  pulse($("#btnLike"));
}

function pass(){
  passed.push(PROFILES[index % PROFILES.length]);
  index++;
  renderDemoCard();
  pulse($("#btnPass"));
}

function pulse(el){
  if(!el) return;
  el.animate([{ transform: "scale(1)" }, { transform: "scale(1.08)" }, { transform: "scale(1)" }], {
    duration: 180,
    easing: "ease-out"
  });
}

/* Keyboard + Buttons */
function bindControls(){
  $("#btnLike")?.addEventListener("click", like);
  $("#btnPass")?.addEventListener("click", pass);

  window.addEventListener("keydown", (e) => {
    if(e.key === "ArrowRight") like();
    if(e.key === "ArrowLeft") pass();
  });

  $$("[data-scrollto]").forEach(btn => {
    btn.addEventListener("click", () => {
      const to = btn.getAttribute("data-scrollto");
      const target = document.querySelector(to);
      if(target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* Simple form handling */
function handleForm(){
  const form = $("#betaForm");
  const note = $("#formNote");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#email").value.trim();
    if(!email){
      note.textContent = "Please enter your email.";
      return;
    }
    // Fake success state
    note.textContent = "Thanks! We’ll be in touch soon. 🐾";
    form.reset();
  });
}

/* Footer year */
function setYear(){
  const y = new Date().getFullYear();
  $("#year").textContent = y;
}

/* Init */
document.addEventListener("DOMContentLoaded", () => {
  renderDemoCard();
  renderGrid();
  bindControls();
  handleForm();
  setYear();
});
