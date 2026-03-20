# .syncpackrc

Source: https://syncpack.dev/config/syncpackrc/

Configuration file for syncpack. Only properties you want to change from the defaults need to be specified.

## Search Order

Syncpack searches for configuration in the following priority order:

1. `.syncpackrc` (no extension, JSON format)
2. `.syncpackrc.json`, `.syncpackrc.yaml`, `.syncpackrc.yml`, `.syncpackrc.js`, `.syncpackrc.ts`, `.syncpackrc.mjs`, `.syncpackrc.cjs`
3. `syncpack.config.js`, `syncpack.config.ts`, `syncpack.config.mjs`, `syncpack.config.cjs`
4. `syncpack` or `config.syncpack` property in `package.json`

To specify a custom location (requires a file extension):

```sh
syncpack list --config ./config/syncpack.json
```

## Supported Formats

### JSON (Recommended)

Preferred for fastest performance — no Node.js/TypeScript overhead.

```json
{
  "$schema": "./node_modules/syncpack/schema.json",
  "indent": "    "
}
```

### TypeScript

```typescript
export default {
  indent: "    ",
} satisfies import("syncpack").RcFile;
```

### JavaScript

```javascript
// @ts-check
/** @type {import("syncpack").RcFile} */
const config = {
  indent: "    ",
};
module.exports = config;
```

## Notes

- JSON format is recommended for performance (avoids TypeScript/Node.js compilation overhead)
- The `$schema` property enables IDE autocompletion when using JSON format
- Configuration values are merged with defaults; only overrides need to be specified
