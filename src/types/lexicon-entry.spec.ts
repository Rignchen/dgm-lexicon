import LexiconEntry from "./lexicon-entry";
import Tag from "#types/tag";

describe("LexiconEntry", () => {
	it("should properly create LexiconEntry", () => {
		const lexiconEntry = LexiconEntry.new(
			1,
			"testWord",
			"testDefinition",
			"2023-10-01",
			[new Tag("testTag", "#ff0000"), new Tag("testTag", "#ff0000")],
		);
		expect(lexiconEntry.id).toBe(1);
		expect(lexiconEntry.word).toBe("testWord");
		expect(lexiconEntry.definition.toString()).toBe("testDefinition");
		expect(lexiconEntry.firstSeen).toEqual(new Date("2023-10-01"));
		expect(JSON.stringify(lexiconEntry.tags)).toBe(JSON.stringify(new Set([new Tag("testTag", "#ff0000")])));
	});
});
