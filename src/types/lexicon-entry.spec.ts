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

	it("should get entries from string[][]", () => {
		const tagArrays: [string, string][] = [
			["tag0", "#ff0000"],
			["tag1", "#00ff00"],
		];
		const lexiconEntriesArrays: string[][] = [
			["0", "word0", "definition0", "2023-10-01", "tag0"],
			["1", "word1", "definition1", "2023-10-02", "tag1"],
		];

		const newLexiconEntriesSpy = spyOn(LexiconEntry, "new");
		const lexiconEntries = LexiconEntry.fromCsvData(tagArrays, lexiconEntriesArrays);

		expect(lexiconEntries.length).toBe(2);
		expect(newLexiconEntriesSpy).toHaveBeenCalledTimes(2);
		expect(newLexiconEntriesSpy).toHaveBeenCalledWith(0, "word0", "definition0", "2023-10-01", [new Tag("tag0", "#ff0000")]);
		expect(newLexiconEntriesSpy).toHaveBeenCalledWith(1, "word1", "definition1", "2023-10-02", [new Tag("tag1", "#00ff00")]);
	});

	it("should order entries by firstSeen date", () => {
		const tagArrays: [string, string][] = [
			["tag0", "#ff0000"],
			["tag1", "#00ff00"],
		];
		const lexiconEntriesArrays: string[][] = [
			["0", "word0", "definition0", "2023-10-01", "tag0"],
			["1", "word1", "definition1", "2023-10-02", "tag1"],
			["2", "word2", "definition2", "2023-09-30", "tag0,tag1"],
		];

		const lexiconEntries = LexiconEntry.fromCsvData(tagArrays, lexiconEntriesArrays);

		expect(lexiconEntries[0].word).toBe("word1");
		expect(lexiconEntries[1].word).toBe("word0");
		expect(lexiconEntries[2].word).toBe("word2");
	});

	it("should parse from CSV data while respecting quoted fields (which can contain commas, new lines, and quotes)", () => {
		const csvData = `tag,color,,,
tag0,#ff0000,,,
tag1,#00ff00,,,
,,,,
id,word,definition,first_time_used,tags
0,word0,"definition0, with a comma",2023-10-01,"tag0"
1,word1,"definition1 with a new line
here",2023-10-02,"tag1"
2,word2,"definition2 with a quote "" inside",2023-09-30,"tag0,tag1"`;

		const fromDataSpy = spyOn(LexiconEntry, "fromCsvData");
		LexiconEntry.parseFromCsv(csvData);

		expect(fromDataSpy).toHaveBeenCalledWith([
			["tag0", "#ff0000"],
			["tag1", "#00ff00"],
		], [
			["0", "word0", "definition0, with a comma", "2023-10-01", "tag0"],
			["1", "word1", "definition1 with a new line\nhere", "2023-10-02", "tag1"],
			["2", "word2", "definition2 with a quote \" inside", "2023-09-30", "tag0,tag1"],
		]);
	});
});
