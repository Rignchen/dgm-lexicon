import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Word } from './word';
import { provideRouter } from '@angular/router';

describe('Word', () => {
	let component: Word;
	let fixture: ComponentFixture<Word>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Word],
			providers: [provideRouter([])],
		})
		.compileComponents();

		fixture = TestBed.createComponent(Word);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
