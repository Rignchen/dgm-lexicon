export default class Markdown {
	constructor(private text: string) {
		this.text = text.replaceAll('\\n', '\n');
	}

	toString(): string {
		return this.parse(false);
	}

	toHtml(): string {
		return this.parse(true);
	}

	private parse(addHtmlBalises: boolean): string {
		const replaces: [RegExp, string|((...args: any[]) => string)][] = [
			// Text formatting
			[/(^|\W)\*\*(.+?)\*\*($|\W)/g, addHtmlBalises ? '$1<strong>$2</strong>$3' : '$1$2$3'], // Bold
			[/(^|\W)__(.+?)__($|\W)/g, addHtmlBalises ? '$1<u>$2</u>$3' : '$1$2$3'], // Underline
			[/(^|\W)(_|\*)(.+?)\2($|\W)/g, addHtmlBalises ? '$1<em>$3</em>$4' : '$1$3$4'], // Italic
			[/(^|\W)~~(.+?)~~($|\W)/g, addHtmlBalises ? '$1<del>$2</del>$3' : '$1$2$3'], // Strikethrough
			// Code
			[/`{3}((?:.|\n)+?)`{3}/g, addHtmlBalises ? '<pre class="markdown">$1</pre>' : '$1'], // Code block
			[/`(.+?)`/g, addHtmlBalises ? '<code class="markdown">$1</code>' : '$1'], // Inline code
			// Links and images
			[/!\[(.*?)\]\((.+?)\)/g, addHtmlBalises ? '<img src="$2" alt="$1" width=100%>' : '$1'], // Images
			[/\[(.+?)\]\((.+?)\)/g, addHtmlBalises ? '<a href="$2">$1</a>' : '$1'], // Links
			// Headings
			[/^\s*#\s+(.+)/gm, addHtmlBalises ? '<h1>$1</h1>' : '$1'], // H1
			[/^\s*##\s+(.+)/gm, addHtmlBalises ? '<h2>$1</h2>' : '$1'], // H2
			[/^\s*###\s+(.+)/gm, addHtmlBalises ? '<h3>$1</h3>' : '$1'], // H3
			[/^\s*####\s+(.+)/gm, addHtmlBalises ? '<h4>$1</h4>' : '$1'], // H4
			[/^\s*#####\s+(.+)/gm, addHtmlBalises ? '<h5>$1</h5>' : '$1'], // H5
			[/^\s*######\s+(.+)/gm, addHtmlBalises ? '<h6>$1</h6>' : '$1'], // H6
			// Checkboxes
			[/^\s*-\s+\[[xX]\]\s+(.+)/gm, addHtmlBalises ? '<input type="checkbox" checked>$1' : '- [X] $1'], // Checked checkbox
			[/^\s*-\s+\[\s\]\s+(.+)/gm, addHtmlBalises ? '<input type="checkbox">$1' : '- [ ] $1'], // Unchecked checkbox
			// Lists
			[/((?:\n?^(?:\s*)-(?:\s+)(?:.+)$)+\n?)/gm, addHtmlBalises ? (match: string) => {
				const listItems = match.split('\n').map(item => item.replace(/^\s*-\s+(.+)/, '<li>$1</li>')).join('');
				return `<ul>${listItems}</ul>`;
			} : '$1'], // Unordered lists
			[/((?:\n?^(?:\s*)\d+\.\s+.+$)+\n?)/gm, addHtmlBalises ? (match: string) => {
				const listItems = match.split('\n').map(item => item.replace(/^\s*\d+\.\s+(.+)/, '<li>$1</li>')).join('');
				return `<ol>${listItems}</ol>`;
			} : '$1'], // Ordered lists
			// Other
			[/^\s*> (.+)/gm, addHtmlBalises ? '<blockquote class="markdown">$1</blockquote>' : '$1'], // Blockquotes
			[/\n/g, addHtmlBalises ? '<br>' : '\n'], // Line breaks
		];
		let result = this.text;
		for (const [search, replace] of replaces) {
			typeof replace === 'string' ?
			result = result.replaceAll(search, replace) :
			result = result.replaceAll(search, replace);
		}

		return result;
	}
}
