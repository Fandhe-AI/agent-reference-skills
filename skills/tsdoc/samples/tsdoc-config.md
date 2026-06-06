# tsdoc.json Configuration

Define custom tags in tsdoc.json and load the configuration programmatically.

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json",
  "tagDefinitions": [
    {
      "tagName": "@myCustomTag",
      "syntaxKind": "modifier"
    },
    {
      "tagName": "@scenario",
      "syntaxKind": "block",
      "allowMultiple": true
    }
  ]
}
```

Load the configuration in a custom tool:

```typescript
import * as path from "path";
import { TSDocParser, TSDocConfiguration } from "@microsoft/tsdoc";
import { TSDocConfigFile } from "@microsoft/tsdoc-config";

const sourceFile = "src/example.ts";
const configFile = TSDocConfigFile.loadForFolder(path.dirname(sourceFile));

if (configFile.hasErrors) {
  console.log(configFile.getErrorSummary());
}

const config = new TSDocConfiguration();
configFile.configureParser(config);
const parser = new TSDocParser(config);
```

Sharing tags across projects via `extends`:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json",
  "extends": [
    "my-shared-package/dist/tsdoc-base.json",
    "./local/tsdoc-local.json"
  ]
}
```

## Notes

- Place `tsdoc.json` in the same directory as `tsconfig.json`
- Local paths in `extends` must begin with `./` to distinguish them from npm package references
- `syntaxKind` accepts `"modifier"`, `"block"`, or `"inline"`
- Set `"allowMultiple": true` for block tags that may appear more than once per comment
