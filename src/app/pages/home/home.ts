import { Data } from '#services/data';
import { Component, inject } from '@angular/core';
import { Card } from '#components/card';
import { Word } from '#pages/word';
import { Router } from '@angular/router';
import { Bubble } from '#components/bubble';

@Component({
	selector: 'app-home',
	imports: [Card, Bubble],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home {
	private router = inject(Router);

	private data = inject(Data);
	public filteredData = this.data.lexicon;
	public cardClicked = (id: number) => Word.redirect(this.router, id);

	public search = (event: Event) => {
		const input = event.target as HTMLInputElement;
		const searchTerm = input.value.toLowerCase();
		if (searchTerm === '') {
			this.filteredData = this.data.lexicon;
		} else {
			this.filteredData = filterAndSort(
				this.data.lexicon,
				entry => entry.word.toLowerCase().includes(searchTerm),
				entry => entry.definition.toLowerCase().includes(searchTerm),
			);
		}
	}
}

/**
 * Filters an array on multiple filters
 * Then sorts the array, the entries that match the first filter first, then the second, etc.
 */
function filterAndSort<T>(data: T[], ...filters: ((item: T) => boolean)[]): T[] {
	const filteredData = [];
	for (const filter of filters) {
		const filtered = data.filter(filter);
		filteredData.push(...filtered);
		data = data.filter(item => !filtered.includes(item));
	}
	return filteredData;
}
