# ライブラリのフレームワークバインディング

ライブラリパッケージ内でフレームワーク API を使う際に、`peerDependencies` として宣言する手法。

## peerDependencies の設定

```json
{
  "name": "@repo/ui",
  "peerDependencies": {
    "next": "*"
  }
}
```

消費者側がインストールしたフレームワークのバージョンがライブラリ内でも解決される。バージョンは範囲指定を推奨（例: `">=15"`）。

## 実装例

```tsx
import { ComponentProps } from "react";
import { Link } from "next/link";

type CustomLinkProps = ComponentProps<typeof Link>;

export function CustomLink({ children, ...props }: CustomLinkProps) {
  return (
    <Link className="text-underline hover:text-green-400" {...props}>
      {children}
    </Link>
  );
}
```

## エントリーポイント分割（複数フレームワーク対応）

```json
{
  "exports": {
    "./link": "./dist/link.js",
    "./next-js/link": "./dist/next-js/link.js"
  },
  "peerDependencies": {
    "next": "*"
  }
}
```

- `./link` — フレームワーク非依存の汎用 Link
- `./next-js/link` — Next.js 専用の Link
