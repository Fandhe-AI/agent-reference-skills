# TypeScript Type Helpers

Utility types exported by the Inngest SDK for building abstractions and accessing internal types without duplication.

## Signature / Usage

```ts
import type { GetEvents, GetFunctionInput, GetStepTools } from "inngest";
import { inngest } from "./inngest/client";

// Get all events registered on a client
type AppEvents = GetEvents<typeof inngest>;

// Get the full argument type for a function handler
type MyFunctionInput = GetFunctionInput<typeof inngest, "app/user.created">;

// Get the step tools type
type StepTools = GetStepTools<typeof inngest>;
```

## Available Type Helpers

| Helper | Description |
|--------|-------------|
| `GetEvents<TInngest, TIncludeInternal?>` | Record of all event types for the given client. Pass `true` as second arg to include `inngest/` internal events. |
| `GetFunctionInput<TInngest, TEventName?>` | The argument object passed to function handlers. Optionally filter to a specific event trigger. |
| `GetStepTools<TInngest>` | The `step` object type available in function handlers. Equivalent to `GetFunctionInput<...>["step"]`. |
| `InngestFunction.Any` | Untyped function instance type, useful for typing arrays of functions or factory functions. |

## Notes

- Use `GetFunctionInput` when building function factories that need to accept the handler argument type without manual type duplication.
- `InngestFunction.Any` is the recommended type for `functions` arrays in custom wrappers or utilities.
- All type helpers work with the client instance type via `typeof inngest`, so type information flows from the client's event registration.
- Centralize your client and event types in a single file for consistent inference across the codebase.

## Related

- [eventType()](./event-type.md)
- [Inngest Client](./inngest-client.md)
- [Middleware](./middleware.md)
