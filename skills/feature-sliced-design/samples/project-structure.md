# Project Structure

FSD の基本ディレクトリ構成を示す最小構成例。

```text
src/
├── app/                    # アプリ全体の設定・エントリーポイント
│   ├── providers/
│   │   └── index.ts
│   ├── store/
│   │   └── index.ts
│   └── styles/
│       └── global.css
├── pages/                  # 画面・ルート対応スライス
│   ├── home/
│   │   ├── ui/
│   │   │   └── HomePage.tsx
│   │   └── index.ts
│   └── profile/
│       ├── ui/
│       │   └── ProfilePage.tsx
│       └── index.ts
├── widgets/                # 複数ページで使う複合 UI ブロック
│   └── header/
│       ├── ui/
│       │   └── Header.tsx
│       └── index.ts
├── features/               # 再利用されるユーザーインタラクション
│   └── auth/
│       ├── ui/
│       │   └── LoginForm.tsx
│       ├── api/
│       │   └── loginMutation.ts
│       ├── model/
│       │   └── authStore.ts
│       └── index.ts
├── entities/               # ビジネスエンティティ
│   └── user/
│       ├── ui/
│       │   └── UserCard.tsx
│       ├── model/
│       │   └── types.ts
│       └── index.ts
└── shared/                 # 基盤インフラ（ビジネスロジックなし）
    ├── api/
    │   └── client.ts
    ├── ui/
    │   └── button/
    │       └── index.ts
    └── lib/
        └── format-date.ts
```

## Notes

- `app` と `shared` にスライスはなく、セグメントのみ直下に置く
- 全レイヤーが必須ではない。最小構成は `shared`, `pages`, `app`
- 各スライスのルートに `index.ts`（Public API）を必ず作成する
- フォルダ名はすべて小文字のケバブケース
