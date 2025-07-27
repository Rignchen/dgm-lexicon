import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackButton } from './back-button';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

describe('BackButton', () => {
	let component: BackButton;
	let fixture: ComponentFixture<BackButton>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BackButton]
		})
		.compileComponents();

		fixture = TestBed.createComponent(BackButton);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('should redirect', () => {
		it('should bring back to the previous page when clicked if the page comes from this app', () => {
			const backButtonElement: HTMLElement = fixture.nativeElement.querySelector('span');
			const router = TestBed.inject(Router);
			const location = TestBed.inject(Location);
			spyOn(router, 'navigate');
			spyOn(location, 'back');
			spyOn(component, 'getLastRoute').and.returnValue(`${window.location.origin}/some-page`);
			backButtonElement.click();
			expect(component.getLastRoute).toHaveBeenCalled();
			expect(router.navigate).not.toHaveBeenCalled();
			expect(location.back).toHaveBeenCalled();
		});

		it('should bring to the home page when clicked if the page does not come from this app', () => {
			const backButtonElement: HTMLElement = fixture.nativeElement.querySelector('span');
			const router = TestBed.inject(Router);
			const location = TestBed.inject(Location);
			spyOn(router, 'navigate');
			spyOn(location, 'back');
			spyOn(component, 'getLastRoute').and.returnValue('https://external-domain.com/some-page');
			backButtonElement.click();
			expect(component.getLastRoute).toHaveBeenCalled();
			expect(router.navigate).toHaveBeenCalledWith(['/']);
			expect(location.back).not.toHaveBeenCalled();
		});

		it('should bring to the home page when clicked if the last route is empty', () => {
			const backButtonElement: HTMLElement = fixture.nativeElement.querySelector('span');
			const router = TestBed.inject(Router);
			const location = TestBed.inject(Location);
			spyOn(router, 'navigate');
			spyOn(location, 'back');
			spyOn(component, 'getLastRoute').and.returnValue('');
			backButtonElement.click();
			expect(component.getLastRoute).toHaveBeenCalled();
			expect(router.navigate).toHaveBeenCalledWith(['/']);
			expect(location.back).not.toHaveBeenCalled();
		});
	});
});
