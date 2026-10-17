# Why Biome?

Biome is a toolchain for web projects, built to be fast and easy to set up. It started in August 2023 as a fork of Rome, maintained by some of its developers.

## Signature / Usage

```shell
biome check --write   # format + lint + assist in one run
biome ci              # for CI; fails the build if anything needs fixing
biome init            # create biome.json
biome migrate eslint
biome migrate prettier
```

## What you get out of the box

- A Prettier-compatible formatter that can format code even while it is malformed
- A linter with Biome's own rules and ports from ESLint and its most popular plugins
- Assist actions that tidy your code: sorting imports, ordering object keys, removing duplicate CSS classes, and more

## Design principles

| Principle | Summary |
| --- | --- |
| One package | Only `@biomejs/biome` is needed, with shared configuration and no separate ignore file. Biome parses each file once and hands the same context to the formatter, linter, and assist actions, so a lint fix never produces code that the formatter rewrites, nor vice versa |
| Fast by default | Written in Rust (no dependency on Node.js). On the official benchmark, Biome formats about 25 times faster than Prettier and lints about 15 times faster than ESLint |
| Zero configuration to start | Works right after installing. Run `biome init` to create `biome.json` for finer control. The formatter follows the same option philosophy as Prettier; the linter rules can be enabled or disabled individually, by group, or by domain |
| Informative and actionable | Every lint rule rests on three pillars: explain the error, explain why it is a problem, and tell you what to do about it |
| Built for the editor | First-party language server, with official extensions for VS Code, IntelliJ, and Zed. Works while you type, even on malformed code |
| Compatible with what you already use | The formatter matches Prettier's output in 97% of cases. `biome migrate eslint` / `biome migrate prettier` write the equivalent `biome.json` from your existing configuration |

## Notes

- The rule count is rendered by a generated component on the official page; no number is recorded here.
- Benchmark figures come from the official benchmark repository (biomejs/benchmark).
- Source: https://biomejs.dev/introduction/why-biome/

## Related

- [comparison-with-other-tools](./comparison-with-other-tools.md)
- [option-philosophy](../formatter/option-philosophy.md)
- [migrate-eslint-prettier](../guides/migrate-eslint-prettier.md)
