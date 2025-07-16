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
		public readonly tags: Tag[],
	) {}

	static fromObject(obj: objectType, tags: {[name: string]: Tag}): LexiconEntry {
		return new LexiconEntry(
			obj.id,
			obj.word,
			obj.definition,
			new Date(obj.first_time_used),
			obj.tags.map(tagName => tags[tagName]),
		);
	}

	static fromArray(arr: objectType[], tags: {[name: string]: Tag}): LexiconEntry[] {
		return arr.map(obj => LexiconEntry.fromObject(obj, tags));
	}

	static fromJsonData(data: {lexicon: objectType[], tags: {[name: string]: string}}): LexiconEntry[] {
		const tags = Tag.fromObject(data.tags);
		return LexiconEntry.fromArray(data.lexicon, tags);
	}
}
