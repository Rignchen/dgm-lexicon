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
	private router = inject(Router);
	public entry?: LexiconEntry;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			const id = params['id'];
			if (!(id && /^\d+$/.test(id))) return this.error404();
			const filtered = this.data.lexicon.filter(entry => entry.id === parseInt(id, 10));
			if (filtered.length === 0) return this.error404();
			this.entry = filtered[0];
		});
	}

	private error404() {
		// Navigate to the 404 page without changing the URL
		this.router.navigate(['/404'], {
			skipLocationChange: true
		});
	}
}
