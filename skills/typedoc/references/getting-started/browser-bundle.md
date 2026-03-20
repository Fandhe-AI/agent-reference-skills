# TypeDoc Browser Bundle

Using TypeDoc's limited API surface in the browser to deserialize and work with TypeDoc's JSON output.

## 詳細説明

TypeDoc exports a subset of its API via the `typedoc/browser` entry point. This allows you to load and work with TypeDoc's JSON output (produced by `--json`) in a browser environment without requiring Node.js.

### Available Exports

The `typedoc/browser` bundle provides:

- **Models** -- TypeDoc's reflection model classes for navigating the project structure.
- **`Serializer`** / **`Deserializer`** -- Classes for serializing and deserializing TypeDoc's project model to/from JSON.
- **`ConsoleLogger`** -- A logger that writes to the browser console.
- **`FileRegistry`** -- A registry for tracking files referenced in the project.
- **`setTranslations`** -- A function to set the translation strings used by TypeDoc.

### Translations

Translations must be loaded separately from `typedoc/browser/<locale>`. For English:

```typescript
import translations from "typedoc/browser/en";
```

Call `setTranslations(translations)` before using the deserializer.

### Workflow

1. Fetch the TypeDoc JSON output (produced by `typedoc --json`).
2. Set up translations.
3. Create a `Deserializer` instance.
4. Call `deserializer.reviveProject()` to reconstruct the project model.
5. Navigate the model using TypeDoc's reflection API.

## コード例

### Basic Browser Usage

```typescript
import {
  ConsoleLogger,
  Deserializer,
  FileRegistry,
  setTranslations,
} from "typedoc/browser";

import translations from "typedoc/browser/en";

// Set translations before using the deserializer
setTranslations(translations);

// Fetch the JSON output produced by `typedoc --json`
const projectJson = await fetch("/path/to/docs.json").then((r) => r.json());

// Create a deserializer
const logger = new ConsoleLogger();
const deserializer = new Deserializer(logger);

// Revive the project model from JSON
const project = deserializer.reviveProject("API Docs", projectJson, {
  projectRoot: "/",
  registry: new FileRegistry(),
});

// Navigate the project model
console.log(project.getChildByName("SomeClass.property"));
console.log(project.getChildByName("SomeClass.property").type.toString());
```

### Navigating the Project Model

```typescript
import {
  ConsoleLogger,
  Deserializer,
  FileRegistry,
  setTranslations,
} from "typedoc/browser";
import translations from "typedoc/browser/en";

setTranslations(translations);

async function loadDocs(jsonUrl: string) {
  const projectJson = await fetch(jsonUrl).then((r) => r.json());

  const deserializer = new Deserializer(new ConsoleLogger());
  const project = deserializer.reviveProject("My Library", projectJson, {
    projectRoot: "/",
    registry: new FileRegistry(),
  });

  // Access top-level children
  for (const child of project.children ?? []) {
    console.log(`${child.name} (${child.kindString})`);
  }

  // Look up a specific member
  const myClass = project.getChildByName("MyClass");
  if (myClass) {
    console.log("Found:", myClass.name);
    for (const member of myClass.children ?? []) {
      console.log(`  - ${member.name}: ${member.type?.toString()}`);
    }
  }
}

loadDocs("/api/docs.json");
```

## 注意点

- The browser bundle provides a **limited** API surface compared to the full Node.js API. It is primarily for reading and navigating TypeDoc JSON output, not for generating documentation.
- You must call `setTranslations()` before using the `Deserializer`, otherwise the deserialized model may have missing or incorrect string values.
- The JSON file must be produced by TypeDoc's `--json` output option. Arbitrary JSON will not work.
- The `projectRoot` option in `reviveProject` is used for resolving relative file paths in the model. In a browser context, `"/"` is typically sufficient.
- The `FileRegistry` is required for tracking file references within the project model.

## 関連

- [Installation & CLI Usage](./installation.md)
- [Node Module API](./node-module-api.md)
- [Doc Comments Guide](../guides/doc-comments.md)
