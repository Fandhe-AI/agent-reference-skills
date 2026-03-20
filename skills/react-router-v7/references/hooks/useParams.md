# useParams

Returns an object of dynamic route parameters extracted from the current URL, keyed by their names as defined in the route pattern.

## Signature

```typescript
function useParams<
  ParamsOrKey extends string | Record<string, string | undefined> = string,
>(): Readonly<
  [ParamsOrKey] extends [string] ? Params<ParamsOrKey> : Partial<ParamsOrKey>
>
```

## Usage

```tsx
import { useParams } from "react-router";

// Route: /posts/:postId/comments/:commentId
export default function Comment() {
  const { postId, commentId } = useParams();
  return <h1>Post {postId}, Comment {commentId}</h1>;
}
```

## Notes

- Child routes inherit all params from their parent routes
- Catchall segments are available via the `"*"` key: `const { "*": rest } = useParams()`
- Returns a readonly object — do not mutate directly
- Available in all modes: Framework, Data, and Declarative

## Related

- [useMatch](./useMatch.md) — match a specific pattern against the current URL
- [useLocation](./useLocation.md) — access the full current location object
