<img src="/meta/phosphor-mark-tight-yellow.png" width="128" align="right" />

# phosphor-icons-tailwindcss

A [TailwindCSS] plugin for the [Phosphor icon set][phosphor].

[![MIT][license.badge]][license] [![npm.badge]][npm]

## Installation

1. install package:

	```bash
	pnpm add -D phosphor-icons-tailwindcss # or via npm, yarn, ...
	```

2. register the plugin in your `tailwind.config.js`:

	```js
	// tailwind.config.js
	import phosphorIcons from "phosphor-icons-tailwindcss";

	/** @type {import("tailwindcss").Config } */
	export default {
		plugins: [phosphorIcons()],
	};
	```

	Or if you are using Tailwind 4:

	```css
	/* app.css, or whatever your entry CSS is */
	@import 'tailwindcss';
	@plugin 'phosphor-icons-tailwindcss';
	```

> [!IMPORTANT]
> This package only supports ESM. It should work well in most projects today, especially those using
> [Vite](https://vitejs.dev/).

## Usage

You need to add two classes to your markup:

1. the base `ph` class,
2. a class with the syntax: `ph-[<name><--weight>]`, corresponding to your desired icon.

> [!NOTE]
> `weight` is optional and defaults to "regular" if not specified.

For example:

```html
<p>
	<span class="ph ph-[info] text-xl"></span> <!-- render the regular info icon -->
	<i class="ph ph-[pulse--duotone] text-red-500"></i> <!-- render the pulse icon in duotone weight -->
</p>

<div class="ph ph-[file-css] h-6 w-6"></div>
```

For all available icon names and weight, visit [phosphoricons.com][phosphor].

The output CSS look something like this:

```css
.ph {
	--ph-url: none;
	width: 1em;
	height: 1em;
	background-color: currentcolor;
	color: inherit;
	mask-image: var(--ph-url);
	mask-size: 100% 100%;
	mask-repeat: no-repeat;
}

.ph-\[info\] {
	url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGQ9Ik0xMjgsMjRBMTA0LDEwNCwwLDEsMCwyMzIsMTI4LDEwNC4xMSwxMDQuMTEsMCwwLDAsMTI4LDI0Wm0wLDE5MmE4OCw4OCwwLDEsMSw4OC04OEE4OC4xLDg4LjEsMCwwLDEsMTI4LDIxNlptMTYtNDBhOCw4LDAsMCwxLTgsOCwxNiwxNiwwLDAsMS0xNi0xNlYxMjhhOCw4LDAsMCwxLDAtMTYsMTYsMTYsMCwwLDEsMTYsMTZ2NDBBOCw4LDAsMCwxLDE0NCwxNzZaTTExMiw4NGExMiwxMiwwLDEsMSwxMiwxMkExMiwxMiwwLDAsMSwxMTIsODRaIi8+PC9zdmc+);
}

/* ...truncated... */
```

## Configuration

You may pass a configuration object to the plugin to customize the generated CSS. The following
shows the default configuration:

```js
// tailwind.config.js
import phosphorIcons from "phosphor-icons-tailwindcss";

/** @type {import("tailwindcss").Config } */
export default {
	plugins: [phosphorIcons({
		prefix: 'ph', // for the icon classes
		customProperty: '--ph-url',
	})],
};
```

Similarly, for Tailwind 4:

```css
@import 'tailwindcss';
@plugin 'phosphor-icons-tailwindcss' {
	prefix: ph;
	customProperty: --ph-url;
}
```

## Why `ph-[info]` and not `ph-info`?

You may notice this library utilizes Tailwind's support for [arbitrary value](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values), i.e `ph-[info]` instead of `ph-info` to map to the regular info icon. This is to avoid unnecessary parsing during development, especially for [Taliwind language server](https://github.com/tailwindlabs/tailwindcss-intellisense). Arbitrary value syntax allows parsing ad-hoc only the icons actually being used. Otherwise, parsing 9000+ icons may cause slow-down that negatively impacts developer experience.

## Acknowledgements

You may find [@iconify/tailwindcss](https://iconify.design/docs/usage/css/tailwind/) helpful if you
are already using the [iconify](https://iconify.design/) ecosystem in your codebase.

`phosphor-icons-tailwindcss` tries to stay minimal by only covering [Phosphor] icons, and it references directly [@phosphor-icons/core](https://github.com/phosphor-icons/core) for the SVG assets.

[phosphor]: https://phosphoricons.com
[tailwindcss]: https://tailwindcss.com
<!-- header badges -->
[license.badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: ./LICENSE
[npm.badge]: https://img.shields.io/npm/v/phosphor-icons-tailwindcss
[npm]: https://www.npmjs.com/package/phosphor-icons-tailwindcss
