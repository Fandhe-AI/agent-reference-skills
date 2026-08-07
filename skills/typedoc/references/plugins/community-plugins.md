# Community Plugins

Community-developed and maintained plugins for TypeDoc, loadable via the `--plugin` flag. Searchable on npm with the `typedoc-plugin` keyword.

## Signature / Usage

TypeDoc has a plugin system; pass one or more plugins with the `--plugin` option to extend functionality.

```bash
typedoc --plugin typedoc-plugin-markdown
```

```json
{
  "plugin": ["typedoc-plugin-markdown", "typedoc-plugin-mdn-links"]
}
```

## Options / Props

### Plugins compatible with v0.28

#### AI & skill generation

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **typedoc-plugin-skillit** | pmouli | 1.4.0 | Generates an AI agent skill (SKILL.md) and llms.txt | MIT |
| **@skillit/typedoc** | pmouli | 1.1.0 | Generates an AI agent skill (SKILL.md) from TypeScript API docs | MIT |
| **typedoc-ai-md-link** | whatyoubendoing | 0.0.1 | Adds AI-friendly alternate Markdown links to generated docs | MIT |
| **typedoc-ai-actions** | whatyoubendoing | 0.0.1 | Adds GitHub, Markdown, and AI actions to generated docs | MIT |
| **typedoc-plugin-llms-txt** | boneskull | 0.1.2 | Generates an `llms.txt` file for LLM consumption | BlueOak-1.0.0 |

#### Output formats & Markdown

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **typedoc-plugin-markdown** | tgreyuk | 4.12.0 | Generates TypeScript API docs in Markdown format | MIT |
| **typedoc-plugin-md** | ocavue | 0.7.1 | Markdown documentation generation | MIT |
| **typedoc-plugin-inline-sources** | tgreyuk | 1.3.0 | Displays source code inline in the docs | MIT |
| **typedoc-plugin-file-overview** | prachwal_org | 0.2.0 | Renders structured file-level metadata blocks in Markdown output | MIT |

#### Type information & display improvements

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **typedoc-plugin-zod** | gerrit0 | 1.4.3 | Replaces `z.infer<typeof x>` with the inferred type | MIT |
| **typedoc-plugin-valibot** | mkljczk | 1.0.2 | Replaces `v.InferOutput<typeof x>` with the inferred type | MIT |
| **typedoc-plugin-vue** | gerrit0 | 1.5.1 | Improves display of Vue `defineComponent` and Pinia | MIT |
| **typedoc-plugin-missing-exports** | gerrit0 | 4.1.3 | Includes non-exported types in the documentation | MIT |
| **typedoc-plugin-rename-defaults** | felipecrs | 0.7.3 | Renames `default` exports back to their original name | MIT |
| **typedoc-color-chip** | whatyoubendoing | 0.0.2 | Renders color literals as color chips | MIT |

#### Links & references

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **typedoc-plugin-mdn-links** | gerrit0 | 5.1.1 | Links global types to MDN documentation | MIT |
| **typedoc-plugin-dt-links** | gerrit0 | 2.0.57 | Adds GitHub source links for `@types` packages | MIT |
| **typedoc-plugin-redirect** | gerrit0 | 1.3.0 | Adds redirect pages to the generated site | MIT |

#### Documentation structure & organization

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **typedoc-plugin-merge-modules** | krisztianb | 7.0.0 | Merges module contents | ISC |
| **typedoc-plugin-no-inherit** | jonchardy | 1.6.1 | Excludes inherited members from the documentation | MIT |
| **typedoc-plugin-default-groups** | herveperchec | 1.0.2 | Adds default groups to reflections | GPL-3.0-only |

#### Navigation

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **typedoc-plugin-navigation-title** | herveperchec | 1.2.3 | Sets a custom navigation title via the `@navigationTitle` tag | GPL-3.0-only |
| **typedoc-plugin-navigation-hooks** | herveperchec | 1.1.2 | Navigation-related hooks (experimental) | GPL-3.0-only |

#### Text processing

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **typedoc-plugin-replace-text** | krisztianb | 4.2.0 | Replaces text within the documentation | ISC |
| **@reside-ic/typedoc-plugin-copy-doc** | m-kusumgar | 1.1.2 | Copies related documentation | MIT |

#### Diagrams & visualization

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **typedoc-umlclass** | krisztianb | 0.10.2 | Generates UML class diagrams | ISC |
| **@boneskull/typedoc-plugin-mermaid** | boneskull | 0.2.1 | Renders Mermaid diagrams | BlueOak-1.0.0 |

#### Version management

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **@r74tech/typedoc-plugin-monorepo-versions** | r74tech | 1.0.2 | Tracks monorepo builds with a version-selection menu for the docs | MIT |
| **@shipgirl/typedoc-plugin-versions** | 0t4u | 0.3.2 | Tracks builds with a version-selection menu | MIT |

#### Code examples & imports

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **typedoc-plugin-include-example** | ferdodo | 3.0.2 | Includes files as example code | MIT |
| **typedoc-plugin-import-target** | herveperchec | 1.4.0 | Resolves import targets and inserts code blocks | GPL-3.0-only |
| **typedoc-plugin-language-switcher** | jackmacwindows | 1.0.2 | Provides multi-language switching for code blocks | ISC |

#### Extras & utilities

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **typedoc-plugin-extras** | drarig29 | 4.0.1 | Adds favicon, description, generation date, and other extras | MIT |
| **typedoc-plugin-coverage** | gerrit0 | 4.0.3 | Generates a documentation coverage badge | MIT |
| **@typhonjs-typedoc/typedoc-pkg** | typhonrt | 0.4.2 | Zero-config API documentation generation CLI from package.json | MPL-2.0 |

#### Analytics

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **typedoc-plugin-umami-analytics** | lordofbacon | 1.0.1 | Integrates Umami Analytics tracking | Apache-2.0 |
| **@8hobbies/typedoc-plugin-plausible** | hong-xu | 2.2.0 | Adds Plausible Analytics tracking | Apache-2.0 |

### Additional plugins compatible with v0.27

In addition to the v0.28-compatible plugins above, the following plugins are available for v0.27.

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **typedoc-plugin-ga** | eubereveloper | 1.1.1 | Adds Google Analytics | — |
| **@vpalmisano/typedoc-plugin-ga** | vpalmisano | 1.0.6 | Google Analytics integration | — |
| **@8hobbies/typedoc-plugin-404** | hong-xu | 3.2.1 | Generates a 404 page | — |
| **@giancosta86/typedoc-readonly** | giancosta86 | 1.0.1 | Advanced readonly support | — |
| **typedoc-plugin-external-link** | imranbarbhuiya | 3.0.2 | Adds custom external links | — |

### Additional plugins compatible with v0.26

In addition to the above, the following plugins are available for v0.26.

| Package | Author | Version | Description | License |
|---|---|---|---|---|
| **typedoc-plugin-custom-validation** | rebeccastevens | 2.0.2 | Custom validation | BSD-3-Clause |
| **@emuanalytics/typedoc-plugin-no-inherit** | robin.summerhill | 1.4.2 | Excludes inherited members (legacy-version compatible) | MIT |
| **typedoc-plugin-emojify** | mrfigg | 1.0.1 | Adds emoji parsing support | — |
| **@mrfigg/typedoc-plugin-lib-utils** | mrfigg | 1.3.1 | Utility functions | — |
| **typedoc-plugin-document-page-headings** | mrfigg | 1.0.0 | Adds page headings | — |
| **typedoc-plugin-version-header** | mrfigg | 1.0.0 | Displays a version in the page header | — |
| **typedoc-plugin-rename-documents** | mrfigg | 1.0.0 | Renames documents | — |
| **typedoc-plugin-github-widget** | mrfigg | 1.0.0 | Adds a GitHub widget | — |
| **nil-typedoc-plugin-markdown** | khannanov-nil | 4.3.1 | Markdown generation | — |
| **@konami-emoji-blast/typedoc** | joshuakgoldberg | 0.0.2 | Emoji integration | — |
| **typedoc-plugin-mermaid** | kamiazya | 1.12.0 | Graph generation for mermaid.js diagrams | — |
| **@zamiell/typedoc-plugin-not-exported** | zamiell | 0.3.0 | Includes non-exported symbols | — |

## Notes

- Plugins are compatible with specific TypeDoc versions; choose a plugin version that matches the TypeDoc version in use
- Multiple plugins can be specified as an array: `"plugin": ["plugin-a", "plugin-b"]`
- See TypeDoc's Plugin Development documentation for information on writing plugins
- Check GPL-3.0-only licensed plugins for compatibility with your project's license
- Search npm for the `typedoc-plugin` keyword to find the latest plugins
- See each plugin's npm page or GitHub repository for its detailed configuration options

## Related

- [Built-in themes](../themes/built-in.md) — default theme features
- [Community themes](../themes/community-themes.md) — third-party themes
