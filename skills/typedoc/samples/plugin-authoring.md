# Plugin Authoring

Extend TypeDoc behavior by writing a plugin that hooks into converter and renderer events.

```typescript
import {
  Application,
  Converter,
  Context,
  DeclarationReflection,
  ReflectionKind,
  Renderer,
  PageEvent,
  Reflection,
  ParameterType,
} from "typedoc";

export function load(app: Application) {
  // Declare a custom option
  app.options.addDeclaration({
    name: "my-plugin-banner",
    help: "Banner text to inject at the top of every page",
    type: ParameterType.String,
    defaultValue: "",
  });

  // Log each class found during conversion
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context: Context, reflection: DeclarationReflection) => {
      if (reflection.kindOf(ReflectionKind.Class)) {
        app.logger.info(`Class found: ${reflection.name}`);
      }
    }
  );

  // Inject a banner into every rendered page
  app.renderer.on(
    Renderer.EVENT_END_PAGE,
    (page: PageEvent<Reflection>) => {
      const banner = app.options.getValue("my-plugin-banner") as string;
      if (banner && page.contents) {
        page.contents = page.contents.replace(
          "<body>",
          `<body><div class="banner">${banner}</div>`
        );
      }
    }
  );
}
```

Register the plugin in `typedoc.json`:

```json
{
  "plugin": ["./my-plugin.js"]
}
```

## Notes

- The `load` function can be `async`; TypeDoc awaits it before proceeding.
- Prefer ESM plugins; CommonJS support may emit experimental warnings in newer Node versions.
- Retrieve custom option values at runtime with `app.options.getValue("option-name")`.
- Use `app.converter.addUnknownSymbolResolver` to resolve `{@link}` tags pointing to external libraries.
