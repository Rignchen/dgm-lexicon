import LexiconEntry from '#types/lexicon-entry';
import { Component, Input } from '@angular/core';
import { Tag } from '#components/tag';
import { Bubble } from '#components/bubble';

@Component({
	selector: 'app-card',
	imports: [Tag, Bubble],
	templateUrl: './card.html',
	styleUrl: './card.css'
})
export class Card {
	@Input({ required: true }) entry!: LexiconEntry;
	@Input() onClick: (id: number) => void = () => {};
}
