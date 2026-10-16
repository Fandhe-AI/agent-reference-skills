# Public API Enforcement

外部からのインポートは `index.ts` 経由のみ許可する。

## Rule

スライスの外部からは、スライスルートの `index.ts`（Public API）を通じてのみインポートする。内部ファイルパスへの直接インポートは禁止。`export *` は使用せず、公開するものを明示的に列挙する。

## Good

```ts
// index.ts で明示的にエクスポート
// features/auth/index.ts
export { LoginForm } from "./ui/LoginForm";
export { useAuth } from "./model/useAuth";
export type { AuthState } from "./model/types";

// 利用側: スライスルートからインポート
import { LoginForm, useAuth } from "features/auth";
import type { AuthState } from "features/auth";
```

```ts
// shared/ui はコンポーネントレベルの index で個別エクスポート（ツリーシェイキング対策）
// shared/ui/button/index.ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button";

// 利用側
import { Button } from "shared/ui/button";
```

## Bad

```ts
// 内部パスへの直接インポート
import { LoginForm } from "features/auth/ui/LoginForm";
import { authStore } from "features/auth/model/authStore";
import { loginMutation } from "features/auth/api/loginMutation";
```

```ts
// ワイルドカード re-export（内部詳細の意図しない公開）
// features/auth/index.ts
export * from "./ui/LoginForm";
export * from "./model/authStore";
```

## Why

Public API を強制することで:

- スライス内部のファイル構成を自由にリファクタリングできる（外部に影響しない）
- 公開するインターフェースが明示的に管理される
- `export *` の回避により、意図しないエクスポートを防止する
- IDE の自動インポートが内部ファイルを選択した場合に Steiger 等で検出できる

## Steiger の対応ルール

- `fsd/public-api` — スライス（および Shared のようにスライスのないレイヤーのセグメント）に Public API 定義を要求
- `fsd/no-public-api-sidestep` — スライスの Public API を迂回した内部モジュールへの直接 import を禁止
- `fsd/no-wildcard-exports` — Public API の `export * from` / `export * as ns from` を禁止（plugin 0.8.0 で追加、**既定で無効**。`index.client.ts` / `index.server.ts` も対象）。`export *` 禁止ルールを自動化するにはこのルールを有効化する（`rules: { 'fsd/no-wildcard-exports': 'error' }`）

出典: https://fsd.how/docs/reference/public-api (documentation repository commit 3a5a3a3); Steiger: https://github.com/feature-sliced/steiger/blob/steiger%400.7.0/README.md , https://github.com/feature-sliced/steiger/blob/steiger%400.7.0/packages/steiger-plugin-fsd/CHANGELOG.md (0.8.0 で no-wildcard-exports 追加), https://github.com/feature-sliced/steiger/blob/steiger%400.7.0/packages/steiger-plugin-fsd/src/no-wildcard-exports/README.md (tag steiger@0.7.0, commit b0fe6c5)

## 例外

環境別 Public API（Next.js の `index.server.ts` など）は、実行環境の境界が壊れる問題が実際に起きたときにだけ追加する。通常はスライスの `index.ts` のみで公開する。
