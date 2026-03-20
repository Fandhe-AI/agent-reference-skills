# Zod Core (zod/v4/core)

The foundational sub-package that exports core classes and utilities consumed by Zod and Zod Mini -- not intended for direct use.

## Overview

`zod/v4/core` provides the base classes and types that both `zod` and `zod/mini` extend. It is designed to be as extensible and unopinionated as possible, allowing other libraries to "build their own Zod" on top of these classes.

```typescript
import * as z from "zod/v4/core";

// base class for all Zod schemas
z.$ZodType;

// subclasses implementing common parsers
z.$ZodString;
z.$ZodObject;
z.$ZodArray;
// ...

// base class for all Zod checks
z.$ZodCheck;

// subclasses implementing common checks
z.$ZodCheckMinLength;
z.$ZodCheckMaxLength;
// ...

// base class for all Zod errors
z.$ZodError;

// issue formats (types only)
{} as z.$ZodIssue;

// utils
z.util.isValidJWT(/* ... */);
```

## Schemas

### `$ZodType` Base Class

The base class for all Zod schemas. Accepts two generic parameters: `Output` and `Input`.

```typescript
export class $ZodType<Output = unknown, Input = unknown> {
  _zod: { /* internals */ };
}
```

### `$ZodTypes` Union

A union of all first-party schema subclasses. Use this to discriminate between schema types via `_zod.def.type`.

```typescript
export type $ZodTypes =
  | $ZodString
  | $ZodNumber
  | $ZodBigInt
  | $ZodBoolean
  | $ZodDate
  | $ZodSymbol
  | $ZodUndefined
  | $ZodNullable
  | $ZodNull
  | $ZodAny
  | $ZodUnknown
  | $ZodNever
  | $ZodVoid
  | $ZodArray
  | $ZodObject
  | $ZodUnion         // $ZodDiscriminatedUnion extends this
  | $ZodIntersection
  | $ZodTuple
  | $ZodRecord
  | $ZodMap
  | $ZodSet
  | $ZodLiteral
  | $ZodEnum
  | $ZodPromise
  | $ZodLazy
  | $ZodOptional
  | $ZodDefault
  | $ZodTemplateLiteral
  | $ZodCustom
  | $ZodTransform
  | $ZodNonOptional
  | $ZodReadonly
  | $ZodNaN
  | $ZodPipe           // $ZodCodec extends this
  | $ZodSuccess
  | $ZodCatch
  | $ZodFile;
```

### Inheritance Diagram

```
$ZodType
  +-- $ZodString
  |     +-- $ZodStringFormat
  |           +-- $ZodGUID
  |           +-- $ZodUUID
  |           +-- $ZodEmail
  |           +-- $ZodURL
  |           +-- $ZodEmoji
  |           +-- $ZodNanoID
  |           +-- $ZodCUID
  |           +-- $ZodCUID2
  |           +-- $ZodULID
  |           +-- $ZodXID
  |           +-- $ZodKSUID
  |           +-- $ZodISODateTime
  |           +-- $ZodISODate
  |           +-- $ZodISOTime
  |           +-- $ZodISODuration
  |           +-- $ZodIPv4
  |           +-- $ZodIPv6
  |           +-- $ZodCIDRv4
  |           +-- $ZodCIDRv6
  |           +-- $ZodBase64
  |           +-- $ZodBase64URL
  |           +-- $ZodE164
  |           +-- $ZodJWT
  +-- $ZodNumber
  |     +-- $ZodNumberFormat
  +-- $ZodBigInt
  |     +-- $ZodBigIntFormat
  +-- $ZodBoolean
  +-- $ZodSymbol
  +-- $ZodUndefined
  +-- $ZodNull
  +-- $ZodAny
  +-- $ZodUnknown
  +-- $ZodNever
  +-- $ZodVoid
  +-- $ZodDate
  +-- $ZodArray
  +-- $ZodObject
  +-- $ZodUnion
  |     +-- $ZodDiscriminatedUnion
  +-- $ZodIntersection
  +-- $ZodTuple
  +-- $ZodRecord
  +-- $ZodMap
  +-- $ZodSet
  +-- $ZodEnum
  +-- $ZodLiteral
  +-- $ZodFile
  +-- $ZodTransform
  +-- $ZodOptional
  +-- $ZodNullable
  +-- $ZodDefault
  +-- $ZodPrefault
  +-- $ZodNonOptional
  +-- $ZodSuccess
  +-- $ZodCatch
  +-- $ZodNaN
  +-- $ZodPipe
  |     +-- $ZodCodec
  +-- $ZodReadonly
  +-- $ZodTemplateLiteral
  +-- $ZodCustom
```

## Internals

All `zod/v4/core` subclasses contain a single property: `_zod`. This object holds the schema's internals, keeping the class interface clean for extension by downstream libraries.

### `_zod` Properties

- **`.def`** -- The schema's definition object (JSON-serializable, passed to constructor).
  - **`.def.type`** -- A string representing the schema type, e.g. `"string"`, `"object"`, `"array"`.
  - **`.def.checks`** -- An array of checks executed after parsing.
- **`.input`** -- Virtual property storing the schema's inferred input type.
- **`.output`** -- Virtual property storing the schema's inferred output type.
- **`.run()`** -- The schema's internal parser implementation.

### Traversing Schemas

Cast any schema to `$ZodTypes` and use `.def.type` to discriminate:

```typescript
export function walk(_schema: z.$ZodType) {
  const schema = _schema as z.$ZodTypes;
  const def = schema._zod.def;
  switch (def.type) {
    case "string": {
      // handle string schema
      break;
    }
    case "object": {
      // handle object schema
      break;
    }
  }
}
```

## `$ZodStringFormatTypes`

A union of all string format schema subclasses (extending `$ZodStringFormat`):

```typescript
export type $ZodStringFormatTypes =
  | $ZodGUID
  | $ZodUUID
  | $ZodEmail
  | $ZodURL
  | $ZodEmoji
  | $ZodNanoID
  | $ZodCUID
  | $ZodCUID2
  | $ZodULID
  | $ZodXID
  | $ZodKSUID
  | $ZodISODateTime
  | $ZodISODate
  | $ZodISOTime
  | $ZodISODuration
  | $ZodIPv4
  | $ZodIPv6
  | $ZodCIDRv4
  | $ZodCIDRv6
  | $ZodBase64
  | $ZodBase64URL
  | $ZodE164
  | $ZodJWT;
```

## Parsing

Since core schema classes have no methods, top-level functions are provided for parsing:

```typescript
import * as z from "zod/v4/core";

const schema = new z.$ZodString({ type: "string" });

z.parse(schema, "hello");
z.safeParse(schema, "hello");
await z.parseAsync(schema, "hello");
await z.safeParseAsync(schema, "hello");
```

## Checks

Every Zod schema contains an array of checks that perform post-parsing refinements (and occasionally mutations) without affecting the inferred type.

### `$ZodCheck<T>` Base Class

```typescript
export class $ZodCheck<in T = unknown> {
  _zod: { /* internals */ };
}
```

The `_zod` internals property contains:

- **`.def`** -- The check's definition (JSON-serializable).
  - **`.def.check`** -- A string representing the check type, e.g. `"min_length"`, `"less_than"`, `"string_format"`.
- **`.check()`** -- The check's validation logic.

### `$ZodChecks` Union

All first-party check subclasses:

```typescript
export type $ZodChecks =
  | $ZodCheckLessThan
  | $ZodCheckGreaterThan
  | $ZodCheckMultipleOf
  | $ZodCheckNumberFormat
  | $ZodCheckBigIntFormat
  | $ZodCheckMaxSize
  | $ZodCheckMinSize
  | $ZodCheckSizeEquals
  | $ZodCheckMaxLength
  | $ZodCheckMinLength
  | $ZodCheckLengthEquals
  | $ZodCheckProperty
  | $ZodCheckMimeType
  | $ZodCheckOverwrite
  | $ZodCheckStringFormat;
```

Discriminate between check types using `._zod.def.check`:

```typescript
const check = {} as z.$ZodChecks;
const def = check._zod.def;

switch (def.check) {
  case "less_than":
  case "greater_than":
    // handle numeric comparisons
    break;
  case "min_length":
  case "max_length":
    // handle length checks
    break;
}
```

### `$ZodStringFormatChecks`

String format check subclasses (extending `$ZodCheckStringFormat`):

```typescript
export type $ZodStringFormatChecks =
  | $ZodCheckRegex
  | $ZodCheckLowerCase
  | $ZodCheckUpperCase
  | $ZodCheckIncludes
  | $ZodCheckStartsWith
  | $ZodCheckEndsWith
  | $ZodGUID
  | $ZodUUID
  | $ZodEmail
  | $ZodURL
  | $ZodEmoji
  | $ZodNanoID
  | $ZodCUID
  | $ZodCUID2
  | $ZodULID
  | $ZodXID
  | $ZodKSUID
  | $ZodISODateTime
  | $ZodISODate
  | $ZodISOTime
  | $ZodISODuration
  | $ZodIPv4
  | $ZodIPv6
  | $ZodCIDRv4
  | $ZodCIDRv6
  | $ZodBase64
  | $ZodBase64URL
  | $ZodE164
  | $ZodJWT;
```

### Dual-Use: Type and Check

Some string format classes implement both `$ZodType` and `$ZodCheck` interfaces, meaning they can be used as either a schema type or a check:

```typescript
// as a type — standalone schema
z.email().parse("user@example.com");

// as a check — attached to a string schema
z.string().check(z.email()).parse("user@example.com");
```

When used as a type, both `._zod.parse` (the schema parser) and `._zod.check` (the check validation) are executed during parsing.

### Nested Discrimination for String Format Checks

Use a nested `switch` to distinguish between string format check subtypes:

```typescript
const check = {} as z.$ZodChecks;
const def = check._zod.def;

switch (def.check) {
  case "less_than":
  case "greater_than":
    // handle numeric checks
    break;
  case "string_format": {
    const formatCheck = check as z.$ZodStringFormatChecks;
    const formatCheckDef = formatCheck._zod.def;

    switch (formatCheckDef.format) {
      case "email":
      case "url":
        // handle specific string formats
        break;
    }
    break;
  }
}
```

## Errors

### `$ZodError<T>`

The base class for all Zod errors.

**Important:** `$ZodError` does **not** extend the built-in `Error` class for performance reasons. `instanceof Error` returns `false`.

- `zod` implements a subclass `ZodError` with additional convenience methods.
- `zod/mini` directly uses `$ZodError`.

```typescript
export class $ZodError<T = unknown> implements Error {
  public issues: $ZodIssue[];
}
```

## Issues

The `issues` property is an array of `$ZodIssue` objects. All issues extend the `$ZodIssueBase` interface:

```typescript
export interface $ZodIssueBase {
  readonly code?: string;
  readonly input?: unknown;
  readonly path: PropertyKey[];
  readonly message: string;
}
```

### Issue Subtypes

```typescript
export type $ZodIssue =
  | $ZodIssueInvalidType       // wrong type received
  | $ZodIssueTooBig            // value exceeds maximum
  | $ZodIssueTooSmall          // value below minimum
  | $ZodIssueInvalidStringFormat  // string format mismatch (email, url, etc.)
  | $ZodIssueNotMultipleOf     // not divisible by expected value
  | $ZodIssueUnrecognizedKeys  // extra keys in object
  | $ZodIssueInvalidUnion      // no union member matched
  | $ZodIssueInvalidKey        // invalid map/record key
  | $ZodIssueInvalidElement    // invalid set/array element
  | $ZodIssueInvalidValue      // invalid enum/literal value
  | $ZodIssueCustom;           // user-defined custom issue
```

## Related

- [Zod](../packages/zod.md)
- [Zod Mini](../packages/mini.md)
