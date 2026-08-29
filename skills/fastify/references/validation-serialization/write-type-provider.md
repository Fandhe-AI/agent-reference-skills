---
source: https://fastify.dev/docs/latest/Guides/Write-Type-Provider/
---

# Write Your Own Type Provider

Guidance for implementing a custom [Type Provider](./type-providers.md) interface, focused on avoiding TypeScript assignability issues.

## Signature / Usage

```ts
export interface SubstitutableTypeProvider extends FastifyTypeProvider {
  // good, anything can be assigned to `unknown`
  validator: this['schema'] extends /** custom check here**/ ? /** narrowed type here **/ : unknown;
  serializer: this['schema'] extends /** custom check here**/ ? /** narrowed type here **/ : unknown;
}
```

## Notes

- Type narrowing in a custom type provider interface should reduce down to `unknown`, not `never`. Certain `FastifyInstance` methods are contravariant on `TypeProvider`, so a custom provider must remain substitutable with `FastifyTypeProviderDefault`.
- A `never`-based narrowing (`validator: ... extends check ? narrowed : never`) makes the interface non-substitutable — `FastifyTypeProviderDefault` will not be assignable to it, since nothing is assignable to `never` except itself.

## Related

- [Type Providers](./type-providers.md)
