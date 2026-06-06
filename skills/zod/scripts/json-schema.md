# JSON Schema

Zod スキーマと JSON Schema の相互変換。

## Zod スキーマを JSON Schema に変換

```typescript
import * as z from "zod";

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

z.toJSONSchema(schema);
// => {
//   type: 'object',
//   properties: { name: { type: 'string' }, age: { type: 'number' } },
//   required: [ 'name', 'age' ],
//   additionalProperties: false,
// }
```

## ターゲットバージョンを指定して変換

```typescript
z.toJSONSchema(schema, { target: "draft-07" });
z.toJSONSchema(schema, { target: "draft-2020-12" });
z.toJSONSchema(schema, { target: "draft-04" });
z.toJSONSchema(schema, { target: "openapi-3.0" });
```

デフォルトは `"draft-2020-12"`。

## input 型で変換（デフォルトは output 型）

```typescript
z.toJSONSchema(schema, { io: "input" });
```

## 変換できない型を `{}` にフォールバック

```typescript
z.toJSONSchema(z.bigint(), { unrepresentable: "any" });
// => {}
```

デフォルト (`"throw"`) では変換できない型があるとエラーをスローする。

## レジストリを使った複数スキーマの変換

```typescript
import * as z from "zod";

z.globalRegistry.add(User, { id: "User" });
z.globalRegistry.add(Post, { id: "Post" });

z.toJSONSchema(z.globalRegistry);
```

## URI を完全修飾して変換

```typescript
z.toJSONSchema(z.globalRegistry, {
  uri: (id) => `https://example.com/${id}.json`,
});
```

## JSON Schema を Zod スキーマに変換（実験的）

> **警告**: この関数は実験的であり、将来のリリースで変更される可能性がある。

```typescript
import * as z from "zod";

const jsonSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
  },
  required: ["name", "age"],
};

const zodSchema = z.fromJSONSchema(jsonSchema);
```
