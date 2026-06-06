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

## パーマリンクサブパス

| サブパス | 対象バージョン |
| --- | --- |
| `"zod/v3"` | Zod 3 |
| `"zod/v4/core"` | Zod 4 Core |

これらのサブパスは永続的に利用可能。`"zod"` や `"zod/v4"` / `"zod/v4/mini"` はライブラリコードでの直接 import は非推奨。
