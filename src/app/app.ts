import { Data } from '#services/data';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	protected title = 'dgm-lexicon';
	public data = JSON.stringify(inject(Data), null, "\t");
}
