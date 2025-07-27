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
		if (document.referrer.startsWith(`${window.location.origin}/`)) {
			this.location.back();
		} else {
			this.router.navigate(['/']);
		}
	}
}
