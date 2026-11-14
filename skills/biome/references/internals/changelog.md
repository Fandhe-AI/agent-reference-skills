# Changelog

Biome's Version History. Maintained in the `biomejs/biome` repository, with a dedicated page published for each version (e.g. `/internals/changelog/version/2-5-15/`).

## Format

Each version entry has the following structure.

- **Version heading** (e.g. `2.5.15 Latest`) — links to the detail page
- **Change category**: Patch Changes / Minor Changes
- Each item lists the PR number, commit hash, contributor GitHub handle, and a description of the change
- May include before/after code examples showing behavior changes, links to related issues/PRs, and cross-references to rule documentation

Entries can be searched and filtered by version range (v1.x / v2.x / next).

## Notes

- Latest patch release: `@biomejs/biome` 2.5.15 (GitHub release dated 30 Sep 2026). The latest minor release is 2.5.0, whose highlights include the `concise` reporter, `--watch` for `check` / `lint` / `format`, `biome upgrade`, linter / assist `preset`, promotion of 73 nursery rules to stable groups, SVG support, and the `delimiterSpacing` formatter option
- Update (2.6.x): the newest section in the tag-pinned CHANGELOG is `@biomejs/biome` 2.6.7 (the file has no dated entries and no 2.6.0 / 2.6.1 sections, so the release date and "latest minor" are not stated here; the paragraph above remains the 2.5.15-era snapshot). The `## 2.6.2` section (Minor Changes) includes `biome init --git` ([#11479](https://github.com/biomejs/biome/pull/11479)), `biome migrate stylelint` ([#11742](https://github.com/biomejs/biome/pull/11742)), `biome inspect config` ([#11432](https://github.com/biomejs/biome/pull/11432)), `biome inspect plugins` ([#11634](https://github.com/biomejs/biome/pull/11634)), and `--profile-type-inference` ([#11244](https://github.com/biomejs/biome/pull/11244)). The `## 2.6.7` section removes the JS plugin `semantic()` query (use `ast()` with `{ semantic: true }`, [#13066](https://github.com/biomejs/biome/pull/13066)) and adds `grit()` queries to JS plugins ([#12952](https://github.com/biomejs/biome/pull/12952))
- Source for the 2.6.x update (tag-pinned; claims checked against the CHANGELOG body): https://github.com/biomejs/biome/blob/%40biomejs/biome%402.6.7/packages/%40biomejs/biome/CHANGELOG.md
- The separate Changelog v1 page (`/internals/changelog_v1`) covers v1.x and is not transcribed here
- Since the latest changes are updated continuously, this page does not transcribe individual version contents. Refer directly to the official Version History page or GitHub releases for current information

## Related

- [Philosophy](./philosophy.md)
- [Architecture](./architecture.md)
