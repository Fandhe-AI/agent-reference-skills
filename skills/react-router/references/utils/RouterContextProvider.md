# RouterContextProvider

Provides methods for writing and reading values in application context in a type-safe way. Primarily used with middleware.

## Signature / Usage

```typescript
import { createContext, RouterContextProvider } from "react-router";

const userContext = createContext<User | null>(null);
const contextProvider = new RouterContextProvider();

// Set a value (type-safe)
contextProvider.set(userContext, getUser());

// Get a value (type-safe)
const user = contextProvider.get(userContext);
// ^ User type is inferred
```

## Options / Props

| Method | Description |
|--------|-------------|
| `set(context, value)` | Set a value in the context (type-safe) |
| `get(context)` | Get a value from the context with proper type inference |

## Notes

- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)
- Designed to work seamlessly with React Router middleware
- Full class reference: https://api.reactrouter.com/v8/classes/react-router.RouterContextProvider.html

## Related

- [createContext](./createContext.md)
