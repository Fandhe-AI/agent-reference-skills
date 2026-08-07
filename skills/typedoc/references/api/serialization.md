# Serialization

TypeDoc's serialization system. The `Serializer` and `Deserializer` classes convert between the Reflection model and JSON.

## Signature

### Serializer

```typescript
class Serializer extends EventDispatcher<SerializerEvents> {
  // Static events
  static readonly EVENT_BEGIN: "begin";
  static readonly EVENT_END: "end";

  // Properties
  projectRoot: NormalizedPath;
  project: Models.ProjectReflection;

  // Core methods
  projectToObject(
    value: Models.ProjectReflection,
    projectRoot: NormalizedPath
  ): JSONOutput.ProjectReflection;

  toObject<T extends { toObject(serializer: Serializer): ModelToObject<T> }>(
    value: T | undefined
  ): ModelToObject<T> | undefined;

  toObjectsOptional<T extends { toObject(serializer: Serializer): ModelToObject<T> }>(
    value: T[] | undefined
  ): ModelToObject<T>[] | undefined;

  // Component management
  addSerializer<T extends object>(serializer: SerializerComponent<T>): void;
  removeSerializer(serializer: SerializerComponent<any>): void;

  // Event methods
  on<K extends keyof SerializerEvents>(
    event: K,
    listener: (...args: SerializerEvents[K]) => void,
    priority?: number
  ): void;
  off<K extends keyof SerializerEvents>(
    event: K,
    listener: (...args: SerializerEvents[K]) => void
  ): void;
  trigger<K extends keyof SerializerEvents>(
    event: K,
    ...args: SerializerEvents[K]
  ): void;
}
```

### Deserializer

```typescript
class Deserializer {
  // Properties
  logger: Logger;
  projectRoot: NormalizedPath;
  oldIdToNewId: Record<ReflectionId, ReflectionId | undefined>;
  oldFileIdToNewFileId: Record<FileId, FileId | undefined>;
  project: ProjectReflection | undefined;
  reflectionBuilders: Record<string, Function>;
  typeBuilders: Record<string, Function>;

  // Core methods
  constructor(logger: Logger);

  reviveProject(
    name: string,
    projectObj: JSONOutput.ProjectReflection,
    options: { projectRoot: NormalizedPath; registry: FileRegistry }
  ): ProjectReflection;

  reviveProjects(
    name: string,
    projects: readonly JSONOutput.ProjectReflection[],
    options: {
      projectRoot: NormalizedPath;
      registry: FileRegistry;
      alwaysCreateEntryPointModule: boolean;
    }
  ): ProjectReflection;

  revive<T>(obj: T | undefined): T | undefined;
  reviveMany<T>(arr: T[] | undefined): T[] | undefined;

  constructReflection<T>(obj: JSONOutput.Reflection): T;
  constructType(obj: JSONOutput.SomeType): Models.SomeType;
  reviveType(obj: JSONOutput.SomeType | undefined): Models.SomeType | undefined;

  fromObject<T>(receiver: T, obj: unknown): void;

  addDeserializer(deserializer: DeserializerComponent): void;
  defer(cb: (project: ProjectReflection) => void): void;
}
```

## Methods

### Serializer

#### projectToObject()

```typescript
projectToObject(
  value: Models.ProjectReflection,
  projectRoot: NormalizedPath
): JSONOutput.ProjectReflection
```

Converts an entire project Reflection into a JSON object. Fires the begin/end events.

#### toObject()

```typescript
toObject<T>(value: T | undefined): ModelToObject<T> | undefined
```

Converts an individual model object into its JSON representation. Calls the model's own `toObject()` method.

#### toObjectsOptional()

```typescript
toObjectsOptional<T>(value: T[] | undefined): ModelToObject<T>[] | undefined
```

Serializes an optional array of model objects.

#### addSerializer()

```typescript
addSerializer<T extends object>(serializer: SerializerComponent<T>): void
```

Adds a custom serializer component.

#### removeSerializer()

```typescript
removeSerializer(serializer: SerializerComponent<any>): void
```

Removes a serializer component.

### Deserializer

#### reviveProject()

```typescript
reviveProject(
  name: string,
  projectObj: JSONOutput.ProjectReflection,
  options: { projectRoot: NormalizedPath; registry: FileRegistry }
): ProjectReflection
```

Restores a single JSON project into a `ProjectReflection`.

#### reviveProjects()

```typescript
reviveProjects(
  name: string,
  projects: readonly JSONOutput.ProjectReflection[],
  options: {
    projectRoot: NormalizedPath;
    registry: FileRegistry;
    alwaysCreateEntryPointModule: boolean;
  }
): ProjectReflection
```

Processes multiple JSON projects and returns a merged `ProjectReflection`.

#### constructReflection()

```typescript
constructReflection<T>(obj: JSONOutput.Reflection): T
```

Builds a Reflection instance from JSON, choosing the appropriate class based on the `variant` field.

#### constructType()

```typescript
constructType(obj: JSONOutput.SomeType): Models.SomeType
```

Builds a Type instance from JSON, choosing the appropriate class based on the `type` field.

#### defer()

```typescript
defer(cb: (project: ProjectReflection) => void): void
```

Registers a callback to run after deserialization completes. Used to resolve cross-references.

## Properties

### Serializer properties

| Property | Type | Description |
|-----------|---|------|
| `projectRoot` | `NormalizedPath` | The project root, set during serialization |
| `project` | `ProjectReflection` | The project, set during serialization |

### Deserializer properties

| Property | Type | Description |
|-----------|---|------|
| `logger` | `Logger` | The logging instance |
| `projectRoot` | `NormalizedPath` | Set during deserialization |
| `oldIdToNewId` | `Record<ReflectionId, ReflectionId \| undefined>` | Mapping from old IDs to new IDs |
| `oldFileIdToNewFileId` | `Record<FileId, FileId \| undefined>` | Mapping from old file IDs to new file IDs |
| `project` | `ProjectReflection \| undefined` | The current project |
| `reflectionBuilders` | `object` | Mapping of variant → builder function |
| `typeBuilders` | `object` | Mapping of type kind → builder function |

## Events

### Serializer events

| Event | Value | Description |
|--------|---|------|
| `EVENT_BEGIN` | `"begin"` | Fired when serialization begins |
| `EVENT_END` | `"end"` | Fired when serialization completes |

## JSONOutput Namespace

Type definitions for the serialized JSON output. Used when consuming TypeDoc's JSON output from external tools.

### Main interfaces

```typescript
namespace JSONOutput {
  interface ProjectReflection {
    id: number;
    name: string;
    variant: "project";
    kind: number;
    children?: DeclarationReflection[];
    groups?: ReflectionGroup[];
    categories?: ReflectionCategory[];
    packageName?: string;
    packageVersion?: string;
    readme?: CommentDisplayPart[];
    // ...
  }

  interface DeclarationReflection {
    id: number;
    name: string;
    variant: "declaration";
    kind: number;
    type?: SomeType;
    signatures?: SignatureReflection[];
    children?: DeclarationReflection[];
    // ...
  }

  interface SignatureReflection {
    id: number;
    name: string;
    variant: "signature";
    kind: number;
    parameters?: ParameterReflection[];
    typeParameters?: TypeParameterReflection[];
    type?: SomeType;
    // ...
  }

  // SomeType is a union of the JSON representation of each type
  type SomeType =
    | ArrayType
    | ConditionalType
    | IndexedAccessType
    | InferredType
    | IntersectionType
    | IntrinsicType
    | LiteralType
    | MappedType
    | OptionalType
    | PredicateType
    | QueryType
    | ReferenceType
    | RestType
    | TemplateLiteralType
    | TupleType
    | TypeOperatorType
    | UnionType
    | UnknownType;
}
```

## Examples

### Outputting JSON

```typescript
import { Application } from "typedoc";

const app = await Application.bootstrapWithPlugins({
  entryPoints: ["src/index.ts"],
});

const project = await app.convert();
if (project) {
  // Write to a JSON file
  await app.generateJson(project, "./api.json");

  // Get the JSON object programmatically
  const jsonObj = app.serializer.projectToObject(project, "/path/to/project");
}
```

### Restoring from JSON

```typescript
import { Application, Models } from "typedoc";
import * as fs from "fs";

const app = await Application.bootstrapWithPlugins();

const jsonData = JSON.parse(fs.readFileSync("./api.json", "utf-8"));
const project = app.deserializer.reviveProject(
  "MyProject",
  jsonData,
  {
    projectRoot: "/path/to/project" as any,
    registry: new Models.FileRegistry(),
  }
);

// Use the restored ProjectReflection
await app.generateDocs(project, "./docs");
```

### Custom serializer

```typescript
import { Application, Serializer, DeclarationReflection } from "typedoc";

export function load(app: Application) {
  // Listener for serialization start
  app.serializer.on(Serializer.EVENT_BEGIN, () => {
    app.logger.info("Serialization started");
  });

  // Listener for serialization completion
  app.serializer.on(Serializer.EVENT_END, () => {
    app.logger.info("Serialization completed");
  });
}
```

### Post-processing JSON output

```typescript
import { Application } from "typedoc";
import * as fs from "fs";

const app = await Application.bootstrapWithPlugins({
  entryPoints: ["src/index.ts"],
});

const project = await app.convert();
if (project) {
  const json = app.serializer.projectToObject(project, "/path/to/project");

  // Post-process the JSON
  const enhanced = {
    ...json,
    generatedAt: new Date().toISOString(),
    generatorVersion: Application.VERSION,
  };

  fs.writeFileSync("./api-enhanced.json", JSON.stringify(enhanced, null, 2));
}
```

## Notes

- `Serializer` extends `EventDispatcher` and fires begin/end events
- `Deserializer` does not fire events
- Types in the `JSONOutput` namespace are useful when consuming the JSON from external tools
- `Deserializer.defer()` runs after deserialization completes, making it suitable for resolving cross-references
- The `oldIdToNewId` mapping resolves ID collisions when merging multiple projects
- The JSON output format may change between TypeDoc versions

## Related

- [Application](./application.md)
- [Reflections](./reflections.md)
- [Types](./types.md)
- [Architecture Overview](../development/overview.md)
