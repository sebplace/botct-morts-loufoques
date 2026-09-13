/*!
 * Raconte ta mort — Ravenswood Bluff
 *
 * Le village vient de te pendre et on te demande de raconter ta mort.
 * Chaque réplique se DIT, debout, devant la table. D'où le registre : oral,
 * phrases courtes, « ne » souvent avalé, chute sèche à la fin.
 *
 * À éviter absolument en écrivant ici :
 *   — les commentaires rapportés en fin de phrase (« …, ce qui est assez vexant »)
 *   — les calques d'anglais (« je note les noms », « c'est ça, un village »)
 *   — tout ce qui se lit bien mais ne se dit pas
 *
 * Accords qui se rapportent à toi :  {e} -> "" / "e"
 * Accord de la personne qui t'a fait pendre : [e] -> "" / "e", [il] / [Il]
 * {acc} est remplacé par son prénom.
 */
(function (global) {
  "use strict";

  const PRENOMS_M = [
    "Aldric", "Barnabé", "Cornélius", "Edmond", "Eustache", "Grégoire", "Hector",
    "Jasper", "Lucien", "Mortimer", "Octave", "Prosper", "Roderick", "Séverin",
    "Silas", "Thaddée", "Ulric", "Valérien", "Wilfrid", "Zacharie"
  ];

  const PRENOMS_F = [
    "Agathe", "Béatrix", "Bérénice", "Célestine", "Delphine", "Eudoxie", "Florine",
    "Hortense", "Isaure", "Léonore", "Marguerite", "Nerissa", "Ombeline", "Perpétue",
    "Rosemonde", "Sidonie", "Théodora", "Ursule", "Vespérine", "Wilhelmine"
  ];

  /* ================================================================== */
  /*  UNE MORT POUR CHAQUE RÔLE                                          */
  /* ================================================================== */

  const MORTS_ROLE = {
    /* ---------------------------- Trouble Brewing ---------------------------- */
    lavandiere: "Je lave le linge de tout le village depuis vingt ans. Ils m'ont pendue avec ma propre corde à linge. En tombant j'ai vu que les draps du Bedeau étaient mal essorés. C'est tout ce que j'emporte.",
    archiviste: "Plus de corde disponible. Ils ont poussé ma bibliothèque sur moi. Trois cent douze volumes. Celui qui m'a achevé, c'était un traité sur les navets.",
    detective: "Je demande cinq minutes pour mener l'enquête. On me les accorde. Au bout de quatre, j'annonce le coupable : c'est moi. Ils le savaient depuis le petit-déjeuner.",
    cuisinier: "Je demande à préparer mon dernier repas moi-même. Ils acceptent, sympas. Je m'étouffe avec avant même qu'on sorte la corde. C'était très bon, cela dit.",
    empathe: "Mes deux voisins sont bons, je le sens. Ce sont aussi les deux premiers à lever la main. Bons et lâches. J'ai eu tout le trajet pour digérer.",
    voyante: "J'ai vu la corde. J'ai vu le chêne. J'ai vu l'heure. J'ai pas vu que c'était pour moi.",
    fossoyeur: "Je creuse les tombes du village. La mienne était prête depuis mardi, bien droite, bien profonde. Ils m'ont jeté dans le puits. Trente ans de métier, même pas capables de m'enterrer correctement.",
    moine: "Toutes les nuits je protège quelqu'un. La dernière, c'était le Tavernier. Le lendemain matin, c'est le Tavernier qui apporte la corde. Je dis rien. Je constate.",
    corneille: "Mes corbeaux me suivent partout. Ils suivent le cortège, se posent sur la branche, regardent. Et au dernier moment ils s'envolent tous d'un coup. La branche casse. Je meurs avant la corde. Même mes oiseaux savent pas faire simple.",
    immaculee: "Ils me pendent. Puis, dans le doute, ils pendent aussi les trois types qui m'ont adressé la parole cette semaine. Prudence.",
    pourfendeuse: "Je tends le doigt, je hurle : « JE SUIS LA POURFENDEUSE ! ». Rien. Je recommence, plus fort, bras bien tendu. Toujours rien. Ils m'ont pendue pendant que j'essayais une troisième fois.",
    soldat: "Aucun Démon peut me tuer. Aucun. Je le répète tout le long du chemin, très fier. Le village, lui, c'est pas un Démon. C'est pire : ils sont quinze.",
    maire: "Ils me pendent sur la place, sous mon portrait officiel. Le portrait se décroche et assomme le bourreau. On a attendu qu'il se réveille. Très long, comme moment.",
    majordome: "Mon maître lève la main contre moi. Je lève la main aussi, par réflexe. Ça fait une voix de plus. Je me suis pendu tout seul, en gros.",
    ivrogne: "Je monte à l'échafaud en répétant que je suis la Voyante. Le bourreau me dit que non. Je lui dis que si. On discute. Il avait raison. Je l'apprends la corde au cou.",
    recluse: "Je parle à personne depuis onze ans. Ils trouvent ça louche. J'essaie d'expliquer que c'est mon caractère. Ça sort très mal — je parle plus depuis onze ans. Pendue.",
    saint: "Ils me pendent. Ils comprennent tout de suite. Ils s'excusent. Je pardonne, c'est mon métier. Mais franchement, quelle bande d'abrutis.",
    empoisonneur: "Ils me pendent sans savoir que j'avais déjà servi la soupe. Je pars en regardant quinze personnes se tenir le ventre en même temps. Belle image.",
    espionne: "Je connais le rôle de tout le monde ici. De tout le monde. Je le dis pile au moment où la corde se tend. Sauf qu'avec une corde au cou on articule mal. Personne a compris.",
    "femme-ecarlate": "J'ai passé la partie à attendre qu'un autre meure à ma place. Résultat : je meurs en robe rouge, sur la place, un mardi, devant tout le village.",
    baron: "Ils me pendent en grande pompe. Je demande un dernier mot. Je fais remarquer qu'il y a vraiment beaucoup de gens bizarres au village cette année. Personne relève. Ils relèveront demain.",
    diablotin: "C'est moi. Depuis le début, c'est moi. Ils me pendent dans un silence de mort, si j'ose dire. Et puis quelqu'un, au troisième rang, sourit. Bon courage.",

    /* ---------------------------- Bad Moon Rising ---------------------------- */
    "grand-mere": "Mon petit-fils est dans la foule. Il lève la main. Je lui fais signe que c'est pas grave. Il croit que je l'encourage et lève l'autre. Pendue par ma propre famille, à deux mains.",
    marin: "Je peux pas mourir, je suis beaucoup trop ivre pour ça. Ils s'y reprennent à six fois. À la septième je meurs de fatigue. C'est pas pareil et je tiens à ce que ce soit noté.",
    "femme-de-chambre": "Je sais qui se lève la nuit. Je sais tout. Je sais même qui met ses draps sales dans le panier du Bedeau. Pendue avant d'avoir pu m'en servir. Tant pis pour le Bedeau.",
    exorciste: "J'ai empêché le Démon de travailler trois nuits d'affilée. Il est au premier rang pour mon exécution. Il applaudit. Poliment, mais il applaudit.",
    aubergiste: "J'ai sauvé la moitié du village dans mon auberge. C'est cette moitié-là qui vient me pendre : l'autre était déjà morte. Avec la nappe des grands jours, en plus.",
    parieur: "Je parie une tournée qu'ils oseront pas. Ils osent. Je meurs en devant une tournée à quatorze personnes. Financièrement, je m'en sors bien.",
    commere: "Je lâche une dernière vérité sur la belle-sœur du meunier. Quelqu'un s'évanouit. Ils me pendent dans le brouhaha. Personne regardait : tout le monde parlait de la belle-sœur du meunier.",
    courtisan: "J'avais rendu le Démon ivre mort pendant trois jours. Il a dessoûlé le matin de mon exécution. Pile le matin. Il m'a fait un petit signe de la main.",
    professeur: "Je peux ressusciter un mort par partie. Je propose de me ressusciter moi-même juste après. Ils trouvent l'idée intéressante. Ils me pendent quand même, pour voir. Ça marche pas.",
    menestrel: "Je demande à jouer un dernier morceau. Ils acceptent. Je joue quarante minutes. Au bout de quarante minutes ils me pendent sans hésiter une seconde. On a plus jamais reparlé de musique ici.",
    tisaniere: "Tant que j'étais là, mes deux voisins pouvaient pas mourir. Ils l'ont appris une seconde après ma pendaison. Leur tête valait le déplacement.",
    pacifiste: "Je suis contre les exécutions. Je le dis. Je le répète. Je le crie. Ils m'exécutent. J'ai eu tout le trajet pour apprécier.",
    "fou-du-roi": "Ils me pendent. Je me relève, j'époussette ma veste, je demande si ça compte. Ils disent non. Ils recommencent. Là, ça compte.",
    bricoleur: "Je meurs pendu{e} à une poulie de mon invention, censée rendre l'exécution plus confortable pour tout le monde. Elle marche nickel. Ma plus belle réussite et j'en profite pas.",
    selenite: "En mourant je désigne quelqu'un du doigt, c'est plus fort que moi. Je désigne le Boulanger. Le Boulanger avait rien fait. Le Boulanger meurt aussi. Voilà. Désolé{e}.",
    "gros-bras": "Le premier qui me touche le regrette. Le bourreau me touche. Le bourreau devient très bizarre. Ils ont fini par me pendre avec une perche, à distance.",
    lunatique: "Je monte à l'échafaud en rugissant que je suis le Démon et que je reviendrai. Le vrai Démon, dans la foule, se tient les côtes. Je suis mort{e} très en colère et complètement à côté.",
    parrain: "Ils me pendent. Je retiens les visages. Tous les visages. J'aurai pas le temps de m'en servir mais ça m'occupe.",
    "avocat-du-diable": "J'ai sauvé trois condamnés de la corde en plaidant. Le quatrième dossier, c'est le mien. Je plaide très bien. Je perds. Première fois de ma carrière.",
    assassin: "J'attendais le bon moment pour frapper. Le bon moment est jamais venu. Ils m'ont pendu avec mon couteau encore propre à la ceinture. Pour un pro, c'est vexant.",
    conspirateur: "J'avais tout prévu. Enfin, presque : j'avais prévu que ce serait quelqu'un d'autre. Le plan tient toujours, il manque juste moi dedans.",
    zombuul: "Je suis déjà mort une fois. Ils me pendent. Je me relève. Ils me rependent. Ils ont fini par me clouer dans une caisse avec une pierre dessus. Première bonne idée de la journée.",
    pukka: "Mon poison met une nuit à agir. Ils me pendent le matin. Quelqu'un dans cette foule a encore une nuit à vivre et il le sait pas. Je pars avec ça.",
    shabaloth: "Je mange par deux. Ils me pendent, soit. Sauf que j'avais déjà avalé le bourreau la veille. Il a fallu en trouver un autre. Ça a pris la matinée.",
    po: "Je jeûne des nuits entières pour me rattraper d'un coup après. Ils me pendent la veille du grand rattrapage. Je meurs le ventre vide. Ça, ça me reste en travers.",

    /* ---------------------------- Sects & Violets ---------------------------- */
    horloger: "Je meurs à l'heure exacte que j'avais calculée. À la seconde près. Personne ici comprendra jamais à quel point c'était fort.",
    reveur: "Je m'endors sur l'échafaud, par habitude. Ils me pendent en plein rêve. Dans le rêve tout allait très bien et j'étais innocent{e}.",
    charmeur: "Il suffisait que je touche le Démon pour prendre sa place. J'ai touché quatorze personnes. Aucune la bonne. À la quinzième on m'a attrapé les mains.",
    mathematicien: "Je calcule la probabilité qu'ils se trompent : quatre-vingt-onze pour cent. Je l'annonce à voix haute, avec le détail du calcul. Je suis dans les quatre-vingt-onze pour cent.",
    fleuriste: "Ils me pendent avec une guirlande de fleurs, parce que je suis la Fleuriste et qu'ils ont le sens du détail. La guirlande casse. On recommence à la corde, comme tout le monde. J'étais vexée.",
    crieur: "J'annonce ma propre exécution sur la place, à midi, avec la cloche. C'est ma fonction. Belle annonce, bonne affluence. Irréprochable jusqu'au bout.",
    oracle: "Je compte les morts maléfiques toutes les nuits. Ma mort fait pas monter le chiffre d'un seul point. J'aurais aimé que quelqu'un le remarque.",
    savant: "Chaque jour on me dit deux choses : une vraie, une fausse. Ce matin on m'a dit que j'allais mourir et que tout allait bien. J'ai misé sur la mauvaise.",
    couturiere: "Le nœud coulant était une honte. J'ai demandé à le refaire, c'est mon métier. Ils m'ont laissée faire. Impeccable. J'en suis morte, mais proprement.",
    philosophe: "Je meurs en démontrant que la mort n'existe pas. La démonstration était solide. Ils sont restés sur leur position. Moi aussi, mais allongé{e}.",
    artiste: "J'avais droit à une seule vraie question dans toute ma vie. Je l'ai gardée pour le bon moment. Je meurs sans l'avoir posée. Elle était excellente.",
    jongleur: "Je jongle pour ma défense. Cinq balles. Ils applaudissent. Ils me pendent. Dans cet ordre.",
    sage: "Si le Démon m'avait tué{e}, j'aurais su qui c'était. Le village a été plus rapide. Je meurs bête. Pour un Sage, c'est ballot.",
    barbier: "Ils me pendent. La nuit suivante, deux personnes se réveillent avec la vie de l'autre. C'est pas ma faute, c'est le métier qui déteint.",
    maladroit: "Je trébuche sur la première marche de l'échafaud et je meurs sur le coup. Le bourreau avait préparé tout un discours. Il est resté là, la corde à la main.",
    "bete-de-foire": "On m'avait dit de surtout pas parler de ce que je suis. J'en ai parlé. Deux fois. La deuxième avec les mains. Pendue avant la troisième.",
    dulcinee: "Tout le monde m'adore. Tout le monde me pend quand même, en pleurant beaucoup. En partant je rends quelqu'un ivre à vie. C'est mon cadeau d'adieu.",
    jumelle: "Mon jumeau est dans la foule, on se ressemble trait pour trait. Ils me pendent. Trois secondes après, ils savent plus lequel des deux ils viennent de pendre.",
    sorciere: "J'avais maudit trois personnes. Ils me pendent avant qu'aucune ait bougé. Les malédictions, elles, tiennent toujours. Bonne nuit.",
    cerenovus: "Quatre personnes dans cette foule croient dur comme fer être quelqu'un d'autre. C'est moi qui ai fait ça. Ils me pendent sans l'avoir compris. Elles non plus.",
    guenaude: "Je change les gens pendant leur sommeil, c'est mon petit plaisir. Ils me pendent. Dans la foule, quelqu'un se demande depuis quand il sait faire ça.",
    "fang-gu": "Ils me pendent. Je saute dans le corps du voisin d'à côté avant que la corde se tende. Ils enterrent une coquille vide avec beaucoup de dignité. Je regarde ça du troisième rang.",
    vigormortis: "Ils me pendent. Mes serviteurs morts continuent de travailler pendant l'enterrement. Ça casse un peu l'ambiance. Personne ose leur dire d'arrêter.",
    "no-dashii": "Ils me pendent. Mes deux voisins se sentent tout de suite beaucoup mieux. Ils l'ont jamais dit à voix haute mais ça se voyait.",
    vortox: "Ils me pendent. C'est la seule chose vraie qui se soit passée ici depuis trois jours. Profitez-en, il y en aura pas d'autre.",

    /* ---------------------------- Expérimental ------------------------------ */
    golem: "Je suis en terre cuite. La corde casse. La branche casse. Ils ont fini par me pousser du haut du beffroi. Quatorze morceaux sur les pavés. Ils en ont fait des pots de fleurs.",
    demoiselle: "Personne savait qui j'étais, c'était tout l'intérêt. Ils me pendent au hasard, comme ça, en passant. Quelque part dans la foule, quelqu'un se mord les doigts.",
    politicien: "Ils me pendent. Je change de camp pendant la chute. Je meurs du bon côté. Belle fin de carrière.",
    heretique: "Ils me pendent. Le camp qui gagnera cette partie perdra à cause de moi. Je sais même pas encore lequel. Ça m'est égal.",
    psychopathe: "Je propose un duel avant l'exécution, comme d'habitude. Ils refusent, pour la première fois. Pendu à quatorze contre un. C'est exactement ce que je reprochais aux autres.",
    legion: "Ils me pendent. La moitié de la foule se sent tout de suite très mal. L'autre moitié aussi, mais pas pour la même raison.",
    leviathan: "Ils me pendent le cinquième jour, à midi pile. J'avais trois heures d'avance sur mon programme. Un peu précipité à mon goût.",
    emeute: "Ils me pendent. Tout le monde se pend un peu en même temps, par contagion. Grosse journée.",
    "al-hadikhia": "On me demande si je préfère vivre ou mourir. Je dis vivre. Ils me pendent. C'est exactement le truc que je fais aux autres toutes les nuits. Ça manque d'imagination.",
    timonstre: "Ils me pendent. Je fais la taille d'un nourrisson, donc la corde est trop grande, donc il faut la refaire, donc ça prend une plombe. Tout le monde était très gêné.",
    kazali: "Ils me pendent. Trois personnes très respectables dans cette foule savent qu'elles bossaient pour moi. Elles osent pas se regarder.",
    yaggablabla: "Ils me pendent en me demandant d'arrêter de répéter cette phrase. J'arrête. Ils sauront jamais laquelle c'était. C'est ce qui me fait le plus plaisir.",
    ojo: "Ils me pendent en visant quelqu'un d'autre. C'est exactement ce que je fais toutes les nuits. Je trouve ça presque touchant.",
    parasyte: "Ils me pendent. Mon hôte, dans la foule, s'effondre en même temps que moi sans comprendre pourquoi. On était très proches.",
    typhon: "Ils me pendent entre mes deux gardes du corps. Ils ont rien vu venir : ils regardaient chacun de l'autre côté. C'était pourtant leur seul boulot."
  };

  /* ================================================================== */
  /*  MORTS GÉNÉRIQUES — par niveau de délire                            */
  /* ================================================================== */

  const MORTS = {
    jour: {
      1: [
        "Ils me pendent au vieux chêne. La branche casse. Ils recommencent avec une plus solide. Elle tient. Moi non.",
        "{acc} me désigne. Je demande un dernier mot. Je dis : « vous allez vous sentir très bêtes demain ». Ils me pendent. Le lendemain, personne s'est senti bête. C'est ça qui m'a vexé{e}.",
        "{acc} lève la main. Quatorze autres suivent. J'ai jamais été aussi populaire, et jamais aussi peu longtemps.",
        "Ils me pendent en silence. Le bourreau s'excuse trois fois. Je lui dis que c'est pas grave. Il pleure. J'ai fini par le consoler, la corde au cou.",
        "Je meurs étranglé{e} par mon propre foulard. Je l'avais noué trop serré le matin même, pour avoir l'air digne. J'ai eu l'air digne.",
        "Ils me pendent sous l'horloge, à midi. L'horloge sonne treize coups. Tout le monde fait semblant d'avoir rien entendu. Moi aussi, mais je suis mort{e}.",
        "Ils me pendent. Trois minutes après, {acc} dit : « bon… et si on s'était trompés ? ». [Il] s'était trompé[e].",
        "Je monte à l'échafaud, je regarde la foule, je reconnais tout le monde. {acc} en premier. On se connaît tous, ici. C'est ça qui est terrible."
      ],
      2: [
        "Ils me pendent, sauf que la corde est trop longue et je touche le sol. On recommence sur un tabouret. Le tabouret casse. Ils ont fini par me pendre assis{e}. Aucune dignité.",
        "{acc} propose le puits. Le puits est à sec depuis 1622. Personne avait vérifié. Moi non plus, cela dit.",
        "Je tombe dans les pommes avant l'exécution, de trouille. Ils me pendent évanoui{e}. Je me réveille mort{e}. Franchement, c'est la bonne méthode.",
        "Ils empruntent une corde au Cordier. Le Cordier regarde toute la scène sans quitter sa corde des yeux. Il l'a récupérée le soir même.",
        "Mes derniers mots : « attendez, j'ai une info capitale ». J'avais aucune info. Je voulais gagner trente secondes. J'en ai gagné douze.",
        "{acc} me reproche d'avoir rien dit au mauvais moment. J'avais la bouche pleine. Personne m'a laissé le temps d'avaler.",
        "Ils me pendent avec beaucoup de sérieux, beaucoup de dignité, et une corde de rideau. Ma famille l'a jamais digéré.",
        "{acc} me désigne d'un coup de menton. Je demande si c'est bien à moi qu'[il] parle. [Il] refait le coup de menton. On discute pas avec un menton pareil."
      ],
      3: [
        "Je glisse sur la première marche de l'échafaud et je meurs de la chute, avant la corde. Le bourreau l'a très mal pris.",
        "{acc} veut qu'on fasse les choses en grand : ils me pendent à la girouette du clocher. Le vent se lève. J'ai tourné toute la nuit. Depuis, la girouette indique le sud-ouest, quoi qu'il arrive.",
        "Ils me pendent dans un silence parfait. Puis quelqu'un éternue. Puis tout le monde éternue. Je meurs au milieu d'une épidémie d'éternuements. Ça a cassé l'ambiance.",
        "Un corbeau se pose sur mon épaule pendant la cérémonie et refuse de bouger. Ils l'ont enterré avec moi. Il a jamais voulu partir.",
        "{acc} fait remarquer que le four du boulanger est déjà chaud et qu'il faut pas gaspiller. Ils m'enfournent avec une miche. La miche est ressortie parfaite. Personne a voulu la manger.",
        "{acc} a une idée : une charrette, un tas de foin, et moi par-dessus la colline. La charrette a marché. La colline aussi. On m'a jamais retrouvé{e}.",
        "Ils m'exécutent pendant que la fanfare répète sur la place. La fanfare était au courant de rien. Quatorze musiciens, deux grosses caisses, et un morceau qu'il a bien fallu finir.",
        "Ils me poussent du haut du moulin. La roue me rattrape en bas, me remonte, me redépose en haut. Trois fois. Le meunier a fini par couper l'eau."
      ],
      4: [
        "{acc} crie pas, accuse personne. [Il] va à la mairie et [il] me raye du registre à l'encre noire, à la règle. J'ai arrêté d'exister dans l'heure, en pleine phrase.",
        "Ils me plient en quatre, me tamponnent deux fois, et me classent aux affaires closes. Entre un litige de mitoyenneté de 1604 et une histoire de chèvre.",
        "{acc} fait remarquer qu'on gagnerait du temps en me pendant mardi dernier. Ils me pendent rétroactivement. Je meurs avant d'être arrivé{e} à cette semaine.",
        "Ils décident que je suis mort{e}. Je suis pas d'accord. Ils insistent. À un moment il faut savoir se ranger à l'avis général.",
        "Ils me remplacent par une chaise vide. Les gens ont continué de me parler trois semaines, par politesse. Puis ils ont arrêté. C'est ça qui fait mal.",
        "Je meurs d'une faute d'orthographe dans mon propre nom, découverte beaucoup trop tard. On a retrouvé mes vêtements pliés sur la chaise.",
        "{acc} me tue avec une phrase. Une vraie phrase, au conditionnel passé, parfaitement construite. Depuis, on évite ce temps-là dans les discussions importantes.",
        "Ils me pendent. Je continue la conversation. Ça met tout le monde très mal à l'aise. J'avais encore des choses à dire."
      ]
    },

    nuit: {
      1: [
        "Je me couche tranquille. Je me réveille mort{e}. Entre les deux il s'est clairement passé quelque chose, mais j'étais pas invité{e}.",
        "Je meurs dans mon sommeil, proprement, sans une marque. On me retrouve assis{e} bien droit, en train de sourire. J'ai toujours eu de la tenue.",
        "Je meurs à minuit pile, en même temps que l'horloge. Très élégant. Absolument pas prémédité de mon côté.",
        "Le chien du Tavernier aboie sur tout. Absolument tout. Cette nuit-là, il a pas aboyé une seule fois. On aurait dû tiquer.",
        "Quelque chose s'assoit au bord de mon lit vers trois heures. Je me retourne pas. C'est la dernière décision de ma vie et je la maintiens.",
        "On me retrouve au matin dans une pièce fermée de l'intérieur, la clé dans la serrure, la fenêtre bloquée depuis l'automne. J'aimerais bien savoir, moi aussi."
      ],
      2: [
        "J'entends un bruit dans le mur. J'allume une bougie. Je regarde le mur. Le mur me regarde. Voilà.",
        "Je souffle ma bougie. Elle se rallume. Je resouffle. Elle se rallume. La troisième fois, c'est moi qu'on souffle.",
        "Quelque chose entre par la fenêtre. Je me dis : c'est le chat. C'était pas le chat. Le chat avait déménagé la veille.",
        "Je descends à la cave vérifier un bruit. Voilà. C'est déjà l'erreur. Tout le reste en découle logiquement.",
        "Je me lève boire un verre d'eau. Je passe devant le miroir du couloir. Le miroir me renvoie rien du tout. J'ai jamais bu ce verre d'eau.",
        "Je meurs gelé{e} en plein mois d'août, dans une chambre à trente degrés. Le givre s'arrêtait pile au seuil de la porte. Comme s'il savait où il avait le droit d'aller."
      ],
      3: [
        "Je me noie dans le tonneau de soupe à l'oignon de la cave. Je savais nager. Ça sert à rien : on nage pas dans la soupe, on s'enfonce.",
        "Je fais un cauchemar où je meurs. Je me réveille en sursaut, soulagé{e}. Puis je meurs pour de vrai. C'était une répétition, en fait.",
        "Une meule de fromage part toute seule dans la rue en pente, prend de la vitesse, tourne à gauche — aucune meule fait ça — et me rattrape devant ma porte.",
        "Le plancher du grenier lâche sous trois cents kilos de lentilles. Il a fallu deux jours pour vider la chambre à la pelle. J'étais tout au fond, bien bordé{e}.",
        "Je meurs d'un fou rire, tout seul, déclenché par une remarque que personne d'autre a entendue. Quarante minutes sans respirer. On saura jamais la blague.",
        "Un piano me tombe dessus dans une ruelle de deux étages, depuis une hauteur de quatre étages, dans un village qui a jamais vu de piano. Il était parfaitement accordé."
      ],
      4: [
        "Je deviens une heure. Depuis, il est dix-sept heures quarante en permanence au village. Le boulanger s'en remet pas.",
        "Je regarde par le trou de la serrure de la porte du fond. J'y passe en entier. Dans l'ordre : l'œil, la tête, le reste.",
        "Quelqu'un dit que je porte tout le village sur mes épaules. Vers trois heures du matin, ça arrête d'être une image.",
        "Le Sacristain me trouve endormi{e}, me plie soigneusement en huit, et me range dans le tiroir avec les nappes d'autel. Il jure qu'il a pas réfléchi.",
        "Je lis ma propre notice nécrologique dans le journal du surlendemain. Très élogieuse. Et d'une précision remarquable.",
        "Pendant la nuit, je suis remplacé{e} par un silence de la même taille et du même poids. Il tient très bien la conversation, si on attend pas de réponse."
      ]
    }
  };

  /* ------------------------------------------------------------------ */
  /*  GREFFE DU DÉTAIL PERSO                                             */
  /* ------------------------------------------------------------------ */

  const GREFFES = [
    "Ah, et pour info : « {idee} ». Personne a voulu m'écouter.",
    "J'avais prévenu, hein : « {idee} ».",
    "Le truc que j'emporte avec moi : « {idee} ».",
    "Et puis aussi : « {idee} ». Voilà, c'est dit.",
    "Je précise, tant que j'y suis : « {idee} ». Faites-en ce que vous voulez.",
    "Dernier truc : « {idee} ». Vous comprendrez plus tard. Ou pas."
  ];

  /* ------------------------------------------------------------------ */
  /*  RÔLES — noms officiels (botc-translations, game/fr.json)           */
  /* ------------------------------------------------------------------ */

  const ROLES = [
    { id: "lavandiere", nom: "Lavandière", art: "la", type: "village", script: "tb" },
    { id: "archiviste", nom: "Archiviste", art: "l'", type: "village", script: "tb" },
    { id: "detective", nom: "Détective", art: "le", type: "village", script: "tb" },
    { id: "cuisinier", nom: "Cuisinier", art: "le", type: "village", script: "tb" },
    { id: "empathe", nom: "Empathe", art: "l'", type: "village", script: "tb" },
    { id: "voyante", nom: "Voyante", art: "la", type: "village", script: "tb" },
    { id: "fossoyeur", nom: "Fossoyeur", art: "le", type: "village", script: "tb" },
    { id: "moine", nom: "Moine", art: "le", type: "village", script: "tb" },
    { id: "corneille", nom: "Corneille", art: "la", type: "village", script: "tb" },
    { id: "immaculee", nom: "Immaculée", art: "l'", type: "village", script: "tb" },
    { id: "pourfendeuse", nom: "Pourfendeuse", art: "la", type: "village", script: "tb" },
    { id: "soldat", nom: "Soldat", art: "le", type: "village", script: "tb" },
    { id: "maire", nom: "Maire", art: "le", type: "village", script: "tb" },
    { id: "majordome", nom: "Majordome", art: "le", type: "marginal", script: "tb" },
    { id: "ivrogne", nom: "Ivrogne", art: "l'", type: "marginal", script: "tb" },
    { id: "recluse", nom: "Recluse", art: "la", type: "marginal", script: "tb" },
    { id: "saint", nom: "Saint", art: "le", type: "marginal", script: "tb" },
    { id: "empoisonneur", nom: "Empoisonneur", art: "l'", type: "sbire", script: "tb" },
    { id: "espionne", nom: "Espionne", art: "l'", type: "sbire", script: "tb" },
    { id: "femme-ecarlate", nom: "Femme écarlate", art: "la", type: "sbire", script: "tb" },
    { id: "baron", nom: "Baron", art: "le", type: "sbire", script: "tb" },
    { id: "diablotin", nom: "Diablotin", art: "le", type: "demon", script: "tb" },

    { id: "grand-mere", nom: "Grand-mère", art: "la", type: "village", script: "bmr" },
    { id: "marin", nom: "Marin", art: "le", type: "village", script: "bmr" },
    { id: "femme-de-chambre", nom: "Femme de chambre", art: "la", type: "village", script: "bmr" },
    { id: "exorciste", nom: "Exorciste", art: "l'", type: "village", script: "bmr" },
    { id: "aubergiste", nom: "Aubergiste", art: "l'", type: "village", script: "bmr" },
    { id: "parieur", nom: "Parieur", art: "le", type: "village", script: "bmr" },
    { id: "commere", nom: "Commère", art: "la", type: "village", script: "bmr" },
    { id: "courtisan", nom: "Courtisan", art: "le", type: "village", script: "bmr" },
    { id: "professeur", nom: "Professeur", art: "le", type: "village", script: "bmr" },
    { id: "menestrel", nom: "Ménestrel", art: "le", type: "village", script: "bmr" },
    { id: "tisaniere", nom: "Tisanière", art: "la", type: "village", script: "bmr" },
    { id: "pacifiste", nom: "Pacifiste", art: "le", type: "village", script: "bmr" },
    { id: "fou-du-roi", nom: "Fou du roi", art: "le", type: "village", script: "bmr" },
    { id: "bricoleur", nom: "Bricoleur", art: "le", type: "marginal", script: "bmr" },
    { id: "selenite", nom: "Sélénite", art: "le", type: "marginal", script: "bmr" },
    { id: "gros-bras", nom: "Gros bras", art: "le", type: "marginal", script: "bmr" },
    { id: "lunatique", nom: "Lunatique", art: "le", type: "marginal", script: "bmr" },
    { id: "parrain", nom: "Parrain", art: "le", type: "sbire", script: "bmr" },
    { id: "avocat-du-diable", nom: "Avocat du diable", art: "l'", type: "sbire", script: "bmr" },
    { id: "assassin", nom: "Assassin", art: "l'", type: "sbire", script: "bmr" },
    { id: "conspirateur", nom: "Conspirateur", art: "le", type: "sbire", script: "bmr" },
    { id: "zombuul", nom: "Zombuul", art: "le", type: "demon", script: "bmr" },
    { id: "pukka", nom: "Pukka", art: "le", type: "demon", script: "bmr" },
    { id: "shabaloth", nom: "Shabaloth", art: "le", type: "demon", script: "bmr" },
    { id: "po", nom: "Po", art: "le", type: "demon", script: "bmr" },

    { id: "horloger", nom: "Horloger", art: "l'", type: "village", script: "sv" },
    { id: "reveur", nom: "Rêveur", art: "le", type: "village", script: "sv" },
    { id: "charmeur", nom: "Charmeur de serpents", art: "le", type: "village", script: "sv" },
    { id: "mathematicien", nom: "Mathématicien", art: "le", type: "village", script: "sv" },
    { id: "fleuriste", nom: "Fleuriste", art: "la", type: "village", script: "sv" },
    { id: "crieur", nom: "Crieur public", art: "le", type: "village", script: "sv" },
    { id: "oracle", nom: "Oracle", art: "l'", type: "village", script: "sv" },
    { id: "savant", nom: "Savant", art: "le", type: "village", script: "sv" },
    { id: "couturiere", nom: "Couturière", art: "la", type: "village", script: "sv" },
    { id: "philosophe", nom: "Philosophe", art: "le", type: "village", script: "sv" },
    { id: "artiste", nom: "Artiste", art: "l'", type: "village", script: "sv" },
    { id: "jongleur", nom: "Jongleur", art: "le", type: "village", script: "sv" },
    { id: "sage", nom: "Sage", art: "le", type: "village", script: "sv" },
    { id: "barbier", nom: "Barbier", art: "le", type: "marginal", script: "sv" },
    { id: "maladroit", nom: "Maladroit", art: "le", type: "marginal", script: "sv" },
    { id: "bete-de-foire", nom: "Bête de foire", art: "la", type: "marginal", script: "sv" },
    { id: "dulcinee", nom: "Dulcinée", art: "la", type: "marginal", script: "sv" },
    { id: "jumelle", nom: "Jumelle maléfique", art: "la", type: "sbire", script: "sv" },
    { id: "sorciere", nom: "Sorcière", art: "la", type: "sbire", script: "sv" },
    { id: "cerenovus", nom: "Cerenovus", art: "le", type: "sbire", script: "sv" },
    { id: "guenaude", nom: "Guenaude", art: "la", type: "sbire", script: "sv" },
    { id: "fang-gu", nom: "Fang Gu", art: "le", type: "demon", script: "sv" },
    { id: "vigormortis", nom: "Vigormortis", art: "le", type: "demon", script: "sv" },
    { id: "no-dashii", nom: "No Dashii", art: "le", type: "demon", script: "sv" },
    { id: "vortox", nom: "Vortox", art: "le", type: "demon", script: "sv" },

    { id: "golem", nom: "Golem", art: "le", type: "marginal", script: "exp" },
    { id: "demoiselle", nom: "Demoiselle", art: "la", type: "marginal", script: "exp" },
    { id: "politicien", nom: "Politicien", art: "le", type: "marginal", script: "exp" },
    { id: "heretique", nom: "Hérétique", art: "l'", type: "marginal", script: "exp" },
    { id: "psychopathe", nom: "Psychopathe", art: "le", type: "sbire", script: "exp" },
    { id: "legion", nom: "Légion", art: "la", type: "demon", script: "exp" },
    { id: "leviathan", nom: "Léviathan", art: "le", type: "demon", script: "exp" },
    { id: "emeute", nom: "Émeute", art: "l'", type: "demon", script: "exp" },
    { id: "al-hadikhia", nom: "Al-Hadikhia", art: "l'", type: "demon", script: "exp" },
    { id: "timonstre", nom: "Timonstre", art: "le", type: "demon", script: "exp" },
    { id: "kazali", nom: "Kazali", art: "le", type: "demon", script: "exp" },
    { id: "yaggablabla", nom: "Yaggablabla", art: "le", type: "demon", script: "exp" },
    { id: "ojo", nom: "Ojo", art: "l'", type: "demon", script: "exp" },
    { id: "parasyte", nom: "Parasyte", art: "le", type: "demon", script: "exp" },
    { id: "typhon", nom: "Seigneur de Typhon", art: "le", type: "demon", script: "exp" }
  ];

  const SCRIPTS = {
    tb: { nom: "Trouble Brewing", court: "TB" },
    bmr: { nom: "Bad Moon Rising", court: "BMR" },
    sv: { nom: "Sects & Violets", court: "S&V" },
    exp: { nom: "Expérimental", court: "EXP" }
  };

  const TYPES = {
    village: "Villageois",
    marginal: "Marginaux",
    sbire: "Sbires",
    demon: "Démons"
  };

  const CHAOS_LABELS = {
    1: "Sobre",
    2: "Drôle",
    3: "Loufoque",
    4: "Surréaliste"
  };

  global.LORE = {
    PRENOMS_M, PRENOMS_F,
    MORTS_ROLE, MORTS, GREFFES,
    ROLES, SCRIPTS, TYPES, CHAOS_LABELS
  };
})(window);
