# Renderer

Class that processes a `ProjectReflection` through a `Theme` instance and writes the resulting HTML documentation to an output directory.

## Signature

```typescript
class Renderer extends AbstractComponent<Application, RendererEvents> {
  // Methods
  render(project: Models.ProjectReflection, outputDirectory: string): Promise<void>;
  defineTheme(name: string, theme: new (renderer: Renderer) => Theme): void;
  defineRouter(name: string, router: new (app: Application) => Router): void;
  removeTheme(name: string): void;
  removeRouter(name: string): void;

  // Event methods
  on<K extends keyof RendererEvents>(
    event: K,
    listener: (this: undefined, ...args: RendererEvents[K]) => void,
    priority?: number
  ): void;
  off<K extends keyof RendererEvents>(
    event: K,
    listener: (this: undefined, ...args: RendererEvents[K]) => void
  ): void;
  trigger<K extends keyof RendererEvents>(
    event: K,
    ...args: RendererEvents[K]
  ): void;

  // Properties
  theme?: Theme;
  router?: Router;
  hooks: EventHooks<RendererHooks, JSX.Element>;
  preRenderAsyncJobs: ((output: RendererEvent) => Promise<void>)[];
  postRenderAsyncJobs: ((output: RendererEvent) => Promise<void>)[];
  renderStartTime: number;
  markedPlugin: MarkedPlugin;
  cacheBust: boolean;
  componentName: string;

  // Static event constants
  static readonly EVENT_BEGIN: "beginRender";
  static readonly EVENT_END: "endRender";
  static readonly EVENT_BEGIN_PAGE: "beginPage";
  static readonly EVENT_END_PAGE: "endPage";
  static readonly EVENT_PREPARE_INDEX: "prepareIndex";
}
```

## Methods

### render()

```typescript
render(project: Models.ProjectReflection, outputDirectory: string): Promise<void>
```

Processes a project Reflection and writes the resulting HTML documentation to the given directory. Processing proceeds in the following order:

1. Run `preRenderAsyncJobs`
2. Fire the `EVENT_BEGIN` event
3. For each page, run `EVENT_BEGIN_PAGE` → render → `EVENT_END_PAGE`
4. Fire the `EVENT_END` event
5. Run `postRenderAsyncJobs`

### defineTheme()

```typescript
defineTheme(name: string, theme: new (renderer: Renderer) => Theme): void
```

Registers a custom theme. Takes a theme name and the constructor of a class extending `Theme`.

### defineRouter()

```typescript
defineRouter(name: string, router: new (app: Application) => Router): void
```

Registers a custom router. Used to customize the URL structure.

### removeTheme()

```typescript
removeTheme(name: string): void
```

Removes a registered theme.

### removeRouter()

```typescript
removeRouter(name: string): void
```

Removes a registered router.

## Properties

### theme

```typescript
theme?: Theme
```

The currently active theme instance. Set when rendering begins.

### router

```typescript
router?: Router
```

The currently active router instance, used for URL generation.

### hooks

```typescript
hooks: EventHooks<RendererHooks, JSX.Element>
```

The hook system that lets plugins inject content into the HTML. Enables partial customization without rewriting the whole theme.

Available hooks: `head.end`, `body.begin`, `body.end`, `content.begin`, `content.end`, `sidebar.begin`, `sidebar.end`, `pageSidebar.begin`, `pageSidebar.end`, `footer.begin`, `footer.end`

### preRenderAsyncJobs

```typescript
preRenderAsyncJobs: ((output: RendererEvent) => Promise<void>)[]
```

Array of async callbacks run before documentation is generated.

### postRenderAsyncJobs

```typescript
postRenderAsyncJobs: ((output: RendererEvent) => Promise<void>)[]
```

Array of async callbacks run after documentation is written.

### renderStartTime

```typescript
renderStartTime: number
```

Timestamp recorded when rendering starts.

### markedPlugin

```typescript
markedPlugin: MarkedPlugin
```

The Markdown parsing plugin.

## Event Constants

| Constant | Value | Callback Arguments | Description |
|-----|---|----------------|------|
| `EVENT_BEGIN` | `"beginRender"` | `(event: RendererEvent)` | Fired before rendering begins |
| `EVENT_END` | `"endRender"` | `(event: RendererEvent)` | Fired after all documents have been written |
| `EVENT_BEGIN_PAGE` | `"beginPage"` | `(event: PageEvent)` | Fired before a page is rendered |
| `EVENT_END_PAGE` | `"endPage"` | `(event: PageEvent)` | Fired after a page is rendered (before it is written to disk) |
| `EVENT_PREPARE_INDEX` | `"prepareIndex"` | `(event: IndexEvent)` | Fired while preparing the search index |

## Accessors

| Accessor | Type | Description |
|---------|---|------|
| `application` | `Application` | The `Application` instance |
| `owner` | `Application` | The component's owner |

## Examples

### Defining a theme

```typescript
import { Application, DefaultTheme, Renderer } from "typedoc";

class MyTheme extends DefaultTheme {
  // Custom theme implementation
}

export function load(app: Application) {
  app.renderer.defineTheme("my-theme", MyTheme);
}
```

### Using hooks

```typescript
import { Application, JSX } from "typedoc";

export function load(app: Application) {
  // Add custom CSS to head
  app.renderer.hooks.on("head.end", () => (
    <link rel="stylesheet" href="custom.css" />
  ));

  // Add version info to the footer
  app.renderer.hooks.on("footer.end", () => (
    <p>Generated with MyPlugin v1.0</p>
  ));
}
```

### Listening to rendering events

```typescript
import { Application, Renderer, PageEvent, RendererEvent, Reflection } from "typedoc";

export function load(app: Application) {
  // When rendering begins
  app.renderer.on(Renderer.EVENT_BEGIN, (event: RendererEvent) => {
    console.log(`Rendering to: ${event.outputDirectory}`);
    console.log(`Pages to generate: ${event.pages.length}`);
  });

  // After each page is rendered
  app.renderer.on(Renderer.EVENT_END_PAGE, (event: PageEvent<Reflection>) => {
    if (event.contents) {
      // Modify the HTML content
      event.contents = event.contents.replace("old-text", "new-text");
    }
  });

  // Async jobs
  app.renderer.preRenderAsyncJobs.push(async (output) => {
    // Preparation before rendering
  });

  app.renderer.postRenderAsyncJobs.push(async (output) => {
    // Cleanup after rendering
  });
}
```

## Related

- [Application](./application.md)
- [Events](./events.md)
- [Custom Themes](../development/custom-themes.md)
- [Plugin Development](../development/plugin-development.md)
