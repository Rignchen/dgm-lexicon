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
});
