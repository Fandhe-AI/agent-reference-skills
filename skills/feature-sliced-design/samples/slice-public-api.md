# Slice Public API

スライスの `index.ts` で公開インターフェースを定義し、内部パスへの直接インポートを防ぐ。

```ts
// features/auth/index.ts — Public API: 公開するものを明示的に列挙
export { LoginForm } from "./ui/LoginForm";
export { useAuth } from "./model/useAuth";
export type { AuthState } from "./model/types";
```

```ts
// 利用側: スライスルートからインポート（内部パスは直接参照しない）
import { LoginForm, useAuth } from "features/auth";
import type { AuthState } from "features/auth";

// Bad — 内部パスへの直接インポート
// import { LoginForm } from "features/auth/ui/LoginForm";
```

```ts
// shared/ui はコンポーネントごとに個別 index（ツリーシェイキング対策）
// shared/ui/button/index.ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button";

// 利用側
import { Button } from "shared/ui/button";
```

## Notes

- `export *` は使わない — 内部詳細が意図せず公開され、インターフェースが不明確になる
- スライス作成時は利用側を書く前に必ず `index.ts` を定義する
- IDE の自動インポートが内部ファイルを選ぶことがある — Steiger 等の linter で CI 検出する
- `app` と `shared` のセグメントにも同じ Public API ルールが適用される
