/*!
 * Le Registre Macabre de Ravenswood Bluff — moteur de génération.
 * Aucune dépendance, aucun réseau : tout se joue dans le navigateur.
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
  /*  Accord en genre                                                 */
  /* ================================================================ */

  function accord(str, g) {
    const f = g === "f";
    return String(str)
      .replace(/\{e\}/g, f ? "e" : "")
      .replace(/\{il\}/g, f ? "elle" : "il")
      .replace(/\{Il\}/g, f ? "Elle" : "Il")
      .replace(/\{le\}/g, f ? "la" : "le")
      .replace(/\{un\}/g, f ? "une" : "un")
      .replace(/\{lui\}/g, f ? "elle" : "lui")
      .replace(/\{ce\}/g, f ? "cette" : "ce");
  }

  /** Devine le genre d'un prénom saisi à la main (heuristique française simple). */
  function devineGenre(nom) {
    const n = nom.trim().toLowerCase();
    if (!n) return null;
    const masculinsEnE = ["pierre", "philippe", "alexandre", "antoine", "étienne", "etienne",
      "jérôme", "jerome", "maxime", "côme", "come", "aristide", "jules", "charles", "gilles",
      "yannicke", "hervé", "rené", "andré", "aimé", "dominique", "claude", "camille", "sébastien"];
    if (masculinsEnE.indexOf(n) !== -1) return "m";
    if (/(a|e|ine|ette|elle|ense|ude)$/.test(n)) return "f";
    return "m";
  }

  /* ================================================================ */
  /*  Fabrique de morts                                               */
  /* ================================================================ */

  const CHAOS_MIX = {
    1: [["cause", 45], [1, 45], [2, 10]],
    2: [["cause", 35], [1, 15], [2, 40], [3, 10]],
    3: [["cause", 25], [2, 20], [3, 45], [4, 10]],
    4: [["cause", 12], [3, 33], [4, 55]]
  };

  function causesDisponibles(opts) {
    return L.CAUSES.filter(function (c) {
      const okScript = opts.script === "all" || c.script === opts.script || c.script === "all";
      const okPhase = opts.phase === "auto" || c.quand === "toujours" || c.quand === opts.phase;
      return okScript && okPhase;
    });
  }

  function tirerCause(rng, opts) {
    const pool = causesDisponibles(opts);
    return pool.length ? pick(rng, pool) : pick(rng, L.CAUSES);
  }

  function tirerVictime(rng, opts) {
    if (opts.nom) {
      const g = opts.genre !== "auto" ? opts.genre : (devineGenre(opts.nom) || "m");
      return { nom: opts.nom, genre: g, siege: range(rng, 1, 15) };
    }
    const g = opts.genre !== "auto" ? opts.genre : (rng() < 0.5 ? "f" : "m");
    const prenom = pick(rng, g === "f" ? L.PRENOMS_F : L.PRENOMS_M);
    const epithete = pick(rng, g === "f" ? L.EPITHETES_F : L.EPITHETES_M);
    return { nom: prenom + " " + epithete, genre: g, siege: range(rng, 1, 15) };
  }

  function tirerManiere(rng, opts, cause) {
    let choix = weighted(rng, CHAOS_MIX[opts.chaos] || CHAOS_MIX[3]);
    if (choix === "cause" && (!cause.manieres || !cause.manieres.length)) choix = opts.chaos;
    const pool = choix === "cause" ? cause.manieres : L.MANIERES[choix];
    return pick(rng, pool);
  }

  function tirerPhase(rng, cause, opts) {
    if (cause.quand !== "toujours") return cause.quand;
    if (opts.phase !== "auto") return opts.phase;
    return rng() < 0.5 ? "nuit" : "jour";
  }

  /** Construit un dossier complet, entièrement déterminé par (graine, options). */
  function forger(seed, opts) {
    const rng = mulberry32(hashSeed(seed + "|" + opts.script + "|" + opts.phase + "|" + opts.chaos + "|" + (opts.nom || "") + "|" + opts.genre));
    const cause = tirerCause(rng, opts);
    const victime = tirerVictime(rng, opts);
    const maniere = tirerManiere(rng, opts, cause);
    const lieu = pick(rng, cause.lieux || L.LIEUX);
    const moment = pick(rng, cause.moments || L.MOMENTS);
    const intro = pick(rng, cause.intro);
    const indice = pick(rng, L.INDICES);
    const mots = pick(rng, L.DERNIERS_MOTS);
    const verdict = pick(rng, L.VERDICTS);
    const phase = tirerPhase(rng, cause, opts);
    const cycle = range(rng, 1, 5);
    const dossier = String(range(rng, 1, 9999)).padStart(4, "0");

    return {
      seed: seed, opts: opts, cause: cause, victime: victime, maniere: maniere,
      lieu: lieu, moment: moment, intro: intro, indice: indice, mots: mots,
      verdict: verdict, phase: phase, cycle: cycle, dossier: dossier, surMesure: false
    };
  }

  /* ================================================================ */
  /*  Mise en mots                                                    */
  /* ================================================================ */

  function texteVictime(d) {
    return "<strong>" + escapeHtml(d.victime.nom) + "</strong>, siège n°" + d.victime.siege +
      ", " + (d.victime.genre === "f" ? "citoyenne" : "citoyen") + " de Ravenswood Bluff.";
  }

  function texteConstat(d) {
    const g = d.victime.genre;
    return accord("Retrouvé{e} " + d.maniere[0] + ", " + d.lieu + ", " + d.moment + ".", g);
  }

  function texteCause(d) {
    const g = d.victime.genre;
    return "<em>" + escapeHtml(capitalise(d.cause.nom)) + "</em> — " + escapeHtml(accord(d.intro, g));
  }

  function capitalise(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function titreAffaire(d) { return d.maniere[1]; }

  function nomScript(d) {
    return d.cause.script === "all" ? "Toutes éditions" : L.SCRIPTS[d.cause.script].nom;
  }

  function libellePhase(d) {
    return (d.phase === "jour" ? "Jour " : "Nuit ") + d.cycle;
  }

  function rapportTexte(d) {
    const g = d.victime.genre;
    return [
      "† " + titreAffaire(d).toUpperCase() + " †",
      "Registre macabre de Ravenswood Bluff — dossier n°" + d.dossier +
        " — " + libellePhase(d) + " — " + nomScript(d),
      "",
      "VICTIME : " + d.victime.nom + ", siège n°" + d.victime.siege + ".",
      "CONSTAT : " + accord("Retrouvé{e} " + d.maniere[0] + ", " + d.lieu + ", " + d.moment + ".", g),
      "CAUSE OFFICIELLE : " + capitalise(d.cause.nom) + " — " + accord(d.intro, g),
      "DÉTAIL TROUBLANT : " + accord(d.indice, g),
      "DERNIÈRES PAROLES : " + accord(d.mots, g),
      "VERDICT DU CONTEUR : " + d.verdict,
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
    badgeScript: $("#badge-script"), badgePhase: $("#badge-phase"), badgeChaos: $("#badge-chaos"),
    victime: $("#out-victime"), constat: $("#out-constat"), cause: $("#out-cause"),
    indice: $("#out-indice"), mots: $("#out-mots"), verdict: $("#out-verdict"),
    chaos: $("#chaos"), chaosLabel: $("#chaos-label"),
    nom: $("#victim-name"), genre: $("#victim-gender"),
    toast: $("#toast"), history: $("#history")
  };

  let courant = null;
  let dossiers = [];

  function optionsCourantes() {
    return {
      script: document.querySelector("#script-chips .is-on").dataset.value,
      phase: document.querySelector("#phase-chips .is-on").dataset.value,
      chaos: parseInt(els.chaos.value, 10),
      nom: els.nom.value.trim(),
      genre: els.genre.value
    };
  }

  function rendre(d, partiel) {
    courant = d;
    const parts = {
      victime: texteVictime(d),
      constat: escapeHtml(texteConstat(d)),
      cause: texteCause(d),
      indice: escapeHtml(accord(d.indice, d.victime.genre)),
      mots: escapeHtml(accord(d.mots, d.victime.genre)),
      verdict: escapeHtml(d.verdict)
    };

    Object.keys(parts).forEach(function (k) {
      els[k].innerHTML = parts[k];
      if (!partiel || partiel === k || (partiel === "cause" && k === "constat")) flash(k);
    });

    els.affair.textContent = titreAffaire(d);
    els.caseNo.textContent = d.dossier;
    els.badgeScript.textContent = nomScript(d);
    els.badgePhase.textContent = libellePhase(d);
    els.badgeChaos.textContent = L.CHAOS_LABELS[d.opts.chaos];
    els.seed.textContent = d.surMesure ? "sur mesure" : d.seed;

    if (!partiel) {
      els.card.classList.remove("is-rolling");
      void els.card.offsetWidth;
      els.card.classList.add("is-rolling");
      majURL(d);
    }
  }

  function flash(key) {
    const row = document.querySelector('.row[data-part="' + key + '"]');
    if (!row) return;
    row.classList.remove("flash");
    void row.offsetWidth;
    row.classList.add("flash");
  }

  function nouvelleMort() {
    const d = forger(newSeed(), optionsCourantes());
    rendre(d);
    archiver(d);
  }

  /* ---------------------------------------------------- relances ciblées */

  const relances = {
    victime: function (d, rng) { d.victime = tirerVictime(rng, d.opts); },
    constat: function (d, rng) {
      d.maniere = tirerManiere(rng, d.opts, d.cause);
      d.lieu = pick(rng, d.cause.lieux || L.LIEUX);
      d.moment = pick(rng, d.cause.moments || L.MOMENTS);
    },
    cause: function (d, rng) {
      d.cause = tirerCause(rng, d.opts);
      d.intro = pick(rng, d.cause.intro);
      d.maniere = tirerManiere(rng, d.opts, d.cause);
      d.lieu = pick(rng, d.cause.lieux || L.LIEUX);
      d.moment = pick(rng, d.cause.moments || L.MOMENTS);
      d.phase = tirerPhase(rng, d.cause, d.opts);
    },
    indice: function (d, rng) { d.indice = pick(rng, L.INDICES); },
    mots: function (d, rng) { d.mots = pick(rng, L.DERNIERS_MOTS); },
    verdict: function (d, rng) { d.verdict = pick(rng, L.VERDICTS); }
  };

  function relancer(part) {
    if (!courant) { nouvelleMort(); return; }
    relances[part](courant, Math.random);
    courant.surMesure = true;
    rendre(courant, part);
    majURL(courant);
  }

  /* ------------------------------------------------------------ archives */

  function archiver(d) {
    dossiers.unshift({
      titre: titreAffaire(d),
      victime: d.victime.nom,
      phase: libellePhase(d),
      seed: d.seed,
      opts: d.opts
    });
    dossiers = dossiers.slice(0, 12);
    sauver();
    dessinerArchives();
  }

  function dessinerArchives() {
    if (!dossiers.length) {
      els.history.innerHTML = '<li class="empty">Aucun dossier pour l\'instant. La nuit est jeune.</li>';
      return;
    }
    els.history.innerHTML = dossiers.map(function (e, i) {
      return '<li class="entry" data-i="' + i + '" tabindex="0" role="button">' +
        '<span class="h-no">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="h-title">' + escapeHtml(e.titre) + "</span>" +
        '<span class="h-sub">' + escapeHtml(e.victime) + " · " + escapeHtml(e.phase) + "</span>" +
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
    try { localStorage.setItem("registre-macabre", JSON.stringify(dossiers)); } catch (e) { /* privé */ }
  }

  function charger() {
    try {
      const raw = localStorage.getItem("registre-macabre");
      if (raw) dossiers = JSON.parse(raw) || [];
    } catch (e) { dossiers = []; }
    dessinerArchives();
  }

  /* --------------------------------------------------------- permaliens */

  function lienPartage(d) {
    const u = new URL(location.href);
    u.hash = "";
    u.search = "";
    if (d.surMesure) return u.toString();
    u.searchParams.set("g", d.seed);
    u.searchParams.set("s", d.opts.script);
    u.searchParams.set("p", d.opts.phase);
    u.searchParams.set("c", d.opts.chaos);
    if (d.opts.nom) u.searchParams.set("n", d.opts.nom);
    if (d.opts.genre !== "auto") u.searchParams.set("x", d.opts.genre);
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
        script: p.get("s") || "all",
        phase: p.get("p") || "auto",
        chaos: Math.min(4, Math.max(1, parseInt(p.get("c"), 10) || 3)),
        nom: p.get("n") || "",
        genre: p.get("x") || "auto"
      }
    };
  }

  function appliquerOptions(o) {
    setChip("#script-chips", o.script);
    setChip("#phase-chips", o.phase);
    els.chaos.value = o.chaos;
    els.chaosLabel.textContent = L.CHAOS_LABELS[o.chaos];
    els.nom.value = o.nom || "";
    els.genre.value = o.genre || "auto";
  }

  function setChip(groupSel, value) {
    document.querySelectorAll(groupSel + " .chip").forEach(function (c) {
      const on = c.dataset.value === value;
      c.classList.toggle("is-on", on);
      c.setAttribute("aria-checked", on ? "true" : "false");
    });
  }

  /* -------------------------------------------------------------- toasts */

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

  /* ------------------------------------------------------------ câblage */

  function init() {
    document.querySelectorAll("#script-chips .chip, #phase-chips .chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        setChip("#" + chip.parentElement.id, chip.dataset.value);
      });
    });

    els.chaos.addEventListener("input", function () {
      els.chaosLabel.textContent = L.CHAOS_LABELS[parseInt(els.chaos.value, 10)];
    });

    $("#generate").addEventListener("click", nouvelleMort);
    $("#again").addEventListener("click", nouvelleMort);

    document.querySelectorAll(".reroll").forEach(function (b) {
      b.addEventListener("click", function () { relancer(b.dataset.reroll); });
    });

    $("#copy").addEventListener("click", function () {
      if (!courant) return toast("Ouvrez d'abord un dossier.");
      copier(rapportTexte(courant), "Rapport copié — à lire d'une voix grave.");
    });

    $("#permalink").addEventListener("click", function () {
      if (!courant) return toast("Ouvrez d'abord un dossier.");
      if (courant.surMesure) return toast("Dossier retouché à la main : le permalien ne peut plus le reproduire.");
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
      nouvelleMort();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  /* Exposé pour d'éventuels tests hors navigateur. */
  window.RegistreMacabre = { forger: forger, rapportTexte: rapportTexte, accord: accord, newSeed: newSeed };
})();
