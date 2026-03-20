# Types

TypeDoc の型システム。TypeScript の型を表現する 18 の Type サブクラス。

## シグネチャ

### 基底クラス: Type

```typescript
abstract class Type {
  abstract readonly type: string;

  // 共通メソッド
  toString(): string;
  stringify(context: TypeContext): string;
  visit<T, A extends unknown[]>(visitor: TypeVisitor<T, A>, ...args: A): T;
  estimatePrintWidth(): number;
  toObject(serializer: Serializer): JSONOutput.SomeType;
  fromObject(deserializer: Deserializer, obj: JSONOutput.SomeType): void;

  // 保護メソッド
  protected abstract getTypeString(): string;
  abstract needsParenthesis(context: TypeContext): boolean;
}
```

## 主要メソッド

### Type (基底クラス) 共通メソッド

| メソッド | シグネチャ | 説明 |
|---------|----------|------|
| `toString` | `(): string` | 型の文字列表現を返す |
| `stringify` | `(context: TypeContext): string` | コンテキストに応じた文字列表現 |
| `visit` | `<T>(visitor: TypeVisitor<T>): T` | ビジターパターンで型を処理 |
| `estimatePrintWidth` | `(): number` | 1行で印字した場合の推定幅 |
| `toObject` | `(serializer: Serializer): JSONOutput.SomeType` | JSON にシリアライズ |
| `fromObject` | `(de: Deserializer, obj): void` | JSON からデシリアライズ |
| `needsParenthesis` | `(context: TypeContext): boolean` | 括弧が必要か判定 |

## 全 18 サブクラス

### ArrayType

配列型を表現する (`string[]`)。

```typescript
class ArrayType extends Type {
  readonly type: "array";
  elementType: SomeType;

  constructor(elementType: SomeType);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `elementType` | `SomeType` | 配列の要素型 |

---

### ConditionalType

条件型を表現する (`T extends U ? X : Y`)。

```typescript
class ConditionalType extends Type {
  readonly type: "conditional";
  checkType: SomeType;
  extendsType: SomeType;
  trueType: SomeType;
  falseType: SomeType;

  constructor(
    checkType: SomeType,
    extendsType: SomeType,
    trueType: SomeType,
    falseType: SomeType
  );
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `checkType` | `SomeType` | 評価される型 |
| `extendsType` | `SomeType` | テスト対象の制約型 |
| `trueType` | `SomeType` | 条件が真の場合の結果型 |
| `falseType` | `SomeType` | 条件が偽の場合の結果型 |

---

### IndexedAccessType

インデックスアクセス型を表現する (`T[K]`)。

```typescript
class IndexedAccessType extends Type {
  readonly type: "indexedAccess";
  objectType: SomeType;
  indexType: SomeType;

  constructor(objectType: SomeType, indexType: SomeType);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `objectType` | `SomeType` | アクセス対象のオブジェクト型 |
| `indexType` | `SomeType` | インデックスの型 |

---

### InferredType

推論型を表現する (`infer T`)。

```typescript
class InferredType extends Type {
  readonly type: "inferred";
  name: string;
  constraint?: SomeType;

  constructor(name: string, constraint?: SomeType);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `name` | `string` | 推論される型変数名 |
| `constraint` | `SomeType?` | オプションの制約 |

---

### IntersectionType

交差型を表現する (`A & B`)。

```typescript
class IntersectionType extends Type {
  readonly type: "intersection";
  types: SomeType[];

  constructor(types: SomeType[]);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `types` | `SomeType[]` | 交差される型の配列 |

---

### IntrinsicType

組み込み型を表現する (`string`, `number`, `boolean` など)。

```typescript
class IntrinsicType extends Type {
  readonly type: "intrinsic";
  name: string;

  constructor(name: string);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `name` | `string` | 組み込み型の名前 (`"string"`, `"number"` など) |

---

### LiteralType

リテラル型を表現する (`"hello"`, `42`, `true` など)。

```typescript
class LiteralType extends Type {
  readonly type: "literal";
  value: string | number | bigint | boolean | null;

  constructor(value: string | number | bigint | boolean | null);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `value` | `string \| number \| bigint \| boolean \| null` | リテラル値 |

---

### MappedType

マップ型を表現する (`{ [K in T]: U }`)。

```typescript
class MappedType extends Type {
  readonly type: "mapped";
  parameter: string;
  parameterType: SomeType;
  templateType: SomeType;
  readonlyModifier?: "+" | "-";
  optionalModifier?: "+" | "-";
  nameType?: SomeType;

  constructor(
    parameter: string,
    parameterType: SomeType,
    templateType: SomeType,
    readonlyModifier?: "+" | "-",
    optionalModifier?: "+" | "-",
    nameType?: SomeType
  );
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `parameter` | `string` | マップ変数名 |
| `parameterType` | `SomeType` | パラメータの制約型 |
| `templateType` | `SomeType` | テンプレート結果型 |
| `readonlyModifier` | `"+" \| "-"?` | readonly 修飾子 |
| `optionalModifier` | `"+" \| "-"?` | optional 修飾子 |
| `nameType` | `SomeType?` | プロパティ名のリマッピング型 |

---

### OptionalType

オプション型を表現する (タプル内の `T?`)。

```typescript
class OptionalType extends Type {
  readonly type: "optional";
  elementType: SomeType;

  constructor(elementType: SomeType);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `elementType` | `SomeType` | オプションの要素型 |

---

### PredicateType

型述語を表現する (`x is string`)。

```typescript
class PredicateType extends Type {
  readonly type: "predicate";
  name: string;
  asserts: boolean;
  targetType?: SomeType;

  constructor(name: string, asserts: boolean, targetType?: SomeType);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `name` | `string` | パラメータ名 |
| `asserts` | `boolean` | `asserts` キーワードの有無 |
| `targetType` | `SomeType?` | 述語の対象型 |

---

### QueryType

型クエリを表現する (`typeof X`)。

```typescript
class QueryType extends Type {
  readonly type: "query";
  queryType: ReferenceType;

  constructor(queryType: ReferenceType);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `queryType` | `ReferenceType` | クエリ対象の参照型 |

---

### ReferenceType

他の Reflection を参照する型を表現する (クラス、インターフェース、列挙型など)。

```typescript
class ReferenceType extends Type {
  readonly type: "reference";
  name: string;
  typeArguments?: SomeType[];
  highlightedProperties?: Map<string, CommentDisplayPart[]>;
  qualifiedName: string;
  externalUrl?: string;
  package?: string;
  refersToTypeParameter: boolean;
  preferValues: boolean;

  // アクセサ
  get reflection(): Reflection | undefined;
  get symbolId(): ReflectionSymbolId | undefined;

  // 静的ファクトリメソッド
  static createResolvedReference(
    name: string,
    target: Reflection | ReflectionId,
    project: ProjectReflection
  ): ReferenceType;

  static createUnresolvedReference(
    name: string,
    target: ReflectionSymbolId,
    project: ProjectReflection,
    qualifiedName: string
  ): ReferenceType;

  static createBrokenReference(
    name: string,
    project: ProjectReflection,
    packageName?: string
  ): ReferenceType;

  // メソッド
  toDeclarationReference(): DeclarationReference;
  isIntentionallyBroken(): boolean;
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `name` | `string` | 参照先の型名 |
| `typeArguments` | `SomeType[]?` | ジェネリック型引数 |
| `qualifiedName` | `string` | 定義ファイルからの完全修飾名 |
| `externalUrl` | `string?` | 外部プロジェクトの URL |
| `package` | `string?` | 参照先のパッケージ名 |
| `reflection` | `Reflection?` (アクセサ) | 解決された Reflection |
| `symbolId` | `ReflectionSymbolId?` (アクセサ) | 未解決の場合のシンボル ID |

---

### RestType

残余型を表現する (`...T`)。

```typescript
class RestType extends Type {
  readonly type: "rest";
  elementType: SomeType;

  constructor(elementType: SomeType);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `elementType` | `SomeType` | 残余パラメータの要素型 |

---

### TemplateLiteralType

テンプレートリテラル型を表現する (`` `hello${string}` ``)。

```typescript
class TemplateLiteralType extends Type {
  readonly type: "templateLiteral";
  head: string;
  tail: [SomeType, string][];

  constructor(head: string, tail: [SomeType, string][]);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `head` | `string` | テンプレートの先頭文字列 |
| `tail` | `[SomeType, string][]` | 型と文字列のペア配列（補間部分） |

---

### TupleType

タプル型を表現する (`[string, number]`)。

```typescript
class TupleType extends Type {
  readonly type: "tuple";
  elements: SomeType[];

  constructor(elements: SomeType[]);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `elements` | `SomeType[]` | タプルの要素型の順序付き配列 |

---

### TypeOperatorType

型演算子を表現する (`keyof T`, `unique T`, `readonly T`)。

```typescript
class TypeOperatorType extends Type {
  readonly type: "typeOperator";
  operator: "keyof" | "unique" | "readonly";
  target: SomeType;

  constructor(operator: "keyof" | "unique" | "readonly", target: SomeType);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `operator` | `"keyof" \| "unique" \| "readonly"` | 演算子の種類 |
| `target` | `SomeType` | 演算対象の型 |

---

### UnionType

共用体型を表現する (`A | B`)。

```typescript
class UnionType extends Type {
  readonly type: "union";
  types: SomeType[];
  elementSummaries?: CommentDisplayPart[][];

  constructor(types: SomeType[]);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `types` | `SomeType[]` | 共用体を構成する型の配列 |
| `elementSummaries` | `CommentDisplayPart[][]?` | 各メンバーのドキュメント（型エイリアスでのみ有効） |

---

### UnknownType

未知の型を表現する。TypeDoc が認識できない型の場合に使用される。

```typescript
class UnknownType extends Type {
  readonly type: "unknown";
  name: string;

  constructor(name: string);
}
```

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `name` | `string` | 型のテキスト表現 |

## コード例

### ビジターパターンによる型処理

```typescript
import { Models } from "typedoc";

function processType(type: Models.SomeType): string {
  return type.visit({
    array(t) {
      return `Array of ${processType(t.elementType)}`;
    },
    union(t) {
      return t.types.map(processType).join(" | ");
    },
    intersection(t) {
      return t.types.map(processType).join(" & ");
    },
    reference(t) {
      const args = t.typeArguments
        ? `<${t.typeArguments.map(processType).join(", ")}>`
        : "";
      return `${t.name}${args}`;
    },
    intrinsic(t) {
      return t.name;
    },
    literal(t) {
      return String(t.value);
    },
    // 他の型はデフォルトで toString() を使用
  });
}
```

### 型の判別

```typescript
import { Models } from "typedoc";

function analyzeType(type: Models.SomeType): void {
  switch (type.type) {
    case "reference":
      console.log(`Reference to: ${type.name}`);
      if (type.reflection) {
        console.log(`  Resolved to: ${type.reflection.getFullName()}`);
      }
      break;
    case "union":
      console.log(`Union of ${type.types.length} types`);
      break;
    case "array":
      console.log(`Array of ${type.elementType}`);
      break;
    case "intrinsic":
      console.log(`Built-in: ${type.name}`);
      break;
    // ...
  }
}
```

## 関連

- [Reflections](./reflections.md)
- [Converter](./converter.md)
- [Serialization](./serialization.md)
