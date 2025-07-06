import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-404',
  imports: [],
  templateUrl: './error-404.html',
  styleUrl: './error-404.css'
})
export class Error404 {
	public static redirect(router: Router) {
		// Navigate to the 404 page without changing the URL
		router.navigate(['**'], {
			skipLocationChange: true
		});
	}
}
