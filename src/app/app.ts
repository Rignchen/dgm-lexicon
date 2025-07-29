import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	constructor(private meta: Meta) {
		this.meta.addTags([
			{name: 'og:type', content: 'website'},
			{name: 'og:url', content: 'https://rignchen.github.io/dgm-lexicon/'},
			{name: 'og:description', content: 'Un lexique des références et des termes utilisés par la communauté de devenirgamemaster'},
			{name: 'og:title', content: 'DGM Lexicon'},
			{name: 'og:image', content: 'https://rignchen.github.io/dgm-lexicon/qr-code.svg'},
			{name: 'og:image:alt', content: 'QR Code vers le lexique DGM'},
			{name: 'og:image:width', content: '600'},
			{name: 'og:image:height', content: '600'},
			{name: 'og:image:type', content: 'image/svg+xml'},
		], true);
	}
}
