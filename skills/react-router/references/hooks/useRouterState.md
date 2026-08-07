# unstable_useRouterState

A unified hook for reading router state: current (`active`) and in-flight (`pending`) locations, search params, params, matches, and navigation type. Consolidates the information previously read from `useLocation`, `useSearchParams`, `useParams`, `useMatches`, `useNavigation`, and `useNavigationType` into a single hook.

## Signature / Usage

```typescript
function useRouterState(): unstable_RouterState
```

```tsx
import { unstable_useRouterState as useRouterState } from "react-router";

const { active, pending } = useRouterState();
```

### Active state

Always populated with the current location:

```typescript
active.location;      // replaces useLocation()
active.searchParams;  // replaces useSearchParams()[0]
active.params;        // replaces useParams()
active.matches;       // replaces useMatches()
active.type;          // replaces useNavigationType()
```

### Pending state

Only populated during a navigation:

```typescript
pending.location;      // replaces useNavigation().location
pending.searchParams;  // equivalent to new URLSearchParams(useNavigation().search)
pending.params;        // Not directly accessible today
pending.matches;       // Not directly accessible today
pending.type;          // Not directly accessible today
pending.state;         // replaces useNavigation().state
pending.formMethod;    // replaces useNavigation().formMethod
pending.formAction;    // replaces useNavigation().formAction
pending.formEncType;   // replaces useNavigation().formEncType
pending.formData;      // replaces useNavigation().formData
pending.json;          // replaces useNavigation().json
pending.text;          // replaces useNavigation().text
```

## Notes

- Exported as `unstable_useRouterState`; this API is experimental and subject to breaking changes in minor/patch releases
- Not available in Declarative mode

## Related

- [useLocation](./useLocation.md) — subset covered by `active.location`
- [useNavigation](./useNavigation.md) — subset covered by `pending`
- [useParams](./useParams.md) — subset covered by `active.params`
- [useMatches](./useMatches.md) — subset covered by `active.matches`
