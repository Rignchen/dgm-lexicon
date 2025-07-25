import Markdown from './markdown';

describe('Markdown', () => {
	describe('bold', () => {
		const input = new Markdown('This is **bold** text');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('This is <strong>bold</strong> text');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('This is bold text');
		});
	});

	describe('underline', () => {
		const input = new Markdown('This is __underline__ text');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('This is <u>underline</u> text');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('This is underline text');
		});
	});

	describe('italic', () => {
		const input = new Markdown('This is *italic* text');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('This is <em>italic</em> text');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('This is italic text');
		});
	});

	describe('strikethrough', () => {
		const input = new Markdown('This is ~~strikethrough~~ text');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('This is <del>strikethrough</del> text');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('This is strikethrough text');
		});
	});

	describe('inline code', () => {
		const input = new Markdown('This is `inline code` text');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('This is <code class="markdown">inline code</code> text');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('This is inline code text');
		});
	});

	describe('code block', () => {
		const input = new Markdown('```\nThis is\na code block\n```');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('<pre class="markdown"><br>This is<br>a code block<br></pre>');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('\nThis is\na code block\n');
		});
	});

	describe('heading 1', () => {
		const input = new Markdown('# Heading 1');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('<h1>Heading 1</h1>');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('Heading 1');
		});
	});

	describe('heading 2', () => {
		const input = new Markdown('## Heading 2');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('<h2>Heading 2</h2>');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('Heading 2');
		});
	});

	describe('heading 3', () => {
		const input = new Markdown('### Heading 3');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('<h3>Heading 3</h3>');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('Heading 3');
		});
	});

	describe('heading 4', () => {
		const input = new Markdown('#### Heading 4');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('<h4>Heading 4</h4>');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('Heading 4');
		});
	});

	describe('heading 5', () => {
		const input = new Markdown('##### Heading 5');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('<h5>Heading 5</h5>');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('Heading 5');
		});
	});

	describe('heading 6', () => {
		const input = new Markdown('###### Heading 6');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('<h6>Heading 6</h6>');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('Heading 6');
		});
	});

	describe('unordered lists', () => {
		const input = new Markdown('- Item 1\n- Item 2\n- Item 3');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('- Item 1\n- Item 2\n- Item 3');
		});
	});

	describe('ordered lists', () => {
		const input = new Markdown('1. Item 1\n2. Item 2\n3. Item 3');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('<ol><li>Item 1</li><li>Item 2</li><li>Item 3</li></ol>');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('1. Item 1\n2. Item 2\n3. Item 3');
		});
	});

	describe('links', () => {
		const input = new Markdown('This is a [link](https://example.com)');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('This is a <a href="https://example.com">link</a>');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('This is a link');
		});
	});

	describe('images', () => {
		const input = new Markdown('This is an ![image](https://example.com/image.jpg)');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('This is an <img src="https://example.com/image.jpg" alt="image" width=100%>');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('This is an image');
		});
	});

	describe('blockquotes', () => {
		const input = new Markdown('> This is a blockquote');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('<blockquote class="markdown">This is a blockquote</blockquote>');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('This is a blockquote');
		});
	});

	describe('line breaks', () => {
		const input = new Markdown('This is a line\nbreak');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('This is a line<br>break');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('This is a line\nbreak');
		});
	});
});
