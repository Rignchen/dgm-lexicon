export default class LexiconEntry {
	constructor(
		public readonly id: number,
		public readonly word: string,
		public readonly definition: string,
		public readonly firstSeen: Date,
	) {}

	static fromJSON(json: string): LexiconEntry {
		const obj = JSON.parse(json);
		return new LexiconEntry(
			obj.id,
			obj.word,
			obj.definition,
			new Date(obj.first_time_used),
		);
	}
}
