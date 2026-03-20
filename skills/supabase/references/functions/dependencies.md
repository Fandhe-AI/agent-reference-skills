# Edge Functions 依存関係管理

Edge Functions での外部モジュールのインポートと依存関係の管理方法。

## 概要

Edge Functions は Deno ランタイムで動作するため、ESM（ES Modules）形式でのインポートを使用する。`deno.land/x`、`esm.sh`、`npm:` プレフィックスからモジュールをインポートでき、Import Maps（`deno.json` または `import_map.json`）でインポートパスのエイリアスを設定可能。npm パッケージは `npm:` プレフィックスで直接利用できる。

### インポート方法

| 方法 | 構文 | 用途 |
|---|---|---|
| deno.land/x | `https://deno.land/x/module@version/mod.ts` | Deno ネイティブモジュール |
| esm.sh | `https://esm.sh/package@version` | npm パッケージの ESM 変換版 |
| npm: プレフィックス | `npm:package@version` | npm パッケージの直接利用 |
| jsr: プレフィックス | `jsr:@scope/package@version` | JSR レジストリからのインポート |

## コード例

### ESM インポート

```typescript
// deno.land からのインポート
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'

// esm.sh からのインポート（npm パッケージの ESM 版）
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.14.0?target=deno'

// npm: プレフィックスでのインポート
import OpenAI from 'npm:openai@4'
import { z } from 'npm:zod@3'

// jsr: プレフィックスでのインポート
import { Hono } from 'jsr:@hono/hono'
```

### Import Maps（deno.json）

```json
{
  "imports": {
    "@supabase/supabase-js": "https://esm.sh/@supabase/supabase-js@2",
    "stripe": "https://esm.sh/stripe@14.14.0?target=deno",
    "openai": "npm:openai@4",
    "zod": "npm:zod@3",
    "$shared/": "../_shared/"
  }
}
```

```typescript
// Import Maps を使った簡潔なインポート
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import OpenAI from 'openai'
import { z } from 'zod'
import { corsHeaders } from '$shared/cors.ts'
```

### Import Maps（import_map.json）- レガシー形式

```json
{
  "imports": {
    "@supabase/supabase-js": "https://esm.sh/@supabase/supabase-js@2",
    "stripe": "https://esm.sh/stripe@14.14.0?target=deno"
  }
}
```

### グローバル Import Maps の配置

```
supabase/
├── functions/
│   ├── deno.json              # グローバル Import Maps（全関数に適用）
│   ├── import_map.json        # レガシー形式のグローバル Import Maps
│   ├── _shared/
│   │   └── cors.ts
│   ├── function-one/
│   │   ├── index.ts
│   │   └── deno.json          # 関数固有の Import Maps（オプション）
│   └── function-two/
│       └── index.ts
└── config.toml
```

### npm パッケージの Node.js 互換モード

```typescript
// Node.js ビルトインモジュールの利用
import { Buffer } from 'node:buffer'
import { createHash } from 'node:crypto'
import process from 'node:process'

Deno.serve(async (req: Request) => {
  const body = await req.text()
  const hash = createHash('sha256').update(body).digest('hex')

  return new Response(JSON.stringify({ hash }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

### 共有コードの利用

```typescript
// supabase/functions/_shared/cors.ts
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// supabase/functions/_shared/supabase-client.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

export const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)
```

```typescript
// supabase/functions/my-function/index.ts
import { corsHeaders } from '../_shared/cors.ts'
import { supabaseAdmin } from '../_shared/supabase-client.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { data } = await supabaseAdmin.from('todos').select('*')

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
```

## 注意点

- `deno.json` が推奨形式。`import_map.json` はレガシーだが引き続きサポートされる
- `deno.json` を `supabase/functions/` 直下に置くとすべての関数に適用される
- 関数ごとに `deno.json` を置くことで、関数固有の設定を上書きできる
- `esm.sh` で `?target=deno` パラメータを付けると Deno 向けに最適化されたビルドが得られる
- バージョンを固定すること（`@2`、`@14.14.0` 等）で再現性を確保
- `npm:` プレフィックスは Deno 1.28 以降で利用可能
- `node:` プレフィックスで Node.js ビルトインモジュールの多くが利用可能（完全互換ではない）
- `_shared/` ディレクトリは関数としてデプロイされない

## 関連

- [概要](./overview.md)
- [デプロイ](./deploy.md)
- [WASM サポート](./wasm.md)
- [実装例](./examples.md)
