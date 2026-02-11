from __future__ import annotations

from typing import Any


def _validate_type(value: Any, schema_type: str) -> bool:
    mapping = {
        "string": str,
        "integer": int,
        "array": list,
        "object": dict,
    }
    return isinstance(value, mapping[schema_type])


def validate_required_and_types(instance: dict[str, Any], schema: dict[str, Any]) -> None:
    required = schema.get("required", [])
    properties = schema.get("properties", {})

    for key in required:
        if key not in instance:
            raise ValueError(f"Campo obrigatório ausente: {key}")

    for key, prop_schema in properties.items():
        if key not in instance:
            continue

        expected_type = prop_schema.get("type")
        if expected_type and not _validate_type(instance[key], expected_type):
            raise ValueError(f"Tipo inválido para '{key}': esperado {expected_type}")

        enum = prop_schema.get("enum")
        if enum and instance[key] not in enum:
            raise ValueError(f"Valor inválido para '{key}': {instance[key]}")

        if expected_type == "array":
            min_items = prop_schema.get("minItems")
            max_items = prop_schema.get("maxItems")
            size = len(instance[key])
            if min_items is not None and size < min_items:
                raise ValueError(f"Array '{key}' com tamanho menor que minItems")
            if max_items is not None and size > max_items:
                raise ValueError(f"Array '{key}' com tamanho maior que maxItems")
