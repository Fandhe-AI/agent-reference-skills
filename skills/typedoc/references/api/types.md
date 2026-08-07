# Types

TypeDoc's type system. 18 `Type` subclasses representing TypeScript types.

## Signature

### Base class: Type

```typescript
abstract class Type {
  abstract readonly type: string;

  // Common methods
  toString(): string;
  stringify(context: TypeContext): string;
  visit<T, A extends unknown[]>(visitor: TypeVisitor<T, A>, ...args: A): T;
  estimatePrintWidth(): number;
  toObject(serializer: Serializer): JSONOutput.SomeType;
  fromObject(deserializer: Deserializer, obj: JSONOutput.SomeType): void;

  // Protected methods
  protected abstract getTypeString(): string;
  abstract needsParenthesis(context: TypeContext): boolean;
}
```

## Methods

### Type (base class) common methods

| Method | Signature | Description |
|---------|----------|------|
| `toString` | `(): string` | Returns the string representation of the type |
| `stringify` | `(context: TypeContext): string` | Returns a context-aware string representation |
| `visit` | `<T>(visitor: TypeVisitor<T>): T` | Processes the type using the visitor pattern |
| `estimatePrintWidth` | `(): number` | Estimated width when printed on a single line |
| `toObject` | `(serializer: Serializer): JSONOutput.SomeType` | Serializes to JSON |
| `fromObject` | `(de: Deserializer, obj): void` | Deserializes from JSON |
| `needsParenthesis` | `(context: TypeContext): boolean` | Determines whether parentheses are required |

## Subclasses

There are 18 `Type` subclasses in total.

### ArrayType

Represents an array type (`string[]`).

```typescript
class ArrayType extends Type {
  readonly type: "array";
  elementType: SomeType;

  constructor(elementType: SomeType);
}
```

| Property | Type | Description |
|-----------|---|------|
| `elementType` | `SomeType` | The array's element type |

---

### ConditionalType

Represents a conditional type (`T extends U ? X : Y`).

```typescript
class ConditionalType extends Type {
  readonly type: "conditional";
  checkType: SomeType;
  extendsType: SomeType;
  trueType: SomeType;
  falseType: SomeType;

  constructor(
    checkType: SomeType,
    extendsType: SomeType,
    trueType: SomeType,
    falseType: SomeType
  );
}
```

| Property | Type | Description |
|-----------|---|------|
| `checkType` | `SomeType` | The type being evaluated |
| `extendsType` | `SomeType` | The constraint type being tested against |
| `trueType` | `SomeType` | The resulting type when the condition is true |
| `falseType` | `SomeType` | The resulting type when the condition is false |

---

### IndexedAccessType

Represents an indexed access type (`T[K]`).

```typescript
class IndexedAccessType extends Type {
  readonly type: "indexedAccess";
  objectType: SomeType;
  indexType: SomeType;

  constructor(objectType: SomeType, indexType: SomeType);
}
```

| Property | Type | Description |
|-----------|---|------|
| `objectType` | `SomeType` | The object type being accessed |
| `indexType` | `SomeType` | The type used as the index |

---

### InferredType

Represents an inferred type (`infer T`).

```typescript
class InferredType extends Type {
  readonly type: "inferred";
  name: string;
  constraint?: SomeType;

  constructor(name: string, constraint?: SomeType);
}
```

| Property | Type | Description |
|-----------|---|------|
| `name` | `string` | The inferred type variable's name |
| `constraint` | `SomeType?` | An optional constraint |

---

### IntersectionType

Represents an intersection type (`A & B`).

```typescript
class IntersectionType extends Type {
  readonly type: "intersection";
  types: SomeType[];

  constructor(types: SomeType[]);
}
```

| Property | Type | Description |
|-----------|---|------|
| `types` | `SomeType[]` | The array of intersected types |

---

### IntrinsicType

Represents a built-in type (`string`, `number`, `boolean`, etc.).

```typescript
class IntrinsicType extends Type {
  readonly type: "intrinsic";
  name: string;

  constructor(name: string);
}
```

| Property | Type | Description |
|-----------|---|------|
| `name` | `string` | The name of the built-in type (`"string"`, `"number"`, etc.) |

---

### LiteralType

Represents a literal type (`"hello"`, `42`, `true`, etc.).

```typescript
class LiteralType extends Type {
  readonly type: "literal";
  value: string | number | bigint | boolean | null;

  constructor(value: string | number | bigint | boolean | null);
}
```

| Property | Type | Description |
|-----------|---|------|
| `value` | `string \| number \| bigint \| boolean \| null` | The literal value |

---

### MappedType

Represents a mapped type (`{ [K in T]: U }`).

```typescript
class MappedType extends Type {
  readonly type: "mapped";
  parameter: string;
  parameterType: SomeType;
  templateType: SomeType;
  readonlyModifier?: "+" | "-";
  optionalModifier?: "+" | "-";
  nameType?: SomeType;

  constructor(
    parameter: string,
    parameterType: SomeType,
    templateType: SomeType,
    readonlyModifier?: "+" | "-",
    optionalModifier?: "+" | "-",
    nameType?: SomeType
  );
}
```

| Property | Type | Description |
|-----------|---|------|
| `parameter` | `string` | The mapping variable name |
| `parameterType` | `SomeType` | The constraint type of the parameter |
| `templateType` | `SomeType` | The resulting template type |
| `readonlyModifier` | `"+" \| "-"?` | The `readonly` modifier |
| `optionalModifier` | `"+" \| "-"?` | The optional modifier |
| `nameType` | `SomeType?` | The type used to remap the property name |

---

### OptionalType

Represents an optional type (a tuple element's `T?`).

```typescript
class OptionalType extends Type {
  readonly type: "optional";
  elementType: SomeType;

  constructor(elementType: SomeType);
}
```

| Property | Type | Description |
|-----------|---|------|
| `elementType` | `SomeType` | The optional element type |

---

### PredicateType

Represents a type predicate (`x is string`).

```typescript
class PredicateType extends Type {
  readonly type: "predicate";
  name: string;
  asserts: boolean;
  targetType?: SomeType;

  constructor(name: string, asserts: boolean, targetType?: SomeType);
}
```

| Property | Type | Description |
|-----------|---|------|
| `name` | `string` | The parameter name |
| `asserts` | `boolean` | Whether the `asserts` keyword is present |
| `targetType` | `SomeType?` | The predicate's target type |

---

### QueryType

Represents a type query (`typeof X`).

```typescript
class QueryType extends Type {
  readonly type: "query";
  queryType: ReferenceType;

  constructor(queryType: ReferenceType);
}
```

| Property | Type | Description |
|-----------|---|------|
| `queryType` | `ReferenceType` | The reference type being queried |

---

### ReferenceType

Represents a type that refers to another Reflection (a class, interface, enum, etc.).

```typescript
class ReferenceType extends Type {
  readonly type: "reference";
  name: string;
  typeArguments?: SomeType[];
  highlightedProperties?: Map<string, CommentDisplayPart[]>;
  qualifiedName: string;
  externalUrl?: string;
  package?: string;
  refersToTypeParameter: boolean;
  preferValues: boolean;

  // Accessors
  get reflection(): Reflection | undefined;
  get symbolId(): ReflectionSymbolId | undefined;

  // Static factory methods
  static createResolvedReference(
    name: string,
    target: Reflection | ReflectionId,
    project: ProjectReflection
  ): ReferenceType;

  static createUnresolvedReference(
    name: string,
    target: ReflectionSymbolId,
    project: ProjectReflection,
    qualifiedName: string
  ): ReferenceType;

  static createBrokenReference(
    name: string,
    project: ProjectReflection,
    packageName?: string
  ): ReferenceType;

  // Methods
  toDeclarationReference(): DeclarationReference;
  isIntentionallyBroken(): boolean;
}
```

| Property | Type | Description |
|-----------|---|------|
| `name` | `string` | The referenced type's name |
| `typeArguments` | `SomeType[]?` | Generic type arguments |
| `qualifiedName` | `string` | The fully qualified name from the defining file |
| `externalUrl` | `string?` | The URL of an external project |
| `package` | `string?` | The name of the referenced package |
| `reflection` | `Reflection?` (accessor) | The resolved Reflection |
| `symbolId` | `ReflectionSymbolId?` (accessor) | The symbol ID when unresolved |

---

### RestType

Represents a rest type (`...T`).

```typescript
class RestType extends Type {
  readonly type: "rest";
  elementType: SomeType;

  constructor(elementType: SomeType);
}
```

| Property | Type | Description |
|-----------|---|------|
| `elementType` | `SomeType` | The rest parameter's element type |

---

### TemplateLiteralType

Represents a template literal type (`` `hello${string}` ``).

```typescript
class TemplateLiteralType extends Type {
  readonly type: "templateLiteral";
  head: string;
  tail: [SomeType, string][];

  constructor(head: string, tail: [SomeType, string][]);
}
```

| Property | Type | Description |
|-----------|---|------|
| `head` | `string` | The literal string at the start of the template |
| `tail` | `[SomeType, string][]` | Pairs of type and following string (the interpolated parts) |

---

### TupleType

Represents a tuple type (`[string, number]`).

```typescript
class TupleType extends Type {
  readonly type: "tuple";
  elements: SomeType[];

  constructor(elements: SomeType[]);
}
```

| Property | Type | Description |
|-----------|---|------|
| `elements` | `SomeType[]` | The ordered array of tuple element types |

---

### TypeOperatorType

Represents a type operator (`keyof T`, `unique T`, `readonly T`).

```typescript
class TypeOperatorType extends Type {
  readonly type: "typeOperator";
  operator: "keyof" | "unique" | "readonly";
  target: SomeType;

  constructor(operator: "keyof" | "unique" | "readonly", target: SomeType);
}
```

| Property | Type | Description |
|-----------|---|------|
| `operator` | `"keyof" \| "unique" \| "readonly"` | The kind of operator |
| `target` | `SomeType` | The type the operator is applied to |

---

### UnionType

Represents a union type (`A | B`).

```typescript
class UnionType extends Type {
  readonly type: "union";
  types: SomeType[];
  elementSummaries?: CommentDisplayPart[][];

  constructor(types: SomeType[]);
}
```

| Property | Type | Description |
|-----------|---|------|
| `types` | `SomeType[]` | The array of types making up the union |
| `elementSummaries` | `CommentDisplayPart[][]?` | Documentation for each member (only valid on type aliases) |

---

### UnknownType

Represents an unknown type. Used when TypeDoc cannot recognize the type.

```typescript
class UnknownType extends Type {
  readonly type: "unknown";
  name: string;

  constructor(name: string);
}
```

| Property | Type | Description |
|-----------|---|------|
| `name` | `string` | The textual representation of the type |

## Examples

### Processing types with the visitor pattern

```typescript
import { Models } from "typedoc";

function processType(type: Models.SomeType): string {
  return type.visit({
    array(t) {
      return `Array of ${processType(t.elementType)}`;
    },
    union(t) {
      return t.types.map(processType).join(" | ");
    },
    intersection(t) {
      return t.types.map(processType).join(" & ");
    },
    reference(t) {
      const args = t.typeArguments
        ? `<${t.typeArguments.map(processType).join(", ")}>`
        : "";
      return `${t.name}${args}`;
    },
    intrinsic(t) {
      return t.name;
    },
    literal(t) {
      return String(t.value);
    },
    // Other types fall back to toString() by default
  });
}
```

### Discriminating types

```typescript
import { Models } from "typedoc";

function analyzeType(type: Models.SomeType): void {
  switch (type.type) {
    case "reference":
      console.log(`Reference to: ${type.name}`);
      if (type.reflection) {
        console.log(`  Resolved to: ${type.reflection.getFullName()}`);
      }
      break;
    case "union":
      console.log(`Union of ${type.types.length} types`);
      break;
    case "array":
      console.log(`Array of ${type.elementType}`);
      break;
    case "intrinsic":
      console.log(`Built-in: ${type.name}`);
      break;
    // ...
  }
}
```

## Related

- [Reflections](./reflections.md)
- [Converter](./converter.md)
- [Serialization](./serialization.md)
