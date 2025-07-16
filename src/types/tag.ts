export default class Tag {
	constructor(
		public readonly name: string,
		public readonly color: string,
	) {}

	static fromObject(obj: {[name: string]: string}): {[name: string]: Tag} {
		return Object.fromEntries(Object.entries(obj).map(([name, color]) => [name, new Tag(name, color)]));
	}
}

