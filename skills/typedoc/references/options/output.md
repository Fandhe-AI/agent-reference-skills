# Options: Output

TypeDoc options controlling generated output targets, theming, and rendering.

## Usage

```json
{
  "outputs": [
    { "name": "html", "path": "./docs" },
    { "name": "json", "path": "./docs/api.json" }
  ],
  "theme": "default",
  "router": "kind"
}
```

## Options / Props

### Output targets

| Option | Type | Default | CLI | Description |
| --- | --- | --- | --- | --- |
| `outputs` | `array` (array of output config objects) | none | — | Specifies multiple output destinations along with their type and per-output options. Each output object has a name (e.g. `"html"`, `"json"`, `"markdown"`), a path, and optional rendering settings. |
| `out` | `string` (file path) | none | `--out <path/to/documentation/>` | Where to write the default output type. Acts as a shortcut that overrides the `outputs` option. Generates HTML by default unless changed by a plugin. |
| `html` | `string` (file path) | none | `--html <path/to/documentation/>` | Location for HTML documentation output. Acts as an output shortcut that overrides the `outputs` option. |
| `json` | `string` (file path) | none | `--json <path/to/out-file.json>` | Location for a JSON file containing all reflection data. Acts as an output shortcut that overrides the `outputs` option. |
| `pretty` | `boolean` | `true` | `--pretty` | Whether JSON output is formatted for readability. |
| `emit` | `"docs" \| "both" \| "none"` | `"docs"` | `--emit <value>` | Controls what TypeDoc writes. `"docs"` outputs documentation only, `"both"` outputs documentation and JavaScript, `"none"` performs conversion and validation without writing files. |

### Theming & highlighting

| Option | Type | Default | CLI | Description |
| --- | --- | --- | --- | --- |
| `theme` | `string` | `"default"` | `--theme <name>` | Theme used to render documentation. |
| `router` | `"kind" \| "kind-dir" \| "structure" \| "structure-dir" \| "group" \| "category"` | `"kind"` | `--router <name>` | Determines the file structure of HTML output. |
| `lightHighlightTheme` | `string` (Shiki theme name) | none (Shiki's default) | `--lightHighlightTheme <theme>` | Shiki theme for syntax highlighting of code snippets in light mode. |
| `darkHighlightTheme` | `string` (Shiki theme name) | none (Shiki's default) | `--darkHighlightTheme <theme>` | Shiki theme for syntax highlighting of code snippets in dark mode. |
| `highlightLanguages` | `string[]` | `["bash", "console", "css", "html", "javascript", "json", "jsonc", "json5", "tsx", "typescript"]` | — | Shiki grammars loaded for highlighting code blocks. |
| `ignoredHighlightLanguages` | `string[]` | `[]` | — | Languages in code blocks to silently ignore, without generating warnings, during highlighting. |
| `typePrintWidth` | `number` | `80` | `--typePrintWidth <number>` | Character width at which type-rendering code wraps. Changing it requires adjusting the corresponding theme. |

### Custom assets

| Option | Type | Default | CLI | Description |
| --- | --- | --- | --- | --- |
| `customCss` | `string` (file path) | none | `--customCss <path>` | Path to a CSS file copied to assets and referenced by the theme. |
| `customJs` | `string` (file path) | none | `--customJs <path>` | Path to a JavaScript file (not a module) copied to assets and referenced by the theme. |
| `customFooterHtml` | `string` (HTML content) | none | `--customFooterHtml <html>` | Custom HTML inserted into the page footer. |
| `customFooterHtmlDisableWrapper` | `boolean` | `false` | `--customFooterHtmlDisableWrapper` | When enabled, disables automatic wrapping of the custom footer HTML in a `<p>` element, allowing direct control of formatting. |
| `markdownItOptions` | `object` | `{ "html": true, "linkify": true }` | — | Configuration options forwarded to markdown-it when parsing doc comments. Overrides markdown-it's defaults. |
| `markdownItLoader` | `function` | none | — (JS config file only) | Callback receiving the markdown-it instance, used to configure plugins. Only available in JavaScript config files. |

### Paths & site metadata

| Option | Type | Default | CLI | Description |
| --- | --- | --- | --- | --- |
| `displayBasePath` | `string` (file path) | auto-determined from the lowest common directory | `--displayBasePath <path>` | Base path for displaying file paths in the documentation. Affects display only, not link generation. Defaults to the `basePath` option's value. |
| `cname` | `string` (domain name) | none | `--cname <domain>` | Creates a CNAME file in the output directory with the given text. |
| `favicon` | `string` (file path) | none | `--favicon <path>` | Path to a favicon file (`.ico`, `.png`, or `.svg`) referenced as the site's favicon. |
| `sourceLinkExternal` | `boolean` | `false` | `--sourceLinkExternal` | When enabled, source code links open in a new tab in generated HTML documentation. |
| `markdownLinkExternal` | `boolean` | `false` | `--markdownLinkExternal` | When enabled, http/https links in comments and Markdown files open in a new tab. |
| `lang` | `string` (language code) | `"en"` | `--lang <code>` | Sets the `lang` HTML attribute and determines the translations used to generate documentation. |
| `locales` | `object` (translation overrides keyed by locale) | none | — | Custom translations for a given locale. Values override the default translations for that language. |
| `githubPages` | `boolean` | `true` | `--githubPages` | When enabled, automatically adds a `.nojekyll` file to prevent GitHub Pages from processing documentation with Jekyll. Useful for scoped packages. |
| `cacheBust` | `boolean` | `false` | `--cacheBust` | When enabled, includes a generation timestamp in script and link tags to prevent stale assets from previous builds. |
| `hideGenerator` | `boolean` | `false` | `--hideGenerator` | When enabled, hides the TypeDoc attribution link in the page footer. |
| `searchInComments` | `boolean` | `false` | `--searchInComments` | When enabled, allows searching within comment text on the documentation site. Note: significantly increases search index size. |
| `searchInDocuments` | `boolean` | `false` | `--searchInDocuments` | When enabled, allows searching within document text on the documentation site. Note: significantly increases search index size. |
| `cleanOutputDir` | `boolean` | `true` | `--cleanOutputDir` | Whether TypeDoc cleans the output directory before generation. |
| `titleLink` | `string` (URL) | the documentation home page | `--titleLink <url>` | Destination URL for the header title link. |
| `navigationLinks` | `object` (name-to-URL mapping) | none | — | Additional links shown in the page header navigation. |
| `sidebarLinks` | `object` (name-to-URL mapping) | none | — | Additional links shown in the page sidebar. |

### Navigation & search structure

| Option | Type | Default | CLI | Description |
| --- | --- | --- | --- | --- |
| `navigation` | `object` (boolean properties) | `{ "includeCategories": true, "includeGroups": false, "includeFolders": true, "compactFolders": false, "excludeReferences": true }` | — | Controls the left sidebar navigation structure. Interacts with the `categorizeByGroup` option. |
| `headings` | `object` (boolean properties) | `{ "readme": true, "document": false }` | — | Whether descriptive headings are shown on the rendered readme file and document pages. |
| `sluggerConfiguration` | `object` | `{ "lowercase": true }` | — | Controls how page anchors are generated. Exists for backward compatibility; lowercasing has been the default since v0.27. |
| `navigationLeaves` | `string[]` | none | — | Namespaces/modules not to expand in the navigation tree. Use dot notation for nested namespaces (e.g. `"ParentNS.ChildNS"`). |
| `visibilityFilters` | `object` (boolean values) | all standard filters visible by default | — | Configures filters available on documentation pages. Standard options include protected, private, inherited, and external. Modifier tags can also be added for custom sorting. |
| `searchCategoryBoosts` | `object` (category-to-multiplier mapping) | none | — | Boosts search relevance for items in the given category using a numeric multiplier. |
| `searchGroupBoosts` | `object` (group-to-multiplier mapping) | none | — | Boosts search relevance for items in the given group using a numeric multiplier. |
| `hostedBaseUrl` | `string` (URL) | none | — | Base URL where the TypeDoc site is hosted. Used for sitemap generation, canonical links, and enabling absolute link generation. |
| `useHostedBaseUrlForAbsoluteLinks` | `boolean` | `false` | — | When enabled and `hostedBaseUrl` is set, generates absolute links instead of relative links. |
| `useFirstParagraphOfCommentAsSummary` | `boolean` | `false` | — | When enabled, uses the first paragraph of a comment as a short summary in module/namespace member lists, unless overridden by the `@summary` tag. |
| `includeHierarchySummary` | `boolean` | `true` | `--includeHierarchySummary` | Controls whether a `hierarchy.html` page listing the full class hierarchy of documented members is generated. |

## Notes

- `router` values: `kind` (organizes pages by member kind), `kind-dir` (same as `kind` but renders as `index.html` inside directories for clean URLs), `structure` (organizes pages by module structure), `structure-dir` (same as `structure` but renders as `index.html` inside directories), `group` (organizes pages by group tag), `category` (organizes pages by category tag).
- `emit` values: `"docs"` (documentation only), `"both"` (documentation and JavaScript), `"none"` (conversion and validation without writing files).
- `markdownItLoader` example (JavaScript config file only):
  ```js
  // typedoc.config.mjs
  export default {
    markdownItLoader(parser) {
      parser.use(require("markdown-it-abbr"));
    }
  };
  ```

## Related

- [Options: Configuration](./configuration.md)
- [Options: Input](./input.md)
- [Options: Comments](./comments.md)
- [Options: Organization](./organization.md)
- [Options: Validation](./validation.md)
- [Options: Other](./other.md)
