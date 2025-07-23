import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card } from './card';
import LexiconEntry from '#types/lexicon-entry';
import Markdown from '#types/markdown';

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
		component.entry = new LexiconEntry(0, 'Test Entry', new Markdown('This is a test entry.'), new Date('2023-01-01'), new Set());
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call onClick when clicked', () => {
		spyOn(component, 'onClick');
		const cardElement: HTMLElement = fixture.nativeElement.querySelector('.card');
		cardElement.click();
		expect(component.onClick).toHaveBeenCalled();
	});
});
