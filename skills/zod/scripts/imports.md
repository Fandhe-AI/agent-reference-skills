# Imports

各パッケージエントリポイントの import パターン。

## フル Zod パッケージ（推奨）

```typescript
import * as z from "zod";
```

## Zod Mini（バンドルサイズ最適化）

```typescript
import * as z from "zod/mini";
```

または:

```typescript
import * as z from "zod/v4/mini";
```

チェーンメソッドが使えない代わりに tree-shaking が効く。バックエンドでは通常フル Zod を推奨。

## Zod Mini の単体パッケージ

```sh
npm install zod @zod/mini
```

```typescript
import * as z from "@zod/mini";
```

事前のインストールが必要（`install.md` 参照）。

## ロケールの読み込み

```typescript
import * as z from "zod/mini";
import { en } from "zod/locales";

z.config(en());
```

Zod Mini は既定でロケールを読み込まないため、issue の `message` は `"Invalid input"` になる。英語メッセージが必要な場合に上記を使う。

## AOT コンパイルのグローバル有効化

```typescript
import "zod/compile"; // スキーマを定義するモジュールより前に置く
import * as z from "zod";
```

アプリケーション向けでライブラリ向けではない。詳細は `compile.md` を参照。

## Zod Core（ライブラリ作者向け）

```typescript
import * as z from "zod/v4/core";
```

Zod と Zod Mini の両方をサポートするライブラリを作る場合に使う。`$ZodType` などの基底クラスを提供する。

## Zod v3 と v4 を同時に利用（ライブラリ作者向け）

```typescript
import * as z3 from "zod/v3";
import * as z4 from "zod/v4/core";
```

バージョン判別は `"_zod"` プロパティの有無で行う:

```typescript
if ("_zod" in schema) {
  schema._zod.def; // Zod 4 スキーマ
} else {
  schema._def; // Zod 3 スキーマ
}
```

## レガシーサブパスの書き換え対応

`zod@4.0.0` 公開後、パッケージルート（`"zod"`）が Zod 4 を export する。既存の `"zod/v4"` / `"zod/v4-mini"` import は引き続き動作し、アップグレード後に任意で書き換えられる。

| 対象 | 変更前 | 変更後 |
| --- | --- | --- |
| Zod 4 | `"zod/v4"` | `"zod"` |
| Zod 4 Mini | `"zod/v4-mini"` | `"zod/mini"` |
| Zod 3 | `"zod"` | `"zod/v3"` |

## パーマリンクサブパス

| サブパス | 対象バージョン |
| --- | --- |
| `"zod/v3"` | Zod 3 |
| `"zod/v4/core"` | Zod 4 Core |

これらのサブパスは永続的に利用可能。`"zod"` や `"zod/v4"` / `"zod/v4/mini"` はライブラリコードでの直接 import は非推奨。
