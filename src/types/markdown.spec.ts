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
});
