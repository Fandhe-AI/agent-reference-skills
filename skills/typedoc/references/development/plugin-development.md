# TypeDoc Plugin Development

How to write TypeDoc plugins, the event system, and adding custom options.

## Usage

### Basic plugin structure

A TypeDoc plugin is a Node module that exports a `load` function. Both ESM and CommonJS are supported, but ESM is recommended.

#### ESM plugin

```typescript
import * as td from "typedoc";

export function load(app: td.Application) {
  // Register listeners on app, app.converter, app.renderer, etc.
  // This function may be async
}
```

> **Important**: a plugin may be loaded multiple times against different `Application` instances (including a single load converting multiple projects). Design the plugin with this in mind.

#### CommonJS plugin

```javascript
const td = require("typedoc");

module.exports = {
  load(app) {
    // Register listeners
  },
};
```

#### Referencing a plugin directly from a JS config file

```javascript
// typedoc.config.js
import * as td from "typedoc";

export function customPlugin(app) {
  // Register listeners
}

const config = {
  plugin: [customPlugin],
};

export default config;
```

### Event system

Plugins alter TypeDoc's behavior by registering listeners for events fired during conversion and rendering. Events are provided by four classes:

- **Application** — application lifecycle events
- **Converter** — conversion process events
- **Renderer** — rendering process events
- **Serializer / Deserializer** — serialization events

Each class exposes the events it offers via static `EVENT_*` properties.

### Adding a custom option

```typescript
import { Application, ParameterType } from "typedoc";

export function load(app: Application) {
  app.options.addDeclaration({
    name: "my-plugin-option",
    help: "Description displayed with --help",
    type: ParameterType.String,
    defaultValue: "default-value",
  });

  app.options.addDeclaration({
    name: "my-boolean-option",
    help: "A boolean option",
    type: ParameterType.Boolean,
    defaultValue: false,
  });

  app.options.addDeclaration({
    name: "my-enum-option",
    help: "An enum option",
    type: ParameterType.Map,
    map: new Map([
      ["value1", "Value 1"],
      ["value2", "Value 2"],
    ]),
    defaultValue: "value1",
  });
}
```

### External symbol resolver

You can add a resolver that links symbols from third-party libraries:

```typescript
import { Application, Converter } from "typedoc";

export function load(app: Application) {
  app.converter.addUnknownSymbolResolver((ref, refl, part, symbolId) => {
    // Return the target URL, or undefined
    if (ref.moduleSource === "some-package") {
      return `https://docs.example.com/${ref.symbolReference?.path?.[0]?.path}`;
    }
    return undefined;
  });
}
```

### Basic plugin example

```typescript
import {
  Application,
  Converter,
  Context,
  DeclarationReflection,
  ReflectionKind,
} from "typedoc";

export function load(app: Application) {
  // Listener for declaration Reflection creation
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context: Context, reflection: DeclarationReflection) => {
      if (reflection.kindOf(ReflectionKind.Class)) {
        app.logger.info(`Class found: ${reflection.name}`);
      }
    }
  );

  // Listener for resolution completion
  app.converter.on(Converter.EVENT_RESOLVE_END, (context: Context) => {
    const project = context.project;
    app.logger.info(
      `Total reflections: ${Object.keys(project.reflections).length}`
    );
  });
}
```

### Rendering plugin example

```typescript
import {
  Application,
  Renderer,
  PageEvent,
  RendererEvent,
  Reflection,
} from "typedoc";

export function load(app: Application) {
  // Modify content before a page is generated
  app.renderer.on(
    Renderer.EVENT_END_PAGE,
    (page: PageEvent<Reflection>) => {
      if (page.contents) {
        page.contents = page.contents.replace(
          "</body>",
          '<script src="custom.js"></script></body>'
        );
      }
    }
  );

  // Generate extra files after rendering completes
  app.renderer.postRenderAsyncJobs.push(async (output: RendererEvent) => {
    // Additional output processing
  });
}
```

### typedoc-plugin-mdn-links pattern

```typescript
import { Application, Converter, ReferenceType } from "typedoc";

export function load(app: Application) {
  app.converter.addUnknownSymbolResolver((ref) => {
    if (ref.moduleSource !== "typescript") return;

    const name = ref.symbolReference?.path?.[0]?.path;
    if (!name) return;

    // Return a link to MDN documentation
    const mdnTypes: Record<string, string> = {
      Array: "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array",
      Map: "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map",
      Set: "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set",
      Promise: "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise",
    };

    return mdnTypes[name];
  });
}
```

## Options / Props

### Converter events

| Event constant | Value | Description |
| --- | --- | --- |
| `Converter.EVENT_BEGIN` | `"begin"` | Fired at the start of conversion. Receives `Context` |
| `Converter.EVENT_END` | `"end"` | Fired when conversion completes. Receives `Context` |
| `Converter.EVENT_CREATE_PROJECT` | `"createProject"` | Fired when the project Reflection is created. Receives `Context`, `ProjectReflection` |
| `Converter.EVENT_CREATE_DECLARATION` | `"createDeclaration"` | Fired when a declaration Reflection is created. Receives `Context`, `DeclarationReflection` |
| `Converter.EVENT_CREATE_DOCUMENT` | `"createDocument"` | Fired when a document Reflection is created. Receives `DocumentReflection` |
| `Converter.EVENT_CREATE_SIGNATURE` | `"createSignature"` | Fired when a signature Reflection is created. Receives `Context`, `SignatureReflection`, the declaration node, `ts.Signature` |
| `Converter.EVENT_CREATE_PARAMETER` | `"createParameter"` | Fired when a parameter Reflection is created. Receives `Context`, `ParameterReflection`, an optional `ts.Node` |
| `Converter.EVENT_CREATE_TYPE_PARAMETER` | `"createTypeParameter"` | Fired when a type parameter Reflection is created. Receives `Context`, `TypeParameterReflection` |
| `Converter.EVENT_RESOLVE_BEGIN` | `"resolveBegin"` | Fired at the start of resolution. Receives `Context` |
| `Converter.EVENT_RESOLVE` | `"resolveReflection"` | Fired for each individual Reflection being resolved. Receives `Context`, `Reflection` |
| `Converter.EVENT_RESOLVE_END` | `"resolveEnd"` | Fired when resolution completes. Receives `Context` |

### Renderer events

| Event constant | Value | Description |
| --- | --- | --- |
| `Renderer.EVENT_BEGIN` | `"beginRender"` | Before rendering starts. Receives `RendererEvent` |
| `Renderer.EVENT_END` | `"endRender"` | After all documents have been written. Receives `RendererEvent` |
| `Renderer.EVENT_BEGIN_PAGE` | `"beginPage"` | Before a page is rendered. Receives `PageEvent` |
| `Renderer.EVENT_END_PAGE` | `"endPage"` | After a page is rendered (before writing). Receives `PageEvent` |
| `Renderer.EVENT_PREPARE_INDEX` | `"prepareIndex"` | When the search index is being prepared. Receives `IndexEvent` |

### Application events

| Event constant | Description |
| --- | --- |
| `Application.EVENT_BOOTSTRAP_END` | Fired after plugins are loaded and options are frozen |
| `Application.EVENT_PROJECT_REVIVE` | Fired after JSON deserialization |
| `Application.EVENT_VALIDATE_PROJECT` | Fired during validation |

## Notes

- The `load` function may be `async`
- ESM plugins are recommended (CommonJS may emit experimental-feature warnings)
- `this` in event listeners is bound to `undefined`
- `Converter.EVENT_RESOLVE` fires individually for each Reflection
- Custom options are read with `app.options.getValue("option-name")`
- Plugins are specified via the `plugin` array in `typedoc.json`, or imported directly in a JS config file

## Related

- [Architecture Overview](./overview.md)
- [Custom Themes](./custom-themes.md)
- [Internationalization](./internationalization.md)
- [Application class](../api/application.md)
- [Converter class](../api/converter.md)
- [Renderer class](../api/renderer.md)
- [Event system](../api/events.md)
- [Options API](../api/options-api.md)
