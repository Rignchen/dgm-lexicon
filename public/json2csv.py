#!/usr/bin/env python3
from json import loads

"""json structure:
{
	"tags": {
		str: str
	},
	"lexicon": [
		{
			"id": int,
			word: str,
			definition: str,
			first_time_used: str,
			tags: list[str]
		}
	]
}
csv structure:
tag,color
tag1-key,tag1-value
tag2-key,tag2-value
...

id,word,definition,first_time_used,tags
lexicon1-id,lexicon1-word,lexicon1-definition,lexicon1-first_time_used,"lexicon1-tags1,lexicon1-tags2,..."
lexicon2-id,lexicon2-word,lexicon2-definition,lexicon2-first_time_used,"lexicon2-tags1,lexicon2-tags2,..."
"""

def read_json(file_path: str) -> dict:
	"""Read a JSON file and return its content."""
	with open(file_path, 'r', encoding='utf-8') as file:
		return loads(file.read())

def dumps(item: str|int) -> str:
	"""Convert an item to a string, handling special cases."""
	if isinstance(item, int):
		return str(item)
	if any(char in item for char in ['\n', '"', ',', ';']):
		item2 = item.replace('"', '""')
		return f'"{item2}"'
	return item

def write_csv(file_path: str, data: list[list[str|int]], separator: str = ',') -> None:
	"""Write a list of lists to a CSV file."""
	with open(file_path, 'w', encoding='utf-8') as file:
		for row in data:
			file.write(separator.join(dumps(item) for item in row) + '\n')

def convert_json_to_csv(json: dict) -> list[list[str|int]]:
	"""Convert JSON data to a list of lists suitable for CSV writing."""
	tags: list[list[str|int]] = [["tag", "color"]]
	for key, value in json["tags"].items():
		tags.append([key, value])
	lexicon: list[list[str|int]] = [["id", "word", "definition", "first_time_used", "tags"]]
	for entry in json["lexicon"]:
		tags_str = ','.join(entry["tags"])
		lexicon.append([
			entry["id"],
			entry["word"],
			entry["definition"],
			entry["first_time_used"],
			tags_str
		])
	return tags + [[]] + lexicon

def json2csv(file_name: str) -> None:
	"""Convert a JSON file to a CSV file."""
	write_csv(
		f"{file_name}.csv",
		convert_json_to_csv(
			read_json(
				f"{file_name}.json"
			)
		)
	)

if __name__ == "__main__":
	json2csv("db")
