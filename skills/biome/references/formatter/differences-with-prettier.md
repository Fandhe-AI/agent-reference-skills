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

Prettier は構文エラーを見過ごして整形:
- 重複修飾子: `private public a = 1`
- オプショナルチェーンへの代入: `(a?.b) = c`
- 不正な型パラメータ修飾子
- トップレベル return
- 不正な自己増減: `(1)++`

Biome は「Bogus」ノードとして逐語的に出力。

## 6. TypeScript/Babel パーサー間の矛盾

Prettier はパーサー選択で出力が異なることがある。Biome は独自パーサーで統一出力。
