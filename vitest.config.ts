import {defineConfig} from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // globals: true,
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.test.ts'],
    
  }
});
