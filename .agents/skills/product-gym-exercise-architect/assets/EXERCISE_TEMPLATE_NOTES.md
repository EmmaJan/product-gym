# Gabarit pour l'auteur (ne pas importer dans l'app)

Les champs structurés publics sont définis dans `schemas/exercise.schema.json`. Rédiger en priorité :

- Une phrase qui fixe **ce que l'apprenant doit décider**.
- Une situation et un objectif qui rendent la décision nécessaire.
- Deux tensions irréductibles et **au moins deux raisonnements défendables** (uniquement dans la note interne).
- Deux à cinq signaux nécessaires, plutôt que dix statistiques décoratives.
- Une objection différée qui éprouve une prémisse réelle de la réponse.
- Deux ou trois questions de bilan sur les compromis et les conditions de révision.

Fichier public : `src/content/exercises/<id>.json`.
Fichier interne : `editorial/reviews/<id>.review.md`.
Lancer la validation : `python3 scripts/validate_exercises.py src/content/exercises`.
