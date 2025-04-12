import { fileURLToPath } from 'node:url';

import { defineConfig } from '@vnphanquang/eslint-config';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig({ gitignorePath });
