import Tag from '#types/tag';
import Markdown from '#types/markdown';

export default class LexiconEntry {
	constructor(
		public readonly id: number,
		public readonly word: string,
		public readonly definition: Markdown,
		public readonly firstSeen: Date,
		public readonly tags: Set<Tag>,
	) {}

	static new(id: number, word: string, definition: string, firstSeen: string, tags: Tag[]): LexiconEntry {
		return new LexiconEntry(
			id,
			word,
			new Markdown(definition),
			new Date(firstSeen),
			new Set(tags),
		);
	}

	static fromCsvData(tagArrays: string[][], lexiconEntriesArrays: string[][]): LexiconEntry[] {
		// Create tags from the tag lines
		const tags = Tag.fromObject(Object.fromEntries(tagArrays));
		const lexiconEntries: LexiconEntry[] = lexiconEntriesArrays.map((line) => {
			const [id, word, definition, first_time_used, tagsString] = line;
			const tagsArray = tagsString.split(',');
			const tagList = tagsArray.map(tagName => tags[tagName]);
			return LexiconEntry.new(
				parseInt(id, 10),
				word,
				definition,
				first_time_used,
				tagList,
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

		// Split between tags and lexicon entries
		const emptyLineRegex = /\n?^(?:\s|,)*$\n?/m;
		const tagsAndEntriesCsv = data.split(emptyLineRegex).map(line => line.trim()).filter(line => line.length > 0);

		console.log(tagsAndEntriesCsv);
		return [];
	}
}
