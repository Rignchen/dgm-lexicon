import { Data } from '#services/data';
import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Card } from '#components/card';
import { Word } from '#pages/word';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	imports: [NgFor, Card],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home {
	private router = inject(Router);

	public data = inject(Data);
	public cardClicked = (id: number) => Word.redirect(this.router, id);
}
