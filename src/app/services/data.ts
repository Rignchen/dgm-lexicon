import { Injectable } from '@angular/core';
import LexiconEntry from '#types/lexicon-entry'
import * as jsonData from '#public/db.json';

@Injectable({
	providedIn: 'root'
})
export class Data {
	// read json file "/db.json"
	public lexicon: LexiconEntry[] = LexiconEntry.fromArray(jsonData.lexicon);
}
