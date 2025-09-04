import markdownit from 'markdown-it';
import markdownItUnderline from 'markdown-it-underline';

export default class Markdown {
	constructor(private text: string) { }
	private md = new markdownit({
		html: true,
		linkify: true,
		typographer: true,
		breaks: true,
	}).use(markdownItUnderline);

	toHtml(): string {
		return this.md.render(this.text)
			.replaceAll('<li>[ ] ', '<li><input type="checkbox" disabled>')
			.replace(/<li>\[[xX]\] /g, '<li><input type="checkbox" checked disabled>');
	}

	toString(): string {
		return this.md.render(this.text)
			.replace(/<img [^>]+ alt="([^"]+)">/, '$1') // Keep alt text of images
			.replaceAll('<li>', '- ')
			.replace(/<[^>]+>/g, '') // Remove HTML tags
			.replace(/ +/g, ' ') // Replace multiple spaces with a single space
			.replace(/^\s+|\s+$/g, ''); // Trim leading and trailing spaces
	}
}
