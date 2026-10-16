# AOT Compilation

Zod can compile a schema ahead of time into a flat, loop-free validator that runs several times faster than the standard parser. Results and errors are identical.

## Signature / Usage

```typescript
import * as z from "zod";

const Player = z.object({
  username: z.string(),
  bio: z.string(),
  xp: z.number(),
  // ...20 more properties...
});

const CompiledPlayer = z.compile(Player);

Player.parse({ ... });
CompiledPlayer.parse({ ... }); // ~9x faster
```

A compiled schema is a Zod schema like any other: same methods (`.parse()`, `.safeParse()`, `.extend()`, `.optional()`, etc.), same inferred input and output types, same issues and error messages. Containers like objects and tuples benefit the most.

There are two ways to opt in.

## `z.compile()`

Compiles a single schema and returns a compiled copy. The original schema is unchanged.

Methods that derive a new schema (`.refine()`, `.extend()`, `.optional()`, `.meta()`, ...) return uncompiled schemas. Compile the final schema, not an intermediate:

```typescript
// the .refine() result is not compiled
const schema = z.compile(z.string()).refine((val) => val.length > 1);

// compile last
const schema2 = z.compile(z.string().refine((val) => val.length > 1));
```

## `import "zod/compile"`

Enables compilation globally. Every schema constructed after this import is compiled automatically the first time it parses. Compilation is lazy, so only schemas you actually parse with get compiled.

```typescript
import "zod/compile"; // must come before modules that define schemas
import * as z from "zod";

const schema = z.object({ name: z.string() });
schema.parse({ name: "ok" }); // compiled on first parse
```

As a Node.js CLI flag (guarantees it runs before any module defines a schema):

```sh
node --import zod/compile app.js   # ESM
node --require zod/compile app.cjs # CommonJS
```

Or set `preload` in `bunfig.toml` or `nub.jsonc`:

```jsonc
{
  "preload": ["zod/compile"]
}
```

This import is for applications, not libraries.

## Options / Props

`z.compile(schema, options)`

| Name | Type | Description |
| --- | --- | --- |
| strict | boolean | Throw instead of falling back to the uncompiled schema. `ZodCompileAsyncError` for async schemas, `ZodCompileUnsupportedError` for everything else. Thrown only under `strict`. |

```typescript
z.compile(Schema, { strict: true }); // throws ZodCompileAsyncError
```

## Notes

- How it works: `z.compile()` walks the schema once and produces flat, loop-free JavaScript executed via `new Function()` as a fast-path validator. Schemas "fast check" validity and fall back to the regular runtime logic on failure to produce granular errors.
- On invalid input the fallback runs the uncompiled schema, so the error is the uncompiled schema's error. Invalid inputs pay for both the fast path and the fallback, so compilation barely speeds up failures.
- Refinements and transforms run once on valid input, and at most twice on invalid input.
- Unsupported schemas make `z.compile()` return the original schema unchanged (e.g. `z.string().refine(async (val) => isAvailable(val))`):
  - `async` refinements, transforms, and checks
  - `z.xor()`
  - recursive schemas
  - `z.coerce.*`
  - checks with a custom `when`
  - `.catch()` given a callback (`.catch(value)` with a constant compiles normally)
- Inside an object, array, tuple, record, or intersection, an unsupported child runs on the standard parser while the surrounding structure stays compiled. A union with an unsupported member, a `.catch()` callback, or anything async anywhere in the subtree makes the whole schema fall back.
- Encoding (`z.encode()`, the codec `"backward"` direction) and async parsing always use the standard parser.
- Content Security Policy: compilation uses `new Function`, unavailable in CSP/no-`eval` environments. Global mode stands down when `z.config({ jitless: true })` is set. Calling `z.compile()` directly is an explicit opt-in and attempts code generation regardless of `jitless`; where the environment rejects `new Function`, the schema comes back uncompiled.
- Bundle size: the compiler adds about 7 KB gzipped (28 KB minified). A bundle that never calls `z.compile()` or imports `zod/compile` pays nothing (tree-shaken). Four-key object schema: Zod 24.1 KB without / 31.1 KB with compiler; Zod Mini 4.6 KB without / 13.2 KB with.
- Benchmarks (each schema measured alone in a tight loop): object 5 keys 1.8x, 10 keys 2.2x, 20 keys 5.0x, 50 keys 10.2x; tuple 1 item 2.2x, 3 items 2.5x, 5 items 3.0x, 10 items 3.7x.

## Related

- [Codecs](./codecs.md)
- [Metadata and Registries](./metadata.md)
