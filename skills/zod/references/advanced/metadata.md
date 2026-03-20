# Metadata and Registries

Associate schemas with strongly-typed metadata for documentation, code generation, AI structured outputs, and form validation.

## Registries

Registries are collections of schemas, each associated with strongly-typed metadata.

### Creating a Registry

```typescript
import * as z from "zod";

const myRegistry = z.registry<{ description: string }>();
```

### Registry Methods

```typescript
const mySchema = z.string();

myRegistry.add(mySchema, { description: "A cool schema!" });
myRegistry.has(mySchema); // => true
myRegistry.get(mySchema); // => { description: "A cool schema!" }
myRegistry.remove(mySchema);
myRegistry.clear(); // wipe registry
```

TypeScript enforces that the metadata for each schema matches the registry's metadata type:

```typescript
myRegistry.add(mySchema, { description: "A cool schema!" }); // ok
myRegistry.add(mySchema, { description: 123 }); // error
```

### Special Handling for `id`

Zod registries treat the `id` property specially. An `Error` will be thrown if multiple schemas are registered with the same `id` value. This is true for all registries, including the global registry.

## `.register()` Method

The `.register()` method adds a schema to a registry inline. Unlike other Zod methods, `.register()` returns the **original schema** (not a new instance).

```typescript
const mySchema = z.string();

mySchema.register(myRegistry, { description: "A cool schema!" });
// => mySchema (same instance)
```

This lets you define metadata inline in your schemas:

```typescript
const mySchema = z.object({
  name: z.string().register(myRegistry, { description: "The user's name" }),
  age: z.number().register(myRegistry, { description: "The user's age" }),
});
```

### Generic Collections

If a registry is defined without a metadata type, you can use it as a generic "collection" with no metadata required:

```typescript
const myRegistry = z.registry();

myRegistry.add(z.string());
myRegistry.add(z.number());
```

## `z.globalRegistry`

Zod provides a global registry that can be used to store metadata for JSON Schema generation or other purposes. It accepts the `GlobalMeta` interface:

```typescript
export interface GlobalMeta {
  id?: string;
  title?: string;
  description?: string;
  deprecated?: boolean;
  [k: string]: unknown;
}
```

Register metadata in `z.globalRegistry`:

```typescript
import * as z from "zod";

const emailSchema = z.email().register(z.globalRegistry, {
  id: "email_address",
  title: "Email address",
  description: "Your email address",
  examples: ["first.last@example.com"],
});
```

### Extending `GlobalMeta` via Declaration Merging

To globally augment the `GlobalMeta` interface, use declaration merging. Creating a `zod.d.ts` file in your project root is a common convention:

```typescript
// zod.d.ts
declare module "zod" {
  interface GlobalMeta {
    // add new fields here
    examples?: unknown[];
  }
}

// forces TypeScript to consider the file a module
export {};
```

## `.meta()` Method

The `.meta()` method is a convenience method for registering a schema in `z.globalRegistry`.

### Setting Metadata

```typescript
const emailSchema = z.email().meta({
  id: "email_address",
  title: "Email address",
  description: "Please enter a valid email address",
});
```

### Getting Metadata

Calling `.meta()` without an argument retrieves the metadata for a schema:

```typescript
emailSchema.meta();
// => { id: "email_address", title: "Email address", ... }
```

Metadata is associated with a specific schema instance. Zod methods are immutable and always return a new instance:

```typescript
const A = z.string().meta({ description: "A cool string" });
A.meta(); // => { description: "A cool string" }

const B = A.refine((_) => true);
B.meta(); // => undefined
```

## `.describe()` Shorthand

The `.describe()` method is a shorthand for registering a schema in `z.globalRegistry` with just a `description` field. It exists for compatibility with Zod 3, but `.meta()` is now the recommended approach.

```typescript
const emailSchema = z.email();
emailSchema.describe("An email address");

// equivalent to
emailSchema.meta({ description: "An email address" });
```

## Custom Registries

### Referencing Inferred Types

The metadata type can reference the inferred type of a schema using `z.$output` and `z.$input`:

```typescript
import * as z from "zod";

type MyMeta = { examples: z.$output[] };
const myRegistry = z.registry<MyMeta>();

myRegistry.add(z.string(), { examples: ["hello", "world"] });
myRegistry.add(z.number(), { examples: [1, 2, 3] });
```

`z.$output` references the schema's inferred output type (`z.infer<typeof schema>`). `z.$input` references the input type.

### Constraining Schema Types

Pass a second generic to `z.registry()` to constrain which schema types can be added:

```typescript
import * as z from "zod";

const myRegistry = z.registry<{ description: string }, z.ZodString>();

myRegistry.add(z.string(), { description: "A string" }); // ok
myRegistry.add(z.number(), { description: "A number" }); // error
// ^ 'ZodNumber' is not assignable to parameter of type 'ZodString'
```

## Related

- [JSON Schema](./json-schema.md)
- [Codecs](./codecs.md)
- [Defining Schemas](../api/README.md)
