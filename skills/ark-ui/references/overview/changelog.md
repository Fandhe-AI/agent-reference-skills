# Changelog

The official changelog documenting notable changes across Ark UI versions, organized chronologically from most recent to oldest.

## Signature / Usage

Each release is an entry in `CHANGELOG.md` format (`## [version] - date`, then `### Added` / `### Fixed` / `### Changed` / `### Removed`). Example entry (latest at time of writing):

```markdown
## [5.39.3] - 2026-10-05

### Fixed

- Fix `Toaster` dropping the group props it accepts. `dir` and `getRootNode` were typed on the component but never
  reached the group machine
- Fix `Tour.Spotlight` disappearing immediately when the tour closes, so its exit animation can run.
```

## Notes

- Format follows Keep a Changelog conventions: version headers with semver and date (e.g. `[5.39.3] - 2026-10-05`), sectioned into Added, Fixed, Changed, and Removed.
- Breaking changes are explicitly marked per version.
- Markdown source available via the page's "View as markdown" toolbar option, or directly at `https://ark-ui.com/docs/overview/changelog.mdx`.
- Version 5.0.0 marked a major performance overhaul (1.5x-4x improvement) by moving to React's native reactive primitives.
- Version 5.37.0 introduced `data-side` attributes to placement-aware parts and the new `DateInput` component.
- Version 5.38.0 added `hideMode` (`'display-none' | 'activity'`), Number Input `largeStep` / `smallStep`, Slider `largeStep`, `data-autofocus` / `data-no-autofocus` (Dialog and Drawer), and Focus Trap `persistentElements`.
- Version 5.38.2 fixed an XSS vector in the Tags Input hidden element that measures input width (it now uses `textContent` instead of `innerHTML`).
- Version 5.39.0 added Toc [New] (preview; the API may still change), the `hotkeys` entrypoint [New], and Presence `onEnterComplete`.
- Version 5.39.2 fixed the missing `./hotkeys` and `./interaction` entrypoints in the published `exports` map.

## Related

- [About](./about.md)
