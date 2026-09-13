# 🕯️ Le Registre Macabre de Ravenswood Bluff

**Générateur de morts loufoques — et fidèles au lore — pour [Blood on the Clocktower](https://bloodontheclocktower.com/).**

Un Conteur qui annonce « Untel est mort » rate une occasion. Ce générateur produit, en un clic,
le document qui va avec — et il en existe deux, parce qu'à Ravenswood Bluff on ne meurt pas de la
même façon la nuit et le jour :

| 🌙 **Mort de la nuit** | ⚖️ **Exécution loufoque** |
|---|---|
| Un **certificat de décès** : victime, constat, cause officielle (le bon démon, au bon moment), détail troublant, dernières paroles, verdict du Conteur. | Un **procès-verbal du village** : accusé, nommant, chef d'accusation, pièce à conviction, défense, décompte des voix avec Votes de Mort, mode d'exécution, et surtout la **révélation** de ce que la victime était réellement. |

👉 **[Ouvrir le générateur](https://sebplace.github.io/botct-morts-loufoques/)**

![Aperçu du Registre Macabre](docs/capture.png)

---

## Ce qu'il fait

| | |
|---|---|
| 🎭 **36 causes de mort fidèles au lore** | Diablotin, Zombuul, Pukka, Shabaloth, Po, Fang Gu, Vigormortis, No Dashii, Vortox, Légion, Léviathan, Émeute, Al-Hadikhia, Timonstre, Kazali, Yaggablabla, Ojo, Parasyte, Seigneur de Typhon… mais aussi l'Assassin, le Parrain, la Sorcière, la Commère, la Pourfendeuse, l'Immaculée, le Bricoleur, le Maladroit, la Dulcinée, le Barbier, le Psychopathe, le Golem, le Sélénite et le rebond du Maire. |
| ⚖️ **Des exécutions à part entière** | 40 modes d'exécution, 30 chefs d'accusation, 25 pièces à conviction, 25 plaidoiries, un décompte de voix cohérent (seuil à 50 % des vivants, Votes de Mort en appoint) et **56 révélations post-mortem** dont les conséquences suivent les vraies règles : exécuter le Saint met fin à la partie, la Corneille ne se réveille que si c'est le Démon qui la tue, le Fossoyeur aurait appris ce soir quel rôle a été exécuté — le sien. |
| 📜 **4 scripts** | Trouble Brewing, Bad Moon Rising, Sects & Violets, Expérimental — ou tout mélanger. Le filtre s'applique aussi aux révélations. |
| 🌙 **Cohérence jour / nuit** | Une exécution ne se produit jamais la nuit, le Diablotin ne frappe jamais en plein débat. Le moment affiché découle de la cause. |
| 🎚️ **Curseur de loufoquerie** | De « gothique sobre » (mort sans une marque, cœur arrêté au carillon) à « absurdité totale » (exécution administrative, mort d'une faute de frappe dans son propre nom). |
| ✍️ **Accord en genre automatique** | « Retrouvé**e** noyé**e** » / « Retrouvé noyé ». Saisissez le prénom d'un joueur réel, le texte s'accorde. |
| ⟳ **Relance ligne par ligne** | Le chef d'accusation vous plaît mais pas la défense ? Relancez cette seule ligne. |
| 🔗 **Permalien reproductible** | Chaque document a une graine ; l'URL rejoue exactement le même dossier, section comprise. |
| 🗃️ **Archives locales** | Les 12 derniers dossiers sont conservés dans le navigateur et rejouables d'un clic. |
| 📋 **Copie en texte brut** | Pour coller dans Discord pendant une partie en ligne. |

**Raccourcis clavier :** <kbd>Espace</kbd> nouveau rapport · <kbd>C</kbd> copier · <kbd>P</kbd> permalien · <kbd>M</kbd> changer de section.

---

## Deux exemples

**🌙 Mort de la nuit**

```
† L'AFFAIRE DU CONCOURS DE REGARD †
Registre macabre de Ravenswood Bluff — dossier n°1540 — Nuit 2 — Trouble Brewing

VICTIME : Wilhelmine la Gardienne du Puits, siège n°11.
CONSTAT : Retrouvée battue à mort lors d'un concours de regard fixe contre un corbeau,
          au pied du beffroi, sous l'aiguille des minutes, dans le quart d'heure qui suit
          toujours les mauvaises décisions.
CAUSE OFFICIELLE : Le Diablotin — Le Diablotin a frappé comme on mouche une chandelle :
          d'un geste, sans commentaire.
DÉTAIL TROUBLANT : Le sol sous le corps était parfaitement sec, alors qu'il pleuvait
          depuis l'aube.
DERNIÈRES PAROLES : « Je vous le dis : le danger, c'est les gens trop silencieux. »
VERDICT DU CONTEUR : Le Conteur sourit. Personne ne trouve cela rassurant.
```

**⚖️ Exécution loufoque**

```
⚖ L'EXÉCUTION EN TROIS ESSAIS ⚖
Procès-verbal du village de Ravenswood Bluff — dossier n°9460 — Jour 3 — Trouble Brewing

ACCUSÉ : Silas le Rémouleur, siège n°11.
NOMMÉ PAR : Ulric le Fossoyeur, siège n°12, qui a nominé par élimination, tous les autres
          ayant déjà été nominés.
CHEF D'ACCUSATION : Accusé d'avoir revendiqué un rôle déjà revendiqué par deux autres
          personnes.
PIÈCE À CONVICTION : Son information de la première nuit était exacte. Beaucoup trop exacte.
DÉFENSE : « Vous commettez une erreur, et pire : une erreur ennuyeuse. »
LE VOTE : 7 voix pour, 4 requises (7 joueurs en vie), dont 3 Votes de Mort. Personne n'a
          osé baisser la main le premier.
EXÉCUTION : Exécuté publiquement, à la troisième tentative, les deux premières ayant
          échoué pour raisons techniques.
RÉVÉLATION [MARGINAL] : Il était le Majordome. Son maître a voté contre lui, ce qui
          restera un grand moment de vie domestique.
VERDICT DU CONTEUR : Le Conteur enregistre l'exécution. Le Conteur ne commente pas les
          exécutions.
```

![Le procès-verbal d'exécution](docs/capture-execution.png)

---

## Terminologie française

Les noms des personnages, des types de rôle (**Villageois, Marginal, Sbire, Démon**), du
**Conteur** et du **Vote de Mort** suivent la traduction française publiée par
The Pandemonium Institute pour son application officielle :
[`ThePandemoniumInstitute/botc-translations`](https://github.com/ThePandemoniumInstitute/botc-translations),
fichier `game/fr.json` (clés `roles.<id>.name`) et `app/fr.json`.

⚠️ TPI précise dans ce même fichier que la traduction est l'œuvre de bénévoles non affiliés, et
qu'elle « peut ne pas refléter fidèlement les règles officielles en anglais ». C'est néanmoins la
terminologie que voient les joueurs francophones dans le produit officiel — donc celle qu'utilise
ce projet. Il n'existe à ce jour **aucune édition française commerciale** du jeu.

Restent volontairement en anglais, conformément à cette même version française :

- les noms des scripts — **Trouble Brewing**, **Bad Moon Rising**, **Sects & Violets** ;
- le nom de la bourgade — **Ravenswood Bluff**, qui est bien du lore officiel : le texte de
  règles s'ouvre sur *« Dans la paisible bourgade de Ravenswood Bluff, au cœur d'une nuit
  d'orage, un cri retentit à minuit pile… »*, et rappelle plus loin qu'*« à Ravenswood Bluff,
  la mort n'est pas la fin »*. La **Place du Village**, elle, est traduite.

---

## Installation

Aucune. C'est une page statique, sans dépendance, sans build, sans réseau.

```bash
git clone https://github.com/sebplace/botct-morts-loufoques.git
cd botct-morts-loufoques
# ouvrez index.html dans un navigateur, ou :
python -m http.server 8000
```

Tout est généré dans le navigateur : **aucune donnée ne sort de votre machine.**

---

## Structure

```
index.html      structure de la page (les deux sections)
styles.css      thème gothique (clocher animé, parchemin, sceau de cire)
app.js          moteur : hasard reproductible, accord en genre, rendu, permaliens
data/lore.js    toutes les tables de texte — c'est ici qu'on écrit
```

---

## Écrire vos propres morts

Tout le contenu vit dans [`data/lore.js`](data/lore.js). Une « manière de mourir » est un couple
`[description, titre de l'affaire]` :

```js
["noyé{e} dans un tonneau de soupe à l'oignon encore tiède", "L'Affaire du Tonneau Tiède"]
```

La description se place après « Retrouvé{e} » (ou après « Exécuté{e} publiquement, » pour
`MODES_EXECUTION`). Les marqueurs d'accord disponibles :

| Marqueur | Masculin | Féminin |
|---|---|---|
| `{e}` | *(rien)* | `e` |
| `{il}` / `{Il}` | il / Il | elle / Elle |
| `{le}` | le | la |
| `{un}` | un | une |
| `{lui}` | lui | elle |
| `{ce}` | ce | cette |

⚠️ Ces marqueurs s'accordent avec **la victime** (ou l'accusé). N'en mettez pas sur un mot qui se
rapporte à autre chose — le démon, un objet, le nommant. Seule la table `MOTS_DU_NOMMANT`
s'accorde au genre du nommant.

Les tables disponibles :

| Table | Sert à |
|---|---|
| `CAUSES` | qui a tué, et comment ce personnage tue |
| `MANIERES` | manières de mourir génériques, par niveau de loufoquerie (1 → 4) |
| `LIEUX`, `MOMENTS`, `INDICES`, `DERNIERS_MOTS`, `VERDICTS` | le décor du certificat |
| `ACCUSATIONS`, `PREUVES`, `PLAIDOYERS` | l'instruction du procès |
| `MODES_EXECUTION` | comment le village s'y prend, par niveau de loufoquerie |
| `NOTES_DE_VOTE`, `MOTS_DU_NOMMANT`, `VERDICTS_EXECUTION` | le décor du procès-verbal |
| `REVELATIONS` | ce que l'exécuté était vraiment (`camp` + `script`) |

Pour ajouter une cause de mort :

```js
{
  id: "mon-demon", script: "exp", camp: "demon", quand: "nuit", nom: "le Nom Officiel",
  intro: ["Phrase qui explique la mort, dans le ton du personnage."],
  manieres: [["manière spécifique à ce démon", "Titre de l'affaire"]],
  lieux: [/* optionnel : remplace les lieux génériques */],
  moments: [/* optionnel : remplace les moments génériques */]
}
```

`quand` vaut `"nuit"`, `"jour"` ou `"toujours"` — c'est ce qui garantit la cohérence du cycle.
`script` vaut `"tb"`, `"bmr"`, `"sv"`, `"exp"` ou `"all"`. Pour les noms de personnages, utilisez
la traduction officielle du fichier `game/fr.json` cité plus haut.

Pour ajouter une révélation :

```js
{ camp: "village", script: "tb", texte: "{Il} était le Soldat : invulnérable au Démon, parfaitement vulnérable au village." }
```

`camp` vaut `demon`, `sbire`, `marginal`, `village` ou `inconnu`. Vérifiez la règle que vous
évoquez sur le [wiki officiel](https://wiki.bloodontheclocktower.com/) avant de l'écrire :
la moitié du plaisir vient de ce que la blague est exacte.

Les contributions sont les bienvenues, surtout les morts qui font rire à voix haute une table
de quinze personnes à deux heures du matin.

---

## Licence & mentions

Code et textes sous licence [MIT](LICENSE).

Projet de fan, **non officiel**, sans aucun lien avec The Pandemonium Institute.
*Blood on the Clocktower* et les noms de personnages cités sont la propriété de leurs ayants droit ;
aucun texte de règles n'est reproduit ici. Ce générateur ne fait qu'inventer des façons ridicules
de mourir à Ravenswood Bluff.

Bonne nuit, tout le monde. 🕯️
