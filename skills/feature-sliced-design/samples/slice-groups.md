# Slice Groups

関連スライスをフォルダでまとめつつ、スライス間の分離を維持するパターン。

```text
features/
  auth/                    ← スライスグループ（フォルダ）
    login/                 ← スライス
    register/              ← スライス
    reset-password/        ← スライス
```

```text
features/
  auth/
    login/
      ui/
        LoginForm.tsx
      api/
        loginMutation.ts
      model/
        loginStore.ts
      index.ts             ← login スライスの Public API
    register/
      ui/
        RegisterForm.tsx
      api/
        registerMutation.ts
      index.ts             ← register スライスの Public API
```

```ts
// features/auth/login/index.ts
export { LoginForm } from "./ui/LoginForm";
export { useLoginMutation } from "./api/loginMutation";

// features/auth/register/index.ts
export { RegisterForm } from "./ui/RegisterForm";
```

```ts
// グループ内スライス間でのコード共有は禁止
// Bad — features/auth/register/ui/RegisterForm.tsx
import { useLoginMutation } from "features/auth/login"; // 兄弟スライス間インポート (NG)

// Good — 共有ロジックは entities または shared に移動する
import { authApi } from "shared/api";
```

## Notes

- スライスグループはあくまで構造的な整理であり、グループ内の各スライスは完全な独立を維持する
- 兄弟スライス間でコードを共有する必要が出た場合は、下位レイヤーへの移動を検討する
- グループ自体の `index.ts` は不要。利用側は各スライスから直接インポートする
- グループ化はどのレイヤーでも可能（`pages/`, `entities/` など）
