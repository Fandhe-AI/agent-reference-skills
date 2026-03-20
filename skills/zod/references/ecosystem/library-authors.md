# For Library Authors

Guidelines and best practices for library authors integrating with Zod.

> **Update -- July 10th, 2025:** Zod `4.0.0` has been released on `npm`. This completes the incremental rollout process. To add support, bump your peer dependency to include `zod@^4.0.0`. If you'd already implemented Zod 4 support using the `"zod/v4/core"` subpath, no other code changes should be necessary. This should not require a major version bump in your library.

## Do I Need to Depend on Zod?

First, make sure you actually need to depend on Zod.

If you're building a library that accepts user-defined schemas to perform black-box validation, you may not need to integrate with Zod specifically. Instead look into [Standard Schema](https://standardschema.dev/). It's a shared interface implemented by most popular validation libraries in the TypeScript ecosystem (see the [full list](https://standardschema.dev/#what-schema-libraries-implement-the-spec)), including Zod.

The Standard Schema spec works great if you accept user-defined schemas and treat them like "black box" validators. Given any compliant library, you can extract inferred input/output types, validate inputs, and get back a standardized error.

If you need Zod-specific functionality, read on.

## How to Configure Peer Dependencies

Any library built on top of Zod should include `"zod"` in `"peerDependencies"`. This lets your users "bring their own Zod".

```jsonc
// package.json
{
  // ...
  "peerDependencies": {
    "zod": "^3.25.0 || ^4.0.0" // the "zod/v4" subpath was added in 3.25.0
  }
}
```

During development, you need to meet your own peer dependency requirement. Add `"zod"` to your `"devDependencies"` as well:

```jsonc
// package.json
{
  "peerDependencies": {
    "zod": "^3.25.0 || ^4.0.0"
  },
  "devDependencies": {
    // generally, you should develop against the latest version of Zod
    "zod": "^3.25.0 || ^4.0.0"
  }
}
```

## How to Support Zod 4

To support Zod 4, update the minimum version for your `"zod"` peer dependency to `^3.25.0 || ^4.0.0`.

```jsonc
// package.json
{
  // ...
  "peerDependencies": {
    "zod": "^3.25.0 || ^4.0.0"
  }
}
```

Starting with `v3.25.0`, the Zod 4 core package is available at the `"zod/v4/core"` subpath. Read the [Versioning in Zod 4](https://github.com/colinhacks/zod/issues/4371) writeup for full context on this versioning approach.

```ts
import * as z4 from "zod/v4/core";
```

### Approved Subpaths

Import from these subpaths only. Think of them like "permalinks" to their respective Zod versions. These will remain available forever.

- `"zod/v3"` for Zod 3
- `"zod/v4/core"` for the Zod 4 Core package

### Subpaths to Avoid

You generally should not be importing from any other paths. The Zod Core library is a shared library that undergirds both Zod 4 Classic and Zod 4 Mini. It's generally a bad idea to implement any functionality that is specific to one or the other. Do **not** import from these subpaths:

- `"zod"` -- In 3.x releases, this exports Zod 3. In 4.x releases, this will export Zod 4. Use the permalinks instead.
- `"zod/v4"` and `"zod/v4/mini"` -- These subpaths are the homes of Zod 4 Classic and Mini, respectively. If you want your library to work with both Zod and Zod Mini, you should build against the base classes defined in `"zod/v4/core"`. If you reference classes from the `"zod/v4"` module, your library will not work with Zod Mini, and vice versa. Use `"zod/v4/core"` instead, which exports the `$`-prefixed subclasses that are extended by Zod Classic and Zod Mini. The internals of the classic and mini subclasses are identical; they only differ in which helper methods they implement.

## Do I Need to Publish a New Major Version?

No, you should not need to publish a new major version of your library to support Zod 4 (unless you are dropping support for Zod 3, which is not recommended).

You will need to bump your peer dependency to `^3.25.0`, thus your users will need to `npm upgrade zod`. But there were no breaking changes made to Zod 3 between `zod@3.24` and `zod@3.25`; in fact, there were no code changes whatsoever. As no code changes will be required on the part of your users, this does not constitute a breaking change. Publishing a new major version is not recommended.

## How to Support Zod 3 and Zod 4 Simultaneously

Starting in `v3.25.0`, the package contains copies of both Zod 3 and Zod 4 at their respective subpaths. This makes it easy to support both versions simultaneously.

```ts
import * as z3 from "zod/v3";
import * as z4 from "zod/v4/core";

type Schema = z3.ZodTypeAny | z4.$ZodType;

function acceptUserSchema(schema: z3.ZodTypeAny | z4.$ZodType) {
  // ...
}
```

### Differentiating at Runtime

To differentiate between Zod 3 and Zod 4 schemas at runtime, check for the `"_zod"` property. This property is only defined on Zod 4 schemas.

```ts
import type * as z3 from "zod/v3";
import type * as z4 from "zod/v4/core";

declare const schema: z3.ZodTypeAny | z4.$ZodType;

if ("_zod" in schema) {
  schema._zod.def; // Zod 4 schema
} else {
  schema._def; // Zod 3 schema
}
```

## How to Support Zod and Zod Mini Simultaneously

Your library code should only import from `"zod/v4/core"`. This sub-package defines the interfaces, classes, and utilities that are shared between Zod and Zod Mini.

```ts
// library code
import * as z4 from "zod/v4/core";

export function acceptObjectSchema<T extends z4.$ZodObject>(schema: T) {
  // parse data
  z4.parse(schema, { /* somedata */ });
  // inspect internals
  schema._zod.def.shape;
}
```

By building against the shared base interfaces, you can reliably support both sub-packages simultaneously. The function above can accept both Zod and Zod Mini schemas:

```ts
// user code
import { acceptObjectSchema } from "your-library";

// Zod 4
import * as z from "zod";
acceptObjectSchema(z.object({ name: z.string() }));

// Zod 4 Mini
import * as zm from "zod/mini";
acceptObjectSchema(zm.object({ name: zm.string() }));
```

Refer to the [Zod Core](https://zod.dev/packages/core) page for more information on the contents of the core sub-library.

## How to Accept User-Defined Schemas

Accepting user-defined schemas is a fundamental operation for any library built on Zod.

### Avoid Parameterized `$ZodType`

When starting out, it may be tempting to write a function that accepts a Zod schema like this:

```ts
import * as z4 from "zod/v4/core";

function inferSchema<T>(schema: z4.$ZodType<T>) {
  return schema;
}
```

This approach is **incorrect**, and limits TypeScript's ability to properly infer the argument. No matter what you pass in, the type of `schema` will be an instance of `$ZodType`:

```ts
inferSchema(z.string());
// => $ZodType<string>
```

This loses type information, namely *which subclass* the input actually is (in this case, `ZodString`). That means you cannot call any string-specific methods like `.min()` on the result of `inferSchema`.

### Use `extends` Constraints Instead

Your generic parameter should extend the core Zod schema interface:

```ts
function inferSchema<T extends z4.$ZodType>(schema: T) {
  return schema;
}

inferSchema(z.string());
// => ZodString
```

### Constraining to a Specific Subclass

To constrain the input schema to a specific subclass:

```ts
import * as z4 from "zod/v4/core";

// only accepts object schemas
function inferSchema<T extends z4.$ZodObject>(schema: T) {
  return schema;
}
```

### Constraining the Output Type

To constrain the inferred output type of the input schema:

```ts
import * as z4 from "zod/v4/core";

// only accepts string schemas
function inferSchema<T extends z4.$ZodType<string>>(schema: T) {
  return schema;
}

inferSchema(z.string()); // ok
inferSchema(z.number());
// Error: The types of '_zod.output' are incompatible between these types.
// Type 'number' is not assignable to type 'string'
```

## Top-Level Parsing Functions

To parse data with the schema, use the top-level `z4.parse` / `z4.safeParse` / `z4.parseAsync` / `z4.safeParseAsync` functions. The `z4.$ZodType` subclass has no methods on it. The usual parsing methods are implemented by Zod and Zod Mini, but are not available in Zod Core.

```ts
function parseData<T extends z4.$ZodType>(data: unknown, schema: T): z4.output<T> {
  return z4.parse(schema, data);
}

parseData("sup", z.string());
// => string
```

## Related

- [Ecosystem](../ecosystem/ecosystem.md)
