import { readFileSync, existsSync } from 'fs';

import { icons } from '@phosphor-icons/core';
import createPlugin from 'tailwindcss/plugin.js';

const VARIANTS = ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'];
const ICON_SET = /** @type {Set<string>} */ (new Set(icons.map((i) => i.name)));

export default createPlugin.withOptions(
	/** @param {Partial<import('./plugin').Options>} options */
	function (options) {
		const { prefix = 'ph', customProperty = '--ph-url' } = options ?? {};

		return function (api) {
			api.addComponents({
				[`.${prefix}`]: {
					[customProperty]: 'none',
					width: '1em',
					height: '1em',
					backgroundColor: 'currentcolor',
					color: 'inherit',
					maskImage: `var(${customProperty})`,
					maskSize: '100% 100%',
					maskRepeat: 'no-repeat',

					'&span': {
						display: 'inline-block',
					},
				},
			});

			api.matchComponents({
				[prefix]: (icon) => {
					// syntax: <name>[--weight]
					let [name = '', weight = 'regular'] = icon.split('--');
					name = name.trim();
					weight = weight.trim();

					let url = 'icon-not-found';
					if (ICON_SET.has(name) && VARIANTS.includes(weight)) {
						const fileUrl = new URL(
							import.meta.resolve(
								`@phosphor-icons/core/assets/${weight}/${name}${weight === 'regular' ? '' : `-${weight}`}.svg`,
							),
						);
						const path = fileUrl.pathname;

						if (existsSync(path)) {
							const svgStr = readFileSync(path, { encoding: 'base64' });
							url = `url(data:image/svg+xml;base64,${svgStr})`;
						}
					}

					return {
						[customProperty]: url,
					};
				},
			});
		};
	},
);
