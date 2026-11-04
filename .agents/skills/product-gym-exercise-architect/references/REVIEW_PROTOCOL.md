# Protocole de revue contradictoire

Faire une **revue adversariale** après création. La revue doit chercher à invalider la qualité de l'exercice, non à le défendre.

## Test A — Prédictibilité

- L'intitulé, les verbatims ou les contraintes pointent-ils tous vers une même fonctionnalité ?
- Le lecteur peut-il répondre correctement sans lire les données ?
- Existe-t-il une décision défendable qui contredise la première intuition de l'auteur ?

## Test B — Intégrité

- Les chiffres sont-ils mutuellement compatibles et bien bornés dans le temps ?
- Une donnée importante est-elle absente par accident ou pour une raison pédagogique légitime ?
- Une contrainte empêche-t-elle la mise en œuvre de toutes les options sauf une ?

## Test C — Capacité discriminante

- Qu'attend-on d'un raisonnement expérimenté qui irait au-delà des slogans « tester avec des utilisateurs » et « aligner l'équipe » ?
- Les deux chemins argumentables produisent-ils des compromis différents ?
- Le débrief invite-t-il à réviser une croyance ou seulement à justifier après coup son choix ?

## Test D — Expérience utilisateur

- Comprend-on ce qu'il faut faire en moins d'une minute ?
- Le texte est-il de longueur raisonnable pour 10–15 minutes ?
- L'objection peut-elle être lue après la réponse sans donner l'impression que le jeu est truqué ?

## Format de la note interne

```markdown
# Revue éditoriale — <id>
- Compétence / difficulté / cible d'apprentissage :
- Raisonnements défendables (au moins 2, sans réponse unique) :
- Tension principale :
- Ce qui pourrait biaiser l'apprenant :
- Validité des chiffres et contraintes :
- Notation (crédibilité / tension / rigueur / absence de guidage / pédagogie) : /20
- Blocages critiques : oui/non
- Décision : PUBLIABLE / À REVOIR / À REJETER
- Modifications conseillées :
```

Un exercice `À REVOIR` ne doit pas être considéré comme final, même si son JSON est valide.
