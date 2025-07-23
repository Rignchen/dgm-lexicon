import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error404 } from './error-404';
import { Router } from '@angular/router';

describe('Error404', () => {
	let component: Error404;
	let fixture: ComponentFixture<Error404>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Error404]
		})
		.compileComponents();

		fixture = TestBed.createComponent(Error404);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('home button should redirect to home', () => {
		const navigateSpy = spyOn(component['router'], 'navigate');
		const button = fixture.nativeElement.querySelector('.home');
		button.click();
		expect(navigateSpy).toHaveBeenCalledWith(['/']);
	});

	it('should redirect to 404 page without changing URL', () => {
		const router = TestBed.inject(Router);
		const navigateSpy = spyOn(router, 'navigate');
		Error404.redirect(router);
		expect(navigateSpy).toHaveBeenCalledWith(['**'], { skipLocationChange: true });
	});
});
