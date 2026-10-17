---
source: https://v2.tauri.app/concept/inter-process-communication/brownfield/
---

# Brownfield Pattern

The default IPC pattern: as compatible as possible with existing frontend projects, requiring nothing beyond what a web frontend uses in a browser.

## Signature / Usage

It needs no configuration; to set it explicitly use `app > security > pattern` in `tauri.conf.json`:

```json
{
  "app": {
    "security": {
      "pattern": {
        "use": "brownfield"
      }
    }
  }
}
```

## Notes

- This is the default pattern.
- There are no additional configuration options for the brownfield pattern.
- Not everything that works in existing browser applications will work out-of-the-box. For Tauri, the "existing software" is current browser support and behavior rather than legacy systems.

## Related

- [Isolation Pattern](./isolation-pattern.md)
- [Inter-Process Communication](./inter-process-communication.md)
