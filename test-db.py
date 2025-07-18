#!/usr/bin/env python3

def regex(pattern: str, string: str) -> bool:
	return match(pattern, string) is not None

struct = {
	"lexicon": [
		{
			"id": int,
			"word": (str, lambda x, _: [] if x else ["Word cannot be empty"]),
			"definition": (str, lambda x, _: [] if x else ["Definition cannot be empty"]),
			"first_time_used": (str, lambda x, _: [] if regex(r'^\d{4}-\d{2}-\d{2}$', x) else [f"Invalid date format: {repr(x)} must be YYYY-MM-DD"]),
			"tags": [(str, lambda x, y: [] if x in y["tags"] else [f"Tag '{x}' not found in tags"])],
		}
	],
	"tags": (
		dict,
		lambda x, _: [] if all(isinstance(k, str) and isinstance(v, str) for k, v in x.items()) else ["Tags must be a dictionary with string keys and values"],
		lambda x, _: [] if len(vs := [v for v in x.values() if not regex(r'^#[0-9A-F]{6}$', v)]) == 0 else [f"Invalid tag format: {vs} must be in the format #RRGGBB"],
	),
}

csv_structure = (
	list,
	lambda x, _: [] if len(x) == 2 else ["CSV must contain exactly two category"],
	lambda x, _: validate_json_structure(x[0],[
		{
			"tag": (str, lambda x, _: [] if x else ["Tag cannot be empty"]),
			"color": (str, lambda x, _: [] if regex(r'^#[0-9A-F]{6}$', x) else [f"Invalid color format: {repr(x)} must be in the format #RRGGBB"]),
		}
	], x),
	lambda x, _: validate_json_structure(x[1], [
		{
			"id": (str, lambda x, _: [] if regex(r'^\d+$', x) else [f"ID must be a positive integer, got {repr(x)}"]),
			"word": (str, lambda x, _: [] if x else ["Word cannot be empty"]),
			"definition": (str, lambda x, _: [] if x else ["Definition cannot be empty"]),
			"first_time_used": (str, lambda x, _: [] if regex(r'^\d{4}-\d{2}-\d{2}$', x) else [f"Invalid date format: {repr(x)} must be YYYY-MM-DD"]),
			"tags": (str, lambda x, y: [] if all(i in map(lambda t: t['tag'], y[0]) for i in x.split(",")) else [f"Tag '{x}' not found in tags"]),
		}
	], x)
)

from json import loads
from csv import DictReader as csv2dict
from re import match, sub

def read_json(file_path: str) -> dict:
	with open(file_path, 'r') as file:
		return loads(file.read())

def read_csv(file_path: str) -> list[list[dict]]:
	with open(file_path, 'r') as file:
		# remove leading/trailing whitespace
		content = '\n'.join(sub(r'^[\s,]+|[\s,]+$', '', line) for line in file.readlines())
		csvs = content.split('\n\n')
		return [list(csv2dict(csv.splitlines())) for csv in csvs if csv.strip()]

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
		case 'builtin_function_or_method':
			match structure.__name__:
				case 'print':
					print(data)
				case _:
					return [f"Unsupported builtin: {structure.__name__}"]
		case _:
			return [f"Unsupported structure type: {type(structure).__name__}"]
	return []

def validate_json_file_structure(file_path: str, structure: dict) -> bool:
	data = read_json(file_path)
	error = validate_json_structure(data, structure)
	if error:
		print(f"Validation error in file {file_path}: {error}")
	else:
		print(f"File {file_path} is valid.")
	return len(error) != 0

def validate_csv_file_structure(file_path: str, structure: tuple) -> bool:
	data = read_csv(file_path)
	error = validate_json_structure(data, structure)
	if error:
		print(f"Validation error in file {file_path}: {error}")
	else:
		print(f"File {file_path} is valid.")
	return len(error) != 0

def main():
	error = validate_json_file_structure("public/db.json", struct)
	error = validate_csv_file_structure("public/db.csv", csv_structure) or error
	if error: exit(1)

if __name__ == "__main__":
	main()
