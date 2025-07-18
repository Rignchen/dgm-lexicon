import { Injectable } from '@angular/core';
import LexiconEntry from '#types/lexicon-entry'
import csvData from '#public/db.csv';

@Injectable({
	providedIn: 'root'
})
export class Data {
	public lexicon: LexiconEntry[] = LexiconEntry.parseFromCsv(csvData);
}
