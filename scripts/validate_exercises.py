#!/usr/bin/env python3
"""Validation JSON Schema (sous-ensemble utilisé par Product Gym), sans dépendances externes.

Usage : python3 scripts/validate_exercises.py src/content/exercises
La validation n'évalue PAS la qualité éditoriale : voir le skill de revue.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SCHEMA_PATH = ROOT / "schemas" / "exercise.schema.json"


def validate(value: Any, schema: dict[str, Any], path: str = "$") -> list[str]:
    problems: list[str] = []
    expected = schema.get("type")
    type_checks = {
        "object": lambda x: isinstance(x, dict),
        "array": lambda x: isinstance(x, list),
        "string": lambda x: isinstance(x, str),
        "integer": lambda x: isinstance(x, int) and not isinstance(x, bool),
    }
    if expected and not type_checks[expected](value):
        return [f"{path}: type attendu = {expected}, reçu = {type(value).__name__}"]
    if "const" in schema and value != schema["const"]:
        problems.append(f"{path}: valeur obligatoire = {schema['const']!r}")
    if "enum" in schema and value not in schema["enum"]:
        problems.append(f"{path}: doit appartenir à {schema['enum']}")
    if expected == "string":
        if len(value) < schema.get("minLength", 0):
            problems.append(f"{path}: trop court ({len(value)} caractères)")
        if len(value) > schema.get("maxLength", float("inf")):
            problems.append(f"{path}: trop long ({len(value)} caractères)")
        if "pattern" in schema and not re.search(schema["pattern"], value):
            problems.append(f"{path}: format non conforme à {schema['pattern']}")
        if not value.strip():
            problems.append(f"{path}: chaîne vide ou espaces")
    elif expected == "integer":
        if value < schema.get("minimum", -float("inf")):
            problems.append(f"{path}: inférieur au minimum")
        if value > schema.get("maximum", float("inf")):
            problems.append(f"{path}: supérieur au maximum")
    elif expected == "array":
        if len(value) < schema.get("minItems", 0):
            problems.append(f"{path}: nombre d'éléments insuffisant")
        if len(value) > schema.get("maxItems", float("inf")):
            problems.append(f"{path}: trop d'éléments")
        child = schema.get("items", {})
        for index, item in enumerate(value):
            problems.extend(validate(item, child, f"{path}[{index}]"))
    elif expected == "object":
        props = schema.get("properties", {})
        for key in schema.get("required", []):
            if key not in value:
                problems.append(f"{path}.{key}: champ requis absent")
        if schema.get("additionalProperties") is False:
            for key in set(value) - set(props):
                problems.append(f"{path}.{key}: champ non autorisé")
        for key, item in value.items():
            if key in props:
                problems.extend(validate(item, props[key], f"{path}.{key}"))
    return problems


def main() -> int:
    parser = argparse.ArgumentParser(description="Valider les exercices Product Gym")
    parser.add_argument(
        "source", nargs="?", default=str(ROOT / "src" / "content" / "exercises"),
        help="Répertoire des fichiers .json ou fichier .json unique",
    )
    args = parser.parse_args()
    source = Path(args.source).resolve()
    if not source.exists():
        print(f"ERREUR : chemin inexistant : {source}", file=sys.stderr)
        return 2
    files = sorted(source.glob("*.json")) if source.is_dir() else [source]
    if not files:
        print(f"ERREUR : aucun exercice JSON dans {source}", file=sys.stderr)
        return 2
    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    problem_count = 0
    ids: set[str] = set()
    for file in files:
        try:
            data = json.loads(file.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            print(f"❌ {file.name} : impossible de lire le JSON ({exc})")
            problem_count += 1
            continue
        problems = validate(data, schema)
        if isinstance(data, dict) and isinstance(data.get("id"), str):
            if data["id"] != file.stem:
                problems.append(f"$.id: doit être identique au nom de fichier {file.stem!r}")
            if data["id"] in ids:
                problems.append(f"$.id: doublon {data['id']!r}")
            ids.add(data["id"])
        if problems:
            print(f"❌ {file.name} — {len(problems)} problème(s)")
            for problem in problems:
                print(f"   - {problem}")
            problem_count += len(problems)
        else:
            print(f"✓ {file.name} — valide")
    if problem_count:
        print(f"\nValidation échouée : {problem_count} problème(s).")
        return 1
    print(f"\nValidation réussie : {len(files)} exercice(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
