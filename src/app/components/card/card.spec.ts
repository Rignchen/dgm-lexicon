import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card } from './card';
import LexiconEntry from '#types/lexicon-entry';

describe('Card', () => {
	let component: Card;
	let fixture: ComponentFixture<Card>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Card]
		})
		.compileComponents();

		fixture = TestBed.createComponent(Card);
		component = fixture.componentInstance;
		component.entry = new LexiconEntry(0, 'Test Entry', 'This is a test entry.', new Date('2023-01-01'), new Set());
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
