# Extension registry

レビュー済みの plugin / adapter / parser を列挙する Kubb extension registry のプロトコル。各エントリは npm の 1 バージョンまたは GitHub release を pin する。`kubb add` / `kubb update` / `kubb list`、kubb.dev、Kubb Studio が参照する。

## Signature / Usage

ベース URL は `https://kubb.dev/registry`。プレーンな静的 JSON ドキュメントで、`application/json`、CORS 許可、リダイレクトなしで直接応答、10 分キャッシュ（`cache-control: public, max-age=600`）。

```typescript
// GET <base>/index.json
type RegistryIndex = {
  version: 1
  generatedAt: string
  extensions: Array<RegistryEntry>
}

// GET <base>/<owner>/<slug>.json
type RegistryDetail = RegistryEntry & {
  overview: string | null
  options?: string | null
  guides?: Array<RegistryGuide>
}

type RegistryGuide = {
  id: string
  title: string
  description: string
  content: string
}
```

## Options / Props

### Registry ids

`<owner>/<slug>`（例 `kubb-labs/plugin-zod`）。`<owner>` はソースリポジトリの GitHub owner（小文字）、`<slug>` は scope を除いた package 名（`@kubb/plugin-zod` → `plugin-zod`）。両方 `[a-z0-9]+(?:-[a-z0-9]+)*` に一致する。CLI は bare `<slug>` を `kubb-labs/<slug>` として扱う。owner が `kubb-labs` のエントリは `type: "official"`、他は `community`。

### RegistryEntry

`@kubb/core` が `RegistryEntry` / `RegistryIndex` / `RegistryDetail` / `RegistryGuide` の型を export する。

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` (required) | registry id |
| `kind` | `'plugin' \| 'adapter' \| 'parser'` (required) | extension の種別。常に `manifest.kind` に等しい |
| `type` | `'official' \| 'community'` (required) | owner が `kubb-labs` なら `official` |
| `artifact` | `RegistryArtifact` (required) | registry が承認した install pin（下記） |
| `repository` | `{ url: string }` | GitHub 上のソース。npm artifact は package フォルダを指すことがあり、GitHub artifact はリポジトリ root |
| `manifest` | `ExtensionManifest` (required) | pin したバージョンの `kubb-extension.json`（reviewer のメインカテゴリと listing の上書きを適用済み） |
| `stats` | `{ downloads?: number; weekly?: number; stars?: number }` | ダウンロード数・star 数（判明時） |
| `submittedAt` | `string` (required) | 提出日時。不変 |
| `publishedAt` | `string` (required) | 最初のバージョンが承認・掲載された日時。不変 |
| `reviewedAt` | `string` (required) | pin したバージョンが承認された日時。バージョン更新ごとに更新 |

`artifact` は 2 種:

- `{ kind: 'npm', package, version }`: `kubb add` / `kubb update` は `<package>@<version>` を install
- `{ kind: 'github', package, version, owner, repo, tag, commit }`: リポジトリ root の package の release。`github:<owner>/<repo>#<commit>` を install。`package` は `package.json` の `name`、`tag` は `version` を指す

detail ドキュメントのフィールドは package の `docs/` フォルダ由来:

- `overview`: `docs/overview.md` の Markdown（または reviewer が書いた overview）
- `options`: `docs/options.md` の Markdown。なければ `null`
- `guides`: `docs/guides/<id>.md` ごとに 1 件（ファイル名順）。`id` は拡張子なしファイル名、`title` は最初の `#` 見出し、`description` はその後の最初の段落、`content` はファイル全体

### Records

レビュー済みレコードは `kubb-labs/registry` の `extensions/<owner>/<slug>.json`。build が上記ドキュメントに変換し、レコードのマージでピン留めバージョンが承認される。

```json
{
  "$schema": "https://kubb.dev/schemas/registry-record.json",
  "id": "kubb-labs/plugin-zod",
  "artifact": { "kind": "npm", "package": "@kubb/plugin-zod", "version": "5.4.4" },
  "repository": { "url": "https://github.com/kubb-labs/plugins/tree/main/packages/plugin-zod" },
  "submittedAt": "2026-10-12T20:11:53Z",
  "submittedBy": "stijnvanhulle",
  "publishedAt": "2026-10-12T20:11:53Z",
  "reviewedAt": "2026-10-12T20:11:53Z",
  "categories": ["validation"]
}
```

| Field | Written by | Meaning |
|-------|------------|---------|
| `id`, `artifact`, `repository`, `submittedAt`, `publishedAt`, `reviewedAt` | Bot | `RegistryEntry` と同じ。`id` はファイルパスと一致必須 |
| `submittedBy` | Bot | 提出を開いた GitHub ユーザー |
| `categories` | Reviewer | カテゴリ slug。先頭がメインで manifest の `category` を置換 |
| `listing` | Reviewer | `displayName` / `description` / `tags` / `icon` の任意上書き |

### Categories

| Slug | Use for |
|------|---------|
| `types` | TypeScript の型・interface を生成 |
| `validation` | スキーマでランタイム検証 |
| `client` | API を呼ぶ HTTP client を生成 |
| `framework` | UI フレームワーク向け hooks / composables を生成 |
| `mocks` | mock データ・mock サーバーを生成 |
| `testing` | テスト・テストヘルパーを生成 |
| `documentation` | API ドキュメントを生成 |
| `ai` | API を AI エージェント・ツールへ公開 |
| `output` | barrel 等、生成ファイルの形を整える |
| `openapi` | OpenAPI / Swagger spec を読む |
| `typescript` | 生成コードを TypeScript として出力 |
| `docs` | 生成コードを Markdown として出力 |

### Host your own registry

同じ 2 つのドキュメントを任意の静的ホストで配信し、`KUBB_REGISTRY` で CLI を向ける。自前レコードから build するには `kubb-labs/registry` を fork し `extensions/` を差し替えて `pnpm build`（`dist/` が registry 全体）。

```shell
KUBB_REGISTRY=https://registry.example.com kubb add acme/plugin-graphql
```

この場合 CLI は `https://registry.example.com/index.json` と `https://registry.example.com/acme/plugin-graphql.json` を読む。

## Notes

- CLI は `version` が `1` でない index を拒否する。検証に失敗したエントリはスキップし残りを保持する
- CLI がエントリをスキップする条件: `id` が完全な `<owner>/<slug>` でない、`artifact` が正確な semver の npm / GitHub pin でない、`manifest` が entry の `kind` に対し無効。detail ドキュメントの `id` は CLI が要求した id と一致必須
- `options` 欠落は `null`、`guides` 欠落は `[]` として読む。未知の id は 404 を返し、`kubb add` は `"<id>" is not in the registry at <registry>.` と報告する
- 公式 version のうち manifest 導入前のものは manifest を持たず、manifest 付きバージョンが pin されるまで index から除外される
- `KUBB_REGISTRY` は `http://` または `https://` で始まる必要があり、末尾スラッシュは除去される。独自 index は `version: 1` を設定し未知 id に 404 を返す。Studio は常に kubb.dev の index を読むため、private registry は CLI の install 先のみ変える
- タイムスタンプは UTC・秒単位（例 `2026-10-12T20:00:00Z`）
- 出典: Kubb docs 5.x（kubb@5.11.0 pin）

## Related

- [extensions](../kit/extensions.md)
- [extension-docs](../kit/extension-docs.md)
- [add](../commands/add.md)
- [update](../commands/update.md)
- [list](../commands/list.md)
