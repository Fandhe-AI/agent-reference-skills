# Ecosystem

Overview of the Zod ecosystem including integrations, tools, and community resources.

> **Note** -- The Ecosystem section was wiped clean with the release of Zod 4. Libraries listed here have been updated to work with Zod 4. For libraries that work with Zod 3, refer to [v3.zod.dev](https://v3.zod.dev/?id=ecosystem).

## Resources

- [Total TypeScript Zod Tutorial](https://www.totaltypescript.com/tutorials/zod) by [@mattpocockuk](https://x.com/mattpocockuk)
- [Fixing TypeScript's Blindspot: Runtime Typechecking](https://www.youtube.com/watch?v=rY_XqfSHock) by [@jherr](https://x.com/jherr)
- [Validate Environment Variables With Zod](https://catalins.tech/validate-environment-variables-with-zod/) by [@catalinmpit](https://x.com/catalinmpit)

## API Libraries

| Name | Description |
|------|-------------|
| [`tRPC`](https://github.com/trpc/trpc) | Build end-to-end typesafe APIs without GraphQL. |
| [`upfetch`](https://github.com/L-Blondy/up-fetch) | Advanced fetch client builder. |
| [`nestjs-zod`](https://github.com/BenLorantfy/nestjs-zod) | Integrate nestjs and zod. Create nestjs DTOs using zod, serialize with zod, and generate OpenAPI documentation from zod schemas. |
| [`Express Zod API`](https://github.com/RobinTail/express-zod-api) | Build Express-based API with I/O validation and middlewares, OpenAPI docs and type-safe client. |
| [`Zod Sockets`](https://github.com/RobinTail/zod-sockets) | Socket.IO solution with I/O validation, an AsyncAPI generator, and a type-safe events map. |
| [`GQLoom`](https://gqloom.dev/) | Weave GraphQL schema and resolvers using Zod. |
| [`Zod JSON-RPC`](https://github.com/danscan/zod-jsonrpc) | Type-safe JSON-RPC 2.0 client/server library using Zod. |
| [`oRPC`](https://orpc.unnoq.com/) | Typesafe APIs Made Simple. |

## Form Integrations

| Name | Description |
|------|-------------|
| [`Superforms`](https://superforms.rocks) | Making SvelteKit forms a pleasure to use! |
| [`conform`](https://conform.guide/api/zod/parseWithZod) | A type-safe form validation library utilizing web fundamentals to progressively enhance HTML Forms with full support for server frameworks like Remix and Next.js. |
| [`zod-validation-error`](https://github.com/causaly/zod-validation-error) | Generate user-friendly error messages from ZodError instances. |
| [`regle`](https://github.com/victorgarciaesgi/regle) | Headless form validation library for Vue.js. |
| [`svelte-jsonschema-form`](https://x0k.dev/svelte-jsonschema-form/validators/zod4/) | Svelte 5 library for creating forms based on JSON schema. |
| [`frrm`](https://www.npmjs.com/package/frrm) | Tiny 0.5kb Zod-based, HTML form abstraction that goes brr. |
| [`react-f3`](https://www.npmjs.com/package/react-f3) | Components, hooks & utilities for creating and managing delightfully simple form experiences in React. |

## Zod to X

| Name | Description |
|------|-------------|
| [`prisma-zod-generator`](https://github.com/omar-dulaimi/prisma-zod-generator) | Generate Zod schemas from Prisma schema with full ZodObject method support. |
| [`zod-openapi`](https://github.com/samchungy/zod-openapi) | Use Zod Schemas to create OpenAPI v3.x documentation. |
| [`convex-helpers`](https://github.com/get-convex/convex-helpers/blob/main/packages/convex-helpers/README.md#zod-validation) | Use Zod to validate arguments and return values of Convex functions, and to create Convex database schemas. |
| [`@traversable/zod`](https://github.com/traversable/schema/tree/main/packages/zod) | Build your own "Zod to x" library, or pick one of 25+ off-the-shelf transformers. |
| [`zod2md`](https://github.com/matejchalk/zod2md) | Generate Markdown docs from Zod schemas. |
| [`fastify-zod-openapi`](https://github.com/samchungy/fastify-zod-openapi) | Fastify type provider, validation, serialization and @fastify/swagger support for Zod schemas. |
| [`zod-to-mongo-schema`](https://github.com/udohjeremiah/zod-to-mongo-schema) | Convert Zod schemas to MongoDB-compatible JSON Schemas effortlessly. |

## X to Zod

| Name | Description |
|------|-------------|
| [`orval`](https://github.com/orval-labs/orval) | Generate Zod schemas from OpenAPI schemas. |
| [`Hey API`](https://heyapi.dev/openapi-ts/plugins/zod) | The OpenAPI to TypeScript codegen. Generate clients, SDKs, validators, and more. |
| [`kubb`](https://github.com/kubb-labs/kubb) | The ultimate toolkit for working with APIs. |
| [`Prisma Zod Generator`](https://github.com/omar-dulaimi/prisma-zod-generator) | Generates Zod schemas with input/result/pure variants, minimal/full/custom, selective emit/filtering, single/multi-file output, @zod rules, relation depth guards. |
| [`convex-helpers`](https://github.com/get-convex/convex-helpers/blob/main/packages/convex-helpers/README.md#zod-validation) | Generate Zod schemas from Convex validators. |
| [`DRZL`](https://github.com/use-drzl/drzl) | Drizzle ORM toolkit that can generate Zod validators from schema(s), plus typed services and strongly typed routers (oRPC/tRPC/etc). |
| [`valype`](https://github.com/yuzheng14/valype) | Typescript's type definition to runtime validator (including zod). |
| [`Hono Takibi`](https://github.com/nakita628/hono-takibi) | Hono Takibi is a code generator from OpenAPI to @hono/zod-openapi. |

## Mocking Libraries

| Name | Description |
|------|-------------|
| [`@traversable/zod-test`](https://github.com/traversable/schema/tree/main/packages/zod-test) | Random zod schema generator built for fuzz testing; includes generators for both valid and invalid data. |
| [`zod-schema-faker`](https://github.com/soc221b/zod-schema-faker) | Generate mock data from zod schemas. Powered by @faker-js/faker and randexp.js. |
| [`zocker`](https://zocker.sigrist.dev) | Generates valid, semantically meaningful data for your Zod schemas. |

## Powered by Zod

| Name | Description |
|------|-------------|
| [`Composable Functions`](https://github.com/seasonedcc/composable-functions) | Types and functions to make composition easy and safe. |
| [`zod-config`](https://github.com/alexmarqs/zod-config) | Load configurations across multiple sources with flexible adapters, ensuring type safety with Zod. |
| [`zod-xlsx`](https://github.com/sidwebworks/zod-xlsx) | A xlsx based resource validator using Zod schemas for data imports and more. |
| [`Fn Sphere`](https://github.com/lawvs/fn-sphere) | A Zod-first toolkit for building powerful, type-safe filter experiences across web apps. |
| [`zodgres`](https://github.com/endel/zodgres) | Postgres.js + Zod: Database collections with static type inference and automatic migrations. |
| [`bupkis`](https://github.com/boneskull/bupkis) | Uncommonly extensible assertions for the beautiful people. |

## Zod Utilities

| Name | Description |
|------|-------------|
| [`zod-playground`](https://github.com/marilari88/zod-playground) | Interactive playground for testing and exploring Zod and Zod mini schemas in real-time. |
| [`zod-ir`](https://github.com/Reza-kh80/zod-ir) | Comprehensive validation for Iranian data structures (National Code, Bank Cards, Sheba, Crypto, etc) with smart metadata extraction (Bank Names, Logos). Zero dependencies. |
| [`eslint-plugin-zod-x`](https://github.com/marcalexiei/eslint-plugin-zod-x) | ESLint plugin that adds custom linting rules to enforce best practices when using Zod. |
| [`eslint-plugin-import-zod`](https://github.com/samchungy/eslint-plugin-import-zod) | ESLint plugin to enforce namespace imports for Zod. |
| [`Zod Compare`](https://github.com/lawvs/zod-compare) | A utility library for recursively comparing Zod schemas. |
| [`babel-plugin-zod-hoist`](https://github.com/gajus/babel-plugin-zod-hoist) | Babel plugin that optimizes Zod performance by hoisting schema definitions to the top of the file, avoiding repeated initialization overhead. |

## Related

- [For Library Authors](../ecosystem/library-authors.md)
