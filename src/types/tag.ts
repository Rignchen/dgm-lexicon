export default class Tag {
	constructor(
		public readonly name: string,
		public readonly color: string,
	) {}

	static fromEntries(entries: [string, string][]): {[name: string]: Tag} {
		return Object.fromEntries(entries.map(([name, color]) => [name, new Tag(name, color)]));
	}
}

