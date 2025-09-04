import Markdown from './markdown';

describe('Markdown', () => {
	describe('bold', () => {
		const input = new Markdown('This is **bold** text');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('<p>This is <strong>bold</strong> text</p>\n');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('This is bold text');
		});
	});

	describe('underline', () => {
		const input = new Markdown('This is _underline_ text');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('<p>This is <u>underline</u> text</p>\n');
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
			expect(result).toBe('<p>This is <em>italic</em> text</p>\n');
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
			expect(result).toBe('<p>This is <s>strikethrough</s> text</p>\n');
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
			expect(result).toBe('<p>This is <code>inline code</code> text</p>\n');
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
			expect(result).toBe('<pre><code>This is\na code block\n</code></pre>\n');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('This is\na code block');
		});
	});

	describe('headings', () => {
		for (let i = 1; i <= 6; i++) {
			describe(`heading ${i}`, () => {
				const input = new Markdown(`${'#'.repeat(i)} Heading ${i}`);
				it('should convert to HTML', () => {
					const result = input.toHtml();
					expect(result).toBe(`<h${i} id="heading-${i}">Heading ${i}</h${i}>\n`);
				});
				it('should convert to plain text', () => {
					const result = input.toString();
					expect(result).toBe(`Heading ${i}`);
				});
			});
		}
	});

	describe('checkboxes', () => {
		describe('unchecked checkbox', () => {
			const input = new Markdown('- [ ] Unchecked item');
			it('should convert to HTML', () => {
				const result = input.toHtml();
				expect(result).toBe('<ul class="contains-task-list">\n<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Unchecked item</li>\n</ul>\n');
			});
			it('should convert to plain text', () => {
				const result = input.toString();
				expect(result).toBe('- [ ] Unchecked item');
			});
		});

		describe('checked checkbox', () => {
			const input = new Markdown('- [X] Checked item');
			it('should convert to HTML', () => {
				const result = input.toHtml();
				expect(result).toBe('<ul class="contains-task-list">\n<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Checked item</li>\n</ul>\n');
			});
			it('should convert to plain text', () => {
				const result = input.toString();
				expect(result).toBe('- [X] Checked item');
			});
		});
	});

	describe('lists', () => {
		describe('unordered lists', () => {
			const input = new Markdown('- Item 1\n- Item 2\n- Item 3\n');
			it('should convert to HTML', () => {
				const result = input.toHtml();
				expect(result).toBe('<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</li>\n</ul>\n');
			});
			it('should convert to plain text', () => {
				const result = input.toString();
				expect(result).toBe('- Item 1\n- Item 2\n- Item 3');
			});
		});

		describe('ordered lists', () => {
			const input = new Markdown('1. Item 1\n2. Item 2\n3. Item 3\n');
			it('should convert to HTML', () => {
				const result = input.toHtml();
				expect(result).toBe('<ol>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</li>\n</ol>\n');
			});
			/*it('should convert to plain text', () => {
				const result = input.toString();
				expect(result).toBe('1. Item 1\n2. Item 2\n3. Item 3\n');
			});*/
		});
	});

	describe('links', () => {
		const input = new Markdown('This is a [link](https://example.com)');
		it('should convert to HTML', () => {
			const result = input.toHtml();
			expect(result).toBe('<p>This is a <a href="https://example.com">link</a></p>\n');
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
			expect(result).toBe('<p>This is an <img src="https://example.com/image.jpg" alt="image"></p>\n');
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
			expect(result).toBe('<blockquote>\n<p>This is a blockquote</p>\n</blockquote>\n');
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
			expect(result).toBe('<p>This is a line<br>\nbreak</p>\n');
		});
		it('should convert to plain text', () => {
			const result = input.toString();
			expect(result).toBe('This is a line\nbreak');
		});
	});
});
