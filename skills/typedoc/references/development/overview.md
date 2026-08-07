# TypeDoc Architecture Overview

High-level architecture and processing flow of TypeDoc.

## Usage

### Processing pipeline

TypeDoc runs through the following staged pipeline:

1. **Read options** — determine which plugins to load
2. **Load plugins** — initialize the plugin system
3. **Re-read options** — pick up plugin-specific options
4. **Convert input files** — transform source code into the internal model representation called "Reflections" (`src/lib/models`)
5. **Resolve the model** — process cross-references and links between models
6. **Output the model** — serialize to HTML or JSON

```
Entry Points → Converter → Reflections → Resolver → Renderer → Output (HTML/JSON)
```

### Component layout

The codebase is structured to match the processing stages:

| Stage | Source path |
| --- | --- |
| Option processing | `src/lib/utils/options` |
| Plugin system | `src/lib/utils/plugins` |
| Conversion logic | `src/lib/converter/symbols.ts` (organized by `ts.SymbolFlags`) |
| Resolution | `src/lib/output/plugins` (internal plugins listen to `Converter.EVENT_RESOLVE`) |
| JSON serialization | `src/lib/serialization` |
| HTML output | `src/lib/output` |

### Converter

Three primary conversion modules transform the TypeScript syntax tree into Reflections:

- **`symbols.ts`** — processes exported `ts.Symbol` objects
- **`types.ts`** — processes `ts.Type` and `ts.TypeNode` conversion
- **`jsdoc.ts`** — processes types and symbols declared via JSDoc

### Reflections

A Reflection is the internal model structure that enables consistent handling across themes and serialization. Every documentable element (classes, functions, properties, etc.) is represented as a Reflection.

Main Reflection hierarchy:

```
Reflection (base class)
├── ContainerReflection
│   ├── ProjectReflection
│   └── DeclarationReflection
│       └── ReferenceReflection
├── SignatureReflection
├── ParameterReflection
├── TypeParameterReflection
└── DocumentReflection
```

### Renderer

Generates HTML through the theme system. It uses an instance of the `Theme` class, walking the Reflection tree to render each page's HTML.

### Output formats

- **JSON output**: defined by the `JSONOutput.ProjectReflection` interface. Usable by external tools
- **HTML output**: generated through the theme rendering system

### Example

```typescript
import { Application } from "typedoc";

// Basic processing flow
const app = await Application.bootstrapWithPlugins({
  entryPoints: ["src/index.ts"],
});

// 1. Convert: source code → Reflections
const project = await app.convert();

if (project) {
  // 2. Output: Reflections → HTML
  await app.generateDocs(project, "./docs");

  // Or JSON output
  await app.generateJson(project, "./docs.json");
}
```

### Listening to events from a plugin

```typescript
import { Application, Converter, ParameterType } from "typedoc";

export function load(app: Application) {
  // Register a custom option
  app.options.addDeclaration({
    name: "plugin-option",
    help: "Displayed when --help is passed",
    type: ParameterType.String,
    defaultValue: "",
  });

  // Listen for a Converter event
  app.converter.on(Converter.EVENT_RESOLVE, (context) => {
    if (app.options.getValue("plugin-option") === "something") {
      // Custom logic
    }
  });
}
```

### Testing

TypeDoc primarily verifies behavior with JSON model comparison tests, comparing generated models against known specifications, complemented by Mocha unit tests. Theme changes also use screenshot-based visual regression testing.

## Notes

- The Converter runs at step 4, transforming the TypeScript compiler's AST into the Reflection model
- Plugins register event listeners after step 2 to customize behavior
- The Reflection model is shared by both HTML output and JSON output
- `src/lib/converter/symbols.ts` contains the most central conversion logic

## Related

- [Plugin Development](./plugin-development.md)
- [Custom Themes](./custom-themes.md)
- [Application class](../api/application.md)
- [Converter class](../api/converter.md)
- [Renderer class](../api/renderer.md)
- [Reflections](../api/reflections.md)
