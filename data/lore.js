/*!
 * Le Registre Macabre de Ravenswood Bluff
 * Tables de lore pour le générateur de morts loufoques (Blood on the Clocktower).
 *
 * Convention d'accord en genre :
 *   {e}    -> "" (masc.) / "e" (fém.)
 *   {il}   -> il / elle          {Il} -> Il / Elle
 *   {le}   -> le / la            {un} -> un / une
 *   {lui}  -> lui / elle         {ce} -> ce / cette
 *
 * Chaque « manière de mourir » est un couple : [description, titre de l'affaire].
 */
(function (global) {
  "use strict";

  /* ------------------------------------------------------------------ */
  /*  IDENTITÉS                                                          */
  /* ------------------------------------------------------------------ */

  const PRENOMS_M = [
    "Aldric", "Ambroise", "Anselme", "Balthazar", "Barnabé", "Cornélius",
    "Corvus", "Dorian", "Edmond", "Eustache", "Faustin", "Grégoire",
    "Hector", "Ignace", "Jasper", "Killian", "Lucien", "Mortimer",
    "Nicodème", "Octave", "Prosper", "Quentin", "Roderick", "Séverin",
    "Silas", "Thaddée", "Ulric", "Valérien", "Wilfrid", "Zacharie"
  ];

  const PRENOMS_F = [
    "Agathe", "Anastasie", "Béatrix", "Bérénice", "Célestine", "Clémence",
    "Delphine", "Élisabeth", "Eudoxie", "Florine", "Gwendoline", "Hortense",
    "Isaure", "Joséphine", "Kassandre", "Léonore", "Marguerite", "Morgane",
    "Nerissa", "Ombeline", "Perpétue", "Philomène", "Rosemonde", "Sidonie",
    "Théodora", "Ursule", "Vespérine", "Wilhelmine", "Ysolde", "Zéphyrine"
  ];

  const EPITHETES_M = [
    "le Meunier", "le Fossoyeur", "le Sonneur de cloches", "le Ferblantier",
    "l'Apothicaire", "le Chandelier", "le Rémouleur", "le Tavernier",
    "le Sacristain", "le Bourrelier", "le Cordier", "le Charbonnier",
    "l'Horloger", "le Passeur", "le Boulanger", "le Bedeau",
    "le Chasse-corbeaux", "le Colporteur", "le Gardien du Puits",
    "le Marchand de bougies", "le Cureur de gouttières", "le Compteur d'heures",
    "le Graisseur d'engrenages", "le Veilleur de nuit"
  ];

  const EPITHETES_F = [
    "la Brodeuse", "la Fossoyeuse", "la Sonneuse de cloches", "la Tavernière",
    "l'Apothicairesse", "la Lavandière", "la Cartomancienne", "la Chandelière",
    "la Boulangère", "la Ravaudeuse", "la Gardienne du Puits",
    "la Marchande de bougies", "la Guérisseuse", "l'Herboriste", "la Fileuse",
    "la Passeuse", "la Verrière", "la Rebouteuse", "la Souffleuse de verre",
    "la Compteuse d'heures", "la Cireuse de cloches", "la Veilleuse de nuit",
    "la Dresseuse de chats", "la Trieuse de lentilles"
  ];

  /* ------------------------------------------------------------------ */
  /*  DÉCOR                                                              */
  /* ------------------------------------------------------------------ */

  const LIEUX = [
    "sur la place du village, à trois pas du puits",
    "dans la taverne du Fou Rieur, entre deux chaises renversées",
    "au pied du beffroi, sous l'aiguille des minutes",
    "dans l'escalier en colimaçon de l'horloge",
    "au fond du puits communal, à sec depuis 1622",
    "derrière l'échoppe de l'Apothicaire, parmi les bocaux",
    "dans la crypte des Fondateurs, porte close de l'intérieur",
    "au moulin, la roue tournant encore à contretemps",
    "dans la bibliothèque du Savant, section « poisons — usage domestique »",
    "sous le pont de pierre, côté aval",
    "dans le potager de la Mégère, entre les choux",
    "au cimetière, dans une tombe déjà occupée",
    "dans la grange à foin, à quatre mètres du sol",
    "sur le toit de la boulangerie, les bras en croix",
    "dans le clocher, coincé{e} entre deux cloches",
    "au lavoir, les pieds parfaitement secs",
    "dans la forge éteinte, l'enclume manquante",
    "au bord de l'étang aux grenouilles, désormais silencieux",
    "dans la charrette du Colporteur, sous les étoffes",
    "sur le banc du conseil, à la place du Maire",
    "dans le cellier, derrière quatorze tonneaux",
    "au carrefour des Trois-Corbeaux",
    "dans l'atelier du Bricoleur, entouré{e} d'engrenages inutiles",
    "sous la table du vote, en position de repli",
    "dans le confessionnal, du mauvais côté de la grille",
    "au sommet de la colline, face au village, comme en observation",
    "dans le four à pain, heureusement froid",
    "sur le chemin du cimetière, à mi-parcours exactement",
    "dans la cage à poules, la porte fermée au loquet",
    "au milieu du cercle de joueurs, sans que personne n'ait bougé"
  ];

  const MOMENTS = [
    "juste avant l'aube",
    "entre le douzième et le treizième coup de l'horloge",
    "pendant que le village comptait les voix",
    "au crépuscule, à l'heure où les chauves-souris prennent le relais",
    "à l'instant précis où tout le monde regardait ailleurs",
    "pendant le troisième silence gênant de la journée",
    "au moment où quelqu'un venait de dire « bon, on récapitule »",
    "alors que le coq hésitait encore",
    "à la fin d'une nomination particulièrement mal argumentée",
    "pendant la minute de réflexion collective",
    "juste après avoir affirmé n'avoir peur de rien",
    "au beau milieu d'une phrase dont la fin manque toujours",
    "pendant que le Conteur toussait discrètement",
    "à l'heure du bouillon",
    "dans le quart d'heure qui suit toujours les mauvaises décisions",
    "pendant la nuit la plus calme de la semaine",
    "au moment de rouvrir les yeux",
    "alors que le village célébrait une exécution réussie",
    "pendant la deuxième pluie de la nuit",
    "à l'heure où l'on ne compte plus les heures"
  ];

  /* ------------------------------------------------------------------ */
  /*  MANIÈRES GÉNÉRIQUES, PAR NIVEAU DE LOUFOQUERIE (1 = sobre)         */
  /* ------------------------------------------------------------------ */

  const MANIERES = {
    1: [
      ["parfaitement immobile, les yeux ouverts, sans une seule marque", "L'Affaire du Corps Sans Marque"],
      ["froid{e} depuis plusieurs heures alors qu'{il} parlait encore au dîner", "L'Affaire de l'Heure Manquante"],
      ["vidé{e} de tout son sang, le sol restant immaculé", "L'Affaire du Sol Immaculé"],
      ["une expression de compréhension très tardive sur le visage", "L'Affaire de la Révélation Trop Tardive"],
      ["la gorge serrée par une main invisible et fort soignée", "L'Affaire de la Main Absente"],
      ["assis{e} bien droit, comme si la mort avait été polie", "L'Affaire de la Mort Courtoise"],
      ["gelé{e} en plein mois d'août, givre compris", "L'Affaire du Givre d'Août"],
      ["le cœur arrêté net, à la seconde exacte du carillon", "L'Affaire du Carillon Exact"],
      ["couvert{e} d'une cendre tiède venue de nulle part", "L'Affaire de la Cendre Tiède"],
      ["endormi{e} pour de bon, un demi-sourire aux lèvres", "L'Affaire du Demi-Sourire"],
      ["étranglé{e} par son propre foulard, noué en triple nœud marin", "L'Affaire du Triple Nœud"],
      ["mort{e} de peur, littéralement, devant un mur parfaitement vide", "L'Affaire du Mur Vide"]
    ],
    2: [
      ["noyé{e} dans un tonneau de soupe à l'oignon encore tiède", "L'Affaire du Tonneau Tiède"],
      ["écrasé{e} par la cloche du beffroi, tombée pile au douzième coup", "L'Affaire du Douzième Coup"],
      ["empalé{e} sur la girouette, à onze mètres du sol, sans échelle à proximité", "L'Affaire de la Girouette"],
      ["asphyxié{e} par un nuage de farine d'une opacité inexplicable", "L'Affaire du Nuage de Farine"],
      ["piqué{e} par une unique abeille, manifestement rancunière", "L'Affaire de l'Abeille Rancunière"],
      ["enseveli{e} sous quatre cents bougies allumées une par une", "L'Affaire des Quatre Cents Bougies"],
      ["tombé{e} dans un escalier qui ne comptait que deux marches", "L'Affaire des Deux Marches"],
      ["mordu{e} par un chat que personne dans le village ne reconnaît", "L'Affaire du Chat Inconnu"],
      ["étouffé{e} par une miche de pain qu'{il} avait pourtant fait bénir", "L'Affaire de la Miche Bénie"],
      ["foudroyé{e} par un orage strictement local, d'un mètre carré", "L'Affaire de l'Orage Ponctuel"],
      ["retourné{e} comme une chaussette, chaussettes comprises", "L'Affaire des Chaussettes Retournées"],
      ["desséché{e} en une nuit, tel un abricot de très bonne qualité", "L'Affaire de l'Abricot"],
      ["coincé{e} dans les engrenages de l'horloge, désormais à l'heure", "L'Affaire de l'Horloge Enfin Juste"],
      ["victime d'une chute de tabouret d'une violence rare", "L'Affaire du Tabouret Vengeur"],
      ["enfermé{e} dans un coffre verrouillé de l'extérieur et de l'intérieur", "L'Affaire du Double Verrou"],
      ["pris{e} au piège d'une porte qui n'existait pas la veille", "L'Affaire de la Porte Neuve"]
    ],
    3: [
      ["battu{e} à mort lors d'un concours de regard fixe contre un corbeau", "L'Affaire du Concours de Regard"],
      ["écrasé{e} par une meule de fromage lancée à contresens dans une rue en pente", "L'Affaire de la Meule Fugueuse"],
      ["expiré{e} après avoir gagné un pari portant sur sa propre espérance de vie", "L'Affaire du Pari Gagné"],
      ["assailli{e} par un troupeau d'oies particulièrement bien organisé", "L'Affaire des Oies Syndiquées"],
      ["disparu{e} dans un placard, retrouvé{e} dans un autre, mort{e} dans un troisième", "L'Affaire des Trois Placards"],
      ["mort{e} d'un fou rire déclenché par une remarque que personne n'a entendue", "L'Affaire du Fou Rire Solitaire"],
      ["remplacé{e} par une botte de foin très ressemblante, puis brûlé{e} par mégarde", "L'Affaire de la Botte Ressemblante"],
      ["assassiné{e} par son propre reflet, qui a ensuite pris son quart de garde", "L'Affaire du Reflet Consciencieux"],
      ["enseveli{e} sous une avalanche de lentilles dans un village sans montagne", "L'Affaire de l'Avalanche de Lentilles"],
      ["décédé{e} en tentant de prouver qu'{il} tenait en équilibre sur une chèvre", "L'Affaire de la Chèvre d'Équilibre"],
      ["éteint{e} comme une bougie, avec la petite fumée et tout", "L'Affaire de la Petite Fumée"],
      ["dévoré{e} par un ragoût qu'{il} avait pourtant cuisiné {lui}-même", "L'Affaire du Ragoût Ingrat"],
      ["écrabouillé{e} par un piano, dans un village qui n'a jamais vu de piano", "L'Affaire du Piano Inexplicable"],
      ["changé{e} en statue de sel, puis utilisé{e} pour saler la soupe du lendemain", "L'Affaire de la Soupe Salée"],
      ["mort{e} de honte après une accusation publique d'une justesse insoutenable", "L'Affaire de la Honte Fatale"],
      ["percuté{e} de plein fouet par une porte de grange lâchée par le vent, deux fois", "L'Affaire de la Porte Récidiviste"],
      ["étouffé{e} sous les pétales d'un bouquet anonyme et curieusement volumineux", "L'Affaire du Bouquet Anonyme"],
      ["emporté{e} par un courant d'air qu'on entend encore certaines nuits", "L'Affaire du Courant d'Air Persistant"],
      ["mort{e} en expliquant pour la septième fois qu'{il} était le Lavandier", "L'Affaire de la Septième Explication"],
      ["victime d'un accident de brouette d'une improbabilité mathématique", "L'Affaire de la Brouette Improbable"],
      ["piétiné{e} par un unique mouton, mais avec beaucoup de conviction", "L'Affaire du Mouton Convaincu"],
      ["tombé{e} du lit, d'une hauteur pourtant très raisonnable", "L'Affaire de la Chute Raisonnable"]
    ],
    4: [
      ["déclaré{e} mort{e} par vote à main levée, puis contraint{e} de s'y conformer", "L'Affaire du Décès Démocratique"],
      ["supprimé{e} rétroactivement : {il} n'a jamais existé, mais {il} est quand même mort{e}", "L'Affaire de l'Inexistence Fatale"],
      ["écrasé{e} sous le poids d'une métaphore devenue soudainement littérale", "L'Affaire de la Métaphore Lourde"],
      ["mort{e} d'avoir lu sa propre notice nécrologique avec deux jours d'avance", "L'Affaire de la Nécrologie Prématurée"],
      ["dissous{e} dans un bain de camomille, pour des raisons qui demeurent obscures", "L'Affaire de la Camomille Corrosive"],
      ["retiré{e} du jeu par une main immense descendue du plafond", "L'Affaire de la Main du Plafond"],
      ["replié{e} soigneusement en huit et rangé{e} dans un tiroir de la sacristie", "L'Affaire du Tiroir Bien Rangé"],
      ["remplacé{e} par un silence de la même taille et du même poids", "L'Affaire du Silence Équivalent"],
      ["mort{e} d'une cause si absurde que le Conteur refuse de la prononcer à voix haute", "L'Affaire Innommable"],
      ["converti{e} en horaire : il est désormais 17 h 40 en permanence dans le village", "L'Affaire de Dix-Sept Heures Quarante"],
      ["aspiré{e} par le trou d'une serrure qu'{il} n'aurait jamais dû regarder", "L'Affaire de la Serrure Gourmande"],
      ["victime d'un malentendu grammatical aux conséquences irréversibles", "L'Affaire du Subjonctif Fatal"],
      ["éliminé{e} par un règlement intérieur affiché depuis toujours et jamais lu", "L'Affaire du Règlement Affiché"],
      ["mort{e} pendant la lecture de cette phrase, ce qui complique un peu l'enquête", "L'Affaire de la Phrase En Cours"],
      ["décomposé{e} en trois joueurs distincts, tous décédés séparément", "L'Affaire de la Division en Trois"],
      ["renvoyé{e} à la fabrique, défaut de conception constaté beaucoup trop tard", "L'Affaire du Retour en Usine"],
      ["confondu{e} avec le mobilier, dépoussiéré{e}, puis vendu{e} aux enchères", "L'Affaire du Mobilier Vendu"],
      ["emporté{e} par une overdose de certitude", "L'Affaire de la Certitude Absolue"],
      ["effacé{e} du registre par une rature, puis du monde par cohérence", "L'Affaire de la Rature Zélée"],
      ["mort{e} d'une faute de frappe dans son propre nom", "L'Affaire de la Coquille Mortelle"]
    ]
  };

  /* ------------------------------------------------------------------ */
  /*  CAUSES — fidèles au lore, par script                               */
  /*  quand : "nuit" | "jour" | "toujours"                               */
  /* ------------------------------------------------------------------ */

  const CAUSES = [
    /* ---------- Trouble Brewing ---------- */
    {
      id: "imp", script: "tb", camp: "demon", quand: "nuit", nom: "l'Imp",
      intro: [
        "L'Imp a choisi. C'est tout ce qu'il y a à comprendre.",
        "L'Imp a frappé comme on mouche une chandelle : d'un geste, sans commentaire.",
        "L'Imp a agi entre deux battements de l'horloge, à l'heure où le village dormait déjà très mal."
      ],
      manieres: [
        ["frappé{e} une seule fois, très proprement, par quelque chose qui savait où viser", "L'Affaire du Geste Unique"],
        ["retrouvé{e} avec l'empreinte d'un sourire sur la porte, à l'envers", "L'Affaire du Sourire Inversé"],
        ["griffé{e} trois fois : une pour le doute, une pour la peur, une pour finir", "L'Affaire des Trois Griffures"]
      ]
    },
    {
      id: "imp-etoile", script: "tb", camp: "demon", quand: "nuit", nom: "l'Imp (passage d'étoile)",
      intro: [
        "L'Imp s'est désigné lui-même : la lignée devait continuer ailleurs.",
        "L'Imp a transmis sa charge en se supprimant, ce qui reste la plus dévouée des démissions."
      ],
      manieres: [
        ["poignardé{e} de sa propre main, avec une détermination toute administrative", "L'Affaire de la Démission Définitive"],
        ["retrouvé{e} mort{e} et étrangement satisfait{e} : promotion oblige", "L'Affaire de la Promotion Posthume"]
      ]
    },
    {
      id: "execution", script: "all", camp: "village", quand: "jour", nom: "le village lui-même",
      intro: [
        "Le village a voté. Le village a eu tort. Le village recommencera demain.",
        "Une majorité confortable, un raisonnement bancal, une corde parfaitement fonctionnelle.",
        "Exécution régulière, unanimement regrettée dès la nuit suivante."
      ],
      lieux: [
        "sur la place du village, au pied du vieux chêne",
        "devant le gibet communal, fraîchement repeint",
        "au centre du cercle, sous quinze paires d'yeux honteux"
      ],
      moments: [
        "à la fin d'un vote gagné d'une seule voix",
        "quinze secondes après la dernière main levée",
        "juste après un « bon, il faut bien faire quelque chose »"
      ],
      manieres: [
        ["pendu{e} à un chêne qui a vu passer quatre-vingts innocents et deux coupables", "L'Affaire du Chêne Statisticien"],
        ["exécuté{e} sur la foi d'une intuition et d'un regard légèrement fuyant", "L'Affaire du Regard Fuyant"],
        ["exécuté{e} après avoir crié « je suis le Chef ! » d'un ton un peu trop enthousiaste", "L'Affaire de l'Enthousiasme Suspect"],
        ["exécuté{e} pour avoir gardé le silence au pire moment possible", "L'Affaire du Silence Mal Placé"]
      ]
    },
    {
      id: "slayer", script: "tb", camp: "village", quand: "jour", nom: "le Tueur (Slayer)",
      intro: [
        "Le Tueur a pointé du doigt. Cette fois, le doigt avait raison.",
        "Un doigt tendu, un cri théâtral, un démon qui s'écroule : le village n'en revient toujours pas."
      ],
      manieres: [
        ["pulvérisé{e} par un doigt tendu avec une confiance statistiquement injustifiée", "L'Affaire du Doigt Chanceux"],
        ["désintégré{e} en pleine plaidoirie, au pire moment de son argumentation", "L'Affaire de la Plaidoirie Interrompue"]
      ]
    },
    {
      id: "vierge", script: "tb", camp: "village", quand: "jour", nom: "la Vierge (Virgin)",
      intro: [
        "{Il} a nominé la Vierge. C'était, rétrospectivement, une mauvaise idée.",
        "La Vierge a été nominée ; la procédure, elle, s'est montrée impitoyable."
      ],
      manieres: [
        ["exécuté{e} instantanément pour avoir levé la main une demi-seconde trop tôt", "L'Affaire de la Demi-Seconde"],
        ["foudroyé{e} en pleine nomination, la phrase restant en suspens pour l'éternité", "L'Affaire de la Nomination Suspendue"]
      ]
    },
    {
      id: "empoisonneur", script: "tb", camp: "sbire", quand: "nuit", nom: "l'Empoisonneur",
      intro: [
        "L'Empoisonneur n'a tué personne, techniquement. Techniquement.",
        "Le poison n'était pas mortel. Les conséquences, elles, se sont montrées très coopératives."
      ],
      manieres: [
        ["mort{e} d'une information fausse reçue avec une confiance totale", "L'Affaire de la Fausse Certitude"],
        ["empoisonné{e} par une tisane qui avait absolument tout d'une tisane", "L'Affaire de la Tisane Parfaite"],
        ["mort{e} d'avoir eu raison la veille et tort le jour même", "L'Affaire du Retournement"]
      ]
    },
    {
      id: "maire", script: "tb", camp: "village", quand: "nuit", nom: "le rebond du Maire",
      intro: [
        "Le Maire devait mourir. Le Conteur a préféré quelqu'un d'autre. C'est ainsi.",
        "La mort visait le Maire ; elle a glissé sur lui comme la pluie sur un chapeau neuf."
      ],
      manieres: [
        ["mort{e} à la place de quelqu'un d'autre, sans avoir jamais été consulté{e}", "L'Affaire de la Substitution Administrative"],
        ["emporté{e} par un ricochet de destin manifestement mal calibré", "L'Affaire du Ricochet"]
      ]
    },

    /* ---------- Bad Moon Rising ---------- */
    {
      id: "zombuul", script: "bmr", camp: "demon", quand: "nuit", nom: "le Zombuul",
      intro: [
        "Le Zombuul est déjà mort une fois. Il ne voit pas pourquoi il s'arrêterait là.",
        "Le Zombuul ne tue que les jours où personne n'est mort. Il tient les comptes mieux que le village."
      ],
      manieres: [
        ["mort{e} deux fois, ce qui pose un vrai problème de comptabilité au Fossoyeur", "L'Affaire du Double Décès"],
        ["retrouvé{e} froid{e} et debout, en train de hocher poliment la tête", "L'Affaire du Hochement Posthume"],
        ["mort{e} parce que la journée avait été trop calme, statistiquement parlant", "L'Affaire de la Journée Trop Calme"]
      ]
    },
    {
      id: "pukka", script: "bmr", camp: "demon", quand: "nuit", nom: "le Pukka",
      intro: [
        "Le Pukka empoisonne d'abord et tue ensuite : il aime le travail bien séquencé.",
        "Le poison du Pukka a mis une nuit entière à faire son office, avec une ponctualité remarquable."
      ],
      manieres: [
        ["mort{e} avec une nuit de retard, exactement comme prévu au programme", "L'Affaire du Retard Programmé"],
        ["empoisonné{e} hier, mort{e} aujourd'hui, prévenu{e} jamais", "L'Affaire du Préavis Manquant"],
        ["verdâtre depuis la veille, ce qui n'avait alerté strictement personne", "L'Affaire de la Teinte Ignorée"]
      ]
    },
    {
      id: "shabaloth", script: "bmr", camp: "demon", quand: "nuit", nom: "le Shabaloth",
      intro: [
        "Le Shabaloth a dévoré deux personnes cette nuit. Il en a régurgité une. Ce n'était pas {lui}.",
        "Le Shabaloth mange par paires et rend parfois la monnaie. La monnaie, ce n'était pas {lui}."
      ],
      manieres: [
        ["avalé{e} en entier, puis non rendu{e}, contrairement à sa compagne de repas", "L'Affaire du Non-Remboursement"],
        ["digéré{e} avec une efficacité qui force un certain respect", "L'Affaire de la Digestion Exemplaire"],
        ["recraché{e} par erreur, puis ravalé{e} par principe", "L'Affaire du Deuxième Service"]
      ]
    },
    {
      id: "po", script: "bmr", camp: "demon", quand: "nuit", nom: "le Po",
      intro: [
        "Le Po avait jeûné. Le Po a rattrapé son jeûne. Trois fois d'un coup.",
        "Le Po ne tue pas toutes les nuits : il préfère les grandes occasions, et celle-ci en était une."
      ],
      manieres: [
        ["emporté{e} dans une razzia collective menée avec un appétit d'arriéré", "L'Affaire de l'Appétit d'Arriéré"],
        ["mort{e} en groupe, ce qui reste la plus sociable des fins", "L'Affaire de la Fin Sociable"],
        ["victime d'un rattrapage de retard particulièrement zélé", "L'Affaire du Rattrapage Zélé"]
      ]
    },
    {
      id: "assassin", script: "bmr", camp: "sbire", quand: "nuit", nom: "l'Assassin",
      intro: [
        "L'Assassin n'agit qu'une fois par partie. Ce soir était cette fois-là.",
        "Aucune protection n'y pouvait rien : l'Assassin ne demande pas la permission."
      ],
      manieres: [
        ["mort{e} malgré une protection, une armure et trois prières", "L'Affaire de la Protection Inutile"],
        ["éliminé{e} par un professionnel, ce qui change agréablement des amateurs", "L'Affaire du Travail Soigné"]
      ]
    },
    {
      id: "parrain", script: "bmr", camp: "sbire", quand: "nuit", nom: "le Parrain (Godfather)",
      intro: [
        "Un Étranger est mort le jour même. Le Parrain a estimé que cela méritait une réponse.",
        "Le Parrain règle ses comptes la nuit qui suit, avec une régularité de comptable."
      ],
      manieres: [
        ["liquidé{e} en représailles d'une mort qui ne {le} concernait absolument pas", "L'Affaire des Représailles Aveugles"],
        ["mort{e} pour solde de tout compte, sans avoir jamais ouvert de compte", "L'Affaire du Solde Inexpliqué"]
      ]
    },
    {
      id: "commere", script: "bmr", camp: "village", quand: "nuit", nom: "la Commère (Gossip)",
      intro: [
        "La Commère a dit quelque chose de vrai en public. Quelqu'un en est mort.",
        "La rumeur était exacte. C'est bien là tout le problème."
      ],
      manieres: [
        ["tué{e} par une déclaration publique d'une véracité imprudente", "L'Affaire de la Vérité Imprudente"],
        ["foudroyé{e} par un ragot rigoureusement exact", "L'Affaire du Ragot Exact"],
        ["mort{e} d'avoir été mentionné{e} dans une phrase parfaitement vraie", "L'Affaire de la Phrase Vraie"]
      ]
    },
    {
      id: "bricoleur", script: "bmr", camp: "etranger", quand: "toujours", nom: "le Bricoleur (Tinker)",
      intro: [
        "Le Bricoleur peut mourir à tout moment. Le moment, c'était maintenant.",
        "Rien ne laissait présager cette mort, sinon la fiche de personnage du Bricoleur."
      ],
      manieres: [
        ["mort{e} sans préavis, sans cause et sans recours, conformément à sa nature", "L'Affaire du Sans-Préavis"],
        ["démonté{e} par l'un de ses propres dispositifs, pourtant testé deux fois", "L'Affaire du Dispositif Testé"],
        ["victime d'une panne fatale d'un mécanisme garanti à vie", "L'Affaire de la Garantie À Vie"]
      ]
    },
    {
      id: "parieur", script: "bmr", camp: "village", quand: "nuit", nom: "le Parieur (Gambler)",
      intro: [
        "Le Parieur s'est trompé. Le Parieur paie toujours comptant.",
        "Une mauvaise intuition, un pari perdu, une addition immédiate."
      ],
      manieres: [
        ["mort{e} d'avoir misé sur la mauvaise personne avec une assurance remarquable", "L'Affaire du Mauvais Cheval"],
        ["emporté{e} par le règlement d'un pari qu'{il} n'aurait jamais dû accepter", "L'Affaire du Pari Perdu"]
      ]
    },
    {
      id: "enfant-lune", script: "bmr", camp: "etranger", quand: "nuit", nom: "l'Enfant de la Lune (Moonchild)",
      intro: [
        "L'Enfant de la Lune est mort aujourd'hui et a désigné quelqu'un dans son dernier souffle. Ce quelqu'un, c'était {lui}.",
        "Une dernière accusation, lancée au hasard depuis l'au-delà, a trouvé preneur."
      ],
      manieres: [
        ["emporté{e} par la dernière lubie d'un mourant très mal renseigné", "L'Affaire de la Lubie Terminale"],
        ["désigné{e} du doigt par quelqu'un qui n'avait déjà plus voix au chapitre", "L'Affaire du Doigt d'Outre-Tombe"]
      ]
    },

    /* ---------- Sects & Violets ---------- */
    {
      id: "fang-gu", script: "sv", camp: "demon", quand: "nuit", nom: "le Fang Gu",
      intro: [
        "Le Fang Gu a attaqué un Étranger. L'Étranger est devenu le Fang Gu. Le Fang Gu est mort. Tout le monde suit ?",
        "Le Fang Gu a sauté d'un corps à l'autre, laissant l'ancien sur le carreau."
      ],
      manieres: [
        ["mort{e} en cédant sa place, sa fonction et ses griffes à un{e} parfait{e} inconnu{e}", "L'Affaire de la Passation Nocturne"],
        ["vidé{e} de sa substance, rempli{e} d'une autre, puis abandonné{e} sur place", "L'Affaire du Corps Vacant"]
      ]
    },
    {
      id: "vigormortis", script: "sv", camp: "demon", quand: "nuit", nom: "le Vigormortis",
      intro: [
        "Le Vigormortis tue les sbires et les garde au travail. La mort n'est pas un motif de fin de contrat.",
        "Le Vigormortis a tué, puis a exigé que le cadavre continue de rendre service."
      ],
      manieres: [
        ["mort{e} mais toujours en service, ce qui a beaucoup troublé le Fossoyeur", "L'Affaire du Cadavre Opérationnel"],
        ["décédé{e} sans que cela n'interrompe une seule de ses activités quotidiennes", "L'Affaire de l'Activité Continue"],
        ["privé{e} de son pouvoir par un voisin qu'{il} croyait pourtant sympathique", "L'Affaire du Voisin Sympathique"]
      ]
    },
    {
      id: "no-dashii", script: "sv", camp: "demon", quand: "nuit", nom: "le No Dashii",
      intro: [
        "Le No Dashii empoisonne ses voisins par simple présence. La mort est un service supplémentaire.",
        "Le No Dashii n'a rien touché. Le No Dashii n'a pas besoin de toucher."
      ],
      manieres: [
        ["intoxiqué{e} par pure proximité, sans contact ni intention apparente", "L'Affaire de la Proximité Toxique"],
        ["fané{e} comme une plante mal placée dans une pièce par ailleurs très agréable", "L'Affaire de la Plante Mal Placée"]
      ]
    },
    {
      id: "vortox", script: "sv", camp: "demon", quand: "nuit", nom: "le Vortox",
      intro: [
        "Le Vortox tue chaque nuit et rend toutes les informations fausses. Y compris, probablement, ce rapport.",
        "Dans le monde du Vortox, tout est faux. Cette mort, elle, est parfaitement réelle."
      ],
      manieres: [
        ["mort{e} dans un monde où tout était faux, sauf ce détail-là", "L'Affaire du Seul Fait Vrai"],
        ["retrouvé{e} à l'endroit exact où toutes les informations {le} disaient absent{e}", "L'Affaire de l'Endroit Nié"],
        ["éteint{e} par une vérité isolée au milieu d'un océan de mensonges", "L'Affaire de la Vérité Isolée"]
      ]
    },
    {
      id: "sorciere", script: "sv", camp: "sbire", quand: "jour", nom: "la Sorcière (Witch)",
      intro: [
        "La Sorcière l'avait maudit{e}. {Il} a nominé quand même. La malédiction est très ponctuelle.",
        "Une malédiction, une nomination, une mort : la Sorcière apprécie les chaînes causales courtes."
      ],
      manieres: [
        ["mort{e} sur-le-champ pour avoir nominé malgré un avertissement très clair", "L'Affaire de l'Avertissement Ignoré"],
        ["tombé{e} raide au milieu d'une accusation pourtant excellente", "L'Affaire de l'Accusation Interrompue"]
      ]
    },
    {
      id: "barbier", script: "sv", camp: "etranger", quand: "nuit", nom: "le Barbier (Barber)",
      intro: [
        "Le Barbier est mort, et le Démon en a profité pour échanger deux personnages. Le service continue après la fermeture.",
        "La mort du Barbier a déclenché une redistribution générale qui n'arrangeait personne."
      ],
      manieres: [
        ["mort{e} la lame à la main, deux identités échangées dans son dos", "L'Affaire de la Coupe Posthume"],
        ["décédé{e} en provoquant un remaniement dont {il} n'aura jamais connu le détail", "L'Affaire du Remaniement Aveugle"]
      ]
    },
    {
      id: "maladroit", script: "sv", camp: "etranger", quand: "toujours", nom: "le Maladroit (Klutz)",
      intro: [
        "Le Maladroit est mort et a désigné quelqu'un. Fidèle à lui-même, il a mal désigné.",
        "Une chute, une désignation, une catastrophe collective : le Maladroit dans toute sa splendeur."
      ],
      manieres: [
        ["mort{e} en trébuchant sur absolument rien, avec une grâce discutable", "L'Affaire du Rien Fatal"],
        ["emporté{e} par sa propre désignation, ce qui relève d'un certain talent", "L'Affaire de l'Autodésignation"]
      ]
    },
    {
      id: "cheri", script: "sv", camp: "etranger", quand: "toujours", nom: "le Chéri (Sweetheart)",
      intro: [
        "Le Chéri est mort. Quelqu'un, quelque part, est désormais ivre en permanence.",
        "La mort du Chéri a laissé un voisin définitivement embrouillé."
      ],
      manieres: [
        ["mort{e} adoré{e} de tous, en emportant la lucidité d'un voisin parfaitement innocent", "L'Affaire de la Lucidité Emportée"],
        ["décédé{e} dans un chagrin collectif si dense qu'il en a saoulé quelqu'un", "L'Affaire du Chagrin Enivrant"]
      ]
    },

    /* ---------- Expérimental ---------- */
    {
      id: "legion", script: "exp", camp: "demon", quand: "nuit", nom: "la Légion",
      intro: [
        "La Légion a tué. La Légion, c'est presque tout le monde. Bonne chance pour l'enquête.",
        "Ils sont légion, ils sont partout, et l'un d'eux — ou tous — a fait le nécessaire."
      ],
      manieres: [
        ["tué{e} par une majorité de ses concitoyens agissant de concert et par surprise", "L'Affaire de la Majorité Silencieuse"],
        ["piétiné{e} par une foule dont chaque membre jure n'avoir rien fait", "L'Affaire des Innocents Nombreux"]
      ]
    },
    {
      id: "leviathan", script: "exp", camp: "demon", quand: "jour", nom: "le Léviathan",
      intro: [
        "Le Léviathan ne tue pas la nuit : il attend. Le cinquième jour, il n'attend plus.",
        "Le Léviathan a laissé le village s'exécuter lui-même, jour après jour, avec une patience de marée."
      ],
      manieres: [
        ["emporté{e} par une marée qui monte depuis cinq jours dans un village sans mer", "L'Affaire de la Marée Terrestre"],
        ["exécuté{e} pour la troisième fois, ce qui commence à faire beaucoup", "L'Affaire de la Troisième Exécution"]
      ]
    },
    {
      id: "riot", script: "exp", camp: "demon", quand: "jour", nom: "l'Émeute (Riot)",
      intro: [
        "Tout le monde est l'Émeute. Nominer, c'est tuer. Le village l'a compris trop tard.",
        "L'Émeute a transformé le débat démocratique en activité mortelle et légèrement bruyante."
      ],
      manieres: [
        ["éliminé{e} immédiatement après avoir été nominé{e}, comme tout le monde désormais", "L'Affaire de la Nomination Létale"],
        ["mort{e} dans le chaos généralisé du troisième jour, avec beaucoup de compagnie", "L'Affaire du Troisième Jour"]
      ]
    },
    {
      id: "al-hadikhia", script: "exp", camp: "demon", quand: "nuit", nom: "l'Al-Hadikhia",
      intro: [
        "L'Al-Hadikhia a proposé un choix. Le choix était un piège. Le piège a fonctionné.",
        "Trois personnes appelées, trois décisions, et une arithmétique fatale."
      ],
      manieres: [
        ["mort{e} d'avoir choisi de vivre en même temps que deux autres personnes", "L'Affaire du Choix Collectif"],
        ["éteint{e} par une question posée d'une voix bien trop douce pour être honnête", "L'Affaire de la Voix Douce"]
      ]
    },
    {
      id: "lil-monsta", script: "exp", camp: "demon", quand: "nuit", nom: "Lil' Monsta",
      intro: [
        "Un sbire tenait le bébé cette nuit. Le bébé avait faim.",
        "Lil' Monsta ne se déplace pas : on le porte, on le berce, et on le laisse manger."
      ],
      manieres: [
        ["dévoré{e} par quelque chose de très petit, de très mignon et de très affamé", "L'Affaire du Petit Appétit"],
        ["mort{e} en berçant ce qu'{il} prenait pour un enfant du village", "L'Affaire du Faux Nourrisson"]
      ]
    },
    {
      id: "kazali", script: "exp", camp: "demon", quand: "nuit", nom: "le Kazali",
      intro: [
        "Le Kazali a choisi ses sbires parmi les gens bien. Les gens bien ont accepté sans discuter.",
        "Le Kazali recrute d'abord et tue ensuite. L'ordre a son importance."
      ],
      manieres: [
        ["converti{e} de force, puis supprimé{e} pour cause de restructuration", "L'Affaire de la Restructuration"],
        ["mort{e} dans son sommeil après une promotion qu'{il} n'avait pas demandée", "L'Affaire de la Promotion Forcée"]
      ]
    },
    {
      id: "yaggababble", script: "exp", camp: "demon", quand: "nuit", nom: "le Yaggababble",
      intro: [
        "Le Yaggababble a une phrase secrète. Il l'a prononcée. Beaucoup trop de fois.",
        "Chaque répétition de la phrase a coûté une vie. Celle-ci était la quatrième."
      ],
      manieres: [
        ["tué{e} par une phrase anodine répétée un nombre statistiquement inquiétant de fois", "L'Affaire de la Phrase Répétée"],
        ["mort{e} en entendant une dernière fois une formule qu'{il} trouvait pourtant charmante", "L'Affaire de la Formule Charmante"]
      ]
    },
    {
      id: "psychopathe", script: "exp", camp: "sbire", quand: "jour", nom: "le Psychopathe",
      intro: [
        "Le Psychopathe a lancé un duel. Le Psychopathe gagne souvent les duels.",
        "Une provocation, un combat réglementaire, un vainqueur assez prévisible."
      ],
      manieres: [
        ["éliminé{e} dans un duel public dont personne n'avait fixé les règles", "L'Affaire du Duel Improvisé"],
        ["battu{e} à plate couture par quelqu'un qui souriait beaucoup trop", "L'Affaire du Sourire Excessif"]
      ]
    },
    {
      id: "golem", script: "exp", camp: "etranger", quand: "jour", nom: "le Golem",
      intro: [
        "Le Golem a nominé. Le Golem ne nomine qu'une fois, mais il le fait très bien.",
        "Nominé{e} par le Golem, {il} n'était manifestement pas le Démon. Le Golem s'en est aperçu ensuite."
      ],
      manieres: [
        ["réduit{e} en miettes par une nomination d'une brutalité minérale", "L'Affaire de la Nomination Minérale"],
        ["écrasé{e} par un doigt de pierre visant approximativement le bon coupable", "L'Affaire du Doigt de Pierre"]
      ]
    },
    {
      id: "ojo", script: "exp", camp: "demon", quand: "nuit", nom: "l'Ojo",
      intro: [
        "L'Ojo visait un personnage. Ce personnage n'était pas en jeu. Le Conteur a improvisé.",
        "L'Ojo a désigné un rôle absent : quelqu'un d'autre a payé la différence."
      ],
      manieres: [
        ["mort{e} à la place d'un personnage qui n'existait même pas dans cette partie", "L'Affaire du Rôle Absent"],
        ["choisi{e} par défaut, faute de mieux, ce qui reste tout de même vexant", "L'Affaire du Choix par Défaut"]
      ]
    },
    {
      id: "lleech", script: "exp", camp: "demon", quand: "nuit", nom: "le Lleech",
      intro: [
        "Le Lleech s'est accroché à un hôte. L'hôte allait très bien. Les autres, non.",
        "Tant que l'hôte vit, le Lleech est intouchable. Et il en profite largement."
      ],
      manieres: [
        ["drainé{e} lentement par quelque chose d'accroché ailleurs, à quelqu'un d'autre", "L'Affaire de la Sangsue Lointaine"],
        ["vidé{e} au profit d'un parasite ayant un excellent goût en matière d'hôtes", "L'Affaire de l'Hôte de Qualité"]
      ]
    },
    {
      id: "typhon", script: "exp", camp: "demon", quand: "nuit", nom: "le Seigneur de Typhon",
      intro: [
        "Le Seigneur de Typhon est encadré par ses sbires. Ils se relaient pour protéger et pour nettoyer.",
        "Le Seigneur de Typhon tue chaque nuit et remplace ses pertes par du personnel du village."
      ],
      manieres: [
        ["supprimé{e} par une créature flanquée de part et d'autre de ses propres employés", "L'Affaire du Personnel Encadré"],
        ["mort{e} puis immédiatement remplacé{e} au poste, sans période de transition", "L'Affaire du Remplacement Immédiat"]
      ]
    }
  ];

  /* ------------------------------------------------------------------ */
  /*  DÉTAILS TROUBLANTS                                                 */
  /* ------------------------------------------------------------------ */

  const INDICES = [
    "On a retrouvé ses chaussures à quatre cents mètres, soigneusement rangées et orientées plein nord.",
    "Toutes les bougies de la pièce étaient allumées. Il ne restait plus une seule allumette au village.",
    "L'horloge du beffroi indiquait la bonne heure pour la première fois depuis dix-sept ans.",
    "Un unique bouton de manchette manquait. {Il} n'en avait jamais porté.",
    "Les chats du village ont tous fixé le même mur pendant vingt minutes, puis ont repris leur journée.",
    "Le carnet du Fossoyeur portait déjà son nom, écrit trois jours plus tôt, de sa propre main.",
    "On a compté treize couverts à table. Il y avait douze convives.",
    "Sa tasse était encore chaude. La théière, elle, était froide depuis la veille.",
    "Une empreinte de pied nu, parfaitement sèche, traversait la flaque de pluie.",
    "Le chien du Tavernier, qui aboie sur tout, n'a pas aboyé cette nuit-là.",
    "Quelqu'un avait replié sa couverture au carré, avec une précision toute militaire.",
    "Le miroir de sa chambre reflétait la pièce, mais pas la porte.",
    "Trois graines de tournesol formaient un triangle parfait à côté de sa main.",
    "Les cloches ont sonné un coup de trop. Personne n'a osé le mentionner à voix haute.",
    "Le vin de la cave avait tourné au vinaigre, sauf dans un seul tonneau, scellé.",
    "Sur la vitre embuée, on pouvait lire un mot dans une langue que personne ne parle ici.",
    "Sa montre s'est arrêtée à 3 h 33, comme celle des quatre précédents.",
    "Le pain du jour est sorti du four déjà rassis.",
    "Quatorze corbeaux étaient alignés sur le faîtage, parfaitement équidistants.",
    "On a retrouvé un jeton de vote dans sa poche. Le vote n'avait pas encore eu lieu.",
    "Le sol sous le corps était parfaitement sec, alors qu'il pleuvait depuis l'aube.",
    "Sa main droite désignait quelqu'un. Ce quelqu'un a été innocenté deux jours plus tard.",
    "Le registre paroissial comportait une page arrachée, à la date exacte de sa naissance.",
    "Toutes les portes de la maison étaient verrouillées de l'intérieur. Les clés étaient dans le puits.",
    "Une odeur de bougie éteinte flottait dans la pièce, alors qu'aucune n'avait été allumée.",
    "Le Conteur a souri. C'est le détail le plus inquiétant de tout le dossier.",
    "Son fauteuil était encore chaud, mais {il} est mort{e} debout, à trois mètres de là.",
    "Le sablier avait été retourné une dernière fois par une main très patiente.",
    "Sept grains de sel formaient une ligne devant le seuil. Le huitième manquait.",
    "Quelqu'un avait éteint la lanterne du perron, l'avait rallumée, puis avait renoncé."
  ];

  /* ------------------------------------------------------------------ */
  /*  DERNIÈRES PAROLES                                                  */
  /* ------------------------------------------------------------------ */

  const DERNIERS_MOTS = [
    "« Franchement, je suis le joueur le moins suspect de cette table. »",
    "« Faites-moi confiance, je sais exactement ce que je fais. »",
    "« Bon, cette nuit on ne risque rien, c'est calme. »",
    "« Si je meurs, c'est que j'avais raison. Retenez bien ça. »",
    "« Je vous jure que je suis le Chef. LE CHEF. »",
    "« Laissez-moi juste finir mon raisonnement, c'est important. »",
    "« Écoutez, statistiquement, ça ne peut pas être moi. »",
    "« Je vais me coucher, réveillez-moi s'il se passe quelque chose. »",
    "« Attendez, j'ai une théorie, et elle est brillante. »",
    "« Vous allez tous vous sentir très bêtes demain matin. »",
    "« Techniquement, je n'ai rien confirmé. »",
    "« Ce n'est pas parce que je souris que je suis le Démon. »",
    "« Je propose qu'on ne fasse rien aujourd'hui, ça a très bien marché hier. »",
    "« Franchement, le Conteur a une drôle de tête ce soir. »",
    "« Je n'ai pas peur des Démons, j'ai peur des idiots. »",
    "« Bon. Quelqu'un a une meilleure idée ? Non ? Parfait. »",
    "« C'est exactement ce qu'un Démon dirait, donc je ne le dirai pas. »",
    "« Je suis prêt{e} à mourir pour prouver mon innocence. Façon de parler. »",
    "« Je reviens dans deux minutes, ne votez rien sans moi. »",
    "« Je vous le dis : le danger, c'est les gens trop silencieux. »",
    "« On est bien d'accord qu'il ne peut rien m'arriver, je suis protégé{e} ? »",
    "« Ah non, pas moi, j'ai déjà été accusé{e} hier. »",
    "« Petite info : j'ai vérifié, tout va bien. »",
    "« Ne t'inquiète pas, il ne t'arrivera rien. »",
    "« C'est sûrement rien, ce bruit. »",
    "« Le pire qui puisse arriver, c'est qu'on perde une journée. »",
    "« J'ai le meilleur rôle du jeu et je compte bien en profiter longtemps. »",
    "« Dernière chose, et c'est capital : »",
    "« Vous savez quoi ? Je vous expliquerai tout demain matin. »",
    "« Bonne nuit, tout le monde. »"
  ];

  /* ------------------------------------------------------------------ */
  /*  VERDICTS DU CONTEUR                                                */
  /* ------------------------------------------------------------------ */

  const VERDICTS = [
    "Le Conteur consigne : mort légitime, hélas parfaitement dans les règles.",
    "Le Conteur hausse une épaule. C'est tout ce que le village obtiendra.",
    "Le Conteur note quelque chose dans son grimoire, puis le referme un peu trop vite.",
    "Le Conteur confirme : ce n'était ni un accident, ni une surprise, ni une injustice.",
    "Le Conteur précise que cette mort était évitable, et s'arrête là.",
    "Le Conteur rappelle que les morts conservent un vote fantôme, et un seul.",
    "Le Conteur déclare la nuit terminée. Le village, lui, n'a pas fini d'en parler.",
    "Le Conteur estime que le village a eu exactement ce qu'il méritait.",
    "Le Conteur observe un silence qui vaut tous les aveux.",
    "Le Conteur sourit. Personne ne trouve cela rassurant.",
    "Le Conteur rappelle que l'information reçue hier était peut-être fausse. Peut-être.",
    "Le Conteur invite le village à passer à autre chose. Le village ne passera pas à autre chose.",
    "Le Conteur archive le dossier sous la mention : « prévisible, mais spectaculaire ».",
    "Le Conteur jure que ce n'était pas personnel. Le Conteur ment souvent.",
    "Le Conteur signale qu'un détail de ce rapport est faux. Il ne dira pas lequel.",
    "Le Conteur referme le grimoire : l'affaire est close, la nuit ne l'est pas.",
    "Le Conteur regrette d'annoncer cette mort, mais pas tant que ça.",
    "Le Conteur constate que le village apprend vite, mais meurt plus vite encore.",
    "Le Conteur rappelle qu'il reste au moins un Démon en circulation. Bonne journée.",
    "Le Conteur promet que la prochaine sera plus douce. Le Conteur promet beaucoup de choses."
  ];

  /* ------------------------------------------------------------------ */
  /*  MÉTA                                                               */
  /* ------------------------------------------------------------------ */

  const SCRIPTS = {
    tb: { nom: "Trouble Brewing", court: "TB" },
    bmr: { nom: "Bad Moon Rising", court: "BMR" },
    sv: { nom: "Sects & Violets", court: "S&V" },
    exp: { nom: "Expérimental", court: "EXP" }
  };

  const CHAOS_LABELS = {
    1: "Gothique sobre",
    2: "Franchement étrange",
    3: "Complètement loufoque",
    4: "Absurdité totale"
  };

  global.LORE = {
    PRENOMS_M, PRENOMS_F, EPITHETES_M, EPITHETES_F,
    LIEUX, MOMENTS, MANIERES, CAUSES,
    INDICES, DERNIERS_MOTS, VERDICTS,
    SCRIPTS, CHAOS_LABELS
  };
})(window);
