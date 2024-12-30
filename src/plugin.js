import fs from 'fs';

import { icons } from '@phosphor-icons/core';
import { resolve } from 'import-meta-resolve';
import createPlugin from 'tailwindcss/plugin.js';

const VARIANTS = ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'];
const ICON_SET = /** @type {Set<string>} */ (new Set(icons.map((i) => i.name)));

export default createPlugin.withOptions(
	/** @param {Partial<import('./plugin').Options>} options */
	function (options = {}) {
		const prefix = options.prefix ?? 'ph';
		const customProperty = options['custom-property'] ?? options['customProperty'] ?? '--ph-url';
		const defaultWeight = options['default-weight'] ?? options['defaultWeight'] ?? 'regular';
		let layer = options.layer;
		if (layer === undefined) layer = 'icons';

		return function (api) {
			const declarations = {
				[customProperty]: 'none',
				width: '1em',
				height: '1em',
				backgroundColor: 'currentcolor',
				color: 'inherit',
				maskImage: `var(${customProperty})`,
				maskSize: '100% 100%',
				maskRepeat: 'no-repeat',

				'&:is(span,i)': {
					display: 'inline-block',
				},
			};
			if (layer) {
				api.addUtilities({
					[`.${prefix}`]: {
						[`@layer ${layer}.base`]: declarations,
					},
				});
			} else {
				api.addUtilities({
					[`.${prefix}`]: declarations,
				});
			}

			api.matchUtilities({
				[prefix]: (icon) => {
					// syntax: <name>[--weight]
					let [name = '', weight = defaultWeight] = icon.split('--');
					name = name.trim();
					weight = weight.trim();

					let url = 'icon-not-found';
					if (ICON_SET.has(name) && VARIANTS.includes(weight)) {
						let filepath = new URL(
							resolve(
								`@phosphor-icons/core/assets/${weight}/${name}${weight === 'regular' ? '' : `-${weight}`}.svg`,
								import.meta.url,
							),
						);

						if (fs.existsSync(filepath)) {
							const svgStr = fs.readFileSync(filepath, { encoding: 'base64' });
							url = `url(data:image/svg+xml;base64,${svgStr})`;
						}
					}

					const declarations = {
						[customProperty]: url,
					};

					if (layer) {
						return {
							[`@layer ${layer}`]: declarations,
						};
					}

					return declarations;
				},
			});
		};
	},
);
