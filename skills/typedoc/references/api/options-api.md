# Options

Class that manages TypeDoc and TypeScript option declarations. Provides type-safe option retrieval and assignment.

## Signature

```typescript
class Options {
  constructor();

  // Declaration management
  addDeclaration<K extends keyof TypeDocOptionMap>(
    declaration: { name: K } & KeyToDeclaration<K>
  ): void;
  getDeclaration(name: string): Readonly<DeclarationOption> | undefined;
  getDeclarations(): Readonly<DeclarationOption>[];

  // Value manipulation
  getValue<K extends keyof TypeDocOptionMap>(name: K): TypeDocOptionValues[K];
  setValue<K extends keyof TypeDocOptionMap>(
    name: K,
    value: Exclude<TypeDocOptions[K], undefined>,
    configPath?: string
  ): void;
  isSet(name: keyof TypeDocOptionMap): boolean;
  getRawValues(): Readonly<Partial<TypeDocOptionValues>>;
  reset(name?: keyof TypeDocOptionMap): void;

  // Reader management
  addReader(reader: OptionsReader): void;
  read(logger: Logger, cwd?: string, usedFile?: (path: string) => void): Promise<void>;

  // Compiler options
  getCompilerOptions(logger: Logger): ts.CompilerOptions;
  setCompilerOptions(
    fileNames: readonly string[],
    options: ts.CompilerOptions,
    projectReferences?: readonly ts.ProjectReference[]
  ): void;
  fixCompilerOptions(
    options: Readonly<ts.CompilerOptions>,
    logger: Logger
  ): ts.CompilerOptions;
  getFileNames(): readonly string[];
  getProjectReferences(): readonly ts.ProjectReference[];

  // Utilities
  getHelp(): string;
  getSimilarOptions(missingName: string): string[];
  copyForPackage(packageDir: string): Options;
  snapshot(): { __optionSnapshot: never };
  restore(snapshot: { __optionSnapshot: never }): void;

  // Properties
  packageDir?: string;
}
```

## Methods

### addDeclaration()

```typescript
addDeclaration<K extends keyof TypeDocOptionMap>(
  declaration: { name: K } & KeyToDeclaration<K>
): void
```

Adds a new option declaration. Used by plugins to define custom options.

### getValue()

```typescript
getValue<K extends keyof TypeDocOptionMap>(name: K): TypeDocOptionValues[K]
```

Retrieves the current value of the given option in a type-safe way.

### setValue()

```typescript
setValue<K extends keyof TypeDocOptionMap>(
  name: K,
  value: Exclude<TypeDocOptions[K], undefined>,
  configPath?: string
): void
```

Sets the value of the given option. `configPath` is used to resolve file paths.

### isSet()

```typescript
isSet(name: keyof TypeDocOptionMap): boolean
```

Returns whether the option was explicitly set (as opposed to still holding its default value).

### getRawValues()

```typescript
getRawValues(): Readonly<Partial<TypeDocOptionValues>>
```

Returns the raw values of all options, read-only.

### reset()

```typescript
reset(name?: keyof TypeDocOptionMap): void
```

Resets the given option (or all options) to its default value.

### addReader()

```typescript
addReader(reader: OptionsReader): void
```

Adds an options reader.

### read()

```typescript
read(logger: Logger, cwd?: string, usedFile?: (path: string) => void): Promise<void>
```

Reads options from all registered readers.

### getCompilerOptions()

```typescript
getCompilerOptions(logger: Logger): ts.CompilerOptions
```

Retrieves the TypeScript compiler options.

### snapshot() / restore()

```typescript
snapshot(): { __optionSnapshot: never }
restore(snapshot: { __optionSnapshot: never }): void
```

Saves the current options state as a snapshot and restores it later. Intended for use in package mode.

## Properties

### packageDir

```typescript
packageDir?: string
```

The package directory in package mode.

## Option Readers

Options are read in the following priority order:

| Reader | Priority | Description |
|---------|-------|------|
| `ArgumentsReader` (first) | 0 | CLI arguments (first pass) |
| `TypeDocReader` | 100 | `typedoc.json` / `typedoc.config.js` |
| `TSConfigReader` | 200 | `tsconfig.json` |
| `ArgumentsReader` (last) | 300 | CLI arguments (final pass, overrides) |
| `PackageJsonReader` | — | `typedocOptions` in `package.json` |

### OptionsReader Interface

```typescript
interface OptionsReader {
  name: string;
  readonly order: number;
  read(container: Options, logger: Logger, cwd: string): Promise<void> | void;
}
```

## ParameterType Enum

```typescript
enum ParameterType {
  String,         // String value
  Path,           // File path (resolved)
  Number,         // Numeric value
  Boolean,        // Boolean value
  Map,            // Key/value map
  Mixed,          // Mixed type
  Array,          // String array
  PathArray,      // Path array
  ModuleArray,    // Module array
  GlobArray,      // Glob pattern array
  Flags,          // Combination of flags
  Object,         // Object
}
```

## Examples

### Defining a custom option

```typescript
import { Application, ParameterType } from "typedoc";

export function load(app: Application) {
  // String option
  app.options.addDeclaration({
    name: "myPluginTitle",
    help: "Title for the custom section",
    type: ParameterType.String,
    defaultValue: "Custom Section",
  });

  // Boolean option
  app.options.addDeclaration({
    name: "myPluginEnabled",
    help: "Enable the custom plugin feature",
    type: ParameterType.Boolean,
    defaultValue: true,
  });

  // Path option
  app.options.addDeclaration({
    name: "myPluginOutput",
    help: "Output directory for custom files",
    type: ParameterType.Path,
    defaultValue: "./custom-output",
  });

  // Map option (enum-like choices)
  app.options.addDeclaration({
    name: "myPluginFormat",
    help: "Output format",
    type: ParameterType.Map,
    map: new Map([
      ["json", "json"],
      ["yaml", "yaml"],
      ["xml", "xml"],
    ]),
    defaultValue: "json",
  });

  // Array option
  app.options.addDeclaration({
    name: "myPluginExclude",
    help: "Patterns to exclude",
    type: ParameterType.GlobArray,
    defaultValue: [],
  });
}
```

### Reading and using option values

```typescript
import { Application, Converter } from "typedoc";

export function load(app: Application) {
  app.converter.on(Converter.EVENT_RESOLVE_END, () => {
    // Read values in a type-safe way
    const title = app.options.getValue("myPluginTitle");
    const enabled = app.options.getValue("myPluginEnabled");
    const output = app.options.getValue("myPluginOutput");

    if (enabled) {
      app.logger.info(`Plugin active with title: ${title}`);
      app.logger.info(`Output to: ${output}`);
    }

    // Check whether the option was explicitly configured
    if (app.options.isSet("myPluginTitle")) {
      app.logger.info("Title was explicitly configured");
    }
  });
}
```

### Option snapshotting

```typescript
// Example usage in package mode
const snap = app.options.snapshot();
try {
  app.options.setValue("out", "./package-docs");
  // Package-specific processing
} finally {
  app.options.restore(snap);
}
```

## Notes

- Options are frozen after `Application.bootstrap()` or `bootstrapWithPlugins()`
- Plugin custom options should be declared with `addDeclaration()` inside the `load()` function
- `ParameterType.Path` automatically resolves file paths
- Reader priority means CLI arguments ultimately override all other settings
- `copyForPackage()` creates a per-package options copy in package mode

## Related

- [Application](./application.md)
- [Plugin Development](../development/plugin-development.md)
