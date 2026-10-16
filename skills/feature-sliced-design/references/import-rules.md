# Import Rules

The import rule on layers and the direction of dependencies in FSD.

## Signature / Usage

> A module (file) in a slice can only import other slices when they are located on layers strictly below.

```text
app      ← may import pages, widgets, features, entities, shared
pages    ← may import widgets, features, entities, shared
widgets  ← may import features, entities, shared
features ← may import entities, shared
entities ← may import shared
shared   ← external libraries only (no imports from other layers)
```

Imports between slices on the same layer are forbidden:

```ts
// Bad — cross-import between slices in features
// features/cart/model/cart.ts
import { Product } from "features/product/model/product";

// Bad — cross-import between slices in pages
// pages/home/ui/HomePage.tsx
import { ProfileCard } from "pages/profile/ui/ProfileCard";
```

Resolving a cross-import by composing in a higher layer (preferred):

```tsx
// pages/post/ui/PostPage.tsx
import { CommentList } from "features/comment-list";
import { UserAvatar } from "entities/user";

export const PostPage = () => (
  <div>
    <CommentList renderAvatar={(userId) => <UserAvatar id={userId} />} />
  </div>
);
```

Resolving with `@x` (entities only):

```ts
// entities/user/@x/post.ts
export { UserAvatar } from "../ui/Avatar";

// entities/post/ui/PostCard.tsx
import { UserAvatar } from "entities/user/@x/post";
```

## Notes

- Exception: `app` and `shared` have no slices, so their segments can import each other freely.
- Widgets are discouraged by the official guide (see layers.md); the layer order itself is unchanged.
- Other ways to resolve a cross-import: merge slices that always change together into one; move shared business logic between features down to entities, and shared utilities between entities down to shared.
- Import style: within the same slice use relative imports (`"./ui/Button"`); across slice boundaries use absolute imports (`"entities/user"`). This prevents circular imports.
- Steiger (official FSD architectural linter) detects violations in CI. Related rules (steiger 0.7.0 / plugin 0.8.0):
  - `fsd/forbidden-imports` — forbids imports from higher layers and cross-imports between slices on the same layer (enabled by default).
  - `fsd/no-higher-level-imports` / `fsd/no-cross-imports` — granular rules split out of `forbidden-imports` in plugin 0.5.6; both are disabled by default.
  - `fsd/import-locality` — requires relative imports within a slice and absolute imports between slices (disabled by default).
  - `fsd/no-public-api-sidestep` — forbids going around a slice's public API to import an internal module directly.
- Warning signs: depending directly on another slice's store; importing another slice's internal files (bypassing its public API); bidirectional dependencies; frequent breakage from cross-slice changes; generic files such as `types.ts` / `utils.ts` handling multiple domains in one folder (a sign of de-segmentation).
- Source: https://fsd.how/docs/reference/layers and https://fsd.how/docs/guides/issues/cross-imports (documentation repository commit 3a5a3a3); Steiger rules: https://github.com/feature-sliced/steiger/blob/steiger%400.7.0/README.md and https://github.com/feature-sliced/steiger/blob/steiger%400.7.0/packages/steiger-plugin-fsd/CHANGELOG.md (tag steiger@0.7.0, commit b0fe6c5).

## Related

- [Layers](./layers.md)
- [Public API](./public-api.md)
- [Slices & Segments](./slices-segments.md)
