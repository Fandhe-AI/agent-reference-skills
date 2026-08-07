# Application

TypeDoc's main entry point. Orchestrates the conversion of TypeScript source files into documentation via the `Converter` and `Renderer`.

## Signature

```typescript
class Application extends AbstractComponent<Application, ApplicationEvents> {
  // Static methods
  static bootstrap(
    options?: Configuration.TypeDocOptions,
    readers?: readonly Configuration.OptionsReader[]
  ): Promise<Application>;

  static bootstrapWithPlugins(
    options?: Configuration.TypeDocOptions,
    readers?: readonly Configuration.OptionsReader[]
  ): Promise<Application>;

  // Instance methods
  convert(): Promise<Models.ProjectReflection | undefined>;
  convertAndWatch(
    success: (project: Models.ProjectReflection) => Promise<void>
  ): Promise<boolean>;
  generateDocs(project: Models.ProjectReflection, out: string): Promise<void>;
  generateJson(project: Models.ProjectReflection, out: string): Promise<void>;
  generateOutputs(project: Models.ProjectReflection): Promise<void>;
  validate(project: Models.ProjectReflection): void;
  getEntryPoints(): DocumentationEntryPoint[] | undefined;
  getDefinedEntryPoints(): DocumentationEntryPoint[] | undefined;
  getTypeScriptPath(): string;
  getTypeScriptVersion(): string;
  setOptions(options: Configuration.TypeDocOptions, reportErrors?: boolean): boolean;
  watchFile(path: string, shouldRestart?: boolean): void;
  toString(): string;

  // Event methods
  on<K extends keyof ApplicationEvents>(
    event: K,
    listener: (this: undefined, ...args: ApplicationEvents[K]) => void,
    priority?: number
  ): void;
  off<K extends keyof ApplicationEvents>(
    event: K,
    listener: (this: undefined, ...args: ApplicationEvents[K]) => void
  ): void;
  trigger<K extends keyof ApplicationEvents>(
    event: K,
    ...args: ApplicationEvents[K]
  ): void;

  // Properties
  converter: Converter;
  renderer: Renderer;
  outputs: Outputs;
  serializer: Serializer;
  deserializer: Deserializer;
  options: Configuration.Options;
  logger: Logger;
  internationalization: Internationalization;
  /** @deprecated will be removed in 0.29. Use the reference on ProjectReflection instead */
  files: Models.FileRegistry;
  componentName: string;

  // Static properties
  static readonly VERSION: string;

  // Static events
  static readonly EVENT_BOOTSTRAP_END: string;
  static readonly EVENT_PROJECT_REVIVE: string;
  static readonly EVENT_VALIDATE_PROJECT: string;
  static readonly EVENT_GENERATE_OUTPUTS_BEGIN: string;
  static readonly EVENT_GENERATE_OUTPUTS_END: string;
}
```

## Methods

### bootstrap()

```typescript
static bootstrap(
  options?: Configuration.TypeDocOptions,
  readers?: readonly Configuration.OptionsReader[]
): Promise<Application>
```

Initializes TypeDoc without loading plugins. Used for testing or when plugins are not needed.

### bootstrapWithPlugins()

```typescript
static bootstrapWithPlugins(
  options?: Configuration.TypeDocOptions,
  readers?: readonly Configuration.OptionsReader[]
): Promise<Application>
```

Initializes TypeDoc with plugin loading enabled. Use this for normal use cases.

### convert()

```typescript
convert(): Promise<Models.ProjectReflection | undefined>
```

Runs the converter against the configured files and returns the project Reflection. Returns `undefined` on error.

### convertAndWatch()

```typescript
convertAndWatch(
  success: (project: Models.ProjectReflection) => Promise<void>
): Promise<boolean>
```

Runs a convert/watch cycle, invoking the callback after each conversion. Returns `true` if a restart is required, `false` on error.

### generateDocs()

```typescript
generateDocs(project: Models.ProjectReflection, out: string): Promise<void>
```

Renders the project's HTML documentation to the given directory.

### generateJson()

```typescript
generateJson(project: Models.ProjectReflection, out: string): Promise<void>
```

Serializes the project Reflection to a JSON file.

### generateOutputs()

```typescript
generateOutputs(project: Models.ProjectReflection): Promise<void>
```

Generates all configured output formats.

### validate()

```typescript
validate(project: Models.ProjectReflection): void
```

Runs validation against a project Reflection.

### getEntryPoints()

```typescript
getEntryPoints(): DocumentationEntryPoint[] | undefined
```

Retrieves the documented entry points.

### getDefinedEntryPoints()

```typescript
getDefinedEntryPoints(): DocumentationEntryPoint[] | undefined
```

Expands entry points according to the configured strategy option.

### setOptions()

```typescript
setOptions(
  options: Configuration.TypeDocOptions,
  reportErrors?: boolean
): boolean
```

Updates the application's options.

### getTypeScriptPath()

```typescript
getTypeScriptPath(): string
```

Returns the path to the TypeScript compiler.

### getTypeScriptVersion()

```typescript
getTypeScriptVersion(): string
```

Returns the TypeScript version string.

### watchFile()

```typescript
watchFile(path: string, shouldRestart?: boolean): void
```

Registers a file dependency for rebuilds in watch mode.

## Properties

### converter

```typescript
converter: Converter
```

The converter instance that creates declaration Reflections.

### renderer

```typescript
renderer: Renderer
```

The renderer instance that produces HTML output.

### serializer

```typescript
serializer: Serializer
```

The serializer instance that produces JSON output.

### deserializer

```typescript
deserializer: Deserializer
```

The deserializer instance that restores data from JSON.

### options

```typescript
options: Configuration.Options
```

The options container. Handles getting and setting configuration values.

### logger

```typescript
logger: Logger
```

The message output utility.

### internationalization

```typescript
internationalization: Internationalization
```

Translation support. Translations can be added with `addTranslations()`.

### outputs

```typescript
outputs: Outputs
```

Output management.

## Static Events

### EVENT_BOOTSTRAP_END

Fired after plugins are loaded and options are frozen.

### EVENT_PROJECT_REVIVE

Fired after JSON deserialization.

### EVENT_VALIDATE_PROJECT

Fired during validation.

### EVENT_GENERATE_OUTPUTS_BEGIN

Fired immediately before output generation. Used by plugins that need to skip generating auxiliary files when validation warnings exist and `treatWarningsAsErrors` is enabled.

### EVENT_GENERATE_OUTPUTS_END

Fired immediately after output generation. Used by plugins that need to skip generating auxiliary files when validation warnings exist and `treatWarningsAsErrors` is enabled.

## Accessors

| Accessor | Type | Description |
|---------|---|------|
| `application` | `Application` | Returns the `Application` instance |
| `owner` | `Application` | Returns the component's owner |
| `lang` | `string` | Language setting |
| `entryPointStrategy` | `EntryPointStrategy` | Entry point expansion strategy |
| `entryPoints` | `string[]` | Entry point patterns |
| `skipErrorChecking` | `boolean` | Toggle for error checking |

## Examples

```typescript
import { Application } from "typedoc";

// Initialize with plugins
const app = await Application.bootstrapWithPlugins({
  entryPoints: ["src/index.ts"],
  out: "docs",
});

// Convert
const project = await app.convert();

if (project) {
  // Validate
  app.validate(project);

  // Generate HTML documentation
  await app.generateDocs(project, "docs");

  // Output JSON
  await app.generateJson(project, "docs/api.json");

  // Generate all configured outputs
  await app.generateOutputs(project);
}
```

### Listening to events

```typescript
import { Application } from "typedoc";

const app = await Application.bootstrapWithPlugins();

// Event fired after bootstrap completes
app.on(Application.EVENT_BOOTSTRAP_END, () => {
  console.log("Bootstrap completed");
});

// Validation event
app.on(Application.EVENT_VALIDATE_PROJECT, (project) => {
  console.log(`Validating project: ${project.name}`);
});
```

## Related

- [Converter](./converter.md)
- [Renderer](./renderer.md)
- [Options API](./options-api.md)
- [Serialization](./serialization.md)
- [Architecture Overview](../development/overview.md)
