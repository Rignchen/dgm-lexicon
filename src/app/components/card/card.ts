import LexiconEntry from '#types/lexicon-entry';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card',
	imports: [],
	templateUrl: './card.html',
	styleUrl: './card.css'
})
export class Card {
	@Input({ required: true }) entry!: LexiconEntry;
	@Input() onClick: (id: number) => void = () => {};
}
