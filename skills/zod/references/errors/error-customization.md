# Error Customization

Customize validation error messages at the schema level, per-parse level, or globally, with full internationalization support.

## ZodError and Issues

Validation errors are instances of `z.core.$ZodError` (the `ZodError` class in the `zod` package is a subclass with additional convenience methods). Each error contains an `.issues` array where every issue has a human-readable `message` plus structured metadata.

```typescript
import * as z from "zod";

const result = z.string().safeParse(12);
// { success: false, error: ZodError }

result.error.issues;
// [
//   {
//     expected: 'string',
//     code: 'invalid_type',
//     path: [],
//     message: 'Invalid input: expected string, received number'
//   }
// ]
```

## The `error` Parameter

Virtually every Zod API accepts an optional error message as a string.

```typescript
z.string("Not a string!");
```

The custom error shows up as the `message` property of any validation issues originating from that schema.

```typescript
z.string("Not a string!").parse(12);
// throws ZodError {
//   issues: [
//     {
//       expected: 'string',
//       code: 'invalid_type',
//       path: [],
//       message: 'Not a string!'  // custom error message
//     }
//   ]
// }
```

All `z` functions and schema methods accept custom errors:

```typescript
z.string("Bad!");
z.string().min(5, "Too short!");
z.uuid("Bad UUID!");
z.iso.date("Bad date!");
z.array(z.string(), "Not an array!");
z.array(z.string()).min(5, "Too few items!");
z.set(z.string(), "Bad set!");
```

You can also pass a params object with an `error` property:

```typescript
z.string({ error: "Bad!" });
z.string().min(5, { error: "Too short!" });
z.uuid({ error: "Bad UUID!" });
z.iso.date({ error: "Bad date!" });
z.array(z.string(), { error: "Bad array!" });
z.array(z.string()).min(5, { error: "Too few items!" });
z.set(z.string(), { error: "Bad set!" });
```

## Error Map Functions

The `error` param optionally accepts a function (known as an **error map**). The error map runs at parse time if a validation error occurs.

```typescript
z.string({ error: () => `[${Date.now()}]: Validation failure.` });
```

> In Zod v3, there were separate params for `message` (a string) and `errorMap` (a function). These have been unified in Zod 4 as `error`.

## Context Object

The error map receives a context object (`iss`) with properties for customizing the error message based on the validation issue.

```typescript
z.string({
  error: (iss) =>
    iss.input === undefined ? "Field is required." : "Invalid input.",
});
```

### Context Properties

```typescript
z.string({
  error: (iss) => {
    iss.code;  // the issue code
    iss.input; // the input data
    iss.inst;  // the schema/check that originated this issue
    iss.schema; // the schema that owns this issue
    iss.path;  // the path of the error
  },
});
```

Unlike `iss.inst`, `iss.schema` is always the schema, even when a check originated the issue. Use it to read the owning schema's metadata:

```typescript
z.config({
  customError: (iss) => {
    const meta = iss.schema && z.globalRegistry.get(iss.schema);
    return `${meta?.title ?? "Field"} is invalid.`;
  },
});

z.string().min(5).meta({ title: "Password" }).safeParse("abc");
// => "Password is invalid."
```

### Schema-Specific Properties

Depending on the API, additional properties are available. Use TypeScript autocomplete to explore them.

```typescript
z.string().min(5, {
  error: (iss) => {
    // ...the same as above
    iss.minimum;   // the minimum value
    iss.inclusive;  // whether the minimum is inclusive
    return `Password must have ${iss.minimum} characters or more`;
  },
});
```

### Returning `undefined` for Selective Customization

Return `undefined` to skip customization and fall back to the default message (the next error map in the precedence chain).

```typescript
z.int64({
  error: (issue) => {
    // override too_big error message
    if (issue.code === "too_big") {
      return { message: `Value must be <${issue.maximum}` };
    }

    // defer to default
    return undefined;
  },
});
```

## Per-Parse Error Customization

Pass an error map into `.parse()` or `.safeParse()` to customize errors on a per-parse basis:

```typescript
const schema = z.string();

schema.parse(12, {
  error: (iss) => "per-parse custom error",
});
```

Per-parse error maps have **lower precedence** than schema-level custom messages:

```typescript
const schema = z.string({ error: "highest priority" });
const result = schema.safeParse(12, {
  error: (iss) => "lower priority",
});

result.error.issues;
// [{ message: "highest priority", ... }]
```

The `iss` object is a discriminated union of all possible issue types. Use the `code` property to discriminate between them:

```typescript
const result = schema.safeParse(12, {
  error: (iss) => {
    if (iss.code === "invalid_type") {
      return `invalid type, expected ${iss.expected}`;
    }
    if (iss.code === "too_small") {
      return `minimum is ${iss.minimum}`;
    }
    // ...
  },
});
```

## Include Input in Issues (`reportInput`)

By default, Zod does not include input data in issues to prevent unintentional logging of sensitive data. Use the `reportInput` flag to include it:

```typescript
z.string().parse(12, {
  reportInput: true,
});

// ZodError: [
//   {
//     "expected": "string",
//     "code": "invalid_type",
//     "input": 12,          // included with reportInput
//     "path": [],
//     "message": "Invalid input: expected string, received number"
//   }
// ]
```

## Global Error Customization

Use `z.config()` to set a global error map via the `customError` setting:

```typescript
z.config({
  customError: (iss) => {
    return "globally modified error";
  },
});
```

Global error messages have **lower precedence** than schema-level or per-parse error messages.

Use `code` to discriminate issue types in a global error map:

```typescript
z.config({
  customError: (iss) => {
    if (iss.code === "invalid_type") {
      return `invalid type, expected ${iss.expected}`;
    }
    if (iss.code === "too_small") {
      return `minimum is ${iss.minimum}`;
    }
    // ...
  },
});
```

## Error Precedence

When multiple error customizations are defined, the following precedence applies (highest to lowest priority):

1. **Schema-level error** -- Any error message hard-coded into a schema definition.
   ```typescript
   z.string("Not a string!");
   ```
2. **Per-parse error** -- A custom error map passed into `.parse()` or `.safeParse()`.
   ```typescript
   z.string().parse(12, {
     error: (iss) => "My custom error",
   });
   ```
3. **Global error map** -- A custom error map passed into `z.config()`.
   ```typescript
   z.config({
     customError: (iss) => "My custom error",
   });
   ```
4. **Locale error map** -- A locale loaded via `z.config()`.
   ```typescript
   z.config(z.locales.en());
   ```

## Internationalization (i18n)

Zod provides built-in locales exported from `zod/v4/core`. The `zod` package loads the `en` locale automatically. Zod Mini does not load any locale by default (all error messages default to `Invalid input`).

### Loading a Locale

```typescript
import * as z from "zod";
import { en } from "zod/locales";

z.config(en());
```

### Lazy Loading with Dynamic Imports

```typescript
import * as z from "zod";

async function loadLocale(locale: string) {
  const { default: locale } = await import(`zod/v4/locales/${locale}.js`);
  z.config(locale());
}

await loadLocale("fr");
```

### Using `z.locales`

All locales are also exported as `z.locales`. Rollup and Webpack tree-shake that down to the ones you use; esbuild (evanw/esbuild#1420) and Turbopack don't.

```typescript
import * as z from "zod";

z.config(z.locales.en());
```

### Parse Time vs Render Time

With your own translation function, the `error` param is called during `.parse()`, not when the schema is constructed, so a schema defined once picks up the current language on every parse. To translate at render time, translate the issue itself: `code` is the key, and the issue's other properties are the interpolation values.

```typescript
z.string().min(5, { error: (iss) => t("too_short", iss) }); // at parse time
result.error?.issues.map((iss) => t(iss.code, iss));        // at render time
```

### Available Locales

| Code   | Language             |
|--------|----------------------|
| `ar`   | Arabic               |
| `az`   | Azerbaijani          |
| `be`   | Belarusian           |
| `bg`   | Bulgarian            |
| `bn`   | Bengali              |
| `ca`   | Catalan              |
| `ckb`  | Kurdish (Central)    |
| `cs`   | Czech                |
| `da`   | Danish               |
| `de`   | German               |
| `el`   | Greek                |
| `en`   | English              |
| `eo`   | Esperanto            |
| `es`   | Spanish              |
| `fa`   | Farsi                |
| `fi`   | Finnish              |
| `fr`   | French               |
| `frCA` | Canadian French      |
| `gu`   | Gujarati             |
| `he`   | Hebrew               |
| `hi`   | Hindi                |
| `hr`   | Croatian             |
| `hu`   | Hungarian            |
| `hy`   | Armenian             |
| `id`   | Indonesian           |
| `is`   | Icelandic            |
| `it`   | Italian              |
| `ja`   | Japanese             |
| `ka`   | Georgian             |
| `km`   | Khmer                |
| `kn`   | Kannada              |
| `ko`   | Korean               |
| `lt`   | Lithuanian           |
| `mk`   | Macedonian           |
| `ms`   | Malay                |
| `ne`   | Nepali               |
| `nl`   | Dutch                |
| `nn`   | Norwegian Nynorsk    |
| `no`   | Norwegian            |
| `ota`  | Türkî                |
| `ps`   | Pashto               |
| `pl`   | Polish               |
| `pt`   | Portuguese           |
| `ptBR` | Brazilian Portuguese |
| `ro`   | Romanian             |
| `ru`   | Russian              |
| `sk`   | Slovak               |
| `sl`   | Slovenian            |
| `sv`   | Swedish              |
| `ta`   | Tamil                |
| `tg`   | Tajik (4.6.1)        |
| `th`   | Thai                 |
| `tk`   | Türkmen              |
| `tr`   | Türkçe               |
| `uk`   | Ukrainian            |
| `ur`   | Urdu                 |
| `uz`   | Uzbek                |
| `vi`   | Tiếng Việt           |
| `yo`   | Yorùbá               |
| `zhCN` | Simplified Chinese   |
| `zhTW` | Traditional Chinese  |

## Notes

- Since 4.6, `.safeParse()` builds its error lazily, so error maps (global, locale, and per-schema `error`) run on the first read of `result.error` rather than at parse time. `z.config()` changes made between the parse and the read take effect. An error map with a side effect never runs if nothing reads the error. `.parse()` is unaffected (it builds and throws immediately)
- `iss.schema` was added in 4.5 (expose the owning schema on check-originated issues)

## Related

- [Error Formatting](./error-formatting.md)
- [Zod Core Issue Types](../packages/core.md)
