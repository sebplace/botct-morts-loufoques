/*!
 * Le Registre Macabre de Ravenswood Bluff
 * Générateur de récits de mort absurde. Aucune dépendance, aucun réseau.
 */
(function () {
  "use strict";

  const L = window.LORE;

  /* ================================================================ */
  /*  Hasard reproductible                                            */
  /* ================================================================ */

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hashSeed(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function newSeed() {
    return Math.floor(Math.random() * 0x7fffffff).toString(36).padStart(6, "0").slice(-6);
  }

  const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
  const range = (rng, min, max) => min + Math.floor(rng() * (max - min + 1));

  function weighted(rng, pairs) {
    const total = pairs.reduce((s, p) => s + p[1], 0);
    let r = rng() * total;
    for (const [value, w] of pairs) {
      r -= w;
      if (r <= 0) return value;
    }
    return pairs[pairs.length - 1][0];
  }

  /* ================================================================ */
  /*  Accords en genre                                                */
  /* ================================================================ */

  /** Se rapporte au personnage principal. */
  function accord(str, g) {
    const f = g === "f";
    return String(str)
      .replace(/\{e\}/g, f ? "e" : "")
      .replace(/\{il\}/g, f ? "elle" : "il")
      .replace(/\{Il\}/g, f ? "Elle" : "Il")
      .replace(/\{le\}/g, f ? "la" : "le")
      .replace(/\{un\}/g, f ? "une" : "un")
      .replace(/\{lui\}/g, f ? "elle" : "lui");
  }

  /** Se rapporte à la personne qui a fait exécuter. */
  function accordAutre(str, g) {
    const f = g === "f";
    return String(str)
      .replace(/\[e\]/g, f ? "e" : "")
      .replace(/\[il\]/g, f ? "elle" : "il")
      .replace(/\[Il\]/g, f ? "Elle" : "Il");
  }

  /** Devine le genre d'un prénom saisi à la main (heuristique française). */
  function devineGenre(nom) {
    const n = String(nom || "").trim().toLowerCase();
    if (!n) return null;
    const masculinsEnE = ["pierre", "philippe", "alexandre", "antoine", "étienne", "etienne",
      "jérôme", "jerome", "maxime", "côme", "come", "aristide", "jules", "charles", "gilles",
      "hervé", "rené", "andré", "aimé", "dominique", "claude", "camille", "sébastien", "sebastien"];
    if (masculinsEnE.indexOf(n) !== -1) return "m";
    if (/(a|e|ine|ette|elle|ense|ude)$/.test(n)) return "f";
    return "m";
  }

  /* ================================================================ */
  /*  Fabrique du récit                                               */
  /* ================================================================ */

  /** Répartition des niveaux d'absurdité selon le curseur. */
  const MELANGE = {
    1: [[1, 78], [2, 22]],
    2: [[1, 24], [2, 56], [3, 20]],
    3: [[2, 24], [3, 56], [4, 20]],
    4: [[3, 34], [4, 66]]
  };

  function tirerMort(rng, chaos, jour) {
    const table = jour ? L.MODES_EXECUTION : L.MANIERES;
    const niveau = weighted(rng, MELANGE[chaos] || MELANGE[3]);
    return pick(rng, table[niveau]);
  }

  function roleParId(id) {
    for (let i = 0; i < L.ROLES.length; i++) if (L.ROLES[i].id === id) return L.ROLES[i];
    return null;
  }

  function roleAvecArticle(r) {
    return r.art === "l'" ? "l'" + r.nom : r.art + " " + r.nom;
  }

  function nomAuHasard(rng, g) {
    const prenom = pick(rng, g === "f" ? L.PRENOMS_F : L.PRENOMS_M);
    const epithete = pick(rng, g === "f" ? L.EPITHETES_F : L.EPITHETES_M);
    return prenom + " " + epithete;
  }

  function nettoyerIdee(txt) {
    return String(txt || "").replace(/\s+/g, " ").trim().replace(/[.;,]+$/, "").slice(0, 180);
  }

  /** Un récit est entièrement déterminé par (graine, réponses du formulaire). */
  function forger(seed, opts) {
    const rng = mulberry32(hashSeed(
      seed + "|" + opts.fin + "|" + opts.chaos + "|" + (opts.nom || "") + "|" + opts.genre +
      "|" + (opts.role || "") + "|" + (opts.idee || "") + "|" + (opts.acc || "") + "|" + opts.accGenre
    ));

    const jour = opts.fin === "jour";
    const genre = opts.genre !== "auto" ? opts.genre : (devineGenre(opts.nom) || (rng() < 0.5 ? "f" : "m"));
    const nom = opts.nom || nomAuHasard(rng, genre);
    const accGenre = opts.accGenre !== "auto" ? opts.accGenre : (devineGenre(opts.acc) || (rng() < 0.5 ? "f" : "m"));
    const acc = opts.acc || nomAuHasard(rng, accGenre);

    return {
      seed: seed, opts: opts, jour: jour,
      nom: nom, genre: genre,
      acc: acc, accGenre: accGenre,
      role: opts.role ? roleParId(opts.role) : null,
      idee: nettoyerIdee(opts.idee),
      ouverture: pick(rng, jour ? L.OUVERTURES_JOUR : L.OUVERTURES_NUIT),
      amorce: pick(rng, jour ? L.AMORCES_IDEE_JOUR : L.AMORCES_IDEE),
      suite: pick(rng, jour ? L.SUITES_IDEE.jour : L.SUITES_IDEE.nuit),
      mort: tirerMort(rng, opts.chaos, jour),
      lieu: pick(rng, L.LIEUX),
      moment: pick(rng, L.MOMENTS),
      detail: pick(rng, L.DETAILS),
      dossier: String(range(rng, 1, 9999)).padStart(4, "0"),
      surMesure: false
    };
  }

  /* ================================================================ */
  /*  Mise en mots                                                    */
  /* ================================================================ */

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function titre(d) { return d.mort[1]; }

  /** Renvoie [{ cle, html }] — deux ou trois paragraphes, pas davantage. */
  function paragraphes(d) {
    const g = d.genre;
    const nomHtml = "<strong>" + escapeHtml(d.nom) + "</strong>";
    const roleHtml = d.role ? ", " + escapeHtml(roleAvecArticle(d.role)) + "," : "";
    const accHtml = "<strong>" + escapeHtml(d.acc) + "</strong>";

    const ouverture = accordAutre(accord(d.ouverture, g), d.accGenre)
      .replace(/\{nom\}/g, nomHtml)
      .replace(/\{role\}/g, roleHtml)
      .replace(/\{acc\}/g, accHtml)
      .replace(/,\s*([.!?;:])/g, "$1")
      .replace(/,\s*,/g, ",");

    const paras = [{ cle: "ouverture", html: ouverture }];

    if (d.idee) {
      paras.push({
        cle: "idee",
        html: escapeHtml(accord(d.amorce, g)) + " <em>«&nbsp;" + escapeHtml(d.idee) +
          "&nbsp;»</em>. " + escapeHtml(d.suite)
      });
    }

    const fin = d.jour
      ? accord("{Il} a fini " + d.mort[0] + ", " + d.moment + ".", g)
      : accord("On l'a retrouvé{e} " + d.mort[0] + ", " + d.lieu + ", " + d.moment + ".", g);

    paras.push({
      cle: "mort",
      html: escapeHtml(fin) + " " + escapeHtml(accord(d.detail, g))
    });

    return paras;
  }

  function recitTexte(d) {
    const brut = paragraphes(d).map(function (p) {
      return p.html.replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    });
    return [
      (d.jour ? "⚖ " : "† ") + titre(d).toUpperCase() + (d.jour ? " ⚖" : " †"),
      "Ravenswood Bluff — dossier n°" + d.dossier,
      "",
      brut.join("\n\n"),
      "",
      "Graine : " + (d.surMesure ? "sur mesure" : d.seed) + " — " + lienPartage(d)
    ].join("\n");
  }

  /* ================================================================ */
  /*  Interface                                                       */
  /* ================================================================ */

  const $ = (sel) => document.querySelector(sel);
  const els = {
    card: $("#card"), affair: $("#affair"), caseNo: $("#case-no"), seed: $("#seed"),
    recit: $("#recit"), badgeFin: $("#badge-fin"), badgeChaos: $("#badge-chaos"),
    nom: $("#nom"), genre: $("#genre"), role: $("#role"), idee: $("#idee"),
    acc: $("#acc"), accGenre: $("#acc-genre"),
    accField: $("#acc-field"), accGenreField: $("#acc-genre-field"),
    chaos: $("#chaos"), chaosLabel: $("#chaos-label"),
    toast: $("#toast"), history: $("#history")
  };

  let courant = null;
  let dossiers = [];

  function optionsCourantes() {
    return {
      fin: document.querySelector("#fin-chips .is-on").dataset.value,
      chaos: parseInt(els.chaos.value, 10),
      nom: els.nom.value.trim(),
      genre: els.genre.value,
      role: els.role.value,
      idee: els.idee.value.trim(),
      acc: els.acc.value.trim(),
      accGenre: els.accGenre.value
    };
  }

  function peuplerRoles() {
    let html = '<option value="">— je préfère ne pas le dire —</option>';
    Object.keys(L.SCRIPTS).forEach(function (s) {
      Object.keys(L.TYPES).forEach(function (t) {
        const lot = L.ROLES.filter(function (r) { return r.script === s && r.type === t; });
        if (!lot.length) return;
        html += '<optgroup label="' + L.SCRIPTS[s].court + " · " + L.TYPES[t] + '">';
        lot.forEach(function (r) {
          html += '<option value="' + r.id + '">' + escapeHtml(r.nom) + "</option>";
        });
        html += "</optgroup>";
      });
    });
    els.role.innerHTML = html;
  }

  function majChampsAccusateur() {
    const jour = document.querySelector("#fin-chips .is-on").dataset.value === "jour";
    els.accField.hidden = !jour;
    els.accGenreField.hidden = !jour;
  }

  function rendre(d, partiel) {
    courant = d;
    els.recit.innerHTML = paragraphes(d).map(function (p) {
      return '<p class="recit-p" data-part="' + p.cle +
        '" role="button" tabindex="0" title="Cliquez pour réécrire ce paragraphe">' + p.html + "</p>";
    }).join("");

    if (partiel) {
      const cible = els.recit.querySelector('[data-part="' + partiel + '"]');
      if (cible) { void cible.offsetWidth; cible.classList.add("flash"); }
    }

    els.affair.textContent = titre(d);
    els.caseNo.textContent = d.dossier;
    els.badgeFin.textContent = d.jour ? "Exécution" : "Mort nocturne";
    els.badgeChaos.textContent = L.CHAOS_LABELS[d.opts.chaos];
    els.seed.textContent = d.surMesure ? "sur mesure" : d.seed;

    if (!partiel) {
      els.card.classList.remove("is-rolling");
      void els.card.offsetWidth;
      els.card.classList.add("is-rolling");
      majURL(d);
    }
  }

  function nouveauRecit() {
    const d = forger(newSeed(), optionsCourantes());
    rendre(d);
    archiver(d);
  }

  /* ------------------------------------------ réécriture ciblée ------ */

  const relances = {
    ouverture: function (d, rng) {
      d.ouverture = pick(rng, d.jour ? L.OUVERTURES_JOUR : L.OUVERTURES_NUIT);
    },
    idee: function (d, rng) {
      d.amorce = pick(rng, d.jour ? L.AMORCES_IDEE_JOUR : L.AMORCES_IDEE);
      d.suite = pick(rng, d.jour ? L.SUITES_IDEE.jour : L.SUITES_IDEE.nuit);
    },
    mort: function (d, rng) {
      d.mort = tirerMort(rng, d.opts.chaos, d.jour);
      d.lieu = pick(rng, L.LIEUX);
      d.moment = pick(rng, L.MOMENTS);
      d.detail = pick(rng, L.DETAILS);
    }
  };

  function relancer(part) {
    if (!courant || !relances[part]) { nouveauRecit(); return; }
    relances[part](courant, Math.random);
    courant.surMesure = true;
    rendre(courant, part);
    majURL(courant);
  }

  /* ------------------------------------------------------ archives --- */

  function archiver(d) {
    dossiers.unshift({
      titre: titre(d), nom: d.nom, jour: d.jour, seed: d.seed, opts: d.opts
    });
    dossiers = dossiers.slice(0, 12);
    sauver();
    dessinerArchives();
  }

  function dessinerArchives() {
    if (!dossiers.length) {
      els.history.innerHTML = '<li class="empty">Aucun récit pour l\'instant. La nuit est jeune.</li>';
      return;
    }
    els.history.innerHTML = dossiers.map(function (e, i) {
      return '<li class="entry" data-i="' + i + '" tabindex="0" role="button">' +
        '<span class="h-no">' + (e.jour ? "⚖️" : "🌙") + "</span>" +
        '<span class="h-title">' + escapeHtml(e.titre) + "</span>" +
        '<span class="h-sub">' + escapeHtml(e.nom) + "</span>" +
        "</li>";
    }).join("");
  }

  function restaurer(i) {
    const e = dossiers[i];
    if (!e) return;
    appliquerOptions(e.opts);
    rendre(forger(e.seed, e.opts));
    els.card.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  function sauver() {
    try { localStorage.setItem("registre-macabre", JSON.stringify(dossiers)); } catch (e) { /* navigation privée */ }
  }

  function charger() {
    try {
      const raw = localStorage.getItem("registre-macabre");
      if (raw) dossiers = JSON.parse(raw) || [];
    } catch (e) { dossiers = []; }
    dessinerArchives();
  }

  /* --------------------------------------------------- permaliens ---- */

  function lienPartage(d) {
    const u = new URL(location.href);
    u.hash = "";
    u.search = "";
    if (d.surMesure) return u.toString();
    u.searchParams.set("g", d.seed);
    u.searchParams.set("f", d.opts.fin);
    u.searchParams.set("c", d.opts.chaos);
    if (d.opts.nom) u.searchParams.set("n", d.opts.nom);
    if (d.opts.genre !== "auto") u.searchParams.set("x", d.opts.genre);
    if (d.opts.role) u.searchParams.set("r", d.opts.role);
    if (d.opts.idee) u.searchParams.set("i", d.opts.idee);
    if (d.opts.acc) u.searchParams.set("a", d.opts.acc);
    if (d.opts.accGenre !== "auto") u.searchParams.set("y", d.opts.accGenre);
    return u.toString();
  }

  function majURL(d) {
    try { history.replaceState(null, "", lienPartage(d)); } catch (e) { /* file:// */ }
  }

  function lireURL() {
    const p = new URLSearchParams(location.search);
    if (!p.get("g")) return null;
    return {
      seed: p.get("g"),
      opts: {
        fin: p.get("f") === "jour" ? "jour" : "nuit",
        chaos: Math.min(4, Math.max(1, parseInt(p.get("c"), 10) || 3)),
        nom: p.get("n") || "",
        genre: p.get("x") || "auto",
        role: p.get("r") || "",
        idee: (p.get("i") || "").slice(0, 180),
        acc: p.get("a") || "",
        accGenre: p.get("y") || "auto"
      }
    };
  }

  function appliquerOptions(o) {
    setChip("#fin-chips", o.fin || "nuit");
    els.chaos.value = o.chaos;
    els.chaosLabel.textContent = L.CHAOS_LABELS[o.chaos];
    els.nom.value = o.nom || "";
    els.genre.value = o.genre || "auto";
    els.role.value = o.role || "";
    els.idee.value = o.idee || "";
    els.acc.value = o.acc || "";
    els.accGenre.value = o.accGenre || "auto";
    majChampsAccusateur();
  }

  function setChip(groupSel, value) {
    document.querySelectorAll(groupSel + " .chip").forEach(function (c) {
      const on = c.dataset.value === value;
      c.classList.toggle("is-on", on);
      c.setAttribute("aria-checked", on ? "true" : "false");
    });
  }

  /* ------------------------------------------------------- toasts ---- */

  let toastTimer = null;
  function toast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { els.toast.classList.remove("show"); }, 2400);
  }

  function copier(texte, message) {
    const done = function () { toast(message); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texte).then(done, function () { copierSecours(texte, done); });
    } else {
      copierSecours(texte, done);
    }
  }

  function copierSecours(texte, done) {
    const ta = document.createElement("textarea");
    ta.value = texte;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); }
    catch (e) { toast("Copie impossible — sélectionnez le texte à la main."); }
    document.body.removeChild(ta);
  }

  /* ------------------------------------------------------ câblage ---- */

  function init() {
    peuplerRoles();

    document.querySelectorAll("#fin-chips .chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        setChip("#fin-chips", chip.dataset.value);
        majChampsAccusateur();
      });
    });

    els.chaos.addEventListener("input", function () {
      els.chaosLabel.textContent = L.CHAOS_LABELS[parseInt(els.chaos.value, 10)];
    });

    $("#generate").addEventListener("click", nouveauRecit);
    $("#again").addEventListener("click", nouveauRecit);

    els.recit.addEventListener("click", function (e) {
      const p = e.target.closest(".recit-p");
      if (p) relancer(p.dataset.part);
    });
    els.recit.addEventListener("keydown", function (e) {
      const p = e.target.closest(".recit-p");
      if (p && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); relancer(p.dataset.part); }
    });

    $("#copy").addEventListener("click", function () {
      if (!courant) return toast("Écrivez d'abord un récit.");
      copier(recitTexte(courant), "Récit copié — à lire d'une voix grave.");
    });

    $("#permalink").addEventListener("click", function () {
      if (!courant) return toast("Écrivez d'abord un récit.");
      if (courant.surMesure) return toast("Récit retouché à la main : le permalien ne peut plus le reproduire.");
      copier(lienPartage(courant), "Permalien copié.");
    });

    $("#clear-history").addEventListener("click", function () {
      dossiers = [];
      sauver();
      dessinerArchives();
      toast("Archives incinérées.");
    });

    els.history.addEventListener("click", function (e) {
      const li = e.target.closest(".entry");
      if (li) restaurer(parseInt(li.dataset.i, 10));
    });
    els.history.addEventListener("keydown", function (e) {
      const li = e.target.closest(".entry");
      if (li && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); restaurer(parseInt(li.dataset.i, 10)); }
    });

    document.addEventListener("keydown", function (e) {
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "select" || tag === "textarea") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.code === "Space" || e.key === "Enter") { e.preventDefault(); nouveauRecit(); }
      else if (e.key === "c" || e.key === "C") { $("#copy").click(); }
      else if (e.key === "p" || e.key === "P") { $("#permalink").click(); }
    });

    charger();

    const depuisURL = lireURL();
    if (depuisURL) {
      appliquerOptions(depuisURL.opts);
      rendre(forger(depuisURL.seed, depuisURL.opts));
    } else {
      majChampsAccusateur();
      nouveauRecit();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.RegistreMacabre = { forger: forger, recitTexte: recitTexte, accord: accord, newSeed: newSeed };
})();
