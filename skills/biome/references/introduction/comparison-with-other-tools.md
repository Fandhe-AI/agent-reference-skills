# Comparison with other tools

How Biome compares with Prettier, ESLint, and Oxc in compatibility, performance, and language support.

## Signature / Usage

```shell
biome migrate prettier   # Prettier config -> biome.json
biome migrate eslint     # ESLint config -> biome.json
```

## Biome vs Prettier

| Aspect | Summary |
| --- | --- |
| Output | Matches Prettier's output in 97% of cases (won the Prettier challenge). Intentional differences are listed on the Differences with Prettier page |
| Default options | Biome indents with tabs, Prettier with spaces |
| Performance | About 25 times faster on the official benchmark |
| Languages | Different sets of supported languages. Prettier has more stable support for HTML and HTML super languages such as Vue and Angular, plus a large ecosystem of community plugins |

## Biome vs ESLint

| Aspect | Summary |
| --- | --- |
| Positioning | Not built to be a drop-in replacement |
| Rules | Most ported from ESLint and popular plugins (`eslint-plugin-react`, `eslint-plugin-jsx-a11y`, `eslint-plugin-import`, `eslint-plugin-unicorn`); origins are on the Rule sources page. Names use `camelCase` (ESLint's `eqeqeq` is Biome's `noDoubleEquals`). Some rules support fewer options or behave slightly differently |
| Performance | About 15 times faster on the official benchmark |
| Configuration | Only `@biomejs/biome` and an optional `biome.json` (ESLint setups wire together a parser, the TypeScript plugin, `eslint-config-prettier`, etc.) |
| Plugins | Cannot run ESLint's JavaScript plugins. Biome plugins are written in GritQL |
| Type-aware linting | Own type-aware rules that do not depend on the `typescript` package, added in v2. The rule count is considerably smaller than `typescript-eslint`'s, but coverage is growing |

## Biome vs Oxc

| Aspect | Summary |
| --- | --- |
| Scope | Each Oxc tool (oxlint, oxfmt, ...) is a drop-in replacement for an existing tool with its own configuration. Biome ships in one package with one configuration and is more opinionated |
| Performance | In Oxc's official benchmark, Oxc's parser is 5 times faster than Biome's and Oxfmt is 3 times faster than Biome's formatter. Both are many times faster than Prettier and ESLint |
| Architecture | Biome's parser produces a concrete syntax tree and is resilient and recoverable, which costs some speed but lets Biome format and lint malformed code |
| Languages | Oxlint is scoped to JavaScript and TypeScript only; Biome also lints CSS, JSON, GraphQL, and HTML. Oxfmt supports more languages overall because it bundles Prettier for languages not yet implemented natively; Biome implements every supported language natively |
| Type-aware linting | Oxlint uses the `oxlint-tsgolint` package (built on `typescript-go`). Biome infers types itself and does not need TypeScript installed; its type-aware rule count is considerably smaller than Oxlint's, but coverage is growing |

## Notes

- The figures (25x / 15x / 97% / 5x / 3x) come from the official benchmarks and the original text.
- Source: https://biomejs.dev/introduction/comparison-with-other-tools/

## Related

- [why-biome](./why-biome.md)
- [differences-with-prettier](../formatter/differences-with-prettier.md)
- [migrate-eslint-prettier](../guides/migrate-eslint-prettier.md)
- [language-support](../internals/language-support.md)
