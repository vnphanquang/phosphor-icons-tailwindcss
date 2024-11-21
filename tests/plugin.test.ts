import path from 'path';

import { compile } from '@tailwindcss/node';
import postcss from 'postcss';
import { expect, test, describe } from 'vitest';

import plugin, { type Options } from '../src/plugin.js';

const css = String.raw;
const html = String.raw;

const COMMON_CANDIDATES = ['w-4', 'h-4'];

interface Run {
	(candidates: string[], options?: Partial<Options>): Promise<string>;
}

function tests(run: Run, version: number) {
	test('default', async function ({ expect }) {
		const result = await run([...COMMON_CANDIDATES, 'ph', 'ph-[info]']);
		await expect(result).toMatchFileSnapshot(
			path.resolve(__dirname, '__snapshots__', `v${version}/default.css`),
		);
	});

	test('custom prefix', async function () {
		const result = await run([...COMMON_CANDIDATES, 'i', 'i-[info]'], {
			prefix: 'i',
		});
		await expect(result).toMatchFileSnapshot(
			path.resolve(__dirname, '__snapshots__', `v${version}/custom-prefix.css`),
		);
	});

	test('no layer', async function () {
		const result = await run([...COMMON_CANDIDATES, 'ph', 'ph-[info]'], {
			layer: null,
		});
		await expect(result).toMatchFileSnapshot(
			path.resolve(__dirname, '__snapshots__', `v${version}/no-layer.css`),
		);
	});

	test('custom layer', async function () {
		const result = await run([...COMMON_CANDIDATES, 'ph', 'ph-[info]'], {
			layer: 'custom',
		});
		await expect(result).toMatchFileSnapshot(
			path.resolve(__dirname, '__snapshots__', `v${version}/custom-layer.css`),
		);
	});

	test('custom `custom-property`', async function () {
		const result = await run([...COMMON_CANDIDATES, 'ph', 'ph-[info]'], {
			'custom-property': '--icon-url',
		});
		await expect(result).toMatchFileSnapshot(
			path.resolve(__dirname, '__snapshots__', `v${version}/custom-property.css`),
		);
	});

	test('custom `customProperty`', async function () {
		const result = await run([...COMMON_CANDIDATES, 'ph', 'ph-[info]'], {
			customProperty: '--icon-url',
		});
		await expect(result).toMatchFileSnapshot(
			path.resolve(__dirname, '__snapshots__', `v${version}/custom-property.css`),
		);
	});

	test('no icon found', async function () {
		const result = await run([...COMMON_CANDIDATES, 'ph', 'ph-[404]']);
		await expect(result).toMatchFileSnapshot(
			path.resolve(__dirname, '__snapshots__', `v${version}/no-icon-found.css`),
		);
	});

	test('no icon name', async function () {
		const result = await run([...COMMON_CANDIDATES, 'ph', 'ph-[]']);
		await expect(result).toMatchFileSnapshot(
			path.resolve(__dirname, '__snapshots__', `v${version}/no-icon-name.css`),
		);
	});

	describe('weights', function () {
		for (const weight of ['thin', 'light', 'regular', 'bold', 'fill', 'duotone', '404']) {
			test(`weight:${weight}`, async function () {
				const result = await run([...COMMON_CANDIDATES, 'ph', `ph-[info--${weight}]`]);
				await expect(result).toMatchFileSnapshot(
					path.resolve(__dirname, `__snapshots__`, `v${version}/weight-${weight}.css`),
				);
			});
		}
	});
}

describe('v4', function () {
	const run: Run = async (candidates, options) => {
		const cssEntry = css`
			@base {
				@theme default {
					--spacing: 0.25rem;
				}
			}

			@layer utilities {
				@tailwind utilities;
			}
		`;
		const { currentTestName } = expect.getState();

		let cssPlugin = css`
			@plugin 'phosphor-icons-tailwindcss';
		`;
		if (options) {
			let config = '';
			for (const [key, value] of Object.entries(options)) {
				config += `${key}: ${value};\n`;
			}
			cssPlugin = `
				@plugin 'phosphor-icons-tailwindcss' {
					${config}
				};
			`;
		}

		const { build } = await compile(cssEntry + cssPlugin, {
			base: `${path.resolve(__filename)}?test=${currentTestName}`,
			onDependency: () => {},
			shouldRewriteUrls: true,
			...({
				loadModule: () => ({
					module: plugin,
				}),
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any),
		});
		return build(candidates);
	};

	tests(run, 4);
});

describe('v3', async function () {
	const tailwindcss = await import('tailwindcssv3').then((m) => m.default);
	const cssEntry = css`
		@tailwind utilities;
	`;

	const run: Run = async (candidates, options) => {
		const { currentTestName } = expect.getState();
		const config = {
			content: [{ raw: html`<i class="${candidates.join(' ')}"</i>` }],
			plugins: [plugin(options)],
			corePlugins: { preflight: false },
		} satisfies import('tailwindcssv3').Config;

		const { css } = await postcss(tailwindcss(config)).process(cssEntry, {
			from: `${path.resolve(__filename)}?test=${currentTestName}`,
		});
		return css;
	};

	tests(run, 3);
});
