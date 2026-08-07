# Reflections

TypeDoc's internal model. The Reflection hierarchy represents every documentable element in the source code (classes, functions, properties, and so on).

## Signature

### Reflection Hierarchy

```typescript
// Base class
abstract class Reflection {
  abstract readonly variant: keyof ReflectionVariant;
  id: ReflectionId;
  name: string;
  kind: ReflectionKind;
  flags: ReflectionFlags;
  project: ProjectReflection;
  parent?: Reflection;
  comment?: Comment;
}

// Container (base for Reflections that have children)
abstract class ContainerReflection extends Reflection {
  children?: DeclarationReflection[];
  documents?: DocumentReflection[];
  childrenIncludingDocuments?: (DeclarationReflection | DocumentReflection)[];
  groups?: ReflectionGroup[];
  categories?: ReflectionCategory[];
}

// Project (root)
class ProjectReflection extends ContainerReflection {
  readonly variant: "project";
  files: FileRegistry;
  reflections: { [id: number]: Reflection };  // read-only
  packageName?: string;
  packageVersion?: string;
  readme?: CommentDisplayPart[];
}

// Declaration (class, function, property, etc.)
class DeclarationReflection extends ContainerReflection {
  variant: "declaration" | "reference";
  type?: SomeType;
  typeParameters?: TypeParameterReflection[];
  signatures?: SignatureReflection[];
  indexSignatures?: SignatureReflection[];
  getSignature?: SignatureReflection;
  setSignature?: SignatureReflection;
  defaultValue?: string;
  extendedTypes?: SomeType[];
  extendedBy?: ReferenceType[];
  implementedTypes?: SomeType[];
  implementedBy?: ReferenceType[];
  inheritedFrom?: ReferenceType;
  overwrites?: ReferenceType;
  implementationOf?: ReferenceType;
  sources?: SourceReference[];
  packageVersion?: string;
  relevanceBoost?: number;
  typeHierarchy?: DeclarationHierarchy;
}

// Signature
class SignatureReflection extends Reflection {
  readonly variant: "signature";
  parent: DeclarationReflection;
  parameters?: ParameterReflection[];
  typeParameters?: TypeParameterReflection[];
  type?: SomeType;
  overwrites?: ReferenceType;
  inheritedFrom?: ReferenceType;
  implementationOf?: ReferenceType;
  sources?: SourceReference[];
}

// Parameter
class ParameterReflection extends Reflection {
  readonly variant: "param";
  parent?: SignatureReflection;
  type?: SomeType;
  defaultValue?: string;
}

// Type parameter
class TypeParameterReflection extends Reflection {
  readonly variant: "typeParam";
  parent?: DeclarationReflection | SignatureReflection;
  type?: SomeType;       // constraint
  default?: SomeType;    // default value
  varianceModifier?: VarianceModifier;
}

// Reference (an imported Reflection)
class ReferenceReflection extends DeclarationReflection {
  readonly variant: "reference";
  getTargetReflection(): Reflection;
  getTargetReflectionDeep(): Reflection;
  tryGetTargetReflection(): Reflection | undefined;
  tryGetTargetReflectionDeep(): Reflection | undefined;
}

// Document (a Markdown file)
class DocumentReflection extends Reflection {
  readonly variant: "document";
  content: CommentDisplayPart[];
  frontmatter: Record<string, unknown>;
  relevanceBoost?: number;
  children?: DocumentReflection[];
}
```

## Methods

### Reflection (base class)

| Method | Signature | Description |
|---------|----------|------|
| `getFullName` | `(separator?: string): string` | Returns the full hierarchical name |
| `getFriendlyFullName` | `(): string` | Returns a user-facing display name |
| `getChildByName` | `(arg: string \| string[]): Reflection \| undefined` | Looks up a child by name |
| `hasComment` | `(notRenderedTags?: readonly string[]): boolean` | Whether there is a renderable comment |
| `isDeprecated` | `(): boolean` | Whether the reflection is deprecated |
| `kindOf` | `(kind: ReflectionKind \| ReflectionKind[]): boolean` | Tests the reflection's kind |
| `setFlag` | `(flag: ReflectionFlag, value?: boolean): void` | Sets a flag |
| `traverse` | `(callback: TraverseCallback): void` | Traverses child elements (abstract method) |
| `visit` | `(visitor: ReflectionVisitor): void` | Applies the visitor pattern |
| `toObject` | `(serializer: Serializer): JSONOutput.Reflection` | Serializes to JSON |
| `fromObject` | `(de: Deserializer, obj: JSONOutput.Reflection): void` | Deserializes from JSON |

#### Type guard methods

| Method | Return Type |
|---------|---------|
| `isProject()` | `this is ProjectReflection` |
| `isDeclaration()` | `this is DeclarationReflection` |
| `isSignature()` | `this is SignatureReflection` |
| `isParameter()` | `this is ParameterReflection` |
| `isTypeParameter()` | `this is TypeParameterReflection` |
| `isDocument()` | `this is DocumentReflection` |
| `isContainer()` | `this is ContainerReflection` |
| `isReference()` | `this is ReferenceReflection` |

### ProjectReflection

| Method | Signature | Description |
|---------|----------|------|
| `getReflectionById` | `(id: number): Reflection \| undefined` | Retrieves a Reflection by ID |
| `getReflectionsByKind` | `(kind: ReflectionKind): Reflection[]` | Filters by kind |
| `getChildrenByKind` | `(kind: ReflectionKind): DeclarationReflection[]` | Filters direct children by kind |
| `registerReflection` | `(reflection, id?, filePath?)` | Registers a Reflection in the index |
| `registerSymbolId` | `(reflection, id)` | Associates a symbol ID |
| `removeReflection` | `(reflection)` | Removes a Reflection from the documentation |
| `mergeReflections` | `(source, target)` | Merges Reflections (internal use) |
| `getReflectionFromSymbolId` | `(symbolId): Reflection \| undefined` | Retrieves a Reflection from a symbol ID |

### DeclarationReflection

| Method | Signature | Description |
|---------|----------|------|
| `getAllSignatures` | `(): SignatureReflection[]` | Retrieves all signatures |
| `getNonIndexSignatures` | `(): SignatureReflection[]` | Retrieves signatures excluding index signatures |
| `getProperties` | `(): DeclarationReflection[]` | Retrieves properties |
| `hasGetterOrSetter` | `(): boolean` | Whether a getter or setter exists |
| `getChildOrTypePropertyByName` | `(path: string[]): DeclarationReflection \| undefined` | Looks up by a name path |
| `addChild` | `(child: Reflection): void` | Adds a child element |
| `removeChild` | `(child): void` | Removes a child element |

### ReferenceReflection

| Method | Signature | Description |
|---------|----------|------|
| `getTargetReflection` | `(): Reflection` | Retrieves the target Reflection |
| `getTargetReflectionDeep` | `(): Reflection` | Fully resolves chained references |
| `tryGetTargetReflection` | `(): Reflection \| undefined` | Safely retrieves the target |
| `tryGetTargetReflectionDeep` | `(): Reflection \| undefined` | Safely resolves a deep reference |

### DocumentReflection

| Method | Signature | Description |
|---------|----------|------|
| `addChild` | `(child: DocumentReflection): void` | Adds a child document |

## Properties

### ReflectionKind enum

Main values:

| Value | Description |
|---|------|
| `Project` | Project root |
| `Module` | Module |
| `Namespace` | Namespace |
| `Enum` | Enum |
| `EnumMember` | Enum member |
| `Variable` | Variable |
| `Function` | Function |
| `Class` | Class |
| `Interface` | Interface |
| `Constructor` | Constructor |
| `Property` | Property |
| `Method` | Method |
| `CallSignature` | Call signature |
| `IndexSignature` | Index signature |
| `ConstructorSignature` | Constructor signature |
| `Parameter` | Parameter |
| `TypeLiteral` | Type literal |
| `TypeParameter` | Type parameter |
| `Accessor` | Accessor |
| `GetSignature` | Getter signature |
| `SetSignature` | Setter signature |
| `TypeAlias` | Type alias |
| `Reference` | Reference |
| `Document` | Document |

## Examples

### Traversing Reflections

```typescript
import {
  Application,
  Converter,
  Context,
  DeclarationReflection,
  ReflectionKind,
} from "typedoc";

export function load(app: Application) {
  app.converter.on(Converter.EVENT_RESOLVE_END, (context: Context) => {
    const project = context.project;

    // Get all classes
    const classes = project.getReflectionsByKind(ReflectionKind.Class);
    for (const cls of classes) {
      if (cls.isDeclaration()) {
        console.log(`Class: ${cls.name}`);

        // Get methods
        const methods = cls.getChildrenByKind(ReflectionKind.Method);
        for (const method of methods) {
          console.log(`  Method: ${method.name}`);
        }
      }
    }
  });
}
```

### Modifying Reflections

```typescript
import { Application, Converter, DeclarationReflection } from "typedoc";

export function load(app: Application) {
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (_context: Context, reflection: DeclarationReflection) => {
      // Add a comment
      if (!reflection.comment) {
        reflection.comment = new Comment();
      }

      // Remove a Reflection
      if (reflection.name.startsWith("__internal")) {
        const project = reflection.project;
        project.removeReflection(reflection);
      }
    }
  );
}
```

### Visitor pattern

```typescript
import { ReflectionVisitor } from "typedoc";

const visitor: ReflectionVisitor = {
  declaration(reflection) {
    console.log(`Declaration: ${reflection.name}`);
  },
  signature(reflection) {
    console.log(`Signature: ${reflection.name}`);
  },
  parameter(reflection) {
    console.log(`Parameter: ${reflection.name}`);
  },
};

project.visit(visitor);
```

## Related

- [Types](./types.md)
- [Converter](./converter.md)
- [Serialization](./serialization.md)
- [Architecture Overview](../development/overview.md)
