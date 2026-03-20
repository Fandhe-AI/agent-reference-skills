# Introduction

Zod is a TypeScript-first schema validation library with static type inference.

## What is Zod

Zod lets you define _schemas_ to validate data, from a simple `string` to a complex nested object. When you parse data with a Zod schema, it validates the input and returns a strongly-typed, deep clone of the data you can use with confidence.

```ts
import { z } from "zod";

const User = z.object({
  username: z.string(),
  xp: z.number(),
});

// parse and validate unknown data
const data = User.parse({ username: "billie", xp: 100 });

// Zod infers the static type
// so you can use it with confidence :)
console.log(data.name);
```

## Features

- Zero external dependencies
- Works in Node.js and all modern browsers
- Tiny: 2kb core bundle (gzipped)
- Immutable API: methods return a new instance
- Concise interface
- Works with TypeScript and plain JS
- Built-in JSON Schema conversion
- Extensive ecosystem

## Installation

Install via npm:

```bash
npm install zod
```

Zod is also available as `@zod/zod` on [jsr.io](https://jsr.io/@zod/zod):

```bash
npx jsr add @zod/zod
```

## Requirements

Zod is tested against **TypeScript v5.5** and later. Older versions may work but are not officially supported.

### Strict Mode

You must enable `strict` mode in your `tsconfig.json`. This is a best practice for all TypeScript projects.

```jsonc
// tsconfig.json
{
  // ...
  "compilerOptions": {
    // ...
    "strict": true
  }
}
```

## Ecosystem

- [tRPC](https://trpc.io) - End-to-end typesafe APIs, with support for Zod schemas
- [React Hook Form](https://react-hook-form.com) - Hook-based form validation with a [Zod resolver](https://react-hook-form.com/docs/useform#resolver)
- [zshy](https://github.com/colinhacks/zshy) - Originally created as Zod's internal build tool. Bundler-free, batteries-included build tool for TypeScript libraries. Powered by `tsc`.

## Related

- [Basic Usage](./basic-usage.md)
