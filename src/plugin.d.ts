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
	/*
	 * CSS custom property for icon URL.
	 * Default to `--ph-url`
	 */
	customProperty: string;
}

declare function plugin(options?: Partial<Options>): {
	handler: () => void;
};

declare namespace plugin {
	const __isOptionsFunction: true;
}

export { plugin as default };
