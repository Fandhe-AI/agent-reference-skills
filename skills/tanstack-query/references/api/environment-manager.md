---
source: https://tanstack.com/query/latest/docs/reference/environmentManager
---

# environmentManager

Controls how TanStack Query identifies server-side runtime environments. It defaults to the `isServer` utility from query-core and allows customization for non-traditional environments like extension workers.

## Signature / Usage

```tsx
import { environmentManager } from '@tanstack/react-query'

const server = environmentManager.isServer()
```

## Methods

| Name | Description |
|------|-------------|
| `isServer()` | Returns a boolean indicating if the current runtime operates as a server environment |
| `setIsServer(isServerValue: () => boolean)` | Accepts a callback function to override global server detection. Enables custom logic for unique runtime scenarios |

## Notes

- Particularly useful for runtimes that are not traditional browser/server environments (e.g. extension workers)
- Default behavior can be restored by resetting to query-core's native `isServer` function: `environmentManager.setIsServer(() => isServer)`
- Global scope means the override applies across the entire application

## Related

- [timeoutManager](./timeout-manager.md)
