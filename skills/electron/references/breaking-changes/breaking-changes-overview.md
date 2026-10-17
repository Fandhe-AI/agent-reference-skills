---
source: https://www.electronjs.org/docs/latest/breaking-changes
---

# Breaking Changes: conventions

Breaking changes will be documented here, and deprecation warnings added to JS code where possible, at least [one major version](https://www.electronjs.org/docs/latest/tutorial/electron-versioning#semver) before the change is made.

Note that breaking changes listed for future releases are always subject to change.

## Types of Breaking Changes

This document uses the following convention to categorize breaking changes:

- **API Changed:** An API was changed in such a way that code that has not been updated is guaranteed to throw an exception.
- **Behavior Changed:** The behavior of Electron has changed, but not in such a way that an exception will necessarily be thrown.
- **Default Changed:** Code depending on the old default may break, not necessarily throwing an exception. The old behavior can be restored by explicitly specifying the value.
- **Deprecated:** An API was marked as deprecated. The API will continue to function, but will emit a deprecation warning, and will be removed in a future release.
- **Removed:** An API or feature was removed, and is no longer supported by Electron.

## Signature / Usage

Typical shape of a "Deprecated" entry (taken from the 35.0 section of the same document):

```js
// Deprecated
session.setPreloads([path.join(__dirname, 'preload.js')])

// Replace with:
session.registerPreloadScript({
  type: 'frame',
  id: 'app-preload',
  filePath: path.join(__dirname, 'preload.js')
})
```

## Notes

- Source document: `docs/breaking-changes.md` at tag `v44.8.0`. The tagged document has no `Planned Breaking API Changes` section; the first section is `Breaking API Changes (44.0)`.
- Each major version is split across the sibling pages: v44, v43, v42, v41-v40, v39, v38, v37, v36, v35, v34-v33, v32-v31, v30-v29, v28, v27-v26, v25-v23, v22-v15, v14-v2.
- The code snippet above is quoted from the 35.0 section (https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-350); the conventions section itself contains no code.

## Related

- [Breaking API Changes (44.0)](./breaking-changes-v44.md)
- [Breaking API Changes (43.0)](./breaking-changes-v43.md)
- [Breaking API Changes (35.0)](./breaking-changes-v35.md)
