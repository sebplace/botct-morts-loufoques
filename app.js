/*!
 * Raconte ta mort — Ravenswood Bluff
 * Une réplique à dire à voix haute quand le village vient de t'exécuter.
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
  /*  Accords                                                         */
  /* ================================================================ */

  /** Se rapporte à toi. */
  function accord(str, g) {
    return String(str).replace(/\{e\}/g, g === "f" ? "e" : "");
  }

  /** Se rapporte à la personne qui t'a fait pendre. */
  function accordAutre(str, g) {
    const f = g === "f";
    return String(str)
      .replace(/\[e\]/g, f ? "e" : "")
      .replace(/\[il\]/g, f ? "elle" : "il")
      .replace(/\[Il\]/g, f ? "Elle" : "Il");
  }

  function devineGenre(nom) {
    const n = String(nom || "").trim().toLowerCase();
    if (!n) return null;
    const masculinsEnE = ["pierre", "philippe", "alexandre", "antoine", "étienne", "etienne",
      "jérôme", "jerome", "maxime", "côme", "come", "jules", "charles", "gilles", "hervé",
      "rené", "andré", "aimé", "dominique", "claude", "camille", "sébastien", "sebastien"];
    if (masculinsEnE.indexOf(n) !== -1) return "m";
    if (/(a|e|ine|ette|elle|ense|ude)$/.test(n)) return "f";
    return "m";
  }

  /* ================================================================ */
  /*  Tirage de la mort                                               */
  /* ================================================================ */

  /** Le curseur pousse vers les niveaux voisins sans les enfermer. */
  const MELANGE = {
    1: [[1, 70], [2, 30]],
    2: [[1, 25], [2, 55], [3, 20]],
    3: [[2, 25], [3, 55], [4, 20]],
    4: [[3, 35], [4, 65]]
  };

  function roleParId(id) {
    for (let i = 0; i < L.ROLES.length; i++) if (L.ROLES[i].id === id) return L.ROLES[i];
    return null;
  }

  function roleAvecArticle(r) {
    return r.art === "l'" ? "l'" + r.nom : r.art + " " + r.nom;
  }

  function morteGenerique(rng, chaos, jour) {
    const table = jour ? L.MORTS.jour : L.MORTS.nuit;
    const niveau = weighted(rng, MELANGE[chaos] || MELANGE[3]);
    return pick(rng, table[niveau] || table[3]);
  }

  /**
   * Avec un rôle choisi et une exécution, la mort sur mesure sort une fois sur
   * deux : assez pour qu'elle tombe vite, assez rarement pour que relancer
   * apporte autre chose.
   */
  function tirerMort(rng, opts, role) {
    const surMesure = role && opts.fin === "jour" && L.MORTS_ROLE[role.id];
    if (surMesure && rng() < 0.5) return { texte: L.MORTS_ROLE[role.id], sourceRole: true };
    return { texte: morteGenerique(rng, opts.chaos, opts.fin === "jour"), sourceRole: false };
  }

  function nettoyerIdee(txt) {
    return String(txt || "").replace(/\s+/g, " ").trim().replace(/[.;,]+$/, "").slice(0, 160);
  }

  function forger(seed, opts) {
    const rng = mulberry32(hashSeed(
      seed + "|" + opts.fin + "|" + opts.chaos + "|" + (opts.nom || "") + "|" + opts.genre +
      "|" + (opts.role || "") + "|" + (opts.idee || "") + "|" + (opts.acc || "") + "|" + opts.accGenre
    ));

    const genre = opts.genre !== "auto" ? opts.genre : (devineGenre(opts.nom) || (rng() < 0.5 ? "f" : "m"));
    const accGenre = opts.accGenre !== "auto" ? opts.accGenre : (devineGenre(opts.acc) || (rng() < 0.5 ? "f" : "m"));
    const acc = opts.acc || pick(rng, accGenre === "f" ? L.PRENOMS_F : L.PRENOMS_M);
    const role = opts.role ? roleParId(opts.role) : null;
    const mort = tirerMort(rng, opts, role);

    return {
      seed: seed, opts: opts,
      jour: opts.fin === "jour",
      nom: opts.nom, genre: genre,
      acc: acc, accGenre: accGenre,
      role: role,
      idee: nettoyerIdee(opts.idee),
      texte: mort.texte,
      sourceRole: mort.sourceRole,
      greffe: pick(rng, L.GREFFES),
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

  function replique(d) {
    let out = accordAutre(accord(escapeHtml(d.texte), d.genre), d.accGenre)
      .replace(/\{acc\}/g, "<strong>" + escapeHtml(d.acc) + "</strong>");
    if (d.idee) {
      out += " " + accord(escapeHtml(d.greffe), d.genre)
        .replace(/\{idee\}/g, "<em>" + escapeHtml(d.idee) + "</em>");
    }
    return out;
  }

  function repliqueTexte(d) {
    return replique(d).replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  }

  function enTete(d) {
    if (d.nom && d.role) return d.nom + ", " + roleAvecArticle(d.role);
    if (d.nom) return d.nom;
    if (d.role) return capitalise(roleAvecArticle(d.role));
    return "Un{e} citoyen{ne} de Ravenswood Bluff".replace("{e}", d.genre === "f" ? "e" : "")
      .replace("{ne}", d.genre === "f" ? "ne" : "");
  }

  function capitalise(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function partageTexte(d) {
    return enTete(d) + "\n\n« " + repliqueTexte(d) + " »\n\n— " + lienPartage(d);
  }

  /* ================================================================ */
  /*  Interface                                                       */
  /* ================================================================ */

  const $ = (sel) => document.querySelector(sel);
  const els = {
    card: $("#card"), entete: $("#entete"), replique: $("#replique"),
    badgeFin: $("#badge-fin"), badgeChaos: $("#badge-chaos"), badgeRole: $("#badge-role"),
    nom: $("#nom"), genre: $("#genre"), role: $("#role"), idee: $("#idee"),
    acc: $("#acc"), accGenre: $("#acc-genre"),
    accField: $("#acc-field"), accGenreField: $("#acc-genre-field"),
    chaos: $("#chaos"), chaosLabel: $("#chaos-label"),
    seed: $("#seed"), toast: $("#toast"), history: $("#history")
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
    let html = '<option value="">— je ne dis pas mon rôle —</option>';
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

  function rendre(d) {
    courant = d;
    els.entete.textContent = enTete(d);
    els.replique.innerHTML = replique(d);
    els.badgeFin.textContent = d.jour ? "Exécuté·e par le village" : "Mort·e pendant la nuit";
    els.badgeChaos.textContent = L.CHAOS_LABELS[d.opts.chaos];
    els.badgeRole.hidden = !d.sourceRole;
    els.seed.textContent = d.seed;

    els.card.classList.remove("is-rolling");
    void els.card.offsetWidth;
    els.card.classList.add("is-rolling");
    majURL(d);
  }

  function nouvelleMort() {
    const d = forger(newSeed(), optionsCourantes());
    rendre(d);
    archiver(d);
  }

  /* ------------------------------------------------------ archives --- */

  function archiver(d) {
    dossiers.unshift({ apercu: repliqueTexte(d).slice(0, 90), jour: d.jour, seed: d.seed, opts: d.opts });
    dossiers = dossiers.slice(0, 10);
    sauver();
    dessinerArchives();
  }

  function dessinerArchives() {
    if (!dossiers.length) {
      els.history.innerHTML = '<li class="empty">Rien pour l\'instant. Tu es encore en vie.</li>';
      return;
    }
    els.history.innerHTML = dossiers.map(function (e, i) {
      return '<li class="entry" data-i="' + i + '" tabindex="0" role="button">' +
        '<span class="h-no">' + (e.jour ? "⚖️" : "🌙") + "</span>" +
        '<span class="h-title">' + escapeHtml(e.apercu) + "…</span></li>";
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
    try { localStorage.setItem("raconte-ta-mort", JSON.stringify(dossiers)); } catch (e) { /* privé */ }
  }

  function charger() {
    try {
      const raw = localStorage.getItem("raconte-ta-mort");
      if (raw) dossiers = JSON.parse(raw) || [];
    } catch (e) { dossiers = []; }
    dessinerArchives();
  }

  /* --------------------------------------------------- permaliens ---- */

  function lienPartage(d) {
    const u = new URL(location.href);
    u.hash = "";
    u.search = "";
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
        fin: p.get("f") === "nuit" ? "nuit" : "jour",
        chaos: Math.min(4, Math.max(1, parseInt(p.get("c"), 10) || 3)),
        nom: p.get("n") || "",
        genre: p.get("x") || "auto",
        role: p.get("r") || "",
        idee: (p.get("i") || "").slice(0, 160),
        acc: p.get("a") || "",
        accGenre: p.get("y") || "auto"
      }
    };
  }

  function appliquerOptions(o) {
    setChip("#fin-chips", o.fin || "jour");
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
    catch (e) { toast("Copie impossible — sélectionne le texte à la main."); }
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

    $("#generate").addEventListener("click", nouvelleMort);
    $("#again").addEventListener("click", nouvelleMort);
    els.replique.addEventListener("click", nouvelleMort);

    $("#copy").addEventListener("click", function () {
      if (!courant) return toast("Tire d'abord une mort.");
      copier(partageTexte(courant), "Copié. Maintenant lis-le à voix haute.");
    });

    $("#permalink").addEventListener("click", function () {
      if (!courant) return toast("Tire d'abord une mort.");
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
      if (e.code === "Space" || e.key === "Enter") { e.preventDefault(); nouvelleMort(); }
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
      nouvelleMort();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.RaconteTaMort = { forger: forger, repliqueTexte: repliqueTexte, newSeed: newSeed };
})();
