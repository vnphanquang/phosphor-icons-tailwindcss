import path from 'path';

import { build, Rollup } from 'vite';
import { test, expect } from 'vitest';

['v3', 'v4'].forEach((version) => {
	test(`vite ${version}`, async () => {
		const { output } = (await build({
			root: path.resolve(import.meta.dirname, version),
		})) as Rollup.RollupOutput;
		const css = (output.find((c) => c.name === 'index.css') as Rollup.OutputAsset)?.source;

		await expect(css).toMatchFileSnapshot(
			path.resolve(import.meta.dirname, '__snapshots__', `${version}.css`),
		);
	});
});
