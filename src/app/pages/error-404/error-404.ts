import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Bubble } from '#components/bubble';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-error-404',
	imports: [Bubble],
	templateUrl: './error-404.html',
	styleUrl: './error-404.css'
})
export class Error404 {
	constructor(private router: Router, private title: Title) {
		this.title.setTitle("Page Not Found");
	}

	public goHome() {
		this.router.navigate(['/']);
	}

	public static redirect(router: Router) {
		// Navigate to the 404 page without changing the URL
		router.navigate(['**'], {
			skipLocationChange: true
		});
	}
}
