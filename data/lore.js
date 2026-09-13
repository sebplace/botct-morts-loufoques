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
      ["avec une expression de compréhension très tardive sur le visage", "L'Affaire de la Révélation Trop Tardive"],
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
      ["coincé{e} dans un troisième placard, après avoir disparu dans un premier et transité par un deuxième", "L'Affaire des Trois Placards"],
      ["mort{e} d'un fou rire déclenché par une remarque que personne n'a entendue", "L'Affaire du Fou Rire Solitaire"],
      ["remplacé{e} par une botte de foin très ressemblante, puis brûlé{e} par mégarde", "L'Affaire de la Botte Ressemblante"],
      ["assassiné{e} par son propre reflet, qui a ensuite pris son quart de garde", "L'Affaire du Reflet Consciencieux"],
      ["enseveli{e} sous une avalanche de lentilles dans un village sans montagne", "L'Affaire de l'Avalanche de Lentilles"],
      ["mort{e} en tentant de prouver qu'{il} tenait en équilibre sur une chèvre", "L'Affaire de la Chèvre d'Équilibre"],
      ["éteint{e} comme une bougie, avec la petite fumée et tout", "L'Affaire de la Petite Fumée"],
      ["dévoré{e} par un ragoût qu'{il} avait pourtant cuisiné {lui}-même", "L'Affaire du Ragoût Ingrat"],
      ["écrabouillé{e} par un piano, dans un village qui n'a jamais vu de piano", "L'Affaire du Piano Inexplicable"],
      ["changé{e} en statue de sel, puis utilisé{e} pour saler la soupe du lendemain", "L'Affaire de la Soupe Salée"],
      ["mort{e} de honte après une accusation publique d'une justesse insoutenable", "L'Affaire de la Honte Fatale"],
      ["percuté{e} de plein fouet par une porte de grange lâchée par le vent, deux fois", "L'Affaire de la Porte Récidiviste"],
      ["étouffé{e} sous les pétales d'un bouquet anonyme et curieusement volumineux", "L'Affaire du Bouquet Anonyme"],
      ["emporté{e} par un courant d'air qu'on entend encore certaines nuits", "L'Affaire du Courant d'Air Persistant"],
      ["mort{e} en expliquant pour la septième fois qu'{il} était la Lavandière", "L'Affaire de la Septième Explication"],
      ["victime d'un accident de brouette d'une improbabilité mathématique", "L'Affaire de la Brouette Improbable"],
      ["piétiné{e} par un unique mouton, mais avec beaucoup de conviction", "L'Affaire du Mouton Convaincu"],
      ["tombé{e} du lit, d'une hauteur pourtant très raisonnable", "L'Affaire de la Chute Raisonnable"]
    ],
    4: [
      ["déclaré{e} mort{e} par vote à main levée, puis contraint{e} de s'y conformer", "L'Affaire du Décès Démocratique"],
      ["supprimé{e} rétroactivement : {il} n'a jamais existé, mais {il} est quand même mort{e}", "L'Affaire de l'Inexistence Fatale"],
      ["écrasé{e} sous le poids d'une métaphore devenue soudainement littérale", "L'Affaire de la Métaphore Lourde"],
      ["mort{e} d'avoir lu sa propre notice nécrologique avec deux jours d'avance", "L'Affaire de la Nécrologie Prématurée"],
      ["dilué{e} dans un bain de camomille, pour des raisons qui demeurent obscures", "L'Affaire de la Camomille Corrosive"],
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
      id: "imp", script: "tb", camp: "demon", quand: "nuit", nom: "le Diablotin",
      intro: [
        "Le Diablotin a choisi. C'est tout ce qu'il y a à comprendre.",
        "Le Diablotin a frappé comme on mouche une chandelle : d'un geste, sans commentaire.",
        "Le Diablotin a agi entre deux battements de l'horloge, à l'heure où le village dormait déjà très mal."
      ],
      manieres: [
        ["frappé{e} une seule fois, très proprement, par quelque chose qui savait où viser", "L'Affaire du Geste Unique"],
        ["sous l'empreinte d'un sourire imprimée sur la porte, à l'envers", "L'Affaire du Sourire Inversé"],
        ["griffé{e} trois fois : une pour le doute, une pour la peur, une pour finir", "L'Affaire des Trois Griffures"]
      ]
    },
    {
      id: "imp-etoile", script: "tb", camp: "demon", quand: "nuit", nom: "le Diablotin (passage de flambeau)",
      intro: [
        "Le Diablotin s'est désigné lui-même : la lignée devait continuer ailleurs.",
        "Le Diablotin a transmis sa charge en se supprimant, ce qui reste la plus dévouée des démissions."
      ],
      manieres: [
        ["poignardé{e} de sa propre main, avec une détermination toute administrative", "L'Affaire de la Démission Définitive"],
        ["mort{e} et étrangement satisfait{e} : promotion oblige", "L'Affaire de la Promotion Posthume"]
      ]
    },
    {
      id: "slayer", script: "tb", camp: "village", quand: "jour", nom: "la Pourfendeuse",
      intro: [
        "La Pourfendeuse a pointé du doigt. Cette fois, le doigt avait raison.",
        "Un doigt tendu, un cri théâtral, un démon qui s'écroule : le village n'en revient toujours pas."
      ],
      manieres: [
        ["pulvérisé{e} par un doigt tendu avec une confiance statistiquement injustifiée", "L'Affaire du Doigt Chanceux"],
        ["désintégré{e} en pleine plaidoirie, au pire moment de son argumentation", "L'Affaire de la Plaidoirie Interrompue"]
      ]
    },
    {
      id: "vierge", script: "tb", camp: "village", quand: "jour", nom: "l'Immaculée",
      intro: [
        "{Il} a nominé l'Immaculée. C'était, rétrospectivement, une mauvaise idée.",
        "L'Immaculée a été nominée ; la procédure, elle, s'est montrée impitoyable."
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
        ["froid{e} et debout, en train de hocher poliment la tête", "L'Affaire du Hochement Posthume"],
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
      id: "parrain", script: "bmr", camp: "sbire", quand: "nuit", nom: "le Parrain",
      intro: [
        "Un Marginal est mort le jour même. Le Parrain a estimé que cela méritait une réponse.",
        "Le Parrain règle ses comptes la nuit qui suit, avec une régularité de comptable."
      ],
      manieres: [
        ["liquidé{e} en représailles d'une mort qui ne {le} concernait absolument pas", "L'Affaire des Représailles Aveugles"],
        ["mort{e} pour solde de tout compte, sans avoir jamais ouvert de compte", "L'Affaire du Solde Inexpliqué"]
      ]
    },
    {
      id: "commere", script: "bmr", camp: "village", quand: "nuit", nom: "la Commère",
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
      id: "bricoleur", script: "bmr", camp: "marginal", quand: "toujours", nom: "le Bricoleur",
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
      id: "parieur", script: "bmr", camp: "village", quand: "nuit", nom: "le Parieur",
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
      id: "selenite", script: "bmr", camp: "marginal", quand: "nuit", nom: "le Sélénite",
      intro: [
        "Le Sélénite est mort aujourd'hui et a désigné quelqu'un dans son dernier souffle. Ce quelqu'un, c'était {lui}.",
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
        "Le Fang Gu a attaqué un Marginal. Le Marginal est devenu le Fang Gu. Le Fang Gu est mort. Tout le monde suit ?",
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
        ["mort{e} sans que cela n'interrompe une seule de ses activités quotidiennes", "L'Affaire de l'Activité Continue"],
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
        ["à l'endroit exact où toutes les informations {le} disaient absent{e}", "L'Affaire de l'Endroit Nié"],
        ["éteint{e} par une vérité isolée au milieu d'un océan de mensonges", "L'Affaire de la Vérité Isolée"]
      ]
    },
    {
      id: "sorciere", script: "sv", camp: "sbire", quand: "jour", nom: "la Sorcière",
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
      id: "barbier", script: "sv", camp: "marginal", quand: "nuit", nom: "le Barbier",
      intro: [
        "Le Barbier est mort, et le Démon en a profité pour échanger deux personnages. Le service continue après la fermeture.",
        "La mort du Barbier a déclenché une redistribution générale qui n'arrangeait personne."
      ],
      manieres: [
        ["mort{e} la lame à la main, deux identités échangées dans son dos", "L'Affaire de la Coupe Posthume"],
        ["mort{e} en provoquant un remaniement dont {il} n'aura jamais connu le détail", "L'Affaire du Remaniement Aveugle"]
      ]
    },
    {
      id: "maladroit", script: "sv", camp: "marginal", quand: "toujours", nom: "le Maladroit",
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
      id: "dulcinee", script: "sv", camp: "marginal", quand: "toujours", nom: "la Dulcinée",
      intro: [
        "La Dulcinée est morte. Quelqu'un, quelque part, est désormais ivre en permanence.",
        "La mort de la Dulcinée a laissé un voisin définitivement embrouillé."
      ],
      manieres: [
        ["mort{e} adoré{e} de tous, en emportant la lucidité d'un voisin parfaitement innocent", "L'Affaire de la Lucidité Emportée"],
        ["emporté{e} par un chagrin collectif si dense qu'il en a saoulé quelqu'un", "L'Affaire du Chagrin Enivrant"]
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
      id: "riot", script: "exp", camp: "demon", quand: "jour", nom: "l'Émeute",
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
      id: "timonstre", script: "exp", camp: "demon", quand: "nuit", nom: "le Timonstre",
      intro: [
        "Un sbire tenait le bébé cette nuit. Le bébé avait faim.",
        "Le Timonstre ne se déplace pas : on le porte, on le berce, et on le laisse manger."
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
      id: "yaggablabla", script: "exp", camp: "demon", quand: "nuit", nom: "le Yaggablabla",
      intro: [
        "Le Yaggablabla a une phrase secrète. Il l'a prononcée. Beaucoup trop de fois.",
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
      id: "golem", script: "exp", camp: "marginal", quand: "jour", nom: "le Golem",
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
      id: "parasyte", script: "exp", camp: "demon", quand: "nuit", nom: "le Parasyte",
      intro: [
        "Le Parasyte s'est accroché à un hôte. L'hôte allait très bien. Les autres, non.",
        "Tant que l'hôte vit, le Parasyte est intouchable. Et il en profite largement."
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
    "« Je vous jure que je suis le Cuisinier. LE CUISINIER. »",
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
    "Le Conteur rappelle que les morts conservent leur Vote de Mort, et un seul.",
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

  /* ================================================================== */
  /*  EXÉCUTIONS — le village se charge lui-même du sale travail         */
  /* ================================================================== */

  /** Complète « accusé{e} … » dans le chef d'accusation. */
  const ACCUSATIONS = [
    "d'avoir répondu trop vite à une question que personne n'avait posée",
    "d'avoir dit « je suis gentil » avec une intonation manifestement suspecte",
    "d'avoir croisé les bras pendant toute l'annonce du matin",
    "de n'avoir rien dit de la journée, ce qui est éminemment louche",
    "d'avoir beaucoup trop parlé, ce qui est tout aussi louche",
    "d'avoir revendiqué un rôle déjà revendiqué par deux autres personnes",
    "d'avoir regardé le Conteur au moment exact où il ne fallait pas",
    "d'avoir survécu à trois nuits d'affilée, ce qui relève de la provocation",
    "d'avoir proposé de ne rien faire aujourd'hui",
    "d'avoir proposé d'exécuter quelqu'un d'autre, ce qui revient au même",
    "d'avoir souri pendant la lecture de la liste des morts",
    "d'avoir utilisé le mot « statistiquement » deux fois en une phrase",
    "d'avoir défendu la mauvaise personne avec une chaleur excessive",
    "d'avoir changé de version entre le petit-déjeuner et le vote",
    "d'avoir gardé exactement la même version, mot pour mot, ce qui sent le texte appris",
    "d'être assis{e} à côté de deux morts, ce qui fait beaucoup de coïncidences",
    "de n'être assis{e} à côté d'aucun mort, ce qui fait encore plus de coïncidences",
    "d'avoir bâillé pendant un témoignage capital",
    "d'avoir proposé un plan trop bon pour être honnête",
    "d'avoir refusé de boire à la santé du village",
    "d'avoir juré sur la tête d'un mort qui n'avait rien demandé",
    "d'avoir corrigé la grammaire de son propre accusateur",
    "d'avoir dit « faites-moi confiance » sans y être invité{e}",
    "d'avoir voté contre tout le monde, y compris contre {lui}-même",
    "d'avoir été le dernier à lever la main, et le plus haut",
    "d'avoir un nom qui sonne un peu démoniaque, à la réflexion",
    "d'avoir rangé sa chaise pendant la discussion sur les alignements",
    "d'avoir eu raison hier, ce qu'aucun innocent ne se permettrait",
    "d'avoir apporté des biscuits, ce qui est exactement ce que ferait un Démon",
    "d'être la seule personne dont personne ne se méfiait encore"
  ];

  const PREUVES = [
    "Trois personnes affirment l'avoir vu{e} sourire au mauvais moment. Les trois se contredisent sur l'heure.",
    "Son information de la première nuit était exacte. Beaucoup trop exacte.",
    "Le Fossoyeur a retrouvé une empreinte de botte. Tout le village porte les mêmes bottes.",
    "Un mort a hoché la tête quand son nom a été prononcé. Enfin, quelqu'un croit l'avoir vu hocher.",
    "On a compté ses interventions : quatorze. La moyenne du village est de six.",
    "Sa version de la nuit 2 tient en trois phrases, dont deux sont invérifiables.",
    "Quelqu'un a trouvé une bougie éteinte devant sa porte. C'est tout, mais c'est troublant.",
    "Le chat de la Tavernière a refusé de s'asseoir sur ses genoux.",
    "Un{e} voisin{e} jure l'avoir entendu{e} rire seul{e} vers deux heures du matin.",
    "Son alibi repose entièrement sur le témoignage d'une personne morte depuis.",
    "{Il} a été désigné{e} par une information que tout le monde soupçonne d'être empoisonnée.",
    "Le vote de la veille avait déjà failli {le} désigner. Le village n'aime pas se répéter, mais tout de même.",
    "On a retrouvé son nom griffonné trois fois dans la marge d'un registre.",
    "Sa réaction à l'annonce du matin a été jugée « une demi-seconde trop lente » par deux témoins.",
    "Personne ne se souvient de l'avoir vu{e} pendant la discussion de midi.",
    "Tout le monde se souvient parfaitement de l'avoir vu{e}, ce qui est encore pire.",
    "Le Conteur n'a pas bronché quand son nom a été cité. Le village y a vu un aveu.",
    "Une addition impeccable de rumeurs aboutit à {lui} avec une marge d'erreur raisonnable.",
    "{Il} a refusé de jurer sur le puits communal, prétextant une entorse.",
    "Deux personnes ont dit « c'est évidemment {lui} » en même temps, ce qui a fait office de preuve.",
    "Le seul élément à décharge a été perdu entre le lavoir et la place.",
    "Son siège grince. Aucun autre siège du village ne grince.",
    "Le dossier est mince, mais il est relié, et un dossier relié impressionne.",
    "L'accusation repose sur une intuition tenace et sur un besoin collectif de conclure.",
    "Quelqu'un a dit « j'ai un mauvais pressentiment » et personne n'a osé contredire un pressentiment."
  ];

  const PLAIDOYERS = [
    "« Si j'étais le Démon, croyez bien que je me défendrais mieux que ça. »",
    "« Exécutez-moi, vous verrez bien. » — le village a vu.",
    "« Je peux tout expliquer, mais il me faudrait environ quarante minutes. »",
    "« Vous commettez une erreur, et pire : une erreur ennuyeuse. »",
    "« Regardez-moi dans les yeux. Non, pas comme ça. »",
    "« Je réclame un second vote, un avocat et un verre d'eau. »",
    "« D'accord, mais qui protégera le village quand je ne serai plus là ? »",
    "« Techniquement, personne n'a prouvé que je respirais encore ce matin. »",
    "« Je vous préviens : ma mort va vous coûter très cher. » — elle a coûté une journée.",
    "« Très bien. Mais rappelez-vous qui vous a dit de ne pas le faire. »",
    "« C'est un complot, et j'en veux pour preuve que personne ne me croit. »",
    "« Je suis prêt{e} à être exécuté{e} demain. Pas aujourd'hui. Demain. »",
    "« Vous allez tous vous sentir très bêtes dans exactement une nuit. »",
    "« Je n'ai pas de défense, j'ai une dignité. »",
    "« Posez-moi n'importe quelle question. Sauf celle-là. »",
    "« Je propose qu'on exécute plutôt la personne qui m'accuse, par symétrie. »",
    "« Sachez que je vous pardonne. Je ne vous pardonne pas du tout, en fait. »",
    "« Attendez ! J'ai une information capitale. » — {il} ne l'a jamais donnée.",
    "« Mon rôle est trop important pour être révélé maintenant. Et maintenant il est trop tard. »",
    "« Est-ce qu'on peut au moins voter à bulletin secret ? »",
    "« Je m'en remets à la sagesse du village. » — pari audacieux.",
    "« Je vous rappelle que j'ai apporté les biscuits. »",
    "« Un instant : est-ce que quelqu'un a vérifié que j'étais vivant{e} ? »",
    "« Tout ceci est une immense perte de temps, et je le prouverai post mortem. »",
    "« Faites vite, alors. J'ai horreur des adieux. »"
  ];

  /** Modes d'exécution, par niveau de loufoquerie. [description, titre de l'affaire] */
  const MODES_EXECUTION = {
    1: [
      ["pendu{e} au vieux chêne, proprement, sans un mot de trop", "L'Exécution Impeccable"],
      ["pendu{e} à un chêne qui a vu passer quatre-vingts innocents et deux coupables", "L'Exécution du Chêne Statisticien"],
      ["exécuté{e} au gibet communal, à l'heure dite, selon la coutume", "L'Exécution Réglementaire"],
      ["exécuté{e} sur la foi d'une intuition et d'un regard légèrement fuyant", "L'Exécution du Regard Fuyant"],
      ["exécuté{e} pour avoir gardé le silence au pire moment possible", "L'Exécution du Silence Mal Placé"],
      ["précipité{e} du haut du beffroi, d'une poussée presque respectueuse", "L'Exécution du Beffroi"],
      ["exécuté{e} dans un silence si dense qu'on entendait la corde réfléchir", "L'Exécution Silencieuse"],
      ["exécuté{e} devant l'assemblée entière, qui a tenu à être présente jusqu'au bout", "L'Exécution Assidue"],
      ["exécuté{e} au lever du soleil, le village ayant tenu à faire les choses dignement", "L'Exécution à l'Aube"]
    ],
    2: [
      ["poussé{e} dans le puits communal, avec un « plouf » d'une banalité décevante", "L'Exécution du Plouf Décevant"],
      ["exécuté{e} après avoir crié « je suis le Cuisinier ! » d'un ton un peu trop enthousiaste", "L'Exécution de l'Enthousiasme Suspect"],
      ["pendu{e} à une corde empruntée au Cordier, qui a exigé de la récupérer ensuite", "L'Exécution de la Corde Prêtée"],
      ["exécuté{e} à la troisième tentative, les deux premières ayant échoué pour raisons techniques", "L'Exécution en Trois Essais"],
      ["écrasé{e} sous la cloche du beffroi, descendue spécialement pour l'occasion", "L'Exécution sous la Cloche"],
      ["exécuté{e} par le Bourrelier, qui n'avait jamais fait ça et a beaucoup transpiré", "L'Exécution de l'Amateur"],
      ["enterré{e} sous les huées, avant même la fin de la procédure", "L'Exécution Anticipée"],
      ["exécuté{e} avec une solennité gâchée par un fou rire au premier rang", "L'Exécution Gâchée"],
      ["pendu{e} à une branche qui a cédé, puis à une autre, plus sérieuse", "L'Exécution de la Deuxième Branche"]
    ],
    3: [
      ["catapulté{e} par-dessus la colline à l'aide d'une charrette et d'un tas de foin", "L'Exécution Balistique"],
      ["exécuté{e} par noyade dans le tonneau de soupe du banquet annuel, désormais annulé", "L'Exécution du Banquet Annulé"],
      ["piétiné{e} par la fanfare du village, entrée au mauvais moment", "L'Exécution en Fanfare"],
      ["exécuté{e} par une foule qui s'y est reprise à quinze, chacun tirant dans son sens", "L'Exécution Collective et Désordonnée"],
      ["enfermé{e} dans le four à pain avec une miche, dont la cuisson fut parfaite", "L'Exécution Boulangère"],
      ["poussé{e} du haut du moulin, puis ramené{e} par la roue, puis repoussé{e}", "L'Exécution en Boucle"],
      ["exécuté{e} par un jury d'oies, désignées à la courte paille", "L'Exécution Ansérine"],
      ["pendu{e} par les bretelles à la girouette, qui a tourné toute la nuit", "L'Exécution Girouette"],
      ["exécuté{e} sous une avalanche de choux lancés depuis le potager de la Mégère", "L'Exécution Maraîchère"],
      ["exécuté{e} à l'ancienne, c'est-à-dire d'une manière que plus personne ne sait reproduire", "L'Exécution à l'Ancienne"],
      ["écrasé{e} par le buste du Fondateur, descellé par l'enthousiasme général", "L'Exécution du Fondateur"],
      ["exécuté{e} deux fois, le village ayant perdu le compte après le premier vote", "L'Exécution en Double"]
    ],
    4: [
      ["exécuté{e} par vote, sans corde, sans arme et sans contact : le vote a suffi", "L'Exécution Purement Démocratique"],
      ["rayé{e} du registre communal, ce qui s'est avéré parfaitement suffisant", "L'Exécution Administrative"],
      ["exécuté{e} rétroactivement à la nuit précédente, pour gagner du temps", "L'Exécution Rétroactive"],
      ["exécuté{e} par un règlement voté le matin même et jamais relu depuis", "L'Exécution Réglementaire au Sens Strict"],
      ["plié{e} en quatre, tamponné{e}, et classé{e} au rayon des affaires closes", "L'Exécution Classée Sans Suite"],
      ["exécuté{e} par consensus si unanime que la réalité n'a pas osé contredire", "L'Exécution par Consensus"],
      ["exécuté{e} sur parole, le village ayant décidé de se croire sur parole", "L'Exécution sur Parole"],
      ["remplacé{e} par une chaise vide, à laquelle tout le monde a continué de parler", "L'Exécution Mobilière"],
      ["exécuté{e} par une phrase prononcée au conditionnel passé, ce qui a suffi", "L'Exécution Grammaticale"],
      ["d'abord annulé{e}, puis réinstauré{e}, puis menée à bien par acquit de conscience", "L'Exécution par Acquit de Conscience"]
    ]
  };

  /** Commentaires sur le décompte des voix. */
  const NOTES_DE_VOTE = [
    "Le village est formel. Le village est souvent formel.",
    "Deux mains se sont levées par simple réflexe grégaire.",
    "Une voix a basculé le vote à la toute dernière seconde, puis a regretté.",
    "Personne n'a osé baisser la main le premier.",
    "Le décompte a été refait trois fois, avec trois résultats différents.",
    "Une main s'est levée toute seule, son propriétaire jure le contraire.",
    "Le vote a été acquis dans un enthousiasme qui retombera dans dix minutes.",
    "Trois personnes ont voté en regardant ailleurs.",
    "Un vote de plus et c'était l'égalité ; une égalité aurait tout sauvé.",
    "Les morts ont voté en premier, ce qui a donné le ton.",
    "La majorité s'est faite sur un malentendu parfaitement identifiable après coup.",
    "Le Conteur a compté à voix haute, lentement, en laissant une dernière chance à tout le monde.",
    "Quelqu'un a demandé un recomptage. Le recomptage a aggravé son cas.",
    "Le vote a duré quatre secondes. La délibération, quarante minutes.",
    "Une main hésitante a fini de sceller le sort du village."
  ];

  /** Verdicts spécifiques aux exécutions. */
  const VERDICTS_EXECUTION = [
    "Le Conteur enregistre l'exécution. Le Conteur ne commente pas les exécutions.",
    "Le Conteur rappelle qu'il n'y aura qu'une exécution par jour, et que celle-ci est faite.",
    "Le Conteur note la décision du village dans la colonne prévue à cet effet.",
    "Le Conteur observe que le village est très fort pour décider, un peu moins pour décider juste.",
    "Le Conteur referme le grimoire. La nuit va tomber, et elle ne sera pas clémente.",
    "Le Conteur s'abstient de tout commentaire, ce qui est en soi un commentaire.",
    "Le Conteur confirme : la procédure a été respectée de bout en bout. Le résultat, c'est autre chose.",
    "Le Conteur laisse au village quelques secondes pour savourer, puis annonce la nuit.",
    "Le Conteur rappelle que les morts conservent un vote, et un seul. Le silence se fait.",
    "Le Conteur archive l'affaire sous la mention : « le village a agi vite ».",
    "Le Conteur signale qu'on peut désormais passer à la suite. Le village n'est pas prêt.",
    "Le Conteur sourit poliment. C'est rarement bon signe."
  ];

  /**
   * Révélations post-mortem : ce que le village découvre après coup.
   * Les conséquences citées suivent les règles officielles du jeu.
   */
  /** Petite phrase attachée au nommant (accordée au genre du nommant). */
  const MOTS_DU_NOMMANT = [
    "qui tient à préciser que ce n'est absolument rien de personnel",
    "qui n'avait jamais nominé personne jusqu'à aujourd'hui",
    "qui avait un très mauvais pressentiment depuis le petit-déjeuner",
    "qui s'est levé{e} lentement, pour l'effet dramatique",
    "qui venait de perdre un pari et devait nominer quelqu'un",
    "qui a nominé en s'excusant trois fois pendant la phrase",
    "qui prétend agir « dans l'intérêt supérieur du village »",
    "qui avait préparé son discours la veille au soir",
    "qui a nominé par élimination, tous les autres ayant déjà été nominés",
    "qui regrette déjà, mais un peu tard",
    "qui a nominé en regardant le Conteur, ce qui n'aide personne",
    "qui jure avoir vu quelque chose, sans pouvoir dire quoi",
    "qui voulait surtout que la journée avance",
    "qui a été poussé{e} du coude par son voisin de gauche"
  ];

  const REVELATIONS = [
    /* ---- le Démon : le village avait raison (pour une fois) ---- */
    { camp: "demon", script: "all", texte: "{Il} était le Démon. Le village exulte — puis se souvient qu'un Sbire peut très bien reprendre le flambeau cette nuit." },
    { camp: "demon", script: "all", texte: "{Il} était le Démon. La partie s'arrête là. Personne n'ose avouer avoir voté au hasard." },
    { camp: "demon", script: "all", texte: "{Il} était le Démon, et {il} l'avait annoncé trois fois en rigolant. Personne n'avait voulu y croire." },
    { camp: "demon", script: "tb", texte: "{Il} était bel et bien le Diablotin. La Femme écarlate, au troisième rang, n'a pas eu l'air si affligée que ça." },
    { camp: "demon", script: "sv", texte: "{Il} était le Fang Gu. Un Marginal, quelque part, vient de se sentir étrangement en forme." },
    { camp: "demon", script: "bmr", texte: "{Il} était le Zombuul, déjà mort une première fois. Le village espère très fort que celle-ci compte." },
    { camp: "demon", script: "exp", texte: "{Il} était le Démon. Il en reste malheureusement un certain nombre d'autres dans ce script." },

    /* ---- un Sbire : demi-victoire ---- */
    { camp: "sbire", script: "all", texte: "{Il} faisait bien partie des Sbires. Le village s'autorise une demi-victoire et une pleine tournée." },
    { camp: "sbire", script: "all", texte: "{Il} servait le Démon, ce qui ne fait pas gagner, mais fait beaucoup de bien au moral." },
    { camp: "sbire", script: "tb", texte: "{Il} était l'Empoisonneur. Les informations reçues depuis deux nuits redeviennent, avec un peu de chance, fiables." },
    { camp: "sbire", script: "tb", texte: "{Il} était l'Espionne, qui passait pour Villageoise depuis le premier soir, chiffres à l'appui." },
    { camp: "sbire", script: "tb", texte: "{Il} était le Baron. Cela explique rétrospectivement pourquoi il y avait tant de Marginaux dans cette partie." },
    { camp: "sbire", script: "tb", texte: "{Il} était la Femme écarlate. Le Démon, lui, se porte très bien et dort à deux sièges de là." },
    { camp: "sbire", script: "bmr", texte: "{Il} était l'Avocat du diable, qui avait sauvé trois accusés de la corde. Le quatrième, c'était {lui}." },
    { camp: "sbire", script: "sv", texte: "{Il} était la Sorcière. La malédiction du jour tombe donc à l'eau, ce qui arrange au moins une personne." },
    { camp: "sbire", script: "exp", texte: "{Il} servait le Démon, et a été remplacé{e} avant même la fin de l'après-midi." },

    /* ---- un Marginal : c'est plus compliqué ---- */
    { camp: "marginal", script: "all", texte: "{Il} comptait parmi les Marginaux : techniquement du bon côté, statistiquement une perte sèche." },
    { camp: "marginal", script: "tb", texte: "{Il} était le Saint. La partie s'arrête immédiatement : le Bien a perdu. Le village range les chaises en silence." },
    { camp: "marginal", script: "tb", texte: "{Il} était la Recluse, qui s'obstinait à avoir l'air maléfique. À force, elle a fini par convaincre tout le monde." },
    { camp: "marginal", script: "tb", texte: "{Il} était l'Ivrogne. {Il} se croyait Villageois{e} depuis le début et {il} est mort{e} sans jamais l'apprendre." },
    { camp: "marginal", script: "tb", texte: "{Il} était le Majordome. Son maître a voté contre {lui}, ce qui restera un grand moment de vie domestique." },
    { camp: "marginal", script: "bmr", texte: "{Il} était le Bricoleur, qui serait probablement mort tout seul avant la fin de la nuit." },
    { camp: "marginal", script: "bmr", texte: "{Il} était le Sélénite, qui a désigné quelqu'un en tombant. Ce quelqu'un ne va pas passer une bonne nuit." },
    { camp: "marginal", script: "bmr", texte: "{Il} était le Gros bras, et la première personne qui l'a choisi cette partie n'a plus jamais rien compris." },
    { camp: "marginal", script: "sv", texte: "{Il} était la Bête de foire, à qui l'on avait justement demandé de ne pas trop parler de son rôle." },
    { camp: "marginal", script: "sv", texte: "{Il} était la Dulcinée. Un voisin vient de devenir définitivement ivre, et l'ignore encore." },
    { camp: "marginal", script: "sv", texte: "{Il} était le Maladroit. Sa désignation d'adieu a raté de trois sièges." },
    { camp: "marginal", script: "sv", texte: "{Il} était le Barbier. Le Démon va pouvoir échanger deux personnages cette nuit, en souvenir." },
    { camp: "marginal", script: "exp", texte: "{Il} était l'Hérétique. Quel que soit le camp qui gagne à la fin, il perdra. Le village n'a pas fini de digérer." },
    { camp: "marginal", script: "exp", texte: "{Il} était la Demoiselle. Un Sbire pouvait la désigner pour faire perdre le Bien ; le village s'en est chargé tout seul." },
    { camp: "marginal", script: "exp", texte: "{Il} était le Politicien, dont le talent consiste précisément à changer de camp au bon moment." },

    /* ---- un Villageois : la catastrophe habituelle ---- */
    { camp: "village", script: "all", texte: "{Il} comptait parmi les Villageois, avec une capacité parfaitement utile et désormais parfaitement perdue." },
    { camp: "village", script: "all", texte: "{Il} était du côté du Bien. Le village vient de faire le travail du Démon, gratuitement et avec entrain." },
    { camp: "village", script: "tb", texte: "{Il} était le Soldat : invulnérable au Démon, parfaitement vulnérable au village." },
    { camp: "village", script: "tb", texte: "{Il} était la Corneille, qui aurait appris le nom de son assassin si le Démon l'avait tuée. Une exécution, ça ne compte pas." },
    { camp: "village", script: "tb", texte: "{Il} était le Fossoyeur. {Il} aurait appris cette nuit quel rôle avait été exécuté aujourd'hui. C'était le sien." },
    { camp: "village", script: "tb", texte: "{Il} était le Maire. À trois joueurs en vie et sans exécution, le Bien l'emportait. C'est désormais un souvenir." },
    { camp: "village", script: "tb", texte: "{Il} était l'Immaculée — deuxième nomination, capacité déjà consommée la veille. Le timing du village est remarquable." },
    { camp: "village", script: "tb", texte: "{Il} était le Moine, qui protégeait quelqu'un d'autre chaque nuit. Plus personne ne protège personne." },
    { camp: "village", script: "tb", texte: "{Il} était la Pourfendeuse, qui gardait son tir pour le bon moment. Le bon moment n'est jamais venu." },
    { camp: "village", script: "tb", texte: "{Il} était l'Empathe, qui répétait depuis deux jours que ses voisins étaient bons. {Il} avait raison, évidemment." },
    { camp: "village", script: "tb", texte: "{Il} était le Cuisinier, dont le chiffre du premier soir était exact. Personne n'avait fait le calcul." },
    { camp: "village", script: "tb", texte: "{Il} était la Voyante, à deux doigts de trouver. Ses deux doigts reposent désormais au cimetière." },
    { camp: "village", script: "bmr", texte: "{Il} était la Tisanière : tant qu'{il} vivait, ses deux voisins ne pouvaient pas mourir. Ils s'en aperçoivent maintenant." },
    { camp: "village", script: "bmr", texte: "{Il} était l'Aubergiste, grâce à qui deux joueurs avaient survécu à la nuit. Ces deux joueurs ont voté contre {lui}." },
    { camp: "village", script: "bmr", texte: "{Il} était le Marin, ivre, heureux et absolument invulnérable à tout — sauf à un vote." },
    { camp: "village", script: "bmr", texte: "{Il} était le Fou du roi. {Il} s'est relevé, a épousseté sa veste et a demandé si le vote comptait quand même." },
    { camp: "village", script: "bmr", texte: "{Il} était la Grand-mère. Son petit-enfant, quelque part dans le cercle, respire nettement moins bien." },
    { camp: "village", script: "bmr", texte: "{Il} était le Courtisan, qui avait rendu le Démon ivre une nuit entière. Le Démon a fini par dessoûler." },
    { camp: "village", script: "sv", texte: "{Il} était l'Horloger, qui savait exactement à quelle distance se trouvait le Démon. Cette distance vient de changer." },
    { camp: "village", script: "sv", texte: "{Il} était le Charmeur de serpents, à un échange près de devenir le Démon {lui}-même. Raté d'un cheveu." },
    { camp: "village", script: "sv", texte: "{Il} était l'Oracle, qui comptait les morts maléfiques chaque nuit. {Il} pourra désormais les compter de l'intérieur." },
    { camp: "village", script: "sv", texte: "{Il} était le Jongleur, dont les cinq devinettes ne seront jamais validées." },
    { camp: "village", script: "exp", texte: "{Il} comptait parmi les Villageois d'un script expérimental, avec une capacité que personne n'avait fini de lire." },

    /* ---- le Conteur garde le secret ---- */
    { camp: "inconnu", script: "all", texte: "Le Conteur ne révèle rien. Le village devra vivre avec, jusqu'à la fin de la partie ou la fin de ses jours." },
    { camp: "inconnu", script: "all", texte: "Le Conteur secoue la tête. Personne ne saura. C'est précisément là que commence le vrai jeu." }
  ];

  /** Pondération des révélations par camp. */
  const POIDS_REVELATION = { village: 40, marginal: 26, sbire: 20, demon: 10, inconnu: 4 };

  const LIBELLES_CAMP = {
    demon: "Démon",
    sbire: "Sbire",
    marginal: "Marginal",
    village: "Villageois",
    inconnu: "Non révélé"
  };

  /* ================================================================== */
  /*  RÔLES — noms officiels (botc-translations, game/fr.json)           */
  /*  type : village | marginal | sbire | demon                          */
  /*  nuit / exec : clin d'œil fidèle aux règles, quand il y en a un     */
  /* ================================================================== */

  const ROLES = [
    /* ---------------- Trouble Brewing — Villageois ---------------- */
    { id: "lavandiere", nom: "Lavandière", art: "la", type: "village", script: "tb",
      nuit: "{Il} savait depuis la première nuit qu'un{e} tel{le} était Villageois. {Il} n'a jamais réussi à faire admettre à quel point c'était utile." },
    { id: "archiviste", nom: "Archiviste", art: "l'", type: "village", script: "tb",
      nuit: "{Il} connaissait un Marginal par son nom depuis le premier soir. {Il} emporte cette information au cimetière." },
    { id: "detective", nom: "Détective", art: "le", type: "village", script: "tb",
      nuit: "{Il} avait un Sbire dans son collimateur depuis la nuit 1. Le Sbire, lui, dort encore.",
      exec: "{Il} avait pourtant nommé un Sbire, le premier soir, avec une précision de greffier. Personne n'a voulu relire ses notes." },
    { id: "cuisinier", nom: "Cuisinier", art: "le", type: "village", script: "tb",
      exec: "{Il} était le Cuisinier, et son chiffre d'ouverture était exact. Il aura fallu une exécution pour que quelqu'un refasse le calcul." },
    { id: "empathe", nom: "Empathe", art: "l'", type: "village", script: "tb",
      nuit: "Chaque nuit, {il} comptait les maléfiques autour de {lui}. Cette nuit, le compte s'est arrêté net.",
      exec: "{Il} répétait depuis deux jours que ses deux voisins étaient bons. {Il} avait raison, évidemment." },
    { id: "voyante", nom: "Voyante", art: "la", type: "village", script: "tb",
      nuit: "{Il} était à deux doigts de trouver le Démon. Le Démon a estimé que deux doigts, c'était un doigt de trop." },
    { id: "fossoyeur", nom: "Fossoyeur", art: "le", type: "village", script: "tb",
      nuit: "{Il} apprenait chaque nuit quel rôle avait été exécuté le jour même. Cette nuit, plus personne ne lui dira rien.",
      exec: "{Il} aurait appris cette nuit quel rôle avait été exécuté aujourd'hui. C'était le sien. On lui épargne la lecture." },
    { id: "moine", nom: "Moine", art: "le", type: "village", script: "tb",
      nuit: "{Il} protégeait quelqu'un d'autre, comme chaque nuit. Le Démon a simplement contourné l'obstacle.",
      exec: "{Il} protégeait quelqu'un chaque nuit du Démon. Cette nuit, plus personne ne protège personne." },
    { id: "corneille", nom: "Corneille", art: "la", type: "village", script: "tb",
      nuit: "Tué{e} par le Démon, {il} s'est réveillé{e} juste assez longtemps pour apprendre le rôle de quelqu'un. {Il} n'aura pas eu le temps de le répéter.",
      exec: "{Il} se serait réveillé{e} pour apprendre un rôle si le Démon l'avait tué{e}. Une exécution ne réveille personne. C'est le règlement." },
    { id: "immaculee", nom: "Immaculée", art: "l'", type: "village", script: "tb",
      exec: "{Il} était l'Immaculée. Si ce nommant avait été Villageois et que c'était sa première nomination, c'est lui qui serait mort à sa place. Manifestement, ce n'était ni l'un ni l'autre." },
    { id: "pourfendeuse", nom: "Pourfendeuse", art: "la", type: "village", script: "tb",
      nuit: "{Il} gardait son tir pour le bon moment. Le bon moment n'est jamais venu.",
      exec: "{Il} gardait son unique tir pour le bon jour. Le village a choisi ce jour-là pour la pendre." },
    { id: "soldat", nom: "Soldat", art: "le", type: "village", script: "tb",
      nuit: "Le Soldat ne meurt pas de la main du Démon. À moins d'être ivre ou empoisonné — et c'est bien ce qui s'est passé.",
      exec: "Invulnérable au Démon, parfaitement vulnérable au village. Le Soldat n'a jamais prétendu être invulnérable aux idiots." },
    { id: "maire", nom: "Maire", art: "le", type: "village", script: "tb",
      nuit: "La mort visait le Maire. Le Conteur aurait pu la faire glisser sur quelqu'un d'autre. Le Conteur ne l'a pas fait.",
      exec: "À trois joueurs en vie et sans exécution, le Bien l'emportait grâce à {lui}. Le village a préféré une exécution. Aujourd'hui." },

    /* ---------------- Trouble Brewing — Marginaux ---------------- */
    { id: "majordome", nom: "Majordome", art: "le", type: "marginal", script: "tb",
      exec: "{Il} ne pouvait voter que si son maître votait. Son maître a voté. Contre {lui}." },
    { id: "ivrogne", nom: "Ivrogne", art: "l'", type: "marginal", script: "tb",
      nuit: "{Il} se croyait Villageois depuis le premier soir. {Il} est mort{e} sans jamais l'apprendre, ce qui est peut-être une bonté.",
      exec: "{Il} se croyait Villageois et donnait des informations avec un aplomb remarquable. Aucune n'était vraie. Aucune." },
    { id: "recluse", nom: "Recluse", art: "la", type: "marginal", script: "tb",
      exec: "{Il} avait le don de passer pour maléfique auprès de toutes les capacités du village. À force, {il} a fini par convaincre les gens aussi." },
    { id: "saint", nom: "Saint", art: "le", type: "marginal", script: "tb",
      exec: "La partie s'arrête ici. Le Saint a été exécuté : le Bien a perdu, immédiatement et sans appel. Le village range les chaises en silence.",
      nuit: "Le Saint est mort dans son sommeil, ce qui ne met fin à rien du tout. Seule une exécution aurait tout fait basculer. Le village l'a échappé belle." },
    /* ---------------- Trouble Brewing — Sbires & Démon ---------------- */
    { id: "empoisonneur", nom: "Empoisonneur", art: "l'", type: "sbire", script: "tb",
      exec: "Les informations reçues ces deux dernières nuits redeviennent fiables. Enfin, celles qui l'étaient déjà." },
    { id: "espionne", nom: "Espionne", art: "l'", type: "sbire", script: "tb",
      exec: "{Il} avait lu le Grimoire et passait pour Villageois{e} auprès de toutes les capacités du jeu. Le village a mis trois jours ; c'est presque rapide." },
    { id: "femme-ecarlate", nom: "Femme écarlate", art: "la", type: "sbire", script: "tb",
      exec: "{Il} attendait patiemment la mort du Démon pour prendre sa place. Le village a réglé le problème dans le mauvais ordre." },
    { id: "baron", nom: "Baron", art: "le", type: "sbire", script: "tb",
      exec: "Cela explique enfin pourquoi cette partie comptait tant de Marginaux. Le village aurait pu s'en douter dès la distribution." },
    { id: "diablotin", nom: "Diablotin", art: "le", type: "demon", script: "tb",
      exec: "Le village avait raison. Reste à savoir si la Femme écarlate, quelque part dans le cercle, vient d'hériter du poste.",
      nuit: "Le Diablotin s'est poignardé lui-même pour transmettre sa charge. C'est la plus dévouée des démissions." },

    /* ---------------- Bad Moon Rising ---------------- */
    { id: "grand-mere", nom: "Grand-mère", art: "la", type: "village", script: "bmr",
      nuit: "{Il} veillait sur un petit-enfant dont {il} connaissait le nom. Si le Démon s'en est pris à l'enfant, la Grand-mère suit toujours." },
    { id: "marin", nom: "Marin", art: "le", type: "village", script: "bmr",
      nuit: "Le Marin ne peut pas mourir. Le Marin est pourtant mort. Quelqu'un, quelque part, a empoisonné un verre de trop.",
      exec: "Ivre, heureux et rigoureusement invulnérable — à tout, sauf à un vote à main levée." },
    { id: "femme-de-chambre", nom: "Femme de chambre", art: "la", type: "village", script: "bmr",
      nuit: "{Il} savait qui s'était réveillé cette nuit-là. Cette nuit-ci, {il} était du nombre." },
    { id: "exorciste", nom: "Exorciste", art: "l'", type: "village", script: "bmr",
      nuit: "{Il} avait empêché le Démon de se réveiller une nuit entière. Le Démon a une excellente mémoire." },
    { id: "aubergiste", nom: "Aubergiste", art: "l'", type: "village", script: "bmr",
      exec: "Deux joueurs lui devaient la vie de la nuit précédente. Les deux ont voté contre {lui}. L'hospitalité a ses limites." },
    { id: "parieur", nom: "Parieur", art: "le", type: "village", script: "bmr",
      nuit: "{Il} a misé sur la mauvaise personne avec une assurance remarquable. Le Parieur paie toujours comptant." },
    { id: "commere", nom: "Commère", art: "la", type: "village", script: "bmr",
      exec: "{Il} disait des choses vraies en public, et quelqu'un en mourait à chaque fois. Le village a fini par trouver ça suspect." },
    { id: "courtisan", nom: "Courtisan", art: "le", type: "village", script: "bmr",
      nuit: "{Il} avait rendu le Démon ivre trois jours durant. Le Démon a dessoûlé exactement à temps." },
    { id: "professeur", nom: "Professeur", art: "le", type: "village", script: "bmr",
      nuit: "Ironie : le Professeur pouvait ramener un Villageois mort à la vie. Il n'a jamais prévu le cas où le mort serait lui." },
    { id: "menestrel", nom: "Ménestrel", art: "le", type: "village", script: "bmr",
      exec: "Si un Sbire avait été exécuté à sa place, tout le village serait ivre ce soir. On l'a échappé belle, si l'on veut." },
    { id: "tisaniere", nom: "Tisanière", art: "la", type: "village", script: "bmr",
      exec: "Tant qu'{il} vivait et que ses deux voisins étaient bons, ceux-ci ne pouvaient pas mourir. Ils s'en aperçoivent à l'instant." },
    { id: "pacifiste", nom: "Pacifiste", art: "le", type: "village", script: "bmr",
      exec: "Un Villageois exécuté survit parfois, quand le Conteur est d'humeur. Le Conteur n'était pas d'humeur." },
    { id: "fou-du-roi", nom: "Fou du roi", art: "le", type: "village", script: "bmr",
      exec: "{Il} s'est relevé, a épousseté sa veste et a demandé si le vote comptait quand même. La première mort du Fou du roi n'en est pas une.",
      nuit: "Le Démon a frappé. Le Fou du roi s'est relevé, vexé, et a réclamé des excuses." },
    { id: "bricoleur", nom: "Bricoleur", art: "le", type: "marginal", script: "bmr",
      nuit: "Le Bricoleur peut mourir à tout moment, sans cause et sans préavis. Le moment, c'était cette nuit.",
      exec: "Le village s'est donné beaucoup de mal : le Bricoleur peut mourir tout seul, à n'importe quel moment." },
    { id: "selenite", nom: "Sélénite", art: "le", type: "marginal", script: "bmr",
      exec: "En apprenant sa mort, {il} a désigné quelqu'un du doigt. Si c'était un joueur du Bien, cette personne ne verra pas l'aube." },
    { id: "gros-bras", nom: "Gros bras", art: "le", type: "marginal", script: "bmr",
      exec: "La première personne à l'avoir choisi cette partie n'a plus jamais rien compris à ce qu'elle apprenait." },
    { id: "lunatique", nom: "Lunatique", art: "le", type: "marginal", script: "bmr",
      exec: "{Il} se croyait le Démon et jouait le rôle avec une conviction admirable. Le vrai Démon, lui, a beaucoup ri." },
    { id: "parrain", nom: "Parrain", art: "le", type: "sbire", script: "bmr",
      exec: "Chaque fois qu'un Marginal mourait, {il} réglait ses comptes la nuit suivante. Il n'y aura pas de nuit suivante." },
    { id: "avocat-du-diable", nom: "Avocat du diable", art: "l'", type: "sbire", script: "bmr",
      exec: "{Il} avait sauvé trois accusés de la corde en les rendant inexécutables. Le quatrième, c'était {lui}." },
    { id: "assassin", nom: "Assassin", art: "l'", type: "sbire", script: "bmr",
      exec: "{Il} gardait son unique coup pour le bon moment. Le bon moment ne viendra pas." },
    { id: "conspirateur", nom: "Conspirateur", art: "le", type: "sbire", script: "bmr",
      exec: "{Il} espérait que le village exécute le Démon pour s'offrir un dernier jour de duel. Le village a exécuté le Conspirateur. Détail." },
    { id: "zombuul", nom: "Zombuul", art: "le", type: "demon", script: "bmr",
      exec: "Le Zombuul était déjà mort une première fois. Le village espère très fort que celle-ci compte pour de bon." },
    { id: "pukka", nom: "Pukka", art: "le", type: "demon", script: "bmr",
      exec: "Quelqu'un, quelque part, est empoisonné depuis hier soir et l'ignore encore. Bonne chance." },
    { id: "shabaloth", nom: "Shabaloth", art: "le", type: "demon", script: "bmr",
      exec: "Il dévorait deux personnes par nuit et en régurgitait parfois une. Le village n'a pas eu à trancher qui aurait eu cette chance." },
    { id: "po", nom: "Po", art: "le", type: "demon", script: "bmr",
      exec: "Le Po jeûnait certaines nuits pour mieux se rattraper ensuite. Le rattrapage n'aura pas lieu." },

    /* ---------------- Sects & Violets ---------------- */
    { id: "horloger", nom: "Horloger", art: "l'", type: "village", script: "sv",
      exec: "{Il} savait exactement combien de sièges séparaient le Démon de son Sbire le plus proche. Cette distance vient de changer." },
    { id: "reveur", nom: "Rêveur", art: "le", type: "village", script: "sv",
      nuit: "Chaque nuit, {il} apprenait deux rôles possibles pour un joueur : un bon, un mauvais. Cette nuit, {il} n'apprendra rien du tout." },
    { id: "charmeur", nom: "Charmeur de serpents", art: "le", type: "village", script: "sv",
      nuit: "S'{il} avait choisi le Démon, {il} serait devenu le Démon et le Démon serait devenu {lui}. {Il} a choisi son voisin de gauche." },
    { id: "mathematicien", nom: "Mathématicien", art: "le", type: "village", script: "sv",
      nuit: "{Il} comptait chaque nuit les capacités qui avaient mal fonctionné. Le total de ce soir aurait été édifiant." },
    { id: "fleuriste", nom: "Fleuriste", art: "la", type: "village", script: "sv",
      exec: "{Il} savait chaque nuit si le Démon avait voté dans la journée. Il faut croire que le Démon a voté aujourd'hui." },
    { id: "crieur", nom: "Crieur public", art: "le", type: "village", script: "sv",
      exec: "{Il} apprenait chaque nuit si un Sbire avait nominé. Ce soir, la réponse aurait été franchement intéressante." },
    { id: "oracle", nom: "Oracle", art: "l'", type: "village", script: "sv",
      exec: "{Il} comptait les morts maléfiques chaque nuit. {Il} pourra désormais les compter de l'intérieur." },
    { id: "savant", nom: "Savant", art: "le", type: "village", script: "sv",
      exec: "Chaque jour, le Conteur lui glissait deux affirmations, une vraie, une fausse. {Il} n'aura jamais su démêler la dernière paire." },
    { id: "couturiere", nom: "Couturière", art: "la", type: "village", script: "sv",
      nuit: "{Il} avait une seule question en réserve : ces deux-là sont-ils du même bord ? {Il} l'a posée une nuit trop tard." },
    { id: "philosophe", nom: "Philosophe", art: "le", type: "village", script: "sv",
      exec: "{Il} avait emprunté la capacité d'un autre Villageois, qui n'a rien vu venir et se demande encore pourquoi il ne sert plus à rien." },
    { id: "artiste", nom: "Artiste", art: "l'", type: "village", script: "sv",
      exec: "{Il} avait le droit de poser une seule question au Conteur, en privé, dans toute la partie. {Il} ne l'a pas posée. {Il} attendait le bon moment." },
    { id: "jongleur", nom: "Jongleur", art: "le", type: "village", script: "sv",
      exec: "{Il} avait avancé cinq hypothèses publiques et attendait le décompte de la nuit. Le décompte n'arrivera jamais." },
    { id: "sage", nom: "Sage", art: "le", type: "village", script: "sv",
      nuit: "Le Démon l'a tué, et le Sage a donc appris deux noms, dont l'un est celui du Démon. {Il} est mort{e} avec la réponse dans la bouche.",
      exec: "Si le Démon l'avait tué, le Sage aurait appris deux noms dont celui du Démon. Le village s'est arrangé pour éviter ça." },
    { id: "barbier", nom: "Barbier", art: "le", type: "marginal", script: "sv",
      exec: "{Il} est mort aujourd'hui : le Démon pourra donc échanger deux personnages cette nuit. Le service continue après la fermeture." },
    { id: "maladroit", nom: "Maladroit", art: "le", type: "marginal", script: "sv",
      exec: "En apprenant sa mort, {il} a désigné quelqu'un. Si c'était un joueur maléfique, son camp vient de perdre la partie. Fidèle à {lui}-même." },
    { id: "bete-de-foire", nom: "Bête de foire", art: "la", type: "marginal", script: "sv",
      exec: "On lui avait demandé de ne surtout pas laisser entendre qu'{il} était Marginal. {Il} en a parlé. Deux fois." },
    { id: "dulcinee", nom: "Dulcinée", art: "la", type: "marginal", script: "sv",
      exec: "{Il} était adoré{e} de tous. Un{e} voisin{e} vient de devenir définitivement ivre, et l'ignore encore." },
    { id: "jumelle", nom: "Jumelle maléfique", art: "la", type: "sbire", script: "sv",
      exec: "Quelque part dans le cercle, son jumeau du Bien se sent soudain très seul — et très suspect." },
    { id: "sorciere", nom: "Sorcière", art: "la", type: "sbire", script: "sv",
      exec: "La malédiction du jour tombe à l'eau. Cela arrange au moins une personne, qui peut nominer tranquille." },
    { id: "cerenovus", nom: "Cerenovus", art: "le", type: "sbire", script: "sv",
      exec: "Trois joueurs se croient encore obligés de jouer un rôle qui n'a jamais été le leur. Personne ne leur dira." },
    { id: "guenaude", nom: "Guenaude", art: "la", type: "sbire", script: "sv",
      exec: "{Il} changeait les rôles des gens pendant leur sommeil. Le village n'est plus très sûr de qui est qui, et il a raison." },
    { id: "fang-gu", nom: "Fang Gu", art: "le", type: "demon", script: "sv",
      exec: "Si {il} avait attaqué un Marginal une nuit de plus, le Démon serait ailleurs à cette heure. Le village a eu de la chance." },
    { id: "vigormortis", nom: "Vigormortis", art: "le", type: "demon", script: "sv",
      exec: "Ses Sbires morts continuaient de travailler. Ils s'arrêtent, enfin, et personne ne les regrette." },
    { id: "no-dashii", nom: "No Dashii", art: "le", type: "demon", script: "sv",
      exec: "Ses deux voisins Villageois donnaient des informations fausses depuis le début, sans le savoir. Ils vont devoir tout relire." },
    { id: "vortox", nom: "Vortox", art: "le", type: "demon", script: "sv",
      exec: "Toutes les informations de cette partie étaient fausses. Absolument toutes. Le village peut jeter ses notes." },

    /* ---------------- Expérimental ---------------- */
    { id: "legion", nom: "Légion", art: "la", type: "demon", script: "exp",
      exec: "Ils étaient légion. Il en reste. Beaucoup." },
    { id: "leviathan", nom: "Léviathan", art: "le", type: "demon", script: "exp",
      exec: "Le Léviathan ne tuait pas la nuit : il attendait le cinquième jour. Le village a compris juste à temps, pour une fois." },
    { id: "emeute", nom: "Émeute", art: "l'", type: "demon", script: "exp",
      exec: "Nominer était devenu mortel pour tout le monde. Le village a fini par le remarquer." },
    { id: "al-hadikhia", nom: "Al-Hadikhia", art: "l'", type: "demon", script: "exp",
      exec: "Il posait chaque nuit une question très douce à trois personnes. Plus personne n'aura à y répondre." },
    { id: "timonstre", nom: "Timonstre", art: "le", type: "demon", script: "exp",
      exec: "Un Sbire le portait chaque nuit comme on porte un nourrisson. Ce Sbire a l'air soulagé et essaie de le cacher." },
    { id: "kazali", nom: "Kazali", art: "le", type: "demon", script: "exp",
      exec: "{Il} avait recruté ses Sbires parmi les gens bien, le premier soir. Ces gens-là sont toujours assis dans le cercle." },
    { id: "yaggablabla", nom: "Yaggablabla", art: "le", type: "demon", script: "exp",
      exec: "{Il} avait une phrase secrète et la répétait beaucoup trop. Le village n'a jamais compris laquelle, mais il a compris qui." },
    { id: "ojo", nom: "Ojo", art: "l'", type: "demon", script: "exp",
      exec: "{Il} désignait des rôles, pas des personnes, et le Conteur improvisait le reste. Le Conteur souffle discrètement." },
    { id: "parasyte", nom: "Parasyte", art: "le", type: "demon", script: "exp",
      exec: "Tant que son hôte vivait, {il} était intouchable. Quelqu'un a donc compris comment fonctionne l'hôte. Bravo." },
    { id: "typhon", nom: "Seigneur de Typhon", art: "le", type: "demon", script: "exp",
      exec: "Il siégeait entre ses Sbires, protégé des deux côtés. On l'a exécuté quand même, ce qui a dû vexer les gardes." },
    { id: "psychopathe", nom: "Psychopathe", art: "le", type: "sbire", script: "exp",
      exec: "{Il} provoquait des duels avant chaque nomination et les gagnait presque tous. Presque." },
    { id: "golem", nom: "Golem", art: "le", type: "marginal", script: "exp",
      exec: "{Il} n'avait droit qu'à une seule nomination de toute la partie, et elle tuait quiconque n'était pas le Démon. {Il} ne l'a pas utilisée. Quel gâchis." },
    { id: "demoiselle", nom: "Demoiselle", art: "la", type: "marginal", script: "exp",
      exec: "Un Sbire pouvait la démasquer publiquement et faire perdre le Bien sur-le-champ. Le village s'en est chargé tout seul, gratuitement." },
    { id: "politicien", nom: "Politicien", art: "le", type: "marginal", script: "exp",
      exec: "S'{il} est jugé le plus responsable de la défaite de son camp, {il} change de bord et gagne. {Il} a très bien travaillé." },
    { id: "heretique", nom: "Hérétique", art: "l'", type: "marginal", script: "exp",
      exec: "Quel que soit le camp qui gagne à la fin, il perdra — et tout le monde avec {lui}. Le village n'a pas fini de digérer." }
  ];

  /** Clins d'œil génériques, quand le rôle n'en a pas de sur mesure. */
  const RECIT_ROLE_GENERIQUE = {
    nuit: {
      village: [
        "{Il} avait une capacité parfaitement utile au village. Le village ne s'en servira plus.",
        "Un Villageois de moins, et personne pour reprendre le travail.",
        "{Il} faisait honnêtement son métier de Villageois. C'est souvent ce qui coûte le plus cher."
      ],
      marginal: [
        "{Il} comptait parmi les Marginaux : du bon côté, mais avec un mode d'emploi compliqué.",
        "Marginal jusqu'au bout, {il} meurt sans que personne sache très bien si c'est une bonne ou une mauvaise nouvelle."
      ],
      sbire: [
        "{Il} servait le Démon. Le Démon, lui, ne fait pas dans le sentiment : un Sbire, ça se remplace.",
        "Servir le Démon comporte des risques, dont celui d'être utile une nuit de trop."
      ],
      demon: [
        "Le Démon est mort cette nuit. Cela n'arrive jamais par hasard, et jamais tout à fait pour rien.",
        "Un Démon qui meurt la nuit, c'est presque toujours un Démon qui a décidé de mourir."
      ]
    },
    exec: {
      village: [
        "{Il} était du côté du Bien, avec une capacité utile et désormais parfaitement perdue.",
        "Le village vient d'accomplir le travail du Démon, gratuitement et avec entrain."
      ],
      marginal: [
        "{Il} comptait parmi les Marginaux : techniquement du bon côté, statistiquement une perte sèche.",
        "Un Marginal exécuté, c'est rarement une victoire et souvent une complication."
      ],
      sbire: [
        "{Il} servait le Démon. Le village s'autorise une demi-victoire et une pleine tournée.",
        "Un Sbire de moins : cela ne fait pas gagner, mais cela fait beaucoup de bien au moral."
      ],
      demon: [
        "Le Démon est tombé. Reste à savoir si quelqu'un, dans le cercle, vient d'hériter du poste.",
        "Le village avait raison. Personne n'ose avouer avoir voté au hasard."
      ]
    }
  };

  /* ================================================================== */
  /*  RÉCIT — trames narratives                                          */
  /*  {nom} = prénom · {role} = « le Fossoyeur » · {acc} = accusateur     */
  /* ================================================================== */

  const OUVERTURES_NUIT = [
    "{nom}{role} s'est couché{e} ce soir-là avec la satisfaction tranquille de qui croit avoir tout compris.",
    "Personne, au village, n'aurait parié sur {nom}{role} pour la victime de cette nuit-là. Personne, sauf une créature.",
    "{nom}{role} avait passé la journée à parler. C'était, avec le recul, une stratégie discutable.",
    "La dernière personne à avoir vu {nom}{role} vivant{e} jure qu'{il} avait l'air parfaitement serein{e}.",
    "{nom}{role} a soufflé sa chandelle un peu plus tôt que d'habitude. On ne saura jamais pourquoi.",
    "Il faisait doux, ce soir-là, et {nom}{role} avait décidé de ne s'inquiéter de rien.",
    "{nom}{role} s'était fait une promesse : demain, {il} dirait enfin tout ce qu'{il} savait.",
    "Le village s'est endormi rassuré. {nom}{role} s'est endormi{e} tout court.",
    "{nom}{role} avait survécu à trois nuits. La quatrième a eu raison de {lui}, de son assurance et de ses projets.",
    "On raconte que {nom}{role} a entendu quelque chose, cette nuit-là, et a préféré se rendormir."
  ];

  /* Marqueurs propres à l'accusateur : [e] accord, [il] / [Il] pronom. */
  const OUVERTURES_JOUR = [
    "Le jour s'est levé sur un village d'humeur décisive. {acc} s'est levé[e] en même temps que lui, et a nominé {nom}{role}.",
    "Il aura fallu moins de deux minutes de débat. {acc} s'est raclé la gorge, a désigné {nom}{role}, et le village a hoché la tête.",
    "{acc} avait préparé son accusation la veille au soir. [Il] l'a servie avec la précision d'un notaire : {nom}{role} devait répondre.",
    "Personne ne voulait nominer en premier. {acc} a fini par s'y résoudre, et c'est sur {nom}{role} que le doigt s'est arrêté.",
    "La journée avait pourtant bien commencé, jusqu'à ce que {acc} prononce le nom de {nom}{role} d'une voix un peu trop forte.",
    "{acc} a précisé qu'[il] ne le faisait pas de gaieté de cœur. Puis [il] a nominé {nom}{role} quand même.",
    "Le village tournait en rond depuis une heure. {acc} a tranché en nominant {nom}{role}, ce qui a eu le mérite de faire avancer la journée.",
    "On a d'abord cru à une plaisanterie. Puis {acc} a répété le nom de {nom}{role}, plus lentement, et plus personne n'a ri."
  ];

  const AMORCES_IDEE = [
    "Ce qu'{il} n'avait dit à personne :",
    "Il y avait une chose qu'{il} gardait pour {lui} :",
    "Un détail que le village ignorait :",
    "Restait ce point, que personne n'a pensé à vérifier :",
    "Et puis il y avait cela, qui change tout ou rien :",
    "Le dossier ne mentionne qu'une fois ce détail :",
    "Une dernière chose, notée en marge du registre :"
  ];

  const AMORCES_IDEE_JOUR = [
    "L'accusation s'est appuyée là-dessus :",
    "Il faut dire, à la décharge du village :",
    "Un élément a beaucoup circulé ce jour-là :",
    "Le village n'a retenu que cela :",
    "Tout est parti de là :",
    "Quelqu'un a rappelé, au pire moment :"
  ];

  const RAPPORTEURS = [
    "rapportés par la Tavernière, qui a l'oreille fine",
    "notés par le Fossoyeur, qui note tout",
    "entendus par trois personnes, qui n'en donnent pas la même version",
    "que personne n'a pris au sérieux sur le moment",
    "consignés au registre sans commentaire",
    "que le village se répète encore, un peu gêné",
    "qu'on grave rarement sur les tombes"
  ];

  const CLOTURES = [
    "Le village a repris ses activités. Mal, mais il les a reprises.",
    "La nuit suivante a été particulièrement silencieuse.",
    "On en parle encore, et on en parlera probablement trop longtemps.",
    "L'affaire est close. La partie, elle, continue.",
    "Quelqu'un a proposé une minute de silence. Elle a duré onze secondes.",
    "Le Conteur a tourné la page. C'est tout ce qu'un Conteur peut faire.",
    "Le cercle s'est resserré d'un siège."
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
    ACCUSATIONS, PREUVES, PLAIDOYERS, MODES_EXECUTION,
    NOTES_DE_VOTE, VERDICTS_EXECUTION, REVELATIONS, MOTS_DU_NOMMANT,
    POIDS_REVELATION, LIBELLES_CAMP,
    ROLES, RECIT_ROLE_GENERIQUE,
    OUVERTURES_NUIT, OUVERTURES_JOUR, AMORCES_IDEE, AMORCES_IDEE_JOUR,
    RAPPORTEURS, CLOTURES,
    SCRIPTS, CHAOS_LABELS
  };
})(window);
