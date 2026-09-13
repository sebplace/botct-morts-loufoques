# 🕯️ Raconte ta mort

**Tu viens de mourir en pleine partie de [Blood on the Clocktower](https://bloodontheclocktower.com/) ?
Dis-nous qui tu étais, on s'occupe de la version officielle.**

Tu donnes ton prénom, ton rôle, comment tu es mort et éventuellement une idée à toi.
L'app te rend une **scène complète** : la situation, l'enchaînement, le mécanisme précis de ta
mort et ce qu'on a retrouvé au matin. Rien d'autre. C'est le seul but de cette application.

👉 **[Ouvrir le générateur](https://sebplace.github.io/botct-morts-loufoques/)**

![Aperçu de Raconte ta mort](docs/capture.png)

---

## Un exemple

Prénom *Sébastien*, rôle *Fossoyeur*, mort *pendant la nuit*,
idée *« j'avais caché un fromage sous mon siège »* :

> **Sébastien**, le Fossoyeur, avait parié une tournée qu'il tiendrait plus longtemps qu'un corbeau à un concours de regard fixe.
>
> Une chose, notée en marge du registre : *« j'avais caché un fromage sous mon siège »*. C'est sans doute sans rapport. Sans doute.
>
> Le corbeau s'est posé sur la barrière à onze heures du soir. **Sébastien** a tenu six heures. Le corbeau a tenu six heures et un quart. On les a séparés au matin : l'oiseau est reparti tranquillement vers le clocher, et **Sébastien** avait perdu le pari, la tournée et la vie, exactement dans cet ordre.

Et pour une exécution, avec *Marguerite* comme accusatrice :

> **Marguerite** a désigné **Sébastien**, le Fossoyeur, en montrant le puits communal du menton, ce qui, au village, vaut proposition formelle.
>
> Le puits est à sec depuis 1622, ce que tout le monde savait et que personne n'a jugé utile de rappeler. **Sébastien** est tombé de onze mètres sur de la pierre sèche, avec un bruit que les témoins s'accordent à décrire comme « décevant ». On a remis la margelle en place et la journée a repris son cours.

---

## Ce qu'il y a dedans

| | |
|---|---|
| 📖 **67 scènes écrites une par une** | 41 morts nocturnes, 26 exécutions. Chacune raconte un enchaînement complet — pourquoi la personne était là, ce qui a mal tourné, comment exactement, et ce qu'on a retrouvé. Rien n'est assemblé au hasard. |
| 🎚️ **Niveau d'absurdité** | De « gothique sobre » (l'horloge sonne un treizième coup, et le cœur s'arrête avec) à « absurdité totale » (le secrétaire de mairie rature une ligne du registre et tu meurs par cohérence administrative). |
| 🌙⚖️ **Mort nocturne ou exécution** | Deux jeux de scènes distincts. Pour une exécution, la personne qui t'a désigné entre dans l'histoire. |
| 🎭 **Ton rôle, si tu veux** | Les 87 rôles officiels sont dans la liste ; le tien sert à te nommer dans l'histoire — « Sébastien, le Fossoyeur ». Tu peux aussi ne rien dire. |
| 💬 **Ton idée, citée telle quelle** | Elle se glisse entre la mise en place et la mort, comme le détail qui n'explique rien. |
| ✍️ **Accord en genre automatique** | Pour toi comme pour la personne qui t'a fait exécuter. |
| ⟳ **Un clic sur un paragraphe** | Tire une autre scène, sans toucher à tes réponses. |
| 🔗 **Permalien reproductible** | L'URL rejoue exactement le même récit. |
| 🗃️ **Tes douze derniers récits** | Conservés dans ton navigateur, rejouables d'un clic. |

**Raccourcis :** <kbd>Espace</kbd> nouveau récit · <kbd>C</kbd> copier · <kbd>P</kbd> permalien.

---

## Installation

Aucune. C'est une page statique, sans dépendance, sans build, sans réseau.

```bash
git clone https://github.com/sebplace/botct-morts-loufoques.git
cd botct-morts-loufoques
# ouvre index.html dans un navigateur, ou :
python -m http.server 8000
```

Tout est généré dans le navigateur : **aucune donnée ne sort de ta machine.**

---

## Structure

```
index.html      le formulaire et le parchemin
styles.css      thème gothique (clocher animé, parchemin, sceau de cire)
app.js          moteur : hasard reproductible, accord en genre, rendu, permaliens
data/lore.js    toutes les tables de texte — c'est ici qu'on écrit
```

---

## Écrire tes propres morts

Tout le contenu vit dans [`data/lore.js`](data/lore.js), dans les tables `NUIT` et `JOUR`.
Une mort est une **scène entière**, pas un fragment : `avant` pose la situation, `mort` raconte
l'enchaînement et sa conclusion.

```js
{
  titre: "L'Affaire du Tonneau Tiède",
  niveau: 2,                       // 1 sobre · 2 étrange · 3 loufoque · 4 absurde
  avant: "Vers minuit, {nom} est descendu{e} à la cave vérifier un bruit qu'{il} était seul{e} à avoir entendu.",
  mort: "L'escalier n'avait plus que deux marches sur sept, la lanterne s'est éteinte à la troisième absente, et le tonneau de soupe à l'oignon du banquet de dimanche était resté ouvert, encore tiède. {nom} savait nager. Cela n'a servi à rien : on ne nage pas dans la soupe, on s'y enfonce. On l'a repêché{e} au matin, parfaitement assaisonné{e}."
}
```

Trois règles d'écriture :

1. **Raconte une chaîne d'événements.** Ce qui est drôle, ce n'est pas « noyé dans de la soupe »,
   c'est l'escalier amputé, la lanterne qui s'éteint, le tonneau resté ouvert depuis dimanche, et
   le fait qu'il savait nager.
2. **Sois concret.** Des chiffres, des heures, des objets précis. « Onze mètres », « six hommes et
   deux mules », « un trou de huit millimètres ».
3. **Pas de mécanique de jeu.** Pas de vote, pas de camp, pas de capacité, pas de Conteur. Juste
   des gens qui meurent bêtement dans un village.

Marqueurs d'accord, qui se rapportent au personnage :

| Marqueur | Masculin | Féminin |
|---|---|---|
| `{e}` | *(rien)* | `e` |
| `{il}` / `{Il}` | il / Il | elle / Elle |
| `{le}` | le | la |
| `{un}` | un | une |
| `{lui}` | lui | elle |

Entre crochets — `[e]`, `[il]`, `[Il]` — l'accord se rapporte à la personne qui a fait exécuter,
et ne sert donc que dans la table `JOUR`.

`{nom}` est remplacé par le prénom : la **première** occurrence du récit porte le rôle en
apposition, les suivantes non. `{acc}` est remplacé par le nom de l'accusateur, et n'a de sens
que dans `JOUR`.

Les autres tables : `AMORCES_IDEE` / `AMORCES_IDEE_JOUR` et `SUITES_IDEE` (l'enrobage de l'idée
du joueur), `ROLES` (la liste déroulante), `PRENOMS_M` / `PRENOMS_F` (le prénom de secours).

---

## Terminologie française

Les noms des rôles suivent la traduction française publiée par The Pandemonium Institute pour son
application officielle :
[`ThePandemoniumInstitute/botc-translations`](https://github.com/ThePandemoniumInstitute/botc-translations),
fichier `game/fr.json`.

⚠️ TPI précise dans ce même fichier que la traduction est l'œuvre de bénévoles non affiliés. C'est
néanmoins la terminologie que voient les joueurs francophones dans le produit officiel — donc celle
qu'utilise ce projet. Il n'existe à ce jour aucune édition française commerciale du jeu.

**Ravenswood Bluff** n'est pas traduit, conformément à cette même version française : le texte de
règles officiel s'ouvre sur *« Dans la paisible bourgade de Ravenswood Bluff, au cœur d'une nuit
d'orage, un cri retentit à minuit pile… »*

---

## Licence & mentions

Code et textes sous licence [MIT](LICENSE).

Projet de fan, **non officiel**, sans aucun lien avec The Pandemonium Institute.
*Blood on the Clocktower* et les noms de rôles cités sont la propriété de leurs ayants droit ;
aucun texte de règles n'est reproduit ici. Cette app ne fait qu'inventer des façons ridicules
de mourir à Ravenswood Bluff.

Bonne nuit, tout le monde. 🕯️
