---
source: https://vite.dev/guide/features#json
---

# JSON

JSON files can be imported directly. Named imports are also supported.

## Signature / Usage

```js
// import the entire object
import json from './example.json'
// import a root field as named exports - helps with tree-shaking!
import { field } from './example.json'
```

## Related

- [json.namedExports / json.stringify](../config-shared/json-options.md)
