---
source: https://tailwindcss.com/docs/editor-setup
---

# Editor setup

Tooling to improve the developer experience when working with Tailwind CSS.

## Signature / Usage

Class sorting with the official Prettier plugin:

```html
<!-- Before -->
<button class="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">Submit</button>

<!-- After -->
<button class="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">Submit</button>
```

## Notes

- Syntax support: Tailwind CSS uses custom CSS syntax like `@theme`, `@variant`, and `@source`, and in some editors this can trigger warnings or errors where these rules aren't recognized. In VS Code, the official Tailwind CSS IntelliSense plugin includes a dedicated Tailwind CSS language mode that supports all of the custom at-rules and functions Tailwind uses. In some cases you may need to disable native CSS linting/validations if your editor is very strict about the syntax it expects in CSS files.
- Cursor: AI-native code editor. It supports VS Code extensions, so Tailwind CSS IntelliSense and the Prettier plugin work out of the box.
- Zed: has built-in support for Tailwind CSS autocompletions, linting, and hover previews without a separate extension. It integrates with Prettier, so the official Prettier plugin works when installed.
- IntelliSense for VS Code (`bradlc.vscode-tailwindcss`; project at github.com/tailwindcss/intellisense) provides: Autocomplete (utility classes, plus CSS functions and directives), Linting (errors and potential bugs in CSS and markup), Hover previews (complete CSS for utility classes), Syntax highlighting (custom CSS syntax).
- Class sorting with Prettier: the official plugin is `tailwindlabs/prettier-plugin-tailwindcss`. It sorts classes following the recommended class order, works with custom Tailwind configurations, and works anywhere Prettier works (every popular editor and IDE, and the command line).
- JetBrains IDEs like WebStorm and PhpStorm include support for intelligent Tailwind CSS completions in your HTML.
- Parsing Tailwind at-rules in Biome is covered by the biome skill (`css.parser.tailwindDirectives`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/editor-setup.mdx` (fetched 2026-10-16).

## Related

- [Compatibility](./compatibility.md)
