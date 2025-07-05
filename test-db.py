#!/usr/bin/env python3
from json import loads
from re import match

def read_json(file_path: str) -> dict:
	with open(file_path, 'r') as file:
		return loads(file.read())

struct = {
	"lexicon": [
		{
			"id": int,
			"word": str,
			"definition": str,
			"first_time_used": (str, lambda x: [] if match(r'^\d{4}-\d{2}-\d{2}$', x) is not None else [f"Invalid date format: {repr(x)}"]),
		}
	]
}

def validate_json_structure(data, structure) -> list[str|int]:
	match type(structure).__name__:
		case 'dict':
			# check type, length, keys, validate_json_structure(value, structure[key])
			if not isinstance(data, dict):
				return [f"Expected a dictionary, got {type(data).__name__}"]
			if len(data) != len(structure):
				return [f"Expected {len(structure)} keys, got {len(data)}\nExpected keys: {list(structure.keys())}, got: {list(data.keys())}"]
			for key, value in data.items():
				if key not in structure:
					return [f"Unexpected key: {key}\nExpected keys: {list(structure.keys())}"]
				error = validate_json_structure(value, structure[key])
				if error:
					error.insert(0, key)
					return error
		case 'list':
			# check type, validate_json_structure(item, structure[0])
			if not isinstance(data, list):
				return [f"Expected a list, got {type(data).__name__}"]
			for i, item in enumerate(data):
				error = validate_json_structure(item, structure[0])
				if error:
					error.insert(0, i)
					return error
		case 'tuple':
			# check validate_json_structure(data, structure[i])
			for i in structure:
				error = validate_json_structure(data, i)
				if error:
					return error
		case 'type':
			# check isinstance(data, structure)
			if not isinstance(data, structure):
				return [f"Expected type {structure.__name__}, got {type(data).__name__}"]
		case 'function':
			# check structure(data)
			error = structure(data)
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
