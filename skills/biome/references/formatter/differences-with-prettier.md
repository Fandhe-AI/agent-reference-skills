# Prettier との違い

Source: https://biomejs.dev/formatter/differences-with-prettier

Biome と Prettier の意図的な差異。

## 1. オブジェクトプロパティのクォート削除

Biome は ES2015 以降の全有効識別子のクォートを削除。Prettier は ES5 識別子のみ。
例: Unicode 識別子 `"𐊧"` — Biome は削除、Prettier は保持。

## 2. 計算キーの代入における括弧

Prettier はオブジェクトプロパティの計算キーで `[(x = 0)]` と括弧追加するが、クラスプロパティでは追加しない矛盾がある。Biome は両方で括弧を省略し一貫性を保つ。

## 3. アロー関数の型パラメータの末尾カンマ

`<T = unknown>() => {}` — Prettier は `<T = unknown,>` と末尾カンマ追加。Biome は追加しない。JSX 区別が不要な場合は不要という元の意図を尊重。

## 4. Non-null アサーション付きオプショナルチェーン

TypeScript の `(a.?.b)!` と `a.?.b!` — Prettier は括弧の有無を保持。Biome は統一。

## 5. 無効な構文の扱い

Prettier は Babel ベースのパースが緩く、複数の構文エラーを見過ごして整形する。Biome のパーサーは意図的に厳格で、次を構文エラーとして検出する:
- 関数の重複修飾子 / プロパティ修飾子の不正な順序
- 本体を持つ関数宣言（`declare function foo() {}`）
- 非 abstract クラスの abstract プロパティ
- オプショナルチェーンへの代入
- interface の型パラメータへの `const` 修飾子
- トップレベル return

Biome ではパースエラーが「Bogus」ノードになり、フォーマットせず逐語的に出力する（整形で意味が変わるのを避けるため）。クラスプロパティでは、Prettier は修飾子を boolean で保持するため各種 1 つしか残らないが、Biome は修飾子のリストを保持するため重複が残る。

### Duplicate modifiers on class properties

```ts
class Foo {
  private public a  = 1;   // Prettier: private a = 1;  Biome: そのまま出力
}
declare function foo ( ) {  }   // Prettier: declare function foo() {};
class Read {
  readonly readonly   x: number;   // Prettier は 1 つに整形
}
```

### Assignment to an optional chain
`(a?.b) = c` のような代入を Prettier は整形し、Biome は Bogus として逐語出力。

### Incorrect modifier for the type parameters of an interface
interface の型パラメータへの不正な `const` 修飾子を Prettier は整形し、Biome は構文エラー。

### Top-level return
トップレベルの `return` を Prettier は整形し、Biome は構文エラー。

## 6. TypeScript/Babel パーサー間の矛盾

Prettier はパーサー選択で出力が異なることがある。Biome は独自パーサーで統一出力。
