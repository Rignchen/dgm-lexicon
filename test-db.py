#!/usr/bin/env python3

def regex(pattern: str, string: str) -> bool:
	return match(pattern, string) is not None

struct = {
	"tags": (
		lambda x, _: [] if isinstance(x, dict) and all(isinstance(k, str) and isinstance(v, str) for k, v in x.items()) else ["Tags must be a dictionary with string keys and values"],
		lambda x, _: [] if len(vs := [v for v in x.values() if not regex(r'^#[0-9A-F]{6}$', v)]) == 0 else [f"Invalid tag format: {vs} must be in the format #RRGGBB"],
	),
	"lexicon": [
		{
			"id": int,
			"word": (str, lambda x, _: [] if x else ["Word cannot be empty"]),
			"definition": (str, lambda x, _: [] if x else ["Definition cannot be empty"]),
			"first_time_used": (str, lambda x, _: [] if regex(r'^\d{4}-\d{2}-\d{2}$', x) else [f"Invalid date format: {repr(x)} must be YYYY-MM-DD"]),
			"tag": (str, lambda x, y: [] if x in y["tags"] else [f"Tag '{x}' not found in tags"]),
		}
	],
}

from json import loads
from re import match

def read_json(file_path: str) -> dict:
	with open(file_path, 'r') as file:
		return loads(file.read())


def validate_json_structure(data, structure, json: dict|None = None) -> list[str|int]:
	json = json if json is not None else data
	match type(structure).__name__:
		case 'dict':
			# check type, length, keys, validate_json_structure(value, structure[key], json)
			if not isinstance(data, dict):
				return [f"Expected a dictionary, got {type(data).__name__}"]
			if len(data) != len(structure):
				return [f"Expected {len(structure)} keys, got {len(data)}\nExpected keys: {list(structure.keys())}, got: {list(data.keys())}"]
			for key, value in data.items():
				if key not in structure:
					return [f"Unexpected key: {key}\nExpected keys: {list(structure.keys())}"]
				error = validate_json_structure(value, structure[key], json)
				if error:
					error.insert(0, key)
					return error
		case 'list':
			# check type, validate_json_structure(item, structure[0], json)
			if not isinstance(data, list):
				return [f"Expected a list, got {type(data).__name__}"]
			for i, item in enumerate(data):
				error = validate_json_structure(item, structure[0], json)
				if error:
					error.insert(0, i)
					return error
		case 'tuple':
			# check validate_json_structure(data, structure[i], json)
			for i in structure:
				error = validate_json_structure(data, i, json)
				if error:
					return error
		case 'type':
			# check isinstance(data, structure)
			if not isinstance(data, structure):
				return [f"Expected type {structure.__name__}, got {type(data).__name__}"]
		case 'function':
			# check structure(data, json)
			error = structure(data, json)
			if error:
				return error
		case _:
			return [f"Unsupported structure type: {type(structure).__name__}"]
	return []

def main():
	db_path = "public/db.json"
	db_content = read_json(db_path)
	error = validate_json_structure(db_content, struct)
	if error:
		print(f"Validation error: {error}")
		exit(1)
	else:
		print("JSON structure is valid.")

if __name__ == "__main__":
	main()
