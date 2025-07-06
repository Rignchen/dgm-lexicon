import { Injectable } from '@angular/core';
import LexiconEntry from '#types/lexicon-entry'
import { readFileSync } from 'fs';

@Injectable({
	providedIn: 'root'
})
export class Data {
	// read json file "public/db.json"
	public lexicon: LexiconEntry[] = LexiconEntry.fromArray(JSON.parse(readFileSync('public/db.json', 'utf-8')).lexicon);
}
