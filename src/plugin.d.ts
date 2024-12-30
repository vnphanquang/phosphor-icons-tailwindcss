export type Weight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

export interface Options {
	/**
	 * the base icon class. Default to `ph`
	 *
	 * @example
	 * ```html
	 * <div class="ph ph-[info]"></div>
	 * ```
	 */
	prefix: string;
	/**
	 * The layer to output CSS rules into.
	 * Default to `icons`.
	 * Set to null skip layering.
	 *
	 * Note: The base class will be output to the sub-layer `.base`
	 */
	layer: string | null;
	/*
	 * CSS custom property for icon URL.
	 * Default to `--ph-url`
	 */
	'custom-property': string;
	/** alias for 'custom-property' option */
	customProperty: string;

	/**
	 * The default weight for icons.
	 * Default to `regular`
	 */
	'default-weight': Weight;
	/** alias for 'default-weight' option */
	defaultWeight: Weight;
}

declare function plugin(options?: Partial<Options>): {
	handler: () => void;
};

declare namespace plugin {
	const __isOptionsFunction: true;
}

export { plugin as default };
