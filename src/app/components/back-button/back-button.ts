import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Bubble } from '../bubble/bubble';

@Component({
	selector: 'app-back-button',
	imports: [Bubble],
	templateUrl: './back-button.html',
	styleUrl: './back-button.css'
})
export class BackButtonComponent {
	constructor(public location: Location) {}
}
