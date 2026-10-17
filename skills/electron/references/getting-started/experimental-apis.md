---
source: https://www.electronjs.org/docs/latest/experimental
---

# Experimental APIs

Some of Electron's APIs are tagged with `_Experimental_` in the documentation. The tag indicates the API may not be considered stable and may be removed or modified more frequently than other APIs with less warning.

## Signature / Usage

```md
### `ELECTRON_DEBUG_DRAGGABLE_REGIONS` _Experimental_
```

Example of the tag as it appears in a heading in the API docs (see environment-variables.md).

## Notes

- Tagging: anyone can request an API be tagged experimental in a feature PR; disagreements are discussed in the API WG.
- Removing the tag: once an API has been stable in at least two major stable release lines it can be nominated at an API WG meeting. Considerations: the two-line condition is met; no major bugs/issues from adopting it; stable and not heavily impacted by Chromium upgrades; someone is using it; it fulfills the original use cases without gaps.

## Related

- [Environment Variables](./environment-variables.md)
