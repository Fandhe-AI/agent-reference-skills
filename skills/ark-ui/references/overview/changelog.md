# Changelog

The official changelog documenting notable changes across Ark UI versions, organized chronologically from most recent to oldest.

## Signature / Usage

Each release is an entry in `CHANGELOG.md` format (`## [version] - date`, then `### Added` / `### Fixed` / `### Changed` / `### Removed`). Example entry (latest at time of writing).

Adapted (not in the official docs): truncated to the version header and the first `### Added` bullet; the official 5.40.0 entry continues with a long `### Fixed` section.

```markdown
## [5.40.0] - 2026-10-29

### Added

- **Pagination**: Render `Pagination.Item`, `Pagination.PrevTrigger`, `Pagination.NextTrigger`,
  `Pagination.FirstTrigger` and `Pagination.LastTrigger` as anchors when `type="link"`.
```

## Notes

- Format follows Keep a Changelog conventions: version headers with semver and date (e.g. `[5.40.0] - 2026-10-29`), sectioned into Added, Fixed, Changed, and Removed.
- Breaking changes are explicitly marked per version.
- Markdown source available via the page's "View as markdown" toolbar option, or directly at `https://ark-ui.com/docs/overview/changelog.mdx`.
- Version 5.0.0 marked a major performance overhaul (1.5x-4x improvement) by moving to React's native reactive primitives.
- Version 5.37.0 introduced `data-side` attributes to placement-aware parts and the new `DateInput` component.
- Version 5.38.0 added `hideMode` (`'display-none' | 'activity'`), Number Input `largeStep` / `smallStep`, Slider `largeStep`, `data-autofocus` / `data-no-autofocus` (Dialog and Drawer), and Focus Trap `persistentElements`.
- Version 5.38.2 fixed an XSS vector in the Tags Input hidden element that measures input width (it now uses `textContent` instead of `innerHTML`).
- Version 5.39.0 added Toc [New] (preview; the API may still change), the `hotkeys` entrypoint [New], and Presence `onEnterComplete`.
- Version 5.39.2 fixed the missing `./hotkeys` and `./interaction` entrypoints in the published `exports` map.
- Version 5.39.3 (2026-10-05) is the prior release covered in detail on the component pages (Tour / Toast / Field / ImageCropper notes).
- Version 5.40.0 added Pagination `type="link"` anchor rendering; Combobox `loading`; `modifiers` on Combobox / Menu `navigate` and `onSelect`; Toc `multiple` and `getNavProps()`; `api.modal` on Dialog / Drawer; Tour `scrollToTargetFn` and `data-instant`. Breaking-leaning changes: `Toc.Nav` renders `data-part="nav"` (was `root`), LiveRegion regions lost their `id` (select with `[data-live-announcer]`; the old `#__live-region__` selector no longer matches), Steps `aria-current="step"` moved to the trigger, PasswordInput trigger lost `aria-expanded`, Tour content uses the `dialog` role.
- Notes: the example entry above is truncated (see the Adapted line).
- Source: https://github.com/chakra-ui/ark/blob/9a3f857e79d5e891afb928781c2c8a0559f49181/packages/react/CHANGELOG.md (@ark-ui/react 5.40.0, tag commit `9a3f857`, fetched 2026-11-14; npm `latest` 5.40.0 published 2026-10-29, `next` 6.0.0-next.0)

## Related

- [About](./about.md)
