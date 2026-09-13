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
    if (opts.mode === "recit") return forgerRecit(seed, opts);
    return opts.mode === "execution" ? forgerExecution(seed, opts) : forgerMort(seed, opts);
  }

  function rngPour(seed, opts) {
    return mulberry32(hashSeed(
      seed + "|" + opts.mode + "|" + opts.script + "|" + opts.phase + "|" +
      opts.chaos + "|" + (opts.nom || "") + "|" + opts.genre + "|" +
      (opts.role || "") + "|" + (opts.idee || "") + "|" + (opts.acc || "") + "|" + (opts.accGenre || "")
    ));
  }

  function forgerMort(seed, opts) {
    const rng = rngPour(seed, opts);
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
      mode: "mort", seed: seed, opts: opts, cause: cause, victime: victime, maniere: maniere,
      lieu: lieu, moment: moment, intro: intro, indice: indice, mots: mots,
      verdict: verdict, phase: phase, cycle: cycle, dossier: dossier, surMesure: false
    };
  }

  /* ---------------------------------------------------- exécutions ----- */

  const CHAOS_MIX_EXEC = {
    1: [[1, 80], [2, 20]],
    2: [[1, 25], [2, 55], [3, 20]],
    3: [[2, 25], [3, 55], [4, 20]],
    4: [[3, 35], [4, 65]]
  };

  function tirerSupplice(rng, opts) {
    const tier = weighted(rng, CHAOS_MIX_EXEC[opts.chaos] || CHAOS_MIX_EXEC[3]);
    return pick(rng, L.MODES_EXECUTION[tier]);
  }

  /** Décompte de voix plausible : seuil à 50 % des vivants, Votes de Mort en appoint. */
  function tirerVote(rng) {
    const vivants = range(rng, 5, 15);
    const seuil = Math.ceil(vivants / 2);
    const morts = range(rng, 0, 3);
    const voix = range(rng, seuil, Math.min(vivants + morts, seuil + 5));
    const votesDeMort = Math.min(morts, voix);
    return { vivants: vivants, seuil: seuil, voix: voix, votesDeMort: votesDeMort, note: pick(rng, L.NOTES_DE_VOTE) };
  }

  function tirerRevelation(rng, opts) {
    const dispo = L.REVELATIONS.filter(function (r) {
      return opts.script === "all" || r.script === opts.script || r.script === "all";
    });
    const camps = Object.keys(L.POIDS_REVELATION)
      .filter(function (c) { return dispo.some(function (r) { return r.camp === c; }); })
      .map(function (c) { return [c, L.POIDS_REVELATION[c]]; });
    const camp = weighted(rng, camps);
    return pick(rng, dispo.filter(function (r) { return r.camp === camp; }));
  }

  function forgerExecution(seed, opts) {
    const rng = rngPour(seed, opts);
    const accuse = tirerVictime(rng, opts);
    const nommant = tirerVictime(rng, { script: opts.script, phase: opts.phase, chaos: opts.chaos, nom: "", genre: "auto", mode: opts.mode });
    if (nommant.siege === accuse.siege) nommant.siege = (accuse.siege % 15) + 1;
    const nommantNote = pick(rng, L.MOTS_DU_NOMMANT);
    const accusation = pick(rng, L.ACCUSATIONS);
    const preuve = pick(rng, L.PREUVES);
    const defense = pick(rng, L.PLAIDOYERS);
    const vote = tirerVote(rng);
    const supplice = tirerSupplice(rng, opts);
    const revelation = tirerRevelation(rng, opts);
    const verdict = pick(rng, L.VERDICTS_EXECUTION);
    const cycle = range(rng, 1, 5);
    const dossier = String(range(rng, 1, 9999)).padStart(4, "0");

    return {
      mode: "execution", seed: seed, opts: opts, victime: accuse, nommant: nommant,
      nommantNote: nommantNote,
      accusation: accusation, preuve: preuve, defense: defense, vote: vote,
      maniere: supplice, revelation: revelation, verdict: verdict,
      phase: "jour", cycle: cycle, dossier: dossier, surMesure: false
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
    if (d.mode === "execution" || d.mode === "recit") {
      return d.opts.script === "all" ? "Toutes éditions" : L.SCRIPTS[d.opts.script].nom;
    }
    return d.cause.script === "all" ? "Toutes éditions" : L.SCRIPTS[d.cause.script].nom;
  }

  function libellePhase(d) {
    if (d.mode === "recit") return (d.jour ? "Jour " : "Nuit ") + d.cycle;
    return (d.phase === "jour" ? "Jour " : "Nuit ") + d.cycle;
  }

  /* ------------------------------------------- textes de l'exécution --- */

  function texteAccuse(d) {
    return "<strong>" + escapeHtml(d.victime.nom) + "</strong>, siège n°" + d.victime.siege +
      ", " + (d.victime.genre === "f" ? "citoyenne" : "citoyen") + " de Ravenswood Bluff.";
  }

  function texteNommant(d) {
    return escapeHtml(d.nommant.nom) + ", siège n°" + d.nommant.siege + ", " +
      escapeHtml(accord(d.nommantNote, d.nommant.genre)) + ".";
  }

  function texteAccusation(d) {
    return "Accusé" + (d.victime.genre === "f" ? "e" : "") + " " +
      escapeHtml(accord(d.accusation, d.victime.genre)) + ".";
  }

  function texteVote(d) {
    const v = d.vote;
    const dont = v.votesDeMort > 0
      ? ", dont " + v.votesDeMort + " Vote" + (v.votesDeMort > 1 ? "s" : "") + " de Mort"
      : ", sans un seul Vote de Mort"; 
    return '<span class="tally">' + v.voix + " voix pour, " + v.seuil + " requise" +
      (v.seuil > 1 ? "s" : "") + " (" + v.vivants + " joueurs en vie)</span>" +
      escapeHtml(dont) + ". " + escapeHtml(v.note);
  }

  function texteSupplice(d) {
    return escapeHtml(accord("Exécuté{e} publiquement, " + minuscule(d.maniere[0]) + ".", d.victime.genre));
  }

  /** Retire le participe initial des modes déjà rédigés comme « exécuté{e} … ». */
  function minuscule(s) {
    return s.replace(/^exécuté\{e\}\s+/, "").replace(/^Exécuté\{e\}\s+/, "");
  }

  function texteRevelation(d) {
    const r = d.revelation;
    return '<span class="camp" data-camp="' + r.camp + '">' + L.LIBELLES_CAMP[r.camp] + "</span>" +
      escapeHtml(accord(r.texte, d.victime.genre));
  }

  /* ================================================================ */
  /*  Le récit : à partir des vraies infos de la partie               */
  /* ================================================================ */

  /** Accord propre à l'accusateur : marqueurs entre crochets. */
  function accordAcc(str, g) {
    const f = g === "f";
    return String(str)
      .replace(/\[e\]/g, f ? "e" : "")
      .replace(/\[il\]/g, f ? "elle" : "il")
      .replace(/\[Il\]/g, f ? "Elle" : "Il");
  }

  function roleParId(id) {
    for (let i = 0; i < L.ROLES.length; i++) if (L.ROLES[i].id === id) return L.ROLES[i];
    return null;
  }

  function roleAvecArticle(r) {
    return r.art === "l'" ? "l'" + r.nom : r.art + " " + r.nom;
  }

  /** Nettoie l'idée saisie : pas de balise, pas de point final en double. */
  function nettoyerIdee(txt) {
    return String(txt || "").replace(/\s+/g, " ").trim().replace(/[.;,]+$/, "").slice(0, 180);
  }

  function forgerRecit(seed, opts) {
    const rng = rngPour(seed, opts);
    const jour = opts.fin === "jour";
    const role = opts.role ? roleParId(opts.role) : null;

    const victime = opts.nom
      ? { nom: opts.nom, genre: opts.genre !== "auto" ? opts.genre : (devineGenre(opts.nom) || "m"), siege: range(rng, 1, 15) }
      : tirerVictime(rng, opts);

    const accGenre = opts.accGenre !== "auto" ? opts.accGenre : (devineGenre(opts.acc) || "f");
    const nomAcc = opts.acc || tirerVictime(rng, { script: opts.script, phase: "jour", chaos: opts.chaos, nom: "", genre: accGenre, mode: "recit" }).nom;
    const accusateur = { nom: nomAcc, genre: accGenre };

    /* Une cause n'a de sens que pour une mort nocturne. */
    const causesNuit = L.CAUSES.filter(function (c) {
      const okScript = opts.script === "all" || c.script === opts.script || c.script === "all";
      return okScript && (c.quand === "nuit" || c.quand === "toujours");
    });
    const cause = jour ? null : (causesNuit.length ? pick(rng, causesNuit) : pick(rng, L.CAUSES));

    const maniere = jour ? tirerSupplice(rng, opts) : tirerManiere(rng, opts, cause);
    const lieu = pick(rng, (cause && cause.lieux) || L.LIEUX);
    const moment = pick(rng, (cause && cause.moments) || L.MOMENTS);

    return {
      mode: "recit", seed: seed, opts: opts, jour: jour, role: role,
      victime: victime, accusateur: accusateur,
      idee: nettoyerIdee(opts.idee),
      cause: cause, maniere: maniere, lieu: lieu, moment: moment,
      ouverture: pick(rng, jour ? L.OUVERTURES_JOUR : L.OUVERTURES_NUIT),
      intro: cause ? pick(rng, cause.intro) : "",
      amorce: pick(rng, jour ? L.AMORCES_IDEE_JOUR : L.AMORCES_IDEE),
      accusation: pick(rng, L.ACCUSATIONS),
      preuve: pick(rng, L.PREUVES),
      defense: pick(rng, L.PLAIDOYERS),
      vote: tirerVote(rng),
      indice: pick(rng, L.INDICES),
      mots: pick(rng, L.DERNIERS_MOTS),
      rapporteur: pick(rng, L.RAPPORTEURS),
      clinRole: tirerClinRole(rng, role, jour),
      verdict: pick(rng, jour ? L.VERDICTS_EXECUTION : L.VERDICTS),
      cloture: pick(rng, L.CLOTURES),
      cycle: range(rng, 1, 5),
      dossier: String(range(rng, 1, 9999)).padStart(4, "0"),
      surMesure: false
    };
  }

  function tirerClinRole(rng, role, jour) {
    const cle = jour ? "exec" : "nuit";
    if (role && role[cle]) return role[cle];
    const type = role ? role.type : pick(rng, ["village", "village", "marginal", "sbire"]);
    return pick(rng, L.RECIT_ROLE_GENERIQUE[cle][type]);
  }

  /** Assemble les paragraphes. Renvoie [{ cle, html }]. */
  function paragraphesRecit(d) {
    const g = d.victime.genre;
    const nomHtml = "<strong>" + escapeHtml(d.victime.nom) + "</strong>";
    const roleHtml = d.role ? ", " + escapeHtml(roleAvecArticle(d.role)) + "," : "";
    const accHtml = "<strong>" + escapeHtml(d.accusateur.nom) + "</strong>";

    const remplir = function (tpl) {
      return accordAcc(accord(tpl, g), d.accusateur.genre)
        .replace(/\{nom\}/g, nomHtml)
        .replace(/\{role\}/g, roleHtml)
        .replace(/\{acc\}/g, accHtml)
        .replace(/,\s*([.!?;:])/g, "$1")
        .replace(/,\s*,/g, ",");
    };

    const paras = [];

    paras.push({ cle: "ouverture", html: remplir(d.ouverture) });

    if (d.idee) {
      paras.push({
        cle: "idee",
        html: escapeHtml(accord(d.amorce, g)) + " <em>«&nbsp;" + escapeHtml(d.idee) + "&nbsp;»</em>." +
          (d.jour ? " Le village en a fait tout un dossier." : " Cela n'a servi strictement à rien.")
      });
    }

    if (d.jour) {
      paras.push({
        cle: "deroule",
        html: escapeHtml(accord("Le chef d'accusation tenait en une phrase : accusé{e} " + d.accusation + ".", g)) +
          " " + escapeHtml(accord(d.preuve, g)) +
          " Pour toute défense, " + (g === "f" ? "l'accusée" : "l'accusé") + " a répondu : " +
          '<span class="dit">' + escapeHtml(accord(d.defense, g)) + "</span>"
      });
      const v = d.vote;
      const dont = v.votesDeMort > 0
        ? ", dont " + v.votesDeMort + " Vote" + (v.votesDeMort > 1 ? "s" : "") + " de Mort"
        : ", sans un seul Vote de Mort";
      paras.push({
        cle: "consequence",
        html: "Le vote a donné " + '<span class="tally">' + v.voix + " voix" + escapeHtml(dont) +
          "</span>, pour " + v.seuil + " requise" + (v.seuil > 1 ? "s" : "") + " sur " + v.vivants +
          " joueurs en vie. " + escapeHtml(v.note) + " " +
          escapeHtml(accord("Exécuté{e} publiquement, " + minuscule(d.maniere[0]) + ".", g))
      });
    } else {
      paras.push({
        cle: "deroule",
        html: escapeHtml(accord(d.intro, g)) + " " +
          escapeHtml(accord("Retrouvé{e} " + d.maniere[0] + ", " + d.lieu + ", " + d.moment + ".", g))
      });
      paras.push({
        cle: "consequence",
        html: escapeHtml(accord(d.indice, g)) +
          " Ses derniers mots, " + escapeHtml(d.rapporteur) + " : " +
          '<span class="dit">' + escapeHtml(accord(d.mots, g)) + "</span>"
      });
    }

    paras.push({
      cle: "role",
      html: (d.role ? "<em>" + escapeHtml(capitalise(roleAvecArticle(d.role))) + ".</em> " : "") +
        escapeHtml(accord(d.clinRole, g))
    });

    paras.push({ cle: "fin", html: escapeHtml(d.verdict) + " " + escapeHtml(d.cloture) });

    return paras;
  }

  function titreRecit(d) { return d.maniere[1]; }

  function recitTexte(d) {
    const brut = paragraphesRecit(d).map(function (p) {
      return p.html.replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    });
    return [
      (d.jour ? "⚖ " : "† ") + titreRecit(d).toUpperCase() + (d.jour ? " ⚖" : " †"),
      "Ravenswood Bluff — " + (d.jour ? "Jour " : "Nuit ") + d.cycle +
        " — dossier n°" + d.dossier + " — " + (d.opts.script === "all" ? "Toutes éditions" : L.SCRIPTS[d.opts.script].nom),
      "",
      brut.join("\n\n"),
      "",
      "Graine : " + (d.surMesure ? "sur mesure" : d.seed) + " — " + lienPartage(d)
    ].join("\n");
  }

  function rapportTexte(d) {
    if (d.mode === "recit") return recitTexte(d);
    return d.mode === "execution" ? rapportExecutionTexte(d) : rapportMortTexte(d);
  }

  function rapportMortTexte(d) {
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

  function rapportExecutionTexte(d) {
    const g = d.victime.genre;
    const v = d.vote;
    const dont = v.votesDeMort > 0
      ? ", dont " + v.votesDeMort + " Vote" + (v.votesDeMort > 1 ? "s" : "") + " de Mort"
      : ", sans un seul Vote de Mort";
    return [
      "⚖ " + titreAffaire(d).toUpperCase() + " ⚖",
      "Procès-verbal du village de Ravenswood Bluff — dossier n°" + d.dossier +
        " — " + libellePhase(d) + " — " + nomScript(d),
      "",
      "ACCUSÉ" + (g === "f" ? "E" : "") + " : " + d.victime.nom + ", siège n°" + d.victime.siege + ".",
      "NOMMÉ" + (g === "f" ? "E" : "") + " PAR : " + d.nommant.nom + ", siège n°" + d.nommant.siege +
        ", " + accord(d.nommantNote, d.nommant.genre) + ".",
      "CHEF D'ACCUSATION : " + accord("Accusé{e} " + d.accusation + ".", g),
      "PIÈCE À CONVICTION : " + accord(d.preuve, g),
      "DÉFENSE : " + accord(d.defense, g),
      "LE VOTE : " + v.voix + " voix pour, " + v.seuil + " requise" + (v.seuil > 1 ? "s" : "") +
        " (" + v.vivants + " joueurs en vie)" + dont + ". " + v.note,
      "EXÉCUTION : " + accord("Exécuté{e} publiquement, " + minuscule(d.maniere[0]) + ".", g),
      "RÉVÉLATION [" + L.LIBELLES_CAMP[d.revelation.camp].toUpperCase() + "] : " + accord(d.revelation.texte, g),
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
    registry: $("#registry-label"), summonLabel: $("#summon-label"), victimLabel: $("#lbl-victim"),
    reportMort: $("#report-mort"), reportExec: $("#report-execution"), reportRecit: $("#report-recit"),
    phaseGroup: $("#phase-group"), victimField: $("#victim-field"), recitForm: $("#recit-form"),
    rNom: $("#recit-nom"), rGenre: $("#recit-genre"), rRole: $("#recit-role"),
    rIdee: $("#recit-idee"), rAcc: $("#recit-acc"), rAccGenre: $("#recit-acc-genre"),
    accField: $("#acc-field"), accGenreField: $("#acc-genre-field"),
    badgeScript: $("#badge-script"), badgePhase: $("#badge-phase"), badgeChaos: $("#badge-chaos"),
    victime: $("#out-victime"), constat: $("#out-constat"), cause: $("#out-cause"),
    indice: $("#out-indice"), mots: $("#out-mots"), verdict: $("#out-verdict"),
    accuse: $("#out-accuse"), nommant: $("#out-nommant"), accusation: $("#out-accusation"),
    preuve: $("#out-preuve"), defense: $("#out-defense"), vote: $("#out-vote"),
    supplice: $("#out-supplice"), revelation: $("#out-revelation"), verdictx: $("#out-verdictx"),
    chaos: $("#chaos"), chaosLabel: $("#chaos-label"),
    nom: $("#victim-name"), genre: $("#victim-gender"),
    toast: $("#toast"), history: $("#history"), hint: $("#hint")
  };

  let courant = null;
  let dossiers = [];
  let mode = "mort";

  function optionsCourantes() {
    if (mode === "recit") {
      return {
        mode: "recit",
        script: document.querySelector("#script-chips .is-on").dataset.value,
        phase: document.querySelector("#fin-chips .is-on").dataset.value,
        fin: document.querySelector("#fin-chips .is-on").dataset.value,
        chaos: parseInt(els.chaos.value, 10),
        nom: els.rNom.value.trim(),
        genre: els.rGenre.value,
        role: els.rRole.value,
        idee: els.rIdee.value.trim(),
        acc: els.rAcc.value.trim(),
        accGenre: els.rAccGenre.value
      };
    }
    return {
      mode: mode,
      script: document.querySelector("#script-chips .is-on").dataset.value,
      phase: mode === "execution" ? "jour" : document.querySelector("#phase-chips .is-on").dataset.value,
      chaos: parseInt(els.chaos.value, 10),
      nom: els.nom.value.trim(),
      genre: els.genre.value
    };
  }

  /** Remplit la liste des rôles, groupée par script puis par type. */
  function peuplerRoles() {
    const ordre = [
      ["village", "Villageois"], ["marginal", "Marginaux"],
      ["sbire", "Sbires"], ["demon", "Démons"]
    ];
    let html = '<option value="">— je préfère ne pas le dire —</option>';
    Object.keys(L.SCRIPTS).forEach(function (s) {
      ordre.forEach(function (pair) {
        const lot = L.ROLES.filter(function (r) { return r.script === s && r.type === pair[0]; });
        if (!lot.length) return;
        html += '<optgroup label="' + L.SCRIPTS[s].court + " · " + pair[1] + '">';
        lot.forEach(function (r) {
          html += '<option value="' + r.id + '">' + escapeHtml(r.nom) + "</option>";
        });
        html += "</optgroup>";
      });
    });
    els.rRole.innerHTML = html;
  }

  function appliquerMode(m) {
    mode = (m === "execution" || m === "recit") ? m : "mort";
    document.querySelectorAll(".mode").forEach(function (b) {
      const on = b.dataset.mode === mode;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    const exec = mode === "execution";
    const recit = mode === "recit";
    els.reportMort.hidden = mode !== "mort";
    els.reportExec.hidden = !exec;
    els.reportRecit.hidden = !recit;
    els.phaseGroup.hidden = exec || recit;
    els.victimField.hidden = recit;
    els.recitForm.hidden = !recit;
    const jour = recit && document.querySelector("#fin-chips .is-on").dataset.value === "jour";
    els.accField.hidden = !jour;
    els.accGenreField.hidden = !jour;
    els.registry.textContent = recit ? "Le récit de ta partie"
      : exec ? "Procès-verbal du village" : "Registre macabre";
    els.summonLabel.textContent = recit ? "Écrire mon récit"
      : exec ? "Rendre la sentence" : "Annoncer une mort";
    els.victimLabel.textContent = exec ? "Accusé·e (facultatif)" : "Victime (facultatif)";
    els.hint.textContent = recit
      ? "cliquez sur un paragraphe pour le réécrire"
      : "⟳ relance une seule ligne du rapport";
  }

  function rendre(d, partiel) {
    courant = d;
    appliquerMode(d.mode);
    const g = d.victime.genre;

    if (d.mode === "recit") {
      const paras = paragraphesRecit(d);
      els.reportRecit.innerHTML = paras.map(function (p) {
        return '<p class="recit-p" data-part="' + p.cle +
          '" role="button" tabindex="0" title="Cliquez pour réécrire ce paragraphe">' + p.html + "</p>";
      }).join("");
      if (partiel) {
        const cible = els.reportRecit.querySelector('[data-part="' + partiel + '"]');
        if (cible) { void cible.offsetWidth; cible.classList.add("flash"); }
      }
    } else {
      const parts = d.mode === "execution" ? {
        accuse: texteAccuse(d),
        nommant: texteNommant(d),
        accusation: texteAccusation(d),
        preuve: escapeHtml(accord(d.preuve, g)),
        defense: escapeHtml(accord(d.defense, g)),
        vote: texteVote(d),
        supplice: texteSupplice(d),
        revelation: texteRevelation(d),
        verdictx: escapeHtml(d.verdict)
      } : {
        victime: texteVictime(d),
        constat: escapeHtml(texteConstat(d)),
        cause: texteCause(d),
        indice: escapeHtml(accord(d.indice, g)),
        mots: escapeHtml(accord(d.mots, g)),
        verdict: escapeHtml(d.verdict)
      };

      Object.keys(parts).forEach(function (k) {
        els[k].innerHTML = parts[k];
        if (!partiel || partiel === k || (partiel === "cause" && k === "constat")) flash(k);
      });
    }

    els.affair.textContent = d.mode === "recit" ? titreRecit(d) : titreAffaire(d);
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

  function nouveauRapport() {
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
    verdict: function (d, rng) { d.verdict = pick(rng, L.VERDICTS); },

    /* --- procès-verbal d'exécution --- */
    accuse: function (d, rng) { d.victime = tirerVictime(rng, d.opts); },
    nommant: function (d, rng) {
      d.nommant = tirerVictime(rng, { script: d.opts.script, phase: d.opts.phase, chaos: d.opts.chaos, nom: "", genre: "auto", mode: d.opts.mode });
      if (d.nommant.siege === d.victime.siege) d.nommant.siege = (d.victime.siege % 15) + 1;
      d.nommantNote = pick(rng, L.MOTS_DU_NOMMANT);
    },
    accusation: function (d, rng) { d.accusation = pick(rng, L.ACCUSATIONS); },
    preuve: function (d, rng) { d.preuve = pick(rng, L.PREUVES); },
    defense: function (d, rng) { d.defense = pick(rng, L.PLAIDOYERS); },
    vote: function (d, rng) { d.vote = tirerVote(rng); },
    supplice: function (d, rng) { d.maniere = tirerSupplice(rng, d.opts); },
    revelation: function (d, rng) { d.revelation = tirerRevelation(rng, d.opts); },
    verdictx: function (d, rng) { d.verdict = pick(rng, L.VERDICTS_EXECUTION); },

    /* --- récit personnalisé : un paragraphe à la fois --- */
    ouverture: function (d, rng) {
      d.ouverture = pick(rng, d.jour ? L.OUVERTURES_JOUR : L.OUVERTURES_NUIT);
    },
    idee: function (d, rng) {
      d.amorce = pick(rng, d.jour ? L.AMORCES_IDEE_JOUR : L.AMORCES_IDEE);
    },
    deroule: function (d, rng) {
      if (d.jour) {
        d.accusation = pick(rng, L.ACCUSATIONS);
        d.preuve = pick(rng, L.PREUVES);
        d.defense = pick(rng, L.PLAIDOYERS);
      } else {
        const pool = L.CAUSES.filter(function (c) {
          const okScript = d.opts.script === "all" || c.script === d.opts.script || c.script === "all";
          return okScript && (c.quand === "nuit" || c.quand === "toujours");
        });
        d.cause = pick(rng, pool.length ? pool : L.CAUSES);
        d.intro = pick(rng, d.cause.intro);
        d.maniere = tirerManiere(rng, d.opts, d.cause);
        d.lieu = pick(rng, d.cause.lieux || L.LIEUX);
        d.moment = pick(rng, d.cause.moments || L.MOMENTS);
      }
    },
    consequence: function (d, rng) {
      if (d.jour) {
        d.vote = tirerVote(rng);
        d.maniere = tirerSupplice(rng, d.opts);
      } else {
        d.indice = pick(rng, L.INDICES);
        d.mots = pick(rng, L.DERNIERS_MOTS);
        d.rapporteur = pick(rng, L.RAPPORTEURS);
      }
    },
    role: function (d, rng) { d.clinRole = tirerClinRole(rng, d.role, d.jour); },
    fin: function (d, rng) {
      d.verdict = pick(rng, d.jour ? L.VERDICTS_EXECUTION : L.VERDICTS);
      d.cloture = pick(rng, L.CLOTURES);
    }
  };

  function relancer(part) {
    if (!courant || !relances[part]) { nouveauRapport(); return; }
    relances[part](courant, Math.random);
    courant.surMesure = true;
    rendre(courant, part);
    majURL(courant);
  }

  /* ------------------------------------------------------------ archives */

  function archiver(d) {
    dossiers.unshift({
      mode: d.mode,
      titre: d.mode === "recit" ? titreRecit(d) : titreAffaire(d),
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
    const icones = { execution: "⚖️", recit: "✍️", mort: "🌙" };
    els.history.innerHTML = dossiers.map(function (e, i) {
      return '<li class="entry' + (e.mode === "execution" ? " is-exec" : "") + '" data-i="' + i + '" tabindex="0" role="button">' +
        '<span class="h-no">' + (icones[e.mode] || "🌙") + "</span>" +
        '<span class="h-title">' + escapeHtml(e.titre) + "</span>" +
        '<span class="h-sub">' + escapeHtml(e.victime) + " · " + escapeHtml(e.phase) + "</span>" +
        "</li>";
    }).join("");
  }

  function restaurer(i) {
    const e = dossiers[i];
    if (!e) return;
    const opts = e.opts;
    opts.mode = opts.mode || e.mode || "mort";
    appliquerMode(opts.mode);
    appliquerOptions(opts);
    rendre(forger(e.seed, opts));
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
    u.searchParams.set("m", d.mode);
    u.searchParams.set("s", d.opts.script);
    if (d.mode === "mort") u.searchParams.set("p", d.opts.phase);
    u.searchParams.set("c", d.opts.chaos);
    if (d.mode === "recit") {
      u.searchParams.set("f", d.opts.fin);
      if (d.opts.nom) u.searchParams.set("n", d.opts.nom);
      if (d.opts.genre !== "auto") u.searchParams.set("x", d.opts.genre);
      if (d.opts.role) u.searchParams.set("r", d.opts.role);
      if (d.opts.idee) u.searchParams.set("i", d.opts.idee);
      if (d.opts.acc) u.searchParams.set("a", d.opts.acc);
      if (d.opts.accGenre !== "auto") u.searchParams.set("y", d.opts.accGenre);
      return u.toString();
    }
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
    const brut = p.get("m");
    const m = (brut === "execution" || brut === "recit") ? brut : "mort";
    const opts = {
      mode: m,
      script: p.get("s") || "all",
      phase: m === "execution" ? "jour" : (p.get("p") || "auto"),
      chaos: Math.min(4, Math.max(1, parseInt(p.get("c"), 10) || 3)),
      nom: p.get("n") || "",
      genre: p.get("x") || "auto"
    };
    if (m === "recit") {
      opts.fin = p.get("f") === "jour" ? "jour" : "nuit";
      opts.phase = opts.fin;
      opts.role = p.get("r") || "";
      opts.idee = (p.get("i") || "").slice(0, 180);
      opts.acc = p.get("a") || "";
      opts.accGenre = p.get("y") || "auto";
    }
    return { seed: p.get("g"), opts: opts };
  }

  function appliquerOptions(o) {
    setChip("#script-chips", o.script);
    if (o.mode === "mort") setChip("#phase-chips", o.phase);
    els.chaos.value = o.chaos;
    els.chaosLabel.textContent = L.CHAOS_LABELS[o.chaos];
    if (o.mode === "recit") {
      setChip("#fin-chips", o.fin || "nuit");
      els.rNom.value = o.nom || "";
      els.rGenre.value = o.genre || "auto";
      els.rRole.value = o.role || "";
      els.rIdee.value = o.idee || "";
      els.rAcc.value = o.acc || "";
      els.rAccGenre.value = o.accGenre || "auto";
    } else {
      els.nom.value = o.nom || "";
      els.genre.value = o.genre || "auto";
    }
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
    peuplerRoles();

    document.querySelectorAll(".mode").forEach(function (b) {
      b.addEventListener("click", function () {
        if (mode === b.dataset.mode) return;
        appliquerMode(b.dataset.mode);
        nouveauRapport();
      });
    });

    document.querySelectorAll("#script-chips .chip, #phase-chips .chip, #fin-chips .chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        setChip("#" + chip.parentElement.id, chip.dataset.value);
        if (chip.parentElement.id === "fin-chips") {
          const jour = chip.dataset.value === "jour";
          els.accField.hidden = !jour;
          els.accGenreField.hidden = !jour;
        }
      });
    });

    els.reportRecit.addEventListener("click", function (e) {
      const p = e.target.closest(".recit-p");
      if (p) relancer(p.dataset.part);
    });
    els.reportRecit.addEventListener("keydown", function (e) {
      const p = e.target.closest(".recit-p");
      if (p && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); relancer(p.dataset.part); }
    });

    els.chaos.addEventListener("input", function () {
      els.chaosLabel.textContent = L.CHAOS_LABELS[parseInt(els.chaos.value, 10)];
    });

    $("#generate").addEventListener("click", nouveauRapport);
    $("#again").addEventListener("click", nouveauRapport);

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
      if (e.code === "Space" || e.key === "Enter") { e.preventDefault(); nouveauRapport(); }
      else if (e.key === "c" || e.key === "C") { $("#copy").click(); }
      else if (e.key === "p" || e.key === "P") { $("#permalink").click(); }
      else if (e.key === "m" || e.key === "M") {
        const suite = { mort: "execution", execution: "recit", recit: "mort" };
        appliquerMode(suite[mode]);
        nouveauRapport();
      }
    });

    charger();

    const depuisURL = lireURL();
    if (depuisURL) {
      appliquerMode(depuisURL.opts.mode);
      appliquerOptions(depuisURL.opts);
      rendre(forger(depuisURL.seed, depuisURL.opts));
    } else {
      nouveauRapport();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  /* Exposé pour d'éventuels tests hors navigateur. */
  window.RegistreMacabre = { forger: forger, rapportTexte: rapportTexte, accord: accord, newSeed: newSeed };
})();
