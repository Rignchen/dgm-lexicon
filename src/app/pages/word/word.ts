import { Component, inject, OnInit } from '@angular/core';
import { Data } from '#services/data';
import { ActivatedRoute } from '@angular/router';
import LexiconEntry from '#types/lexicon-entry';
import { Router } from '@angular/router';
import { Error404 } from '#pages/error-404';
import { BackButton } from '#components/back-button';
import { Tag } from '#components/tag';
import { Bubble } from '#components/bubble';
import { Meta, Title } from '@angular/platform-browser';

@Component({
	selector: 'app-word',
	imports: [BackButton, Bubble, Tag],
	templateUrl: './word.html',
	styleUrl: './word.css'
})
export class Word implements OnInit {
	private data = inject(Data);
	private router = inject(Router);
	public entry?: LexiconEntry;

	constructor(private route: ActivatedRoute, private title: Title, private meta: Meta) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			const id = params['id'];
			if (!(id && /^\d+$/.test(id))) return Error404.redirect(this.router);
			const filtered = this.data.lexicon.filter(entry => entry.id === parseInt(id, 10));
			if (filtered.length === 0) return Error404.redirect(this.router);
			this.entry = filtered[0];
			this.title.setTitle(this.entry!.word);
			this.meta.updateTag({name: 'og:title', content: 'Word - ' + this.entry!.word});
			const maxDescriptionLength = 200;
			this.meta.updateTag({name: 'og:description', content: this.entry!.definition.toString().length > maxDescriptionLength ?
				this.entry!.definition.toString().substring(0, maxDescriptionLength) + '...' :
				this.entry!.definition.toString()});
		});
	}

	static redirect(route: Router, id: number) {
		route.navigate(['/words', id]);
	}
}
