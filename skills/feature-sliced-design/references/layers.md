# Layers

Layers are the first level of organisational hierarchy in FSD. They separate code by how much responsibility it needs and how many other modules it depends on. There are **7 layers** in total (Processes is deprecated), arranged from most responsibility and dependency to least.

## Signature / Usage

Layers are lowercase folders:

```text
src/
  app/
  pages/
  widgets/
  features/
  entities/
  shared/
```

Import rule on layers: a module (file) in a slice can only import other slices when they are located on layers strictly below.

Layer definitions (top to bottom):

| Layer | Description |
| --- | --- |
| `app` | App-wide matters, both technical (e.g., context providers) and business (e.g., analytics). Usually no slices, only segments: `routes` (router configuration), `store` (global store configuration), `styles` (global styles), `entrypoint` (framework-specific entrypoint). |
| `processes` | Deprecated. Escape hatch for multi-page interactions. |
| `pages` | Screens / activities that make up the app. One page usually corresponds to one slice. `ui` holds page UI, loading states and error boundaries; `api` holds data fetching and mutating requests. |
| `widgets` | Reusable UI blocks composed from multiple UI elements. The guide discourages using this layer. |
| `features` | Main user interactions, usually involving business entities and reused on several pages. `ui` (form), `api`, `model` (validation, internal state), `config` (feature flags). |
| `entities` | Real-world concepts the project works with (User, Post, Group). `model` (data storage, validation schemas), `api`, `ui` (visual representation). |
| `shared` | Foundation: connections to the external world (backends, third-party libraries, environment) and highly contained libraries. No slices. |

Segments typically found in `shared`:

- `api` — the API client and potentially functions to make requests to specific backend endpoints.
- `ui` — the application's UI kit; no business logic, but business-themed content (company logo, page layout) is OK.
- `lib` — a collection of internal libraries, each with one documented area of focus (dates, colors, text manipulation), not a helpers/utilities dump.
- `config` — environment variables, global feature flags, other global configuration.
- `routes` — route constants or patterns for matching routes.
- `i18n` — setup code for translations, global translation strings.

Entity relationships via `@x`:

```ts
// entities/artist/model/artist.ts
import type { Song } from "entities/song/@x/artist";

export interface Artist {
  name: string;
  songs: Array<Song>;
}

// entities/song/@x/artist.ts
export type { Song } from "../model/song.ts";
```

## Notes

- You don't have to use every layer; add them only if they bring value. Typically most frontend projects have at least Shared, Pages, and App.
- Adding new layers is not recommended because their semantics are standardized.
- App and Shared are exceptions to the import rule: each is both a layer and a slice. Shared has no business domains and App combines all of them, so they consist of segments, and segments can import each other freely.
- Entities are slices and by default cannot know about each other. Business logic of entity interactions is preferably kept in higher layers (Features or Pages). When one entity's data object contains another's, make the connection explicit with the `@x` notation.
- Features: not everything needs to be a feature; being reused on several pages is a good indicator. If there are too many features, the important ones are drowned out. Optimize for a newcomer discovering large important areas of code.
- Pages: no limit on page slice size as long as the team finds it easy to navigate. A UI block that is not reused can stay inside the page slice. It is not common for a page to have a dedicated data model.
- Widgets: this guide discourages the Widgets layer (documentation #933). In real frontend code, UI blocks often include data fetching, state management, and event handling, so the responsibilities of Features (user flows) and Widgets (UI blocks) overlap and the boundary becomes unclear.
- Not creating a widget does not mean simply moving the UI block elsewhere: screen-specific compositions stay in `pages`; user actions reused across pages (with the UI needed to perform them) go to `features`; UI without business context goes to `shared`; app-wide layouts go to `app`.
- Processes: deprecated. The current spec recommends avoiding it and moving its contents to `features` and `app`. Most applications should keep router-level and server-level logic in App.
- Segment names should describe the purpose of the content, not its essence; `components`, `hooks`, and `types` are bad segment names.
- Source: https://fsd.how/docs/reference/layers (documentation repository commit 3a5a3a3).

## Related

- [Slices & Segments](./slices-segments.md)
- [Public API](./public-api.md)
- [Import Rules](./import-rules.md)
