import { Component, inject, OnInit } from '@angular/core';
import { Data } from '#services/data';
import { ActivatedRoute } from '@angular/router';
import LexiconEntry from '#types/lexicon-entry';
import { Router } from '@angular/router';

@Component({
	selector: 'app-word',
	imports: [],
	templateUrl: './word.html',
	styleUrl: './word.css'
})
export class Word implements OnInit {
	private data = inject(Data);
	public entry?: LexiconEntry;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			const id = params['id'];
			const filtered = this.data.lexicon.filter(entry => entry.id === parseInt(id, 10));
			this.entry = filtered[0];
		});
	}
}
