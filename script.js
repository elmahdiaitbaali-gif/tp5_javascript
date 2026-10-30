const regions = [
  { nom: "Tanger-Tétouan-Al Hoceïma", besoins: 48, resolus: 20, jeunes: 3200, clubs: 25 },
  { nom: "L'Oriental",                besoins: 36, resolus: 12, jeunes: 2100, clubs: 18 },
  { nom: "Fès-Meknès",                besoins: 52, resolus: 22, jeunes: 3600, clubs: 30 },
  { nom: "Rabat-Salé-Kénitra",        besoins: 60, resolus: 33, jeunes: 4800, clubs: 42 },
  { nom: "Béni Mellal-Khénifra",      besoins: 40, resolus: 11, jeunes: 2400, clubs: 16 },
  { nom: "Casablanca-Settat",         besoins: 75, resolus: 41, jeunes: 6500, clubs: 58 },
  { nom: "Marrakech-Safi",            besoins: 55, resolus: 24, jeunes: 4100, clubs: 33 },
  { nom: "Drâa-Tafilalet",            besoins: 30, resolus: 7,  jeunes: 1500, clubs: 10 },
  { nom: "Souss-Massa",               besoins: 44, resolus: 19, jeunes: 3000, clubs: 24 },
  { nom: "Guelmim-Oued Noun",         besoins: 22, resolus: 6,  jeunes: 900,  clubs: 7 },
  { nom: "Laâyoune-Sakia El Hamra",   besoins: 20, resolus: 8,  jeunes: 1000, clubs: 8 },
  { nom: "Dakhla-Oued Ed-Dahab",      besoins: 15, resolus: 6,  jeunes: 700,  clubs: 5 }
];


function compter(id, valeur) {
  const el = document.getElementById(id);
  let n = 0;
  const pas = Math.max(1, Math.round(valeur / 60));
  const t = setInterval(function () {
    n = Math.min(valeur, n + pas);
    el.textContent = n.toLocaleString("fr-FR");
    if (n >= valeur) clearInterval(t);
  }, 20);
}


function somme(champ) { return regions.reduce(function (t, r) { return t + r[champ]; }, 0); }
compter("tBesoins", somme("besoins"));
compter("tResolus", somme("resolus"));
compter("tJeunes", somme("jeunes"));
compter("tClubs", somme("clubs"));


const labels = { besoins: "besoins", taux: "% résolus", jeunes: "jeunes", clubs: "clubs" };
function valeur(r, m) { return m === "taux" ? Math.round(r.resolus / r.besoins * 100) : r[m]; }

function afficherRegions(m) {
  const zone = document.getElementById("regionBars");
  zone.innerHTML = "";
  const tri = regions.slice().sort(function (a, b) { return valeur(b, m) - valeur(a, m); });
  const max = valeur(tri[0], m);
  tri.forEach(function (r) {
    const v = valeur(r, m);
    const div = document.createElement("div");
    div.className = "rbar";
    div.innerHTML = '<div class="d-flex justify-content-between small"><span></span><span></span></div>' +
      '<div class="progress"><div class="progress-bar" style="width:' + (v / max * 100) + '%"></div></div>';
    div.children[0].children[0].textContent = r.nom;
    div.children[0].children[1].textContent = v.toLocaleString("fr-FR") + " " + labels[m];
    zone.appendChild(div);
  });
}
document.getElementById("metricBtns").addEventListener("click", function (e) {
  if (e.target.tagName !== "BUTTON") return;
  document.querySelectorAll("#metricBtns button").forEach(function (b) {
    b.className = b === e.target ? "btn btn-warning" : "btn btn-outline-warning";
  });
  afficherRegions(e.target.dataset.m);
});
afficherRegions("besoins");


const matchs = {
  "Jeune talent": "Associations et clubs peuvent vous repérer. Bénévoles et sponsors peuvent vous accompagner.",
  "Association": "Trouvez des bénévoles, des sponsors et des collectivités pour financer vos actions.",
  "Club": "Découvrez de jeunes talents et obtenez matériel, entraîneurs et partenaires.",
  "Bénévole": "Choisissez une mission près de chez vous dans une association ou un club.",
  "Collectivité": "Visualisez les besoins de votre commune et mobilisez associations et sponsors.",
  "Sponsor": "Financez des projets locaux et suivez leur impact en temps réel."
};
Object.keys(matchs).forEach(function (nom) {
  const b = document.createElement("button");
  b.className = "btn btn-light";
  b.textContent = nom;
  b.onclick = function () { document.getElementById("matchText").textContent = matchs[nom]; };
  document.getElementById("matchBtns").appendChild(b);
});


let projets = [
  { titre: "Terrain de football dégradé", region: "Marrakech-Safi", type: "Infrastructure", statut: 1 },
  { titre: "Manque de ballons pour les jeunes", region: "Souss-Massa", type: "Matériel", statut: 0 },
  { titre: "Salle de sport rénovée", region: "Fès-Meknès", type: "Infrastructure", statut: 2 },
  { titre: "Besoin d'un entraîneur", region: "L'Oriental", type: "Encadrement", statut: 0 }
];
const pct = [10, 60, 100];

regions.forEach(function (r) { document.getElementById("regionSel").add(new Option(r.nom)); });

function afficherKanban() {
  [0, 1, 2].forEach(function (i) { document.getElementById("col" + i).innerHTML = ""; });

  projets.forEach(function (p, index) {
    const carte = document.createElement("div");
    carte.className = "kcard";
    carte.innerHTML = '<strong></strong><div class="small text-secondary mb-2"></div>' +
      '<div class="progress mb-2"><div class="progress-bar bg-success" style="width:' + pct[p.statut] + '%"></div></div>' +
      '<div class="d-flex gap-1"></div>';
    carte.children[0].textContent = p.titre;
    carte.children[1].textContent = p.region + " · " + p.type;

    const zoneBtn = carte.children[3];
    if (p.statut > 0) {
      const b = document.createElement("button");
      b.className = "btn btn-sm btn-outline-secondary";
      b.textContent = "Reculer";
      b.onclick = function () { projets[index].statut--; afficherKanban(); };
      zoneBtn.appendChild(b);
    }
    if (p.statut < 2) {
      const b = document.createElement("button");
      b.className = "btn btn-sm btn-success";
      b.textContent = "Avancer";
      b.onclick = function () { projets[index].statut++; afficherKanban(); };
      zoneBtn.appendChild(b);
    }
    document.getElementById("col" + p.statut).appendChild(carte);
  });

  const moy = Math.round(projets.reduce(function (t, p) { return t + pct[p.statut]; }, 0) / projets.length);
  document.getElementById("globalBar").style.width = moy + "%";
  document.getElementById("globalTxt").textContent = moy + "% · " + projets.filter(function (p) { return p.statut === 2; }).length + " résolu(s) sur " + projets.length;
}

document.getElementById("formBesoin").addEventListener("submit", function (e) {
  e.preventDefault();
  projets.unshift({
    titre: document.getElementById("titre").value,
    region: document.getElementById("regionSel").value,
    type: document.getElementById("typeSel").value,
    statut: 0
  });
  e.target.reset();
  afficherKanban();
});
afficherKanban();


document.getElementById("formContact").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("alerte").classList.remove("d-none");
  e.target.reset();
});
