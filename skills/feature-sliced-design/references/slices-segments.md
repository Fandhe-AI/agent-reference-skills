# Slices & Segments

Slices are the second level and segments the third (final) level of the organizational hierarchy in FSD. Slices group code by its meaning for the product, business, or application; segments group code by its technical nature.

## Signature / Usage

Slice names are not standardized; they are determined by the business domain of the application. For example, a photo gallery might have slices `photo`, `effects`, `gallery-page`; a social network might have `post`, `comments`, `news-feed`.

Standardized segment names:

| Segment | Description |
| --- | --- |
| `ui` | Everything related to UI display: UI components, date formatters, styles, etc. |
| `api` | Backend interactions: request functions, data types, mappers, etc. |
| `model` | The data model: schemas, interfaces, stores, and business logic. |
| `lib` | Library code that other modules on this slice need. |
| `config` | Configuration files and feature flags. |

```text
features/
  authenticate-user/       ← slice
    ui/                    ← segment
    api/                   ← segment
    model/                 ← segment
    index.ts               ← public API
```

Slice group (closely related slices in a folder; see [Slice Groups](./slice-groups.md) for the full description):

```text
entities/
  payment/
    invoice/
    receipt/
    transaction/
  user/
```

Cross-import with `@x` notation (on Entities):

```ts
import type { EntityA } from "entities/A/@x/B";
```

## Notes

- Slices: the layers Shared and App don't contain slices. Shared should contain no business logic at all, hence has no meaning for the product; App should contain only code that concerns the entire application, so no splitting is necessary.
- Zero coupling and high cohesion: an ideal slice is independent from other slices on its layer (zero coupling) and contains most of the code related to its primary goal (high cohesion). The independence is enforced by the import rule on layers: a module (file) in a slice can only import other slices when they are located on layers strictly below.
- Public API rule on slices: every slice (and segment on layers that don't have slices) must contain a public API definition. Modules outside of this slice/segment can only reference the public API, not the internal file structure. Inside a slice, the code can be organized in any way.
- Slice groups: closely related slices can be structurally grouped in a folder, but they follow the same isolation rules as other slices, so there must be no code sharing in that folder (the official figure shows a `some-shared-code.ts` file in the `post` group crossed out as not allowed). A group is not a slice: it has no segments and no `index.ts`. Details are in [Slice Groups](./slice-groups.md).
- Segments: you can also create custom segments. The most common places for them are the App and Shared layers, where slices don't make sense. See the Layers page for examples of what each standard segment might be used for on different layers.
- Segment naming: the name should describe the purpose of the content, not its essence. `components`, `hooks`, and `types` are bad segment names because they aren't that helpful when you're looking for code.
- `@x`: the notation `A/@x/B` is read as "A crossed with B". Keep cross-imports to a minimum and only use this notation on the Entities layer (see [Public API](./public-api.md)).
- Source: https://fsd.how/docs/reference/slices-segments (documentation repository commit 3a5a3a3).

## Related

- [Layers](./layers.md)
- [Public API](./public-api.md)
- [Import Rules](./import-rules.md)
- [Slice Groups](./slice-groups.md)
