# Events

TypeDoc's event system. An event dispatch mechanism spanning the full lifecycle of the `Converter` and `Renderer`.

## Signature

### EventHooks

```typescript
class EventHooks<T extends Record<keyof T, unknown[]>, R> {
  on<K extends keyof T>(
    event: K,
    listener: (...args: T[K]) => R,
    order?: number
  ): void;

  once<K extends keyof T>(
    event: K,
    listener: (...args: T[K]) => R,
    order?: number
  ): void;

  off<K extends keyof T>(
    event: K,
    listener: (...args: T[K]) => R
  ): void;

  emit<K extends keyof T>(
    event: K,
    ...args: T[K]
  ): R[];

  saveMomento(): EventHooksMomento<T, R>;
  restoreMomento(momento: EventHooksMomento<T, R>): void;
}
```

### PageEvent

```typescript
class PageEvent<Model extends RouterTarget = RouterTarget> {
  // Static events
  static readonly BEGIN: "beginPage";
  static readonly END: "endPage";

  // Properties
  readonly model: Model;
  project: Models.ProjectReflection;
  filename: string;
  url: string;
  pageKind: PageKind;
  contents?: string;
  pageHeadings: PageHeading[];
  pageSections: { title: string; headings: PageHeading[] }[];

  // Methods
  constructor(model: Model);
  isReflectionEvent(): this is PageEvent<Models.Reflection>;
  startNewSection(title: string): void;
}
```

### RendererEvent

```typescript
class RendererEvent {
  // Static events
  static readonly BEGIN: "beginRender";
  static readonly END: "endRender";

  // Properties
  readonly outputDirectory: string;
  readonly project: Models.ProjectReflection;
  pages: PageDefinition<RouterTarget>[];

  constructor(
    outputDirectory: string,
    project: Models.ProjectReflection,
    pages: PageDefinition<RouterTarget>[]
  );
}
```

### IndexEvent

```typescript
class IndexEvent {
  // Static events
  static readonly PREPARE_INDEX: "prepareIndex";

  // Properties
  searchResults: (Models.DeclarationReflection | Models.DocumentReflection)[];
  searchFields: Record<string, string>[];
  readonly searchFieldWeights: Record<string, number>;

  // Methods
  constructor(
    searchResults: (Models.DeclarationReflection | Models.DocumentReflection)[]
  );
  removeResult(index: number): void;
}
```

### MarkdownEvent

```typescript
class MarkdownEvent {
  // Static events
  static readonly PARSE: "parseMarkdown";

  // Properties
  readonly page: PageEvent;
  readonly originalText: string;
  parsedText: string;

  constructor(page: PageEvent, originalText: string, parsedText: string);
}
```

## Methods

### EventHooks

#### on()

```typescript
on<K extends keyof T>(
  event: K,
  listener: (...args: T[K]) => R,
  order?: number
): void
```

Registers an event listener. `order` controls execution order (lower values run first).

#### once()

```typescript
once<K extends keyof T>(
  event: K,
  listener: (...args: T[K]) => R,
  order?: number
): void
```

Registers a listener that runs only once.

#### off()

```typescript
off<K extends keyof T>(
  event: K,
  listener: (...args: T[K]) => R
): void
```

Removes a listener.

#### emit()

```typescript
emit<K extends keyof T>(
  event: K,
  ...args: T[K]
): R[]
```

Fires an event and collects the return values from all listeners.

#### saveMomento() / restoreMomento()

```typescript
saveMomento(): EventHooksMomento<T, R>
restoreMomento(momento: EventHooksMomento<T, R>): void
```

Saves the listener state and restores it later.

### PageEvent

#### isReflectionEvent()

```typescript
isReflectionEvent(): this is PageEvent<Models.Reflection>
```

Type guard for whether the model is a Reflection.

#### startNewSection()

```typescript
startNewSection(title: string): void
```

Creates a collapsible section in the "On This Page" sidebar.

### IndexEvent

#### removeResult()

```typescript
removeResult(index: number): void
```

Removes a search result from the index. The corresponding entry is also removed from `searchFields`.

## Properties

### PageEvent properties

| Property | Type | Description |
|-----------|---|------|
| `model` | `Model` (readonly) | The model being rendered |
| `project` | `ProjectReflection` | The project currently being processed |
| `filename` | `string` | Output file name |
| `url` | `string` | Target URL |
| `pageKind` | `PageKind` | The kind of page |
| `contents` | `string?` | Final HTML content (modifiable by plugins) |
| `pageHeadings` | `PageHeading[]` | Navigation links built up during rendering |
| `pageSections` | `{ title: string; headings: PageHeading[] }[]` | Page sections (typically from `@group` tags) |

### RendererEvent properties

| Property | Type | Description |
|-----------|---|------|
| `outputDirectory` | `string` (readonly) | The directory documentation is generated into |
| `project` | `ProjectReflection` (readonly) | The project being processed |
| `pages` | `PageDefinition[]` | All pages scheduled for generation |

### IndexEvent properties

| Property | Type | Description |
|-----------|---|------|
| `searchResults` | `(DeclarationReflection \| DocumentReflection)[]` | Filterable search results |
| `searchFields` | `Record<string, string>[]` | Custom search fields. `name`, `comment`, `document` are built in |
| `searchFieldWeights` | `Record<string, number>` (readonly) | Weight of each search field. `name` has 10x weight |

### MarkdownEvent properties

| Property | Type | Description |
|-----------|---|------|
| `page` | `PageEvent` (readonly) | The page currently being parsed |
| `originalText` | `string` (readonly) | The original text before parsing |
| `parsedText` | `string` | The parsed output (modifiable by plugins) |

## Event Lifecycle

### Converter lifecycle

```
EVENT_BEGIN
  → EVENT_CREATE_PROJECT
  → EVENT_CREATE_DECLARATION (per declaration)
    → EVENT_CREATE_SIGNATURE (per signature)
    → EVENT_CREATE_PARAMETER (per parameter)
    → EVENT_CREATE_TYPE_PARAMETER (per type parameter)
  → EVENT_CREATE_DOCUMENT (per document)
  → EVENT_RESOLVE_BEGIN
  → EVENT_RESOLVE (per Reflection)
  → EVENT_RESOLVE_END
EVENT_END
```

### Renderer lifecycle

```
preRenderAsyncJobs (async)
  → EVENT_BEGIN (RendererEvent)
    → EVENT_PREPARE_INDEX (IndexEvent)
    → EVENT_BEGIN_PAGE (PageEvent) ← per page
    → EVENT_END_PAGE (PageEvent)   ← per page
  → EVENT_END (RendererEvent)
postRenderAsyncJobs (async)
```

## Examples

### Listening to Converter events

```typescript
import { Application, Converter, Context, DeclarationReflection } from "typedoc";

export function load(app: Application) {
  // Conversion started
  app.converter.on(Converter.EVENT_BEGIN, (context: Context) => {
    app.logger.info("Conversion started");
  });

  // Declaration created
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context: Context, reflection: DeclarationReflection) => {
      app.logger.info(`Created: ${reflection.name}`);
    }
  );

  // Resolution completed
  app.converter.on(Converter.EVENT_RESOLVE_END, (context: Context) => {
    app.logger.info(`Total reflections: ${
      Object.keys(context.project.reflections).length
    }`);
  });
}
```

### Listening to Renderer events

```typescript
import { Application, Renderer, RendererEvent, PageEvent, Reflection } from "typedoc";

export function load(app: Application) {
  // Rendering started
  app.renderer.on(Renderer.EVENT_BEGIN, (event: RendererEvent) => {
    app.logger.info(`Output: ${event.outputDirectory}`);
  });

  // After a page has been rendered
  app.renderer.on(
    Renderer.EVENT_END_PAGE,
    (event: PageEvent<Reflection>) => {
      if (event.contents) {
        // Modify the HTML
        event.contents += "<!-- Generated by MyPlugin -->";
      }
    }
  );
}
```

### Using hooks

```typescript
import { Application, JSX } from "typedoc";

export function load(app: Application) {
  // Add a stylesheet to head
  app.renderer.hooks.on("head.end", () => (
    <link rel="stylesheet" href="custom.css" />
  ));

  // Add content to the footer
  app.renderer.hooks.on("footer.end", () => (
    <div class="custom-footer">
      <p>Custom content</p>
    </div>
  ));
}
```

### Customizing the search index

```typescript
import { Application, Renderer, IndexEvent } from "typedoc";

export function load(app: Application) {
  app.renderer.on(
    Renderer.EVENT_PREPARE_INDEX,
    (event: IndexEvent) => {
      // Add a custom search field
      for (let i = 0; i < event.searchResults.length; i++) {
        const refl = event.searchResults[i];
        event.searchFields[i]["category"] = refl.categories?.[0]?.title ?? "";
      }
      // Set the field weight
      (event.searchFieldWeights as any)["category"] = 5;
    }
  );
}
```

### Modifying Markdown parse results

```typescript
import { Application, MarkdownEvent } from "typedoc";

export function load(app: Application) {
  app.renderer.on(
    MarkdownEvent.PARSE,
    (event: MarkdownEvent) => {
      // Modify the parsed HTML
      event.parsedText = event.parsedText.replace(
        /TODO/g,
        '<span class="todo">TODO</span>'
      );
    }
  );
}
```

## Notes

- Event listener `this` is bound to `undefined`
- `EventHooks` can collect listener return values (used for Renderer hooks)
- `PageEvent.contents` can be modified in `EVENT_END_PAGE` listeners
- Use `removeResult()` to remove an item from `IndexEvent.searchResults`
- `searchFieldWeights` gives `name` 10x the weight of other fields
- The `order` parameter controls execution order (lower values run first)
- `saveMomento()` / `restoreMomento()` can save and restore listener state

## Related

- [Converter](./converter.md)
- [Renderer](./renderer.md)
- [Application](./application.md)
- [Plugin Development](../development/plugin-development.md)
