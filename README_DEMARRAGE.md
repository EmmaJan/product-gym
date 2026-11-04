# Product Gym — Kit de démarrage Codex

**Ce ZIP n'est pas encore l'application.** C'est le kit de cadrage, de contenu et de design à placer à la racine d'un projet avant de demander à Codex de développer le MVP.

## Commencer en 5 étapes

1. Créer un dossier ou dépôt vide nommé `product-gym`.
2. Décompresser **tout le contenu** de ce ZIP dans ce dossier, y compris le dossier caché `.agents` (il contient le skill Codex).
3. Ouvrir le dossier `product-gym` comme projet dans Codex. Vérifier la présence de `AGENTS.md`, `.agents/skills/product-gym-exercise-architect/SKILL.md` et `MASTER_PROMPT_CODEX.md`.
4. Dans une nouvelle conversation Codex, coller le contenu de `MASTER_PROMPT_CODEX.md`. Demander explicitement de **s'arrêter après le premier exercice complet et sa vérification**.
5. Tester la boucle d'entraînement, puis seulement ensuite demander d'ajouter du contenu avec le skill `$product-gym-exercise-architect`.

Si le skill n'apparaît pas, rouvrir le projet / redémarrer Codex, puis vérifier que `.agents/skills/product-gym-exercise-architect/SKILL.md` existe réellement. Les skills de projet sont recherchés dans `.agents/skills`. Voir la documentation Codex : https://learn.chatgpt.com/docs/build-skills?product=breeze

## Contenu du kit

```text
product-gym/
├── AGENTS.md                                 # Règles permanentes du projet pour Codex
├── MASTER_PROMPT_CODEX.md                    # Prompt de lancement de l'implémentation
├── README_DEMARRAGE.md                       # Ce fichier
├── design/
│   ├── DESIGN_SYSTEM.md                     # Source de vérité UI
│   ├── tokens.css                           # Tokens couleur, typo, espace
│   └── ui-kit.html                          # Référence visuelle, pas à intégrer telle quelle
├── .agents/skills/product-gym-exercise-architect/
│   ├── SKILL.md                             # Skill de conception / audit des exercices
│   ├── references/                          # Qualité, difficulté, processus de revue
│   └── assets/                              # Gabarit éditorial
├── schemas/exercise.schema.json             # Contrat de données public pour l'app
├── src/content/exercises/demo-01.json       # 1 exercice de démonstration générique
├── editorial/reviews/demo-01.review.md      # Notes internes non affichées dans l'app
└── scripts/validate_exercises.py            # Vérification JSON, sans dépendance Python externe
```

## Décision importante : public vs éditorial

- `src/content/exercises/*.json` contient **seulement** ce que l'utilisateur peut voir, avec une révélation progressive gérée par l'interface.
- `editorial/reviews/*.review.md` contient les intentions pédagogiques, arguments défendables et défauts fréquents. **Ne jamais importer ce dossier dans le bundle client**, ni le placer sous `public/`. Il s'agit de notes internes du dépôt, pas d'un mécanisme de sécurité secret.
- Le schéma JSON ne contient aucune « bonne réponse » unique ; les décisions crédibles peuvent varier.

## Ce que Codex doit livrer en premier

Une application statique React/TypeScript/Vite avec **un seul exercice fonctionnel** de bout en bout : lecture → rédaction → objection / ouverture ChatGPT → bilan, navigation accessible, conservation locale et export/import JSON. Pas de production automatique des 12 exercices avant validation de l'expérience.

## Tester les fichiers de contenu (optionnel)

```bash
python3 scripts/validate_exercises.py src/content/exercises
```

La validation structurelle ne remplace pas l'audit éditorial par le skill.

## Ce qui n'existe volontairement pas

Pas de comptes, base de données, backend, API d'IA, synchronisation ou vraie notation automatique du niveau senior. Les données saisies restent sur le navigateur courant, avec export/import manuel. **Le bouton ChatGPT copie le prompt et ouvre ChatGPT : il ne transmet pas automatiquement la réponse au modèle.**
