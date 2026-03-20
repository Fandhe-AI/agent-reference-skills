# TypeDoc Installation & CLI Usage

TypeDoc is a documentation generator for TypeScript projects. It converts comments in TypeScript source code into rendered HTML documentation or a JSON model.

## 詳細説明

### Requirements

- **Node.js**: Current LTS version or newer is required.
- **TypeScript**: TypeDoc aims to support the two latest TypeScript releases for the current release.

| TypeDoc Version | TypeScript Support | Status |
|---|---|---|
| 0.28 | 5.0--5.8 | Maintained |
| 0.27 | 5.0--5.8 | Security Updates Only |
| 0.26 | 4.6--5.6 | Unmaintained |
| 0.25 | 4.6--5.4 | Unmaintained |
| 0.24 | 4.6--5.1 | Unmaintained |

### Installation

Install TypeDoc as a local dev dependency (recommended):

```bash
npm install typedoc --save-dev
```

Global installation is also possible but may cause plugin/theme resolution issues unless `--legacy-peer-deps` is used:

```bash
npm install -g typedoc
```

### CLI Basic Usage

The basic syntax is:

```bash
typedoc path/to/entry.ts
```

Common entry point example:

```bash
typedoc --entryPoints src/index.ts --out docs
```

### Key CLI Options

TypeDoc has 100+ CLI options. The most commonly used ones:

| Option | Description |
|---|---|
| `--entryPoints` | The entry points of your documentation |
| `--out` | Output directory for the default output |
| `--html` | Output directory for HTML documentation |
| `--json` | Output path for JSON description of the project |
| `--tsconfig` | Path to TypeScript config file |
| `--theme` | Theme name for rendering |
| `--readme` | Path to readme file (pass `none` to disable) |
| `--watch` | Watch files for changes and rebuild |
| `--emit` | What to emit: `docs`, `both`, or `none` |
| `--name` | Project name in the header |
| `--plugin` | npm plugins to load (omit to load all installed) |
| `--options` | Path to a JSON option file (defaults to `typedoc.json`) |
| `--showConfig` | Print resolved configuration and exit |
| `--help` | Print help message |
| `--version` | Print TypeDoc version |

### Entry Point Strategies

| Option | Description |
|---|---|
| `--entryPointStrategy` | Strategy to convert entry points into modules |
| `--sortEntryPoints` | Subject entry points to same sorting rules as other reflections |

### Output & Appearance Options

| Option | Description |
|---|---|
| `--cleanOutputDir` | Remove output directory before writing |
| `--pretty` | Format output JSON with tabs |
| `--customCss` | Path to custom CSS file |
| `--customJs` | Path to custom JS file |
| `--customFooterHtml` | Custom footer HTML content |
| `--favicon` | Path to favicon |
| `--hideGenerator` | Do not print TypeDoc link at end of page |
| `--cacheBust` | Include generation time in static asset links |
| `--cname` | Set CNAME file text (useful for GitHub Pages) |
| `--githubPages` | Generate `.nojekyll` file (defaults to `true`) |
| `--includeVersion` | Add package version to project name |

### Source & Git Options

| Option | Description |
|---|---|
| `--disableSources` | Disable setting the source of reflections |
| `--disableGit` | Disable git integration for source links |
| `--gitRemote` | Remote for linking to source files |
| `--gitRevision` | Revision for linking to source files |
| `--sourceLinkTemplate` | Template for source URLs (`{path}`, `{line}`, `{gitRevision}`) |
| `--sourceLinkExternal` | Open source links in a new tab |
| `--basePath` | Base path for link resolution |
| `--displayBasePath` | Base path for file path display |

### Exclusion Options

| Option | Description |
|---|---|
| `--exclude` | Patterns to exclude from entry point directories |
| `--excludeExternals` | Prevent externally resolved symbols from being documented |
| `--excludeInternal` | Exclude symbols marked `@internal` |
| `--excludeNotDocumented` | Exclude symbols without explicit documentation |
| `--excludeNotDocumentedKinds` | Types of reflections removable by `excludeNotDocumented` |
| `--excludePrivate` | Ignore `private` members and `#private` fields (defaults to `true`) |
| `--excludePrivateClassFields` | Ignore `#private` class fields (defaults to `true`) |
| `--excludeProtected` | Ignore protected members |
| `--excludeReferences` | If exported multiple times, ignore all but the first |
| `--excludeCategories` | Exclude symbols within specified categories |
| `--excludeTags` | Remove listed block/modifier tags from doc comments |
| `--externalPattern` | Patterns for files considered external |

### Validation & Warning Options

| Option | Description |
|---|---|
| `--validation` | Validation steps to perform |
| `--treatWarningsAsErrors` | Treat all warnings as errors |
| `--treatValidationWarningsAsErrors` | Treat validation warnings as errors |
| `--requiredToBeDocumented` | Reflection kinds that must be documented |
| `--packagesRequiringDocumentation` | Packages that must be documented |
| `--intentionallyNotDocumented` | Reflections that should not produce warnings |
| `--intentionallyNotExported` | Types that should not produce warnings |
| `--suppressCommentWarningsInDeclarationFiles` | Suppress tag warnings in `.d.ts` files |
| `--skipErrorChecking` | Skip TypeScript type checking before generating |

### Comment & Tag Options

| Option | Description |
|---|---|
| `--commentStyle` | How TypeDoc searches for comments |
| `--blockTags` | Block tags TypeDoc should recognize |
| `--inlineTags` | Inline tags TypeDoc should recognize |
| `--modifierTags` | Modifier tags TypeDoc should recognize |
| `--cascadedModifierTags` | Modifier tags copied to all children |
| `--notRenderedTags` | Tags preserved but not rendered |
| `--preservedTypeAnnotationTags` | Block tags whose type annotations are preserved |
| `--jsDocCompatibility` | JSDoc compatibility options for comment parsing |
| `--useTsLinkResolution` | Use TypeScript's link resolution for `@link` tags |
| `--preserveLinkText` | Use text content as link for `@link` tags without link text |
| `--searchInComments` | Include comments in search index |
| `--searchInDocuments` | Include documents in search index |
| `--useFirstParagraphOfCommentAsSummary` | Use first paragraph as summary if no `@summary` |

### Navigation & Organization Options

| Option | Description |
|---|---|
| `--navigation` | How the navigation sidebar is organized |
| `--navigationLeaves` | Branches not to expand |
| `--navigationLinks` | Links in the header |
| `--sidebarLinks` | Links in the sidebar |
| `--titleLink` | Link the title points to |
| `--headings` | Which optional headings are rendered |
| `--categorizeByGroup` | Categorize at the group level |
| `--categoryOrder` | Order of categories (`*` for unlisted) |
| `--groupOrder` | Order of groups (`*` for unlisted) |
| `--defaultCategory` | Default category for uncategorized reflections |
| `--groupReferencesByType` | Group references with their referred type |
| `--sort` | Sort strategy for documented values |
| `--kindSortOrder` | Sort order when `kind` is specified |

### Other Options

| Option | Description |
|---|---|
| `--hostedBaseUrl` | Base URL for sitemap.xml and canonical links |
| `--useHostedBaseUrlForAbsoluteLinks` | Use hostedBaseUrl for absolute links |
| `--markdownLinkExternal` | Open `http[s]://` links in a new tab |
| `--lang` | Language for generation and messages |
| `--logLevel` | Logging verbosity |
| `--maxTypeConversionDepth` | Maximum depth of types to convert |
| `--typePrintWidth` | Width for type code wrapping |
| `--projectDocuments` | Documents added as children to root (supports globs) |
| `--router` | Router for determining file names |
| `--sluggerConfiguration` | How anchors are determined |
| `--externalSymbolLinkMappings` | Custom links for external symbols |
| `--highlightLanguages` | Languages to load for code highlighting |
| `--ignoredHighlightLanguages` | Languages accepted but not highlighted |
| `--lightHighlightTheme` | Code highlighting theme in light mode |
| `--darkHighlightTheme` | Code highlighting theme in dark mode |
| `--includeHierarchySummary` | Render hierarchy summary page (defaults to `true`) |
| `--preserveWatchOutput` | Do not clear screen between watch rebuilds |
| `--alwaysCreateEntryPointModule` | Always create a Module for entry points |

### Syntax Highlighting

TypeDoc supports 200+ languages for code highlighting (via Shiki), including: javascript, typescript, python, java, c++, rust, go, and many more.

Over 60 highlighting themes are available, including: `github-dark`, `dracula`, `nord`, `rose-pine`, `tokyo-night`, `synthwave-84`.

## コード例

```typescript
// Basic usage
// typedoc --entryPoints src/index.ts --out docs

// Multiple entry points
// typedoc --entryPoints src/index.ts --entryPoints src/secondary.ts --out docs

// With specific theme and readme
// typedoc --entryPoints src/index.ts --out docs --theme default --readme README.md

// Output JSON instead of HTML
// typedoc --entryPoints src/index.ts --json docs/api.json

// Watch mode for development
// typedoc --entryPoints src/index.ts --out docs --watch

// Skip type checking for faster builds
// typedoc --entryPoints src/index.ts --out docs --skipErrorChecking

// Show resolved configuration
// typedoc --showConfig
```

### Configuration via typedoc.json

```json
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "name": "My Project",
  "readme": "README.md",
  "theme": "default",
  "excludePrivate": true,
  "excludeExternals": true,
  "plugin": ["typedoc-plugin-markdown"],
  "sort": ["alphabetical"],
  "categorizeByGroup": true,
  "navigation": {
    "includeCategories": true,
    "includeGroups": true
  }
}
```

### Configuration via tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext"
  },
  "typedocOptions": {
    "entryPoints": ["src/index.ts"],
    "out": "docs"
  }
}
```

### Configuration via package.json

```json
{
  "typedocOptions": {
    "entryPoints": ["src/index.ts"],
    "out": "docs"
  }
}
```

## 注意点

- Global installation may cause plugin/theme resolution issues; prefer local installation.
- TypeDoc reads configuration from `typedoc.json`, `tsconfig.json`, and `package.json` in that order.
- The `--options` flag specifies a custom JSON config file path (defaults to `typedoc.json` in the current directory).
- The `--tsconfig` flag specifies a custom `tsconfig.json` path (defaults to `tsconfig.json` in the current directory).
- Using `--excludeNotDocumented` can significantly reduce output for large projects.
- The `--skipErrorChecking` option can speed up generation but may produce incomplete docs if there are type errors.
- Indentation-based code blocks in comments will NOT prevent tags from being parsed. Use fenced code blocks (triple backticks) instead.

## 関連

- [Node Module API](./node-module-api.md)
- [Browser Bundle](./browser-bundle.md)
- [Doc Comments Guide](../guides/doc-comments.md)
- [JSDoc Support](../guides/jsdoc-support.md)
