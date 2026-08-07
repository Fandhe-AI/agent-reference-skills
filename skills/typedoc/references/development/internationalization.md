# TypeDoc Internationalization

Internationalization feature introduced in TypeDoc v0.26. Controls the language of console output and generated HTML/JSON.

## Usage

### The --lang option

The `--lang` option sets the language for console output and generated documentation:

```bash
typedoc --lang ja
```

```json
{
  "lang": "ja"
}
```

### Locale structure

Locale files are stored in the `src/lib/internationalization/locales` directory. The default English locale is defined in `src/lib/internationalization/translatable.ts`.

#### Locale file format

```typescript
import { buildTranslation } from "../translatable";

export = buildTranslation({
  docs_generated_at_0: "Documentation generated at {0}",
  // other translation keys...
});
```

### Adding a new locale

1. Create a new file under `src/lib/internationalization/locales`
2. Provide a complete translation with `buildTranslation()`, or a partial one with `buildIncompleteTranslation()`
3. Untranslated strings automatically fall back to English

#### Complete translation

```typescript
import { buildTranslation } from "../translatable";

export = buildTranslation({
  docs_generated_at_0: "ドキュメントは {0} に生成されました",
  kind_class: "クラス",
  kind_function: "関数",
  // include all keys
});
```

#### Partial translation

```typescript
import { buildIncompleteTranslation } from "../translatable";

export = buildIncompleteTranslation({
  docs_generated_at_0: "ドキュメントは {0} に生成されました",
  // only some keys
});
```

### Placeholder syntax

The trailing number in a translation key name indicates the number of placeholders:

- `docs_generated_at_0` — 1 placeholder, `{0}`
- `tag_param_0_is_not_defined_1` — 2 placeholders, `{0}` and `{1}`

Translation strings use the `{n}` form for placeholders:

```typescript
{
  docs_generated_at_0: "Documentation generated at {0}",
  tag_param_0_is_not_defined_1: "Parameter {0} is not defined in {1}",
}
```

### Validation

`buildTranslation` and `buildIncompleteTranslation` validate that:

- translation strings contain the same number of placeholders as the default locale
- there are no keys that don't exist in the default locale
- unit tests catch use of undefined placeholders

### Translatable strings in plugins

Plugins can integrate translations using `Application.internationalization.addTranslations()`.

#### Steps

1. Declaration-merge into the `TranslatableStrings` interface
2. Specify placeholder arguments as an array
3. Follow the naming convention that embeds the index number in the key name

### Internationalization in a plugin

```typescript
import { Application } from "typedoc";

// Extend the TranslatableStrings interface
declare module "typedoc" {
  interface TranslatableStrings {
    // A string with no arguments
    my_plugin_greeting: [];
    // A string with one string argument
    my_plugin_found_0: [string];
    // A string with two arguments
    my_plugin_processed_0_of_1: [string, string];
  }
}

export function load(app: Application) {
  // Add the default (English) translations
  app.internationalization.addTranslations("en", {
    my_plugin_greeting: "Hello from my plugin",
    my_plugin_found_0: "Found {0} items",
    my_plugin_processed_0_of_1: "Processed {0} of {1} items",
  });

  // Add Japanese translations
  app.internationalization.addTranslations("ja", {
    my_plugin_greeting: "プラグインからこんにちは",
    my_plugin_found_0: "{0} 件のアイテムが見つかりました",
    my_plugin_processed_0_of_1: "{1} 件中 {0} 件を処理しました",
  });

  // Use a translation
  app.converter.on("end", () => {
    const message = app.internationalization.translate(
      "my_plugin_found_0",
      "42"
    );
    app.logger.info(message);
  });
}
```

### Example locale file

```typescript
// src/lib/internationalization/locales/ja.ts
import { buildIncompleteTranslation } from "../translatable";

export = buildIncompleteTranslation({
  docs_generated_at_0: "ドキュメントは {0} に生成されました",
  kind_class: "クラス",
  kind_enum: "列挙型",
  kind_function: "関数",
  kind_interface: "インターフェース",
  kind_module: "モジュール",
  kind_namespace: "名前空間",
  kind_type_alias: "型エイリアス",
  kind_variable: "変数",
});
```

## Notes

- Do not submit machine-translated-only translations for a language you are not fluent in
- Use `buildIncompleteTranslation` for partial translations
- Untranslated strings automatically fall back to English
- The number of placeholders is indicated by the trailing number in the key name
- Plugin translation keys are added type-safely via declaration merging on `TranslatableStrings`
- Unit tests verify translation consistency

## Related

- [Plugin Development](./plugin-development.md)
- [Application class](../api/application.md)
