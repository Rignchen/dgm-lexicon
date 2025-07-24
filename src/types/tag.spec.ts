import Tag from './tag';

describe('Tag', () => {
	it('should create a tag list from entries', () => {
		const entries: [string, string][] = [
			['tag1', '#ff0000'],
			['tag2', '#00ff00'],
			['tag3', '#0000ff']
		];
		const tagList: {[name: string]: Tag} = Tag.fromEntries(entries);
		expect(tagList).toBeDefined();
		expect(Object.keys(tagList).length).toBe(3);
		expect(JSON.stringify(Object.keys(tagList))).toBe(JSON.stringify(entries.map(e => e[0])));
		const tagObjects = Object.values(tagList);
		expect(JSON.stringify(tagObjects)).toBe(JSON.stringify(entries.map(e => new Tag(e[0], e[1]))));
	});

	it('should create a tag', () => {
		const tag = new Tag('tag1', '#ff0000');
		expect(tag).toBeDefined();
		expect(tag.name).toBe('tag1');
		expect(tag.color).toBe('#ff0000');
	});
});
