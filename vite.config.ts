import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: "./characters-app",
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './tests/setup.ts',
		coverage: {
			reporter: ['text'],
		},
	},
});
