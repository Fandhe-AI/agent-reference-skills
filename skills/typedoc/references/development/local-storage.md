---
source: https://typedoc.org/documents/Development.Disabling_Local_Storage.html
---

# Disabling Local Storage

How to turn off the browser local storage that TypeDoc's generated HTML uses to retain UI state across page loads.

## Signature / Usage

```js
window.TypeDoc.disableLocalStorage();
window.TypeDoc.enableLocalStorage();
window.TypeDoc.disableWritingLocalStorage();
```

## Notes

- TypeDoc uses local storage by default to retain operational state across page loads for components such as side menus, site menus, and generated pages.
- `window.TypeDoc.disableLocalStorage()` disables local storage and clears its contents.
- `window.TypeDoc.enableLocalStorage()` enables it again; local storage is enabled by default.
- `window.TypeDoc.disableWritingLocalStorage()` disables writing without clearing existing contents.
- The toggle exists so that sites can comply with certain functional cookie requirements.
- Source: https://typedoc.org/documents/Development.Disabling_Local_Storage.html (TypeDoc v0.28.20, fetched 2026-11-14)

## Related

- [Options: Output](../options/output.md)
