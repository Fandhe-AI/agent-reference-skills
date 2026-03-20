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
