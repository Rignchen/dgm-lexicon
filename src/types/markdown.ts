import markdownit from 'markdown-it';
import markdownItUnderline from 'markdown-it-underline';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItTaskLists from 'markdown-it-task-lists';
import { full as markdownItEmoji } from 'markdown-it-emoji';

export default class Markdown {
	constructor(private text: string) { }
	private md = new markdownit({
		html: true,
		linkify: true,
		typographer: true,
		breaks: true,
	})
	.use(markdownItUnderline)
	.use(markdownItAnchor, {
		tabIndex: false
	})
	.use(markdownItTaskLists)
	.use(markdownItEmoji, {
		shortcuts: {},
	});

	toHtml(): string {
		return this.md.render(this.text);
	}

	toString(): string {
		return this.md.render(this.text)
			.replace(/<img [^>]+ alt="([^"]+)">/, '$1') // Keep alt text of images
			.replaceAll('<li>', '- ')
			.replace(/<li class="task-list-item"[^>]*><input class="task-list-item-checkbox"[^>]*(checked)?[^>]*>/g, (match) => {
				return match.includes('checked') ? '- [X] ' : '- [ ] ';
			})
			.replace(/<[^>]+>/g, '') // Remove HTML tags
			.replace(/ +/g, ' ') // Replace multiple spaces with a single space
			.replace(/^\s+|\s+$/g, ''); // Trim leading and trailing spaces
	}
}
