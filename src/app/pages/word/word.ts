import { Component, inject, OnInit } from '@angular/core';
import { Data } from '#services/data';
import { ActivatedRoute } from '@angular/router';
import LexiconEntry from '#types/lexicon-entry';
import { Router } from '@angular/router';
import { Error404 } from '#pages/error-404';
import { BackButtonComponent } from '#components/back-button';
import { Bubble } from '#components/bubble';

@Component({
	selector: 'app-word',
	imports: [BackButtonComponent, Bubble],
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
			if (!(id && /^\d+$/.test(id))) return Error404.redirect(this.router);
			const filtered = this.data.lexicon.filter(entry => entry.id === parseInt(id, 10));
			if (filtered.length === 0) return Error404.redirect(this.router);
			this.entry = filtered[0];
		});
	}

	static redirect(route: Router, id: number) {
		route.navigate(['/words', id]);
	}
}
