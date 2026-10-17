# Versioning

Source: https://biomejs.dev/internals/versioning/

How Biome is versioned. Biome follows semantic versioning, with its own guide for what counts as a patch, minor, or major change in a toolchain.

## Signature / Usage

Pin the exact version in `package.json` instead of using range operators:

```json
{
  "devDependencies": {
    "@biomejs/biome": "2.5.15"
  }
}
```

## Semantic Versioning

### Patch Release

- Fixing a lint rule that raises lint errors for valid code (false positives)
- Fixing incorrect code suggestions
- Fixing the formatting of a syntax that results in invalid code or changes the semantics of the program
- Improvements to the documentation
- Internal changes that don't change Biome's functionality: refactors, performance improvements, increase or change in test coverage
- Improving the wording of diagnostics or fixing the rendering of diagnostics
- Re-releases after a failed release
- Changing the formatting of established syntax

### Minor Release

- Adding a new rule or promoting an existing lint rule to a stable group that is not recommended by default
- Adding linting and formatting support for a recently introduced language feature, even if that results in more reported linting errors
- Removal of recommended rules
- Deprecation of existing rules
- Adding new optional configuration options that do not change the formatting or report more lint errors
- Adding a new recommended lint rule or promoting an existing lint rule from the nursery group to a recommended lint rule in a stable group
- Removal of a non-nursery rule or demoting a rule to the nursery group

### Major Release

- Changes to the configuration that result in different formatting or more reported lint errors (adding/removing options, changing the default value)
- Changes to Biome's public API
- Promotion of new features or tools that require some spotlight

## Visual Studio Code Extension

VS Code does not support pre-release tags for extensions, so Biome uses the version number parity to distinguish stable and preview:

- Stable releases use even version numbers: 10, 12, 14, 16, ...
- Previews use odd version numbers: 11, 13, 15, 17, ...

## Notes

- Fixes to lint rules, formatting layouts, etc. might prevent your scripts from passing; saving the exact version is highly recommended
- Pinning ensures every team member and CI environment use the same Biome version. Even patch releases can result in slightly different formatting or linting results
- The `2.5.15` in the snippet is the version this skill targets; use the version you actually adopt
- Source: https://biomejs.dev/internals/versioning/ (biomejs/website commit 49293f2, fetched 2026-10-17)

## Related

- [Changelog](./changelog.md)
- [Philosophy](./philosophy.md)
