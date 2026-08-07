# Converter

Class that converts TypeScript source code into the Reflection model. Operates as a subcomponent of `Application`.

## Signature

```typescript
class Converter extends AbstractComponent<Application, ConverterEvents> {
  // Core conversion methods
  convert(entryPoints: readonly DocumentationEntryPoint[]): Models.ProjectReflection;
  convertSymbol(context: Context, symbol: ts.Symbol, exportSymbol?: ts.Symbol): void;
  convertType(context: Context, node: ts.TypeNode | undefined): Models.SomeType;
  convertType(context: Context, type: ts.Type, node?: ts.TypeNode): Models.SomeType;

  // Document management
  addProjectDocuments(project: Models.ProjectReflection): void;
  parseRawComment(
    file: MinimalSourceFile,
    files: Models.FileRegistry
  ): { content: Models.CommentDisplayPart[]; frontmatter: Record<string, unknown> };
  processDocumentTags(reflection: Models.Reflection, parent: Models.ContainerReflection): void;

  // Link resolution
  resolveLinks(reflection: Models.Reflection): void;
  resolveLinks(comment: Models.Comment, owner: Models.Reflection): void;
  resolveLinks(
    parts: readonly Models.CommentDisplayPart[],
    owner: Models.Reflection
  ): Models.CommentDisplayPart[];
  resolveExternalLink(
    ref: DeclarationReference,
    refl: Models.Reflection,
    part: Models.CommentDisplayPart | undefined,
    symbolId: Models.ReflectionSymbolId | undefined
  ): string | ExternalResolveResult | undefined;

  // External symbol resolution
  addUnknownSymbolResolver(resolver: ExternalSymbolResolver): void;

  // Deferred conversion
  permitDeferredConversion(): void;
  deferConversion(cb: () => void): void;
  finalizeDeferredConversion(): void;

  // Filtering
  shouldIgnore(symbol: ts.Symbol, checker: ts.TypeChecker): boolean;
  isExternal(symbol: ts.Symbol, checker: ts.TypeChecker): boolean;

  // Event methods
  on<K extends keyof ConverterEvents>(
    event: K,
    listener: (this: undefined, ...args: ConverterEvents[K]) => void,
    priority?: number
  ): void;
  off<K extends keyof ConverterEvents>(
    event: K,
    listener: (this: undefined, ...args: ConverterEvents[K]) => void
  ): void;
  trigger<K extends keyof ConverterEvents>(
    event: K,
    ...args: ConverterEvents[K]
  ): void;

  // Static event constants
  static readonly EVENT_BEGIN: "begin";
  static readonly EVENT_END: "end";
  static readonly EVENT_CREATE_PROJECT: "createProject";
  static readonly EVENT_CREATE_DECLARATION: "createDeclaration";
  static readonly EVENT_CREATE_DOCUMENT: "createDocument";
  static readonly EVENT_CREATE_SIGNATURE: "createSignature";
  static readonly EVENT_CREATE_PARAMETER: "createParameter";
  static readonly EVENT_CREATE_TYPE_PARAMETER: "createTypeParameter";
  static readonly EVENT_RESOLVE_BEGIN: "resolveBegin";
  static readonly EVENT_RESOLVE: "resolveReflection";
  static readonly EVENT_RESOLVE_END: "resolveEnd";

  // Properties
  componentName: string;
}
```

## Methods

### convert()

```typescript
convert(entryPoints: readonly DocumentationEntryPoint[]): Models.ProjectReflection
```

Compiles the given source files and creates a project Reflection. Takes an array of entry points and returns the converted project model.

### convertSymbol()

```typescript
convertSymbol(context: Context, symbol: ts.Symbol, exportSymbol?: ts.Symbol): void
```

Internal method that converts a TypeScript symbol into a Reflection.

### convertType()

```typescript
convertType(context: Context, node: ts.TypeNode | undefined): Models.SomeType
convertType(context: Context, type: ts.Type, node?: ts.TypeNode): Models.SomeType
```

Converts a TypeScript type into a TypeDoc type Reflection. Has overloads accepting either a `TypeNode` or a `Type`.

### addProjectDocuments()

```typescript
addProjectDocuments(project: Models.ProjectReflection): void
```

Internal method that registers project documents.

### parseRawComment()

```typescript
parseRawComment(
  file: MinimalSourceFile,
  files: Models.FileRegistry
): { content: Models.CommentDisplayPart[]; frontmatter: Record<string, unknown> }
```

Parses a Markdown file into comment content and frontmatter.

### resolveLinks()

```typescript
resolveLinks(reflection: Models.Reflection): void
resolveLinks(comment: Models.Comment, owner: Models.Reflection): void
resolveLinks(
  parts: readonly Models.CommentDisplayPart[],
  owner: Models.Reflection
): Models.CommentDisplayPart[]
```

Resolves documentation links inside a Reflection or a comment. Has three overloads.

### addUnknownSymbolResolver()

```typescript
addUnknownSymbolResolver(resolver: ExternalSymbolResolver): void
```

Adds a resolver used to link to symbols from third-party libraries. Themes use this to determine link targets for external symbols.

### deferConversion() / permitDeferredConversion() / finalizeDeferredConversion()

```typescript
permitDeferredConversion(): void      // v0.28.1+
deferConversion(cb: () => void): void // v0.28.0+
finalizeDeferredConversion(): void    // v0.28.1+
```

APIs for deferring the execution of conversion steps.

## Event Constants

### Conversion Lifecycle Events

| Constant | Value | Callback Arguments | Description |
|-----|---|----------------|------|
| `EVENT_BEGIN` | `"begin"` | `(context: Context)` | Fired when conversion begins |
| `EVENT_END` | `"end"` | `(context: Context)` | Fired when conversion completes |

### Creation Events

| Constant | Value | Callback Arguments | Description |
|-----|---|----------------|------|
| `EVENT_CREATE_PROJECT` | `"createProject"` | `(context: Context, project: ProjectReflection)` | Fired when the project Reflection is created |
| `EVENT_CREATE_DECLARATION` | `"createDeclaration"` | `(context: Context, reflection: DeclarationReflection)` | Fired when a declaration Reflection is created |
| `EVENT_CREATE_DOCUMENT` | `"createDocument"` | `(undefined, reflection: DocumentReflection)` | Fired when a document Reflection is created |
| `EVENT_CREATE_SIGNATURE` | `"createSignature"` | `(context: Context, reflection: SignatureReflection, node, signature: ts.Signature)` | Fired when a signature Reflection is created |
| `EVENT_CREATE_PARAMETER` | `"createParameter"` | `(context: Context, reflection: ParameterReflection, node?: ts.Node)` | Fired when a parameter Reflection is created |
| `EVENT_CREATE_TYPE_PARAMETER` | `"createTypeParameter"` | `(context: Context, reflection: TypeParameterReflection)` | Fired when a type parameter Reflection is created |

### Resolution Events

| Constant | Value | Callback Arguments | Description |
|-----|---|----------------|------|
| `EVENT_RESOLVE_BEGIN` | `"resolveBegin"` | `(context: Context)` | Fired when the resolution phase begins |
| `EVENT_RESOLVE` | `"resolveReflection"` | `(context: Context, reflection: Reflection)` | Fired when each individual Reflection is resolved |
| `EVENT_RESOLVE_END` | `"resolveEnd"` | `(context: Context)` | Fired when the resolution phase completes |

## Accessors

| Accessor | Type | Description |
|---------|---|------|
| `application` | `Application` | The `Application` instance |
| `commentStyle` | `Configuration.CommentStyle` | Comment parsing style |
| `config` | `CommentParserConfig` | Comment parser configuration |
| `excludeExternals` | `boolean` | Whether to exclude external symbols |
| `excludePrivate` | `boolean` | Whether to exclude private declarations |
| `excludeProtected` | `boolean` | Whether to exclude protected declarations |
| `excludeReferences` | `boolean` | Whether to exclude reference symbols |
| `externalPattern` | `GlobString[]` | Patterns for external modules |
| `externalSymbolLinkMappings` | `Record<string, Record<string, string>>` | URL mappings for external symbols |
| `maxTypeConversionDepth` | `number` | Maximum recursion depth for type conversion |
| `preserveLinkText` | `boolean` | Whether to preserve the original link text |
| `validation` | `Configuration.ValidationOptions` | Validation settings |

## Examples

### Basic conversion

```typescript
import { Application, Converter, Context, DeclarationReflection } from "typedoc";

export function load(app: Application) {
  // When conversion begins
  app.converter.on(Converter.EVENT_BEGIN, (context: Context) => {
    console.log("Conversion started");
  });

  // When a declaration Reflection is created
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context: Context, reflection: DeclarationReflection) => {
      // Customize the Reflection
      if (reflection.name.startsWith("_")) {
        // Mark it as an internal API
        reflection.setFlag(ReflectionFlag.Private, true);
      }
    }
  );

  // When resolution completes
  app.converter.on(Converter.EVENT_RESOLVE_END, (context: Context) => {
    const project = context.project;
    console.log(`Resolved ${Object.keys(project.reflections).length} reflections`);
  });
}
```

### External symbol resolver

```typescript
import { Application } from "typedoc";

export function load(app: Application) {
  app.converter.addUnknownSymbolResolver((ref, refl, part, symbolId) => {
    if (ref.moduleSource === "react") {
      const name = ref.symbolReference?.path?.[0]?.path;
      if (name) {
        return `https://react.dev/reference/react/${name}`;
      }
    }
    return undefined;
  });
}
```

## Related

- [Application](./application.md)
- [Reflections](./reflections.md)
- [Events](./events.md)
- [Plugin Development](../development/plugin-development.md)
