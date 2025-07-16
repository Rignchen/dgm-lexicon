import { Data } from '#services/data';
import { Component, inject } from '@angular/core';
import { Card } from '#components/card';
import { Word } from '#pages/word';
import { Router } from '@angular/router';
import { Bubble } from '#components/bubble';
import Fuse from 'fuse.js';

@Component({
	selector: 'app-home',
	imports: [Card, Bubble],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home {
	private router = inject(Router);

	private data = inject(Data);
	private fuse = new Fuse(this.data.lexicon, {keys: ['word', 'definition']});
	public filteredData = this.data.lexicon;
	public cardClicked = (id: number) => Word.redirect(this.router, id);

	public search = (event: Event) => {
		const input = event.target as HTMLInputElement;
		const searchTerm = input.value.toLowerCase();
		if (searchTerm === '') {
			this.filteredData = this.data.lexicon;
		} else {
			this.filteredData = this.fuse.search(searchTerm).map(result => result.item);
		}
	}
}
