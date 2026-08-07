# useNavigationType

Returns the current `Navigation` action which describes how the router came to the current `Location`, either by a pop, push, or replace on the `History` stack.

## Signature / Usage

```typescript
function useNavigationType(): NavigationType
```

```tsx
import { useNavigationType } from "react-router";

function SomeComponent() {
  const navigationType = useNavigationType();
  // "POP" | "PUSH" | "REPLACE"
}
```

## Notes

- Returns one of `"POP"`, `"PUSH"`, or `"REPLACE"`
- Available in all modes: Framework, Data, and Declarative

## Related

- [useLocation](./useLocation.md) — current location object
- [useNavigate](./useNavigate.md) — programmatic navigation
