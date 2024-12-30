import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	css: {
		transformer: 'postcss',
	},
	build: {
		cssMinify: false,
	},
	plugins: [tailwindcss()],
});
