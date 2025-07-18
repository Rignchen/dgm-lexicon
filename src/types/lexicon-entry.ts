import Tag from '#types/tag';

type objectType = {
	id: number,
	word: string,
	definition: string,
	first_time_used: string,
	tags: string[],
};

export default class LexiconEntry {
	constructor(
		public readonly id: number,
		public readonly word: string,
		public readonly definition: string,
		public readonly firstSeen: Date,
		public readonly tags: Set<Tag>,
	) {}

	static fromObject(obj: objectType, tags: {[name: string]: Tag}): LexiconEntry {
		return new LexiconEntry(
			obj.id,
			obj.word,
			obj.definition,
			new Date(obj.first_time_used),
			new Set(obj.tags.map(tagName => tags[tagName])),
		);
	}

	static fromArray(arr: objectType[], tags: {[name: string]: Tag}): LexiconEntry[] {
		return arr
			.map(obj => LexiconEntry.fromObject(obj, tags))
			.sort((a, b) => b.firstSeen.getTime() - a.firstSeen.getTime());
	}

	static fromJsonData(data: {lexicon: objectType[], tags: {[name: string]: string}}): LexiconEntry[] {
		const tags = Tag.fromObject(data.tags);
		return LexiconEntry.fromArray(data.lexicon, tags);
	}

	static fromCsvData(tagArrays: string[][], lexiconEntriesArrays: string[][]): LexiconEntry[] {
		// Create tags from the tag lines
		const tags = Tag.fromObject(Object.fromEntries(tagArrays));
		const lexiconEntries: LexiconEntry[] = lexiconEntriesArrays.map((line) => {
			const [id, word, definition, first_time_used, tagsString] = line;
			const tagsArray = tagsString.split(',');
			const tagSet = new Set(tagsArray.map(tagName => tags[tagName]));
			return new LexiconEntry(
				parseInt(id, 10),
				word,
				definition,
				new Date(first_time_used),
				tagSet,
			);
		})

		return lexiconEntries.sort((a, b) => b.firstSeen.getTime() - a.firstSeen.getTime());
	}

	static parseFromCsv(data: string): LexiconEntry[] {
		/* Assuming the CSV data is structured as follows:
		 * ```csv
		 * tag,color
		 * tag0,color0
		 * tag1,color1
		 * ...
		 *
		 * id,word,definition,first_time_used,tags
		 * 0,word0,definition0,first_time_used0,"tag0-0,tag0-1,..."
		 * 1,word1,definition1,first_time_used1,"tag1-0,tag1-1,..."
		 * ```
		 * There might be trailing commas that should be removed.
		 * The first part of the CSV is for tags, then there's a blank line, then the lexicon entries. tags in the lexicon entries are separated by semicolons to have all of them in the same field.
		 * Some fields might have commas in them, these fields are quoted. In these quoted fields there might be quotes, these are escaped with a backslash.
		 */

		// Strip trailing commas from each line
		const trailingCommaRegex = /^[\s,]*|[\s,]*$/g;
		const lines = data.split('\n').map(line => line.replace(trailingCommaRegex, ''));

		// Separate on commas, taking care of quoted fields
		const csvLineRegex = /(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^",]*))/g;
		const separatedLines: string[][] = lines.map(line => {
			if (line === '') return [];
			const parts = [];
			let match;
			while ((match = csvLineRegex.exec(line)) !== null) {
				parts.push(match[1] !== undefined ? match[1].replace(/""/g, '"') : match[2]);
			}
			return parts;
		});

		// Split the lines into tags and lexicon entries
		const indexOfEmptyLine = separatedLines.findIndex(line => line.length === 0);
		const tagArrays = separatedLines.slice(1, indexOfEmptyLine);
		const lexiconEntriesArrays = separatedLines.slice(indexOfEmptyLine + 2)
			.filter(line => line.length > 0); // there might be an empty line at the end

		return LexiconEntry.fromCsvData(tagArrays, lexiconEntriesArrays);
	}
}
