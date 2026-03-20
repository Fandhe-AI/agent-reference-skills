# Zod — Defining Schemas (API)

| Name | Description | Path |
|------|-------------|------|
| Primitives | `z.string()`, `z.number()`, `z.boolean()` 等のプリミティブ、coercion、literals | [./primitives.md](./primitives.md) |
| Strings | 文字列バリデーション、トランスフォーム、フォーマット（email, uuid, url 等）、テンプレートリテラル | [./strings.md](./strings.md) |
| Numbers | `z.number()`, `z.int()`, `z.bigint()`, `z.nan()`, `z.date()` とバリデーション | [./numbers.md](./numbers.md) |
| Enums & Literals | `z.enum()`, `z.literal()`, `z.stringbool()`, `z.boolean()` | [./enums-and-literals.md](./enums-and-literals.md) |
| Objects | `z.object()`, `z.strictObject()`, `z.looseObject()`、再帰型、メソッド | [./objects.md](./objects.md) |
| Collections | `z.array()`, `z.tuple()`, `z.record()`, `z.map()`, `z.set()`, `z.file()` | [./collections.md](./collections.md) |
| Unions & Intersections | `z.union()`, `z.xor()`, `z.discriminatedUnion()`, `z.intersection()` | [./unions-and-intersections.md](./unions-and-intersections.md) |
| Special Types | optional, nullable, nullish, unknown, never, any, promise, instanceof, json, function, custom | [./special-types.md](./special-types.md) |
| Transforms & Refinements | `.refine()`, `.check()`, `.transform()`, `.pipe()`, `.default()`, `.catch()`, `.brand()`, `.readonly()` | [./transforms-and-refinements.md](./transforms-and-refinements.md) |
