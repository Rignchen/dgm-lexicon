import { Data } from '#services/data';
import { Component, inject } from '@angular/core';
import { Card } from '#components/card';
import { Word } from '#pages/word';
import { Router } from '@angular/router';
import { Bubble } from '#components/bubble';
import Fuse from 'fuse.js';
import { Meta, Title } from '@angular/platform-browser';

@Component({
	selector: 'app-home',
	imports: [Card, Bubble],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home {
	constructor(private title: Title, private meta: Meta) {
		this.title.setTitle("DGM Lexicon");
		this.meta.addTags([
			{name: 'og:type', content: 'website'},
			{name: 'og:url', content: 'https://rignchen.github.io/dgm-lexicon/'},
			{name: 'og:description', content: 'A lexicon of terms used by the community of devenirgamemaster'},
			{name: 'og:title', content: 'DGM Lexicon'},
		], true);
	}

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
