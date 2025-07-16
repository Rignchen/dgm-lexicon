import { Injectable } from '@angular/core';
import LexiconEntry from '#types/lexicon-entry'
import * as jsonData from '#public/db.json';

@Injectable({
	providedIn: 'root'
})
export class Data {
	public lexicon: LexiconEntry[] = LexiconEntry.fromJsonData(jsonData);
}
