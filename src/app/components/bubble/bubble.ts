import { Component, Input } from '@angular/core';

@Component({
	selector: 'bubble',
	imports: [],
	templateUrl: './bubble.html',
	styleUrl: './bubble.css'
})
export class Bubble {
	@Input() color: string = 'black';
	@Input() background: string = 'white'
}
