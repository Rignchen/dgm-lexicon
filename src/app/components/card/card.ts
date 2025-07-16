import LexiconEntry from '#types/lexicon-entry';
import { Component, Input } from '@angular/core';
import { Tag } from '#components/tag';
import { NgFor } from '@angular/common';

@Component({
	selector: 'app-card',
	imports: [Tag, NgFor],
	templateUrl: './card.html',
	styleUrl: './card.css'
})
export class Card {
	@Input({ required: true }) entry!: LexiconEntry;
	@Input() onClick: (id: number) => void = () => {};
}
