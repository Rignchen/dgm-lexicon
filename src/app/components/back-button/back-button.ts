import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Bubble } from '#components/bubble';
import { Router } from '@angular/router';

@Component({
	selector: 'app-back-button',
	imports: [Bubble],
	templateUrl: './back-button.html',
	styleUrl: './back-button.css'
})
export class BackButton {
	constructor(public location: Location, private router: Router) {}

	/**
	 * Handles the back button click event.
	 * If the last route belongs to the same domain, it navigates back in history.
	 * Otherwise, it redirects to the home page.
	 */
	backButtonClicked() {
		if (this.getLastRoute().startsWith(`${window.location.origin}/`)) {
			this.location.back();
		} else {
			this.router.navigate(['/']);
		}
	}

	/**
	 * Returns the last route from the browser history.
	 * This is needed in order to be able to test the back button.
	 ** @returns The last route as a string.
	 */
	getLastRoute(): string {
		return document.referrer;
	}
}
