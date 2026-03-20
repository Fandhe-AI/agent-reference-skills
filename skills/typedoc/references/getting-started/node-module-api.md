# TypeDoc Node Module API

How to use TypeDoc programmatically from Node.js to generate documentation, convert projects, and produce JSON or HTML output.

## 詳細説明

TypeDoc can be used as a Node.js module rather than through the CLI. The primary entry point is the `Application` class, which provides methods to bootstrap the application, convert TypeScript projects into a documentation model, and generate output.

### Application Bootstrap Methods

There are two bootstrap methods:

1. **`Application.bootstrapWithPlugins(options)`** -- Bootstraps TypeDoc with plugin loading. This is the recommended method for most use cases. It loads all installed plugins (or those specified in the `plugin` option) and applies their configurations.

2. **`Application.bootstrap(options)`** -- Bootstraps TypeDoc without loading plugins. Use this when you want full control over which plugins are loaded, or when running TypeDoc in an environment where plugin loading is not desired. It also accepts an optional array of option readers if you want to disable TypeDoc's `tsconfig.json` / `package.json` / `typedoc.json` option readers.

### Core Workflow

The programmatic workflow follows these steps:

1. **Bootstrap** the application with options.
2. **Convert** the entry points into a project reflection using `app.convert()`.
3. **Generate output** using one of the output methods.

### Output Methods

- **`app.generateOutputs(project)`** -- Generates all configured outputs (HTML, JSON, etc.) based on the options provided during bootstrap.
- **`app.generateDocs(project, outputDir)`** -- Generates HTML documentation to a specific output directory.
- **`app.generateJson(project, outputPath)`** -- Generates a JSON file describing the project to a specific path.

## コード例

### Basic Programmatic Usage

```typescript
import * as td from "typedoc";

async function main() {
  // Bootstrap with plugins (recommended)
  const app = await td.Application.bootstrapWithPlugins({
    entryPoints: ["src/index.ts"],
  });

  // Convert the project
  const project = await app.convert();

  if (project) {
    // Generate all configured outputs
    await app.generateOutputs(project);
  }
}

main().catch(console.error);
```

### Generate HTML and JSON Separately

```typescript
import * as td from "typedoc";

async function main() {
  const app = await td.Application.bootstrapWithPlugins({
    entryPoints: ["src/index.ts"],
  });

  const project = await app.convert();

  if (project) {
    // Generate HTML docs to a specific directory
    await app.generateDocs(project, "docs");

    // Generate JSON output to a specific file
    await app.generateJson(project, "docs/docs.json");
  }
}

main().catch(console.error);
```

### Bootstrap Without Plugins

```typescript
import * as td from "typedoc";

async function main() {
  // Bootstrap without plugins for full control
  const app = await td.Application.bootstrap({
    entryPoints: ["src/index.ts"],
    tsconfig: "tsconfig.json",
    excludePrivate: true,
    excludeExternals: true,
  });

  const project = await app.convert();

  if (project) {
    await app.generateOutputs(project);
  }
}

main().catch(console.error);
```

### Passing Multiple Options

```typescript
import * as td from "typedoc";

async function main() {
  const app = await td.Application.bootstrapWithPlugins({
    entryPoints: ["src/index.ts", "src/secondary.ts"],
    out: "docs",
    json: "docs/api.json",
    name: "My Library",
    readme: "README.md",
    excludePrivate: true,
    excludeNotDocumented: true,
    theme: "default",
    sort: ["alphabetical"],
    skipErrorChecking: true,
  });

  const project = await app.convert();

  if (project) {
    await app.generateOutputs(project);
  }
}

main().catch(console.error);
```

### Error Handling

```typescript
import * as td from "typedoc";

async function main() {
  const app = await td.Application.bootstrapWithPlugins({
    entryPoints: ["src/index.ts"],
  });

  const project = await app.convert();

  if (!project) {
    console.error("TypeDoc conversion failed. Check entry points and tsconfig.");
    process.exit(1);
  }

  await app.generateOutputs(project);
  console.log("Documentation generated successfully.");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
```

## 注意点

- Always check that `app.convert()` returns a non-null project before generating output. A null result indicates conversion failure.
- `Application.bootstrapWithPlugins` is preferred over `Application.bootstrap` unless you need to avoid loading plugins.
- `Application.bootstrap` also accepts an array of option readers if you want to disable TypeDoc's default config file readers (`tsconfig.json`, `package.json`, `typedoc.json`).
- The options passed to `bootstrapWithPlugins` / `bootstrap` mirror the CLI options (without the `--` prefix).
- `generateOutputs` respects the `emit` option and all configured output destinations.
- `generateDocs` and `generateJson` are convenience methods for targeting specific output types directly.

## 関連

- [Installation & CLI Usage](./installation.md)
- [Browser Bundle](./browser-bundle.md)
- [Doc Comments Guide](../guides/doc-comments.md)
