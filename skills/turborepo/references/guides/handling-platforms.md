# Handling Platforms

## Signature / Usage

Node.js version support is auto-detected from the `engines` key in `package.json`:

```json
{ "engines": { "node": ">=18.0.0" } }
```

OS/architecture support:

Step 1: Cache key generation script

```js
const { writeFileSync } = require("fs");
const { platform, arch } = process;
writeFileSync("turbo-cache-key.json", JSON.stringify({ platform, arch }));
```

Step 2: Add to `.gitignore`

```
turbo-cache-key.json
```

Step 3: Register in `inputs`

```json
{
  "tasks": {
    "build-for-platforms": {
      "inputs": ["$TURBO_DEFAULT$", "turbo-cache-key.json"]
    }
  }
}
```

Or apply to all tasks:

```json
{ "globalDependencies": ["turbo-cache-key.json"] }
```

Step 4: Run the script before Turborepo executes

```json
{
  "scripts": {
    "build-for-platforms": "node ./scripts/create-turbo-cache-key.js && turbo run build"
  }
}
```

## Notes

- The file must be generated before Turborepo runs.
