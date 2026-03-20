# マイグレーションガイド

## Kubb v5 への移行

### Node.js 22 必須

Kubb v5 は Node.js 22 以上が必要。

### ファクトリ関数のリネーム

`define*` プレフィックスが `create*` に変更（Vite エコシステムの慣例に合わせ、`define*` は純粋な型/設定ヘルパー用に予約）:

```typescript
// v5 以前
import { definePlugin } from '@kubb/core'
// v5 以降
import { createPlugin } from '@kubb/core'
```

対象: `definePlugin` → `createPlugin`, `defineAdapter` → `createAdapter`, `defineGenerator` → `createGenerator`, `defineLogger` → `createLogger`, `defineStorage` → `createStorage`

### 単一プラグインインスタンスルール

同一プラグインを設定内で複数回使用できなくなった。複数インスタンスは単一に統合する必要がある。

### PluginManager → PluginDriver

| v5 以前 | v5 以降 |
|---------|---------|
| `PluginManager` | `PluginDriver` |
| `pluginManager` | `driver` |
| `usePluginManager` | `usePluginDriver` |

### プラグイン形式の統一

オブジェクト形式・JSON 形式は削除。配列形式のみ有効:

```typescript
import { pluginTs } from '@kubb/plugin-ts'
export default defineConfig({
  plugins: [pluginTs({})],
})
```

### @kubb/plugin-ts の変更

`mapper` オプションが削除。新しい `transform` オプション（AST ノード変換）が計画されている。

---

## Kubb v3 への移行

### 新機能

- **Static Class Client**: `clientType: 'staticClass'` でクラスベースのクライアント生成
- **Generators**: テンプレートに代わる新しいコード生成システム
- **CLI 改善**: 20-30% の高速化、プログレスバー、`--debug` モード
- **`output.extension`**: ファイル拡張子の制御
- **`output.barrelType`**: `exportType` の後継

### パッケージリネーム

| v2 パッケージ | v3 パッケージ |
|--------------|--------------|
| `@kubb/swagger-client` | `@kubb/plugin-client` |
| `@kubb/swagger-faker` | `@kubb/plugin-faker` |
| `@kubb/swagger-msw` | `@kubb/plugin-msw` |
| `@kubb/swagger` | `@kubb/plugin-oas` |
| `@kubb/swagger-ts` | `@kubb/plugin-ts` |
| `@kubb/swagger-zod` | `@kubb/plugin-zod` |
| `@kubb/swagger-redoc` | `@kubb/plugin-redoc` |
| `@kubb/swagger-swr` | `@kubb/plugin-swr` |

### TanStack Query パッケージの分割

統合パッケージがフレームワーク別に分割。TanStack Query v4 のサポートは廃止（v5 必須）:

- `@kubb/plugin-react-query`
- `@kubb/plugin-vue-query`
- `@kubb/plugin-svelte-query`
- `@kubb/plugin-solid-query`

### MSW v2 必須

MSW v1 のサポートは廃止。v2 が必須。

### 出力設定の変更

| v2 | v3 |
|----|-----|
| `output.extName` | `output.extension` に統合 |
| `output.exportAs` | group 設定に統合 |
| `exportType` | `output.barrelType` |
| `group.output` | 自動生成（root + plugin パスから） |

### プラグイン固有の変更

**@kubb/plugin-client**:
- `client.importPath` → `importPath`
- 新オプション: `operations`, `parser`（`'client'` \| `'zod'`）, `paramsType`

**@kubb/plugin-ts**:
- `enumSuffix` デフォルト: `'enum'`
- `mapper` で TypeScript ノードオーバーライド

**@kubb/plugin-zod**:
- `typedSchema` → `inferred`
- 新オプション: `operations`, `mapper`

**@kubb/plugin-swr / @kubb/plugin-react-query**:
- `dataReturnType` → `client.dataReturnType`
- 新オプション: `paramsType`
- ミューテーションに `mutationKey` 生成
- 必須パラメータに基づく `enabled` 自動生成

**@kubb/plugin-oas**:
- `experimentalFilter`, `experimentalSort` 削除（外部ツール openapi-format の使用を推奨）

### Node.js サポート

v3 の最小要件は Node.js 20（v18 サポート廃止）。
