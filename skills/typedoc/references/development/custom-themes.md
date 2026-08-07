# TypeDoc Custom Themes

How to extend TypeDoc's theme system to produce custom HTML output.

## Usage

### Defining a theme

Themes are defined from a plugin by calling `Application.renderer.defineTheme()`. The simplest implementation extends `DefaultTheme`:

```typescript
import { Application, DefaultTheme } from "typedoc";

export function load(app: Application) {
  app.renderer.defineTheme("mydefault", DefaultTheme);
}
```

### Extending DefaultTheme

A custom theme extends `DefaultTheme` and overrides `getRenderContext()` to return a custom context:

```typescript
import {
  Application,
  DefaultTheme,
  DefaultThemeRenderContext,
  PageEvent,
  Reflection,
  Options,
  JSX,
} from "typedoc";

class MyThemeContext extends DefaultThemeRenderContext {
  // Override a template method
  override footer = (context: DefaultThemeRenderContext) => {
    return (
      <footer>
        {context.hook("footer.begin", context)}
        Copyright 2024
        {context.hook("footer.end", context)}
      </footer>
    );
  };
}

class MyTheme extends DefaultTheme {
  getRenderContext(pageEvent: PageEvent<Reflection>): MyThemeContext {
    return new MyThemeContext(this, pageEvent, this.application.options);
  }
}

export function load(app: Application) {
  app.renderer.defineTheme("mytheme", MyTheme);
}
```

### DefaultThemeRenderContext

`DefaultThemeRenderContext` is the class that provides all of a theme's template methods. Its constructor takes:

```typescript
constructor(theme: DefaultTheme, page: PageEvent<Reflection>, options: Options)
```

### Hook system

Hooks let you inject content into the HTML without rewriting the whole theme.

Hooks are described in detail by the `RendererHooks` interface.

### Reflection icons (v0.28+)

`DefaultThemeRenderContext.reflectionIcon` allows fine-grained control over the icon shown for each Reflection kind, letting you change icons for specific kinds without replacing the whole icon set.

### CSS layers (v0.28+)

The default theme's CSS is wrapped in `@layer typedoc`. When overriding styles with custom CSS, using `@layer` makes it easier to control cascade precedence.

### Async job queues

Queues for running asynchronous work before and after rendering:

- **`preRenderAsyncJobs`**: run before documents are generated
- **`postRenderAsyncJobs`**: run after documents have been written

### Custom JSX elements

You can extend TypeDoc's `IntrinsicElements` interface to define your own JSX elements:

```typescript
declare module "typedoc" {
  namespace JSX.JSX {
    interface IntrinsicElements {
      "custom-button": IntrinsicAttributes & {
        target: string;
      };
    }
    interface IntrinsicAttributes {
      customGlobalAttribute?: string;
    }
  }
}
```

### Using hooks

```typescript
import { Application, JSX } from "typedoc";

export function load(app: Application) {
  // Inject a script into <head>
  app.renderer.hooks.on("head.end", () => (
    <script>
      <JSX.Raw html="alert('hi!');" />
    </script>
  ));

  // Add custom content to the footer
  app.renderer.hooks.on("footer.end", () => (
    <div class="custom-footer">
      <p>Custom footer content</p>
    </div>
  ));
}
```

### Using async jobs

```typescript
import { Application, RendererEvent } from "typedoc";

export function load(app: Application) {
  app.renderer.preRenderAsyncJobs.push(async (output: RendererEvent) => {
    app.logger.info("Pre render, no docs written yet");
    // e.g. fetch external resources
  });

  app.renderer.postRenderAsyncJobs.push(async (output: RendererEvent) => {
    app.logger.info("Post render, all docs written");
    // e.g. generate additional files
  });
}
```

### Complete custom theme example

```typescript
import {
  Application,
  DefaultTheme,
  DefaultThemeRenderContext,
  PageEvent,
  Reflection,
  JSX,
} from "typedoc";

class CustomContext extends DefaultThemeRenderContext {
  // Customize navigation
  override navigation = (context: DefaultThemeRenderContext) => {
    return (
      <nav class="custom-nav">
        {/* Custom navigation */}
      </nav>
    );
  };
}

class CustomTheme extends DefaultTheme {
  getRenderContext(pageEvent: PageEvent<Reflection>): CustomContext {
    return new CustomContext(this, pageEvent, this.application.options);
  }
}

export function load(app: Application) {
  app.renderer.defineTheme("custom", CustomTheme);
}
```

## Options / Props

### Main template methods

| Method | Description |
| --- | --- |
| `reflectionTemplate` | Renders a regular Reflection page |
| `documentTemplate` | Renders a document page |
| `hierarchyTemplate` | Renders the type hierarchy page |
| `indexTemplate` | Renders the index page |

> **Important**: template functions that use `this` must be bound — either use an arrow function or call `this.myMethod = this.myMethod.bind(this)` in the constructor.

### Available hooks

| Hook name | Description |
| --- | --- |
| `head.end` | Inserted at the end of the `<head>` tag |
| `body.begin` | Inserted at the start of the `<body>` tag |
| `body.end` | Inserted at the end of the `<body>` tag |
| `content.begin` | Inserted at the start of the content area |
| `content.end` | Inserted at the end of the content area |
| `sidebar.begin` | Inserted at the start of the sidebar |
| `sidebar.end` | Inserted at the end of the sidebar |
| `pageSidebar.begin` | Inserted at the start of the page sidebar |
| `pageSidebar.end` | Inserted at the end of the page sidebar |
| `footer.begin` | Inserted at the start of the footer |
| `footer.end` | Inserted at the end of the footer |

## Notes

- Template functions that use `this` must always be bound
- When extending `DefaultThemeRenderContext`, define template functions as arrow functions or already-bound functions
- Hooks are the recommended way for plugins to safely inject HTML
- `JSX.Raw` inserts unescaped HTML directly
- A custom theme is selected via the `theme` option in `typedoc.json`

## Related

- [Plugin Development](./plugin-development.md)
- [Renderer class](../api/renderer.md)
- [Event system](../api/events.md)
