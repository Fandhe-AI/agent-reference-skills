---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/create-id-generator
---

# createIdGenerator

Creates a customizable ID generator function. You can configure the alphabet, prefix, separator, and default size of the generated IDs.

## Signature / Usage

```ts
import { createIdGenerator } from 'ai';

const generateCustomId = createIdGenerator({
  prefix: 'user',
  separator: '_',
});

const id = generateCustomId(); // Example: "user_1a2b3c4d5e6f7g8h"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| options | `object` | Optional configuration object with the properties below. |
| options.alphabet | `string` | Characters used for the random part of the ID. Defaults to alphanumeric characters (0-9, A-Z, a-z). |
| options.prefix | `string` | A string to prepend to all generated IDs. Defaults to none. |
| options.separator | `string` | Character(s) between the prefix and the random part. Defaults to `"-"`. |
| options.size | `number` | Default length of the random part of the ID. Defaults to 16. |

Returns a function that generates IDs based on the configured options.

```ts
const generateUserId = createIdGenerator({
  prefix: 'user',
  separator: '_',
  size: 8,
});

const id1 = generateUserId(); // e.g., "user_1a2b3c4d"
```

## Notes

- The generator uses non-secure random generation and should not be used for security-critical purposes.
- The separator character must not be part of the alphabet to ensure reliable prefix checking.

## Related

- [generateId](./generate-id.md)
