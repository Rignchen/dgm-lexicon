import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Word } from './word';
import { provideRouter } from '@angular/router';
import { Error404 } from '#pages/error-404';

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

	describe('redirect to Error404', () => {
		beforeEach(() => {
			spyOn(Error404, 'redirect').and.callThrough();
		});

		it('should redirect to Error404 if id is not a number', () => {
			const router = component['router'];
			(component['route'].params as any).subscribe = (callback: (params: any) => void) => {
				callback({ id: 'not-a-number' });
			};
			component.ngOnInit();
			expect(Error404.redirect).toHaveBeenCalledWith(router);
		});

		it('should redirect to Error404 if id does not exist', () => {
			const router = component['router'];
			(component['route'].params as any).subscribe = (callback: (params: any) => void) => {
				callback({ id: '9' });
			};
			component.ngOnInit();
			expect(Error404.redirect).toHaveBeenCalledWith(router);
		});

		it('should not redirect to Error404 if id exists', () => {
			(component['route'].params as any).subscribe = (callback: (params: any) => void) => {
				callback({ id: '1' });
			};
			component.ngOnInit();
			expect(Error404.redirect).not.toHaveBeenCalled();
		});
	});

	it('should redirect to the page with the correct id', () => {
		const router = component['router'];
		spyOn(router, 'navigate');

		let id = 1;
		Word.redirect(router, id);
		expect(router.navigate).toHaveBeenCalledWith(['/words', id]);

		id = 42;
		Word.redirect(router, id);
		expect(router.navigate).toHaveBeenCalledWith(['/words', id]);
	});
});
