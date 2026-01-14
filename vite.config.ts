import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import glsl from 'vite-plugin-glsl';

// https://vite.dev/config/
export default defineConfig({
	base: './',
	plugins: [react(), tailwindcss(), glsl()],
	build: {
		assetsInlineLimit: 0,
	},
	server: {
		host: true,
	},
});
