export default class LexiconEntry {
	constructor(
		public readonly id: number,
		public readonly word: string,
		public readonly definition: string,
		public readonly firstSeen: Date,
	) {}

	static fromObject(obj: {id: number, word: string, definition: string, first_time_used: string}): LexiconEntry {
		return new LexiconEntry(
			obj.id,
			obj.word,
			obj.definition,
			new Date(obj.first_time_used),
		);
	}

	static fromArray(arr: {id: number, word: string, definition: string, first_time_used: string}[]): LexiconEntry[] {
		return arr.map(obj => LexiconEntry.fromObject(obj));
	}
}
