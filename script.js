let letters = [
  {
    id: "dor1",
    title: "Lea, mi-e dor de tine",
    category: "dor",
    tags: ["dor", "Lea"],
    preview: "Îmi lipsești mai mult decât pot spune într-un mesaj.",
    text:
`Lea,

Mi-e dor de tine. Simplu și adevărat.
Îmi lipsește felul în care îmi liniștești ziua doar prin faptul că exiști.

În momentele în care nu ești lângă mine, mă surprind căutându-te în lucruri mici:
într-o melodie, într-un loc pe lângă care trec, într-un gând care revine.

Dacă ai ști cât de mult însemni pentru mine, ai zâmbi.
Și exact zâmbetul tău îmi lipsește acum.

— al tău`
  },
  {
    id: "dor2",
    title: "Când îmi lipsești seara",
    category: "noapte",
    tags: ["noapte", "dor", "Lea"],
    preview: "Seara, gândurile mele se întorc mereu la tine.",
    text:
`Lea,

Seara e liniște, dar în mine e dor.
Îmi lipsești mai ales atunci, când se oprește agitația și rămân doar eu cu gândurile mele.

Aș vrea să fii aproape.
Să-ți pot spune „somn ușor” fără să fie doar un mesaj.
Să știu că ești bine și că ai pe cineva care te iubește, exact așa cum ești.

Somn liniștit, Lea.
— al tău`
  },
  {
    id: "sad1",
    title: "Când mi-e greu",
    category: "sad",
    tags: ["sincer", "Lea"],
    preview: "Uneori nu sunt în formă, dar tu rămâi locul meu bun.",
    text:
`Lea,

Azi mi-e mai greu.
Nu e ceva ce pot explica perfect, dar simt că port prea multe în același timp.

Vreau să știi un lucru clar:
nu e despre tine și nu e vina ta.
Tu ești partea care mă ajută, nu partea care mă apasă.

Dacă par mai tăcut sau mai rece, e doar oboseala mea.
Înăuntru, dragostea mea pentru tine e aceeași.

— al tău`
  },
  {
    id: "sad2",
    title: "Când mă pierd în gânduri",
    category: "sad",
    tags: ["gânduri", "Lea"],
    preview: "Când mintea mea face zgomot, tu ești liniștea.",
    text:
`Lea,

Când mă pierd în gânduri, îmi amintesc de tine.
De felul în care reușești să faci lucrurile mai simple, fără să forțezi nimic.

Dacă azi nu sunt 100% bine, nu înseamnă că iubesc mai puțin.
Înseamnă doar că sunt om.

Și chiar și atunci, te aleg.
Te aleg pentru că în tine am găsit ceva rar: siguranță.

— al tău`
  },
  {
    id: "iub1",
    title: "Te aleg în fiecare zi, Lea",
    category: "iubire",
    tags: ["iubire", "Lea"],
    preview: "Nu doar în zilele bune. În toate zilele.",
    text:
`Lea,

Nu te iubesc doar când totul merge perfect.
Te iubesc și când e haos, și când e liniște, și când nu avem chef de nimic.

Te aleg în fiecare zi.
În felul în care am grijă de tine.
În felul în care îți răspund.
În felul în care mă gândesc la viitor și te văd acolo.

Dacă nu spun suficient, să știi că simt mult.
Și ceea ce simt pentru tine e real.

— al tău`
  },
  {
    id: "iub2",
    title: "Pentru zâmbetul tău",
    category: "iubire",
    tags: ["iubire", "Lea"],
    preview: "Am scris asta doar ca să-ți fie puțin mai bine.",
    text:
`Lea,

Am scris asta ca să-ți las ceva frumos.
Poate într-o zi în care ai nevoie de liniște.
Poate într-o zi în care vrei doar să simți că ești iubită.

Îmi place de tine.
De cine ești.
De cum vorbești.
De cum simți.
De felul în care faci lumea mai caldă.

Și dacă te întrebi vreodată cât de mult însemni:
însemni mult. Mai mult decât pot arăta în cuvinte.

— al tău`
  }
];

/* UI */
const listEl = document.getElementById("list");
const typeEl = document.getElementById("typewriter");
const titleEl = document.getElementById("letterTitle");
const metaEl = document.getElementById("letterMeta");
const chipsEl = document.getElementById("chips");
const toastEl = document.getElementById("toast");

const btnRandom = document.getElementById("btnRandom");
const btnCopy = document.getElementById("btnCopy");
const btnCopyLink = document.getElementById("btnCopyLink");
const btnMoreHearts = document.getElementById("btnMoreHearts");
const btnAmbient = document.getElementById("btnAmbient");

const heartsWrap = document.getElementById("hearts");
const tabs = [...document.querySelectorAll(".tab")];

/* Start Screen */
const startOverlay = document.getElementById("startOverlay");
const startBtn = document.getElementById("startBtn");
const app = document.getElementById("app");

let currentFilter = "all";
let currentLetter = null;
let typingTimer = null;

/* Toast */
function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(()=>toastEl.classList.remove("show"), 1600);
}

/* Categories */
function labelFor(cat){
  return ({dor:"Dor", sad:"Când mi-e greu", iubire:"Iubire", noapte:"Noapte"})[cat] || "Toate";
}
function emojiFor(cat){
  return ({dor:"🥺", sad:"😔", iubire:"💖", noapte:"🌙"})[cat] || "💗";
}

/* List */
function renderList(){
  listEl.innerHTML = "";
  const filtered = letters.filter(l => currentFilter === "all" ? true : l.category === currentFilter);

  filtered.forEach((l) => {
    const btn = document.createElement("button");
    btn.className = "item";
    btn.type = "button";
    btn.dataset.id = l.id;

    btn.innerHTML = `
      <span class="tag">${emojiFor(l.category)} ${labelFor(l.category)}</span>
      <h3>${l.title}</h3>
      <p>${l.preview}</p>
    `;

    btn.addEventListener("click", () => openLetter(l.id));
    listEl.appendChild(btn);
  });

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.style.padding = "14px";
    empty.style.color = "rgba(43,26,37,.75)";
    empty.style.fontWeight = "900";
    empty.textContent = "Nu există scrisori în categoria asta.";
    listEl.appendChild(empty);
  }
}

function setActiveListItem(id){
  document.querySelectorAll(".item").forEach(x => x.classList.toggle("active", x.dataset.id === id));
}

function renderChips(letter){
  chipsEl.innerHTML = "";
  (letter.tags || []).slice(0,6).forEach(t => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = `#${t}`;
    chipsEl.appendChild(chip);
  });
}

/* Typewriter */
function typewriter(text){
  clearInterval(typingTimer);
  typeEl.textContent = "";
  let i = 0;
  typingTimer = setInterval(() => {
    typeEl.textContent += text[i] || "";
    i++;
    if (i >= text.length) clearInterval(typingTimer);
  }, 14);
}

/* Deep link */
function openLetter(id, {silentHash=false} = {}){
  const letter = letters.find(l => l.id === id);
  if (!letter) return;

  currentLetter = letter;
  titleEl.textContent = letter.title;
  metaEl.textContent = `${emojiFor(letter.category)} ${labelFor(letter.category)} • ${new Date().toLocaleDateString("ro-RO")}`;
  renderChips(letter);
  typewriter(letter.text);
  setActiveListItem(id);
  burstHearts(10);

  if (!silentHash) history.replaceState(null, "", `#${encodeURIComponent(letter.id)}`);
}

function openFromHash(){
  const raw = window.location.hash.replace("#","");
  if (!raw) return;
  const id = decodeURIComponent(raw);
  const found = letters.find(l => l.id === id);
  if (found) openLetter(id, {silentHash:true});
}

/* Random */
function randomLetter(){
  const pool = letters.filter(l => currentFilter === "all" ? true : l.category === currentFilter);
  if (!pool.length) return;
  openLetter(pool[Math.floor(Math.random() * pool.length)].id);
}
btnRandom.addEventListener("click", randomLetter);

/* Copy text */
btnCopy.addEventListener("click", async () => {
  if (!currentLetter){
    toast("Alege o scrisoare mai întâi.");
    return;
  }
  try{
    await navigator.clipboard.writeText(currentLetter.text);
    toast("Text copiat.");
  }catch{
    toast("Nu pot copia acum.");
  }
});

/* Copy link */
btnCopyLink.addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(window.location.href);
    toast("Link copiat.");
  }catch{
    toast("Nu pot copia link-ul.");
  }
});

/* Tabs */
tabs.forEach(t => {
  t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");

    currentFilter = t.dataset.filter;

    currentLetter = null;
    titleEl.textContent = "Alege o scrisoare";
    metaEl.textContent = "în stânga ai lista";
    chipsEl.innerHTML = "";
    typeEl.textContent = "";

    renderList();
    burstHearts(8);
  });
});

/* Hearts */
function rand(min, max){ return Math.random() * (max - min) + min; }

function spawnHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  const size = rand(10, 24);
  const left = rand(0, 100);
  const duration = rand(5.0, 10.8);
  const opacity = rand(0.35, 0.95);

  const colors = [
    "rgba(255,79,163,0.95)",
    "rgba(255,138,199,0.95)",
    "rgba(255,255,255,0.85)"
  ];
  h.style.background = colors[Math.floor(Math.random()*colors.length)];
  h.style.width = `${size}px`;
  h.style.height = `${size}px`;
  h.style.left = `${left}vw`;
  h.style.opacity = opacity;
  h.style.animationDuration = `${duration}s`;

  heartsWrap.appendChild(h);
  setTimeout(() => h.remove(), duration * 1000);
}

function burstHearts(n=12){
  for(let i=0;i<n;i++) setTimeout(spawnHeart, i*35);
}

/* fixed rate hearts */
setInterval(() => {
  if (document.hidden) return;
  spawnHeart();
}, 520);

btnMoreHearts.addEventListener("click", () => burstHearts(24));

/* Ambient (WebAudio) */
let audioCtx = null;
let ambientNode = null;
let ambientOn = false;

function makeAmbient(ctx){
  const master = ctx.createGain();
  master.gain.value = 0.0;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 650;
  filter.Q.value = 0.6;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const osc3 = ctx.createOscillator();

  osc1.type = "sine";
  osc2.type = "triangle";
  osc3.type = "sine";

  osc1.frequency.value = 174.61;
  osc2.frequency.value = 220.00;
  osc3.frequency.value = 261.63;

  osc2.detune.value = -7;
  osc3.detune.value = +6;

  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.08;

  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.06;

  lfo.connect(lfoGain);
  lfoGain.connect(master.gain);

  osc1.connect(filter);
  osc2.connect(filter);
  osc3.connect(filter);
  filter.connect(master);
  master.connect(ctx.destination);

  osc1.start(); osc2.start(); osc3.start(); lfo.start();

  return { master, osc1, osc2, osc3, lfo };
}

function fadeGain(node, to, ms=600){
  const now = audioCtx.currentTime;
  node.gain.cancelScheduledValues(now);
  node.gain.setValueAtTime(node.gain.value, now);
  node.gain.linearRampToValueAtTime(to, now + ms/1000);
}

btnAmbient.addEventListener("click", async () => {
  try{
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    if (!ambientOn){
      ambientNode = makeAmbient(audioCtx);
      ambientOn = true;
      btnAmbient.textContent = "Muzică ⏸";
      fadeGain(ambientNode.master, 0.12, 700);
      toast("Muzică pornită.");
    } else {
      btnAmbient.textContent = "Muzică ▶";
      toast("Muzică oprită.");
      fadeGain(ambientNode.master, 0.0, 400);
      setTimeout(() => {
        try{
          ambientNode.osc1.stop();
          ambientNode.osc2.stop();
          ambientNode.osc3.stop();
          ambientNode.lfo.stop();
        }catch{}
        ambientNode = null;
      }, 450);
      ambientOn = false;
    }
  }catch{
    toast("Audio blocat de browser.");
  }
});

/* Start unlock */
function unlockApp(){
  startOverlay.classList.add("hide");
  app.classList.remove("locked");
  app.classList.add("unlocked");

  burstHearts(18);
  openFromHash();
}

startBtn.addEventListener("click", unlockApp);
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !startOverlay.classList.contains("hide")) unlockApp();
});

/* Init (doar pregătește lista; nu afișează app până la start) */
renderList();
window.addEventListener("hashchange", openFromHash);