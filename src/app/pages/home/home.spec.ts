import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { Word } from '#pages/word';

describe('Home', () => {
	let component: Home;
	let fixture: ComponentFixture<Home>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Home]
		})
		.compileComponents();

		fixture = TestBed.createComponent(Home);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should return all lexicon entries when no search term is provided', () => {
		component.search({ target: { value: '' } } as unknown as Event);
		const sortedLexicon = component.filteredData;
		expect(sortedLexicon.length).toBe(7);
	});

	it('filter data by search term in a flexible way', () => {
		component.search({ target: { value: 'dedeg' } } as unknown as Event);
		const sortedLexicon = component.filteredData;
		expect(sortedLexicon.length).toBe(2);
		expect(sortedLexicon[0].word).toBe('Dé de Gaëlle');
		expect(sortedLexicon[1].word).toBe('Cri de Guerre');
	});

	it('should redirect to lexicon entry page on card click', () => {
		spyOn(Word, 'redirect').and.callThrough();
		const card = fixture.nativeElement.querySelector('app-card');
		const cardClickable = card.querySelector('.card');
		cardClickable.click();
		expect(Word.redirect).toHaveBeenCalledWith(component['router'], component.filteredData[0].id);
	});
});
