# Configuration (kubb.config.ts)

`kubb.config.ts` は Kubb の実行を制御する。`defineConfig` の呼び出しを default export する。引数はオブジェクト、オブジェクトを返す関数、または config の配列。

## Signature / Usage

```typescript
import { defineConfig } from 'kubb/config'

export default defineConfig({
  name: 'petStore',
  input: './petStore.yaml',
  output: { path: './src/gen' },
})
```

## Config formats

- 単一オブジェクト: 上記の形。`defineConfig` は config の Promise も受け付ける
- 関数: 実行コンテキスト（`watch` / `logLevel` 等）に依存する場合

```typescript
export default defineConfig(({ watch, logLevel }) => ({
  name: 'petStore',
  input: './petStore.yaml',
  output: { path: './src/gen', clean: !watch },
}))
```

関数が受け取るコンテキスト:

| Name | Type | Description |
|------|------|-------------|
| `input` | `string \| undefined` | `kubb generate <input>` の位置引数。指定時は `config.input` を上書き |
| `watch` | `boolean` | watch モードで `true` |
| `logLevel` | `'silent' \| 'info' \| 'verbose'` | 現在のログレベル |
| `reporters` | `Array<ReporterName> \| undefined` | `--reporter` の reporter 名（例 `['json']`）。フラグなしでは `undefined` |
| `config` | `string \| undefined` | `--config` フラグの値。CLI が config ファイルを自動検出した場合は `undefined` |

- 配列: 複数 spec を 1 コマンドで生成する。関数が配列を返してもよい

```typescript
export default defineConfig([
  { name: 'petStore', input: './petStore.yaml', output: { path: './src/gen/petStore' }, plugins: [pluginTs()] },
  { name: 'stripe', input: './stripe.yaml', output: { path: './src/gen/stripe' }, plugins: [pluginTs()] },
])
```

## Defaults

`kubb/config` の `defineConfig` と `kubb` の `createKubb` が省略時に補う値。素の `@kubb/core` エンジンが補うのは `root` / `storage` / `output.format` / `output.lint` / `output.defaultBanner` のみ。

| Field | Default |
|-------|---------|
| `root` | config ファイルのフォルダー。`createKubb` を自前で呼ぶ場合は `process.cwd()` |
| `adapter` | `adapterOas()`（同梱 OpenAPI adapter） |
| `parsers` | `[parserTs(), parserTsx(), parserMd()]` |
| `reporters` | `[cli, json, file, html]` |
| `plugins` | 未指定時に `pluginBarrel()` を末尾に追加 |
| `storage` | `fsStorage()` |
| `output.barrel` | `false`（root の `index.ts` は書かれない。各 plugin は自身の既定 `output.barrel` で自前の barrel を書く） |
| `output.format` | `false` |
| `output.lint` | `false` |
| `output.defaultBanner` | `'simple'` |

bundler 連携は `defineConfig` と同じ既定を適用する。実行サマリーは出力するが `json` / `file` / `html` reporter は実行しない。

## Options / Props

### Top-level

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | この config の名前。CLI が実行の見出しとして入力とともに表示（例 `petStore ./petStore.yaml`）。未指定は `kubb` と表示 |
| `input` | `string \| Record<string, unknown>` | spec の場所: ローカルパス / URL / git リポジトリ内のファイル / インライン OpenAPI（JSON・YAML 文字列）/ パース済みオブジェクト。adapter 設定時は必須。`defineConfig` は常に adapter を設定するため `input` なしは `KUBB_INPUT_REQUIRED` で停止。`adapter` なしの plugin-only モードは `@kubb/core` の `createKubb` のみ |
| `output` | `object` | 出力先と書き込み方法（下表） |
| `plugins` | `Array<Plugin>` | プラグイン配列。依存先が先に実行される。必須の依存が欠けると `KUBB_MISSING_DEPENDENCY` で失敗 |
| `adapter` | `Adapter` | 入力を universal AST に変換する（例 `adapterOas()`）。`defineConfig` の既定は `adapterOas()` |
| `parsers` | `Array<Parser>` | ファイル表現をソースコードに変換する。各 parser は `extNames` で担当拡張子を宣言 |
| `storage` | `Storage` | 生成ファイルの永続化先。既定 `fsStorage()` |
| `root` | `string` | プロジェクトルート（絶対、または config ファイル基準の相対）。`input` と `output.path` はこれを基準に解決。既定は config ファイルのフォルダー（`.config/` や `configs/` 内の config ならその 1 つ上） |
| `reporters` | `Array<Reporter>` | 利用可能な reporter。既定 `[cli, json, file, html]`。HTML は `--reporter html` で選択したときのみ実行。CLI の `--reporter` は名前で選択し既定は `cli` |

入力文字列が `{` / `[` で始まる、複数行、または YAML の `openapi:` / `swagger:` で始まる場合はインライン内容として扱う。`git+` で始まる文字列は git 入力。それ以外はファイルパスまたは URL（相対パスは `root` 基準で、インライン内容・パース済みオブジェクト内の相対 `$ref` ファイルも `root` 基準。URL 入力の `$ref` はローカルファイルを読まない）。

git 入力は `git+<repo>#<ref>:<path>` 形式。`<ref>` はブランチ・タグ、またはホストが SHA 指定 fetch を許す場合は完全なコミット SHA（GitHub / GitLab は可）。`<ref>:` を省略すると既定ブランチ。Kubb は一時フォルダーへ shallow `git fetch` するため `PATH` 上の `git` が必要で、private リポジトリは自身の git 認証情報を使う。

```typescript
import { defineConfig } from 'kubb/config'

export default defineConfig({
  input: 'git+https://github.com/org/api.git#v2:specs/openapi.yaml',
  output: { path: './src/gen' },
})
```

### output

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `output.path` | `string` | — (required) | 生成ファイルのディレクトリ。絶対または `root` 基準 |
| `output.mode` | `'file' \| 'directory'` | `output.path` の形に従う | plugin の `output` に設定する（root の `output` ではない）。`'file'` は単一ファイル（`output.path` に拡張子が必要）、`'directory'` は operation / schema ごとに 1 ファイル |
| `output.clean` | `boolean` | `false` | 再生成前に `output.path` を削除 |
| `output.format` | `'auto' \| 'prettier' \| 'biome' \| 'oxfmt' \| false` | `false` | 各生成ファイルに適用する formatter。`'auto'` は oxfmt → Biome → Prettier の順に検出 |
| `output.lint` | `'auto' \| 'eslint' \| 'biome' \| 'oxlint' \| false` | `false` | 生成後の linter。`'auto'` は oxlint → Biome → ESLint の順に検出 |
| `output.postGenerate` | `Array<string \| { name?: string; command: string }>` | — | format / lint 後に `root` から順に実行するコマンド |
| `output.barrel` | `{ type: 'all' \| 'named' } \| false` | `false` | `output.path` の root `index.ts`。plugin は自身の `output` に `barrel` が無いときのみこの値を継承 |
| `output.defaultBanner` | `'simple' \| 'full' \| false` | `'simple'` | 各ファイル先頭の自動生成バナー。`'full'` は `Source` / `Title` / `OpenAPI spec version` を追加 |
| `output.banner` | `string \| ((meta: BannerMeta) => string)` | — | 個別 plugin に設定。root の `output` は `defaultBanner` のみ |
| `output.footer` | `string \| ((meta: BannerMeta) => string)` | — | `banner` と同型で末尾に追加 |

`BannerMeta` は document の `InputMeta`（`title` / `description` / `version` 等）を拡張し、次を持つ:

| Name | Type | Description |
|------|------|-------------|
| `filePath` | `string` | 生成中ファイルの完全な出力パス |
| `baseName` | `string` | ファイル名のみ（例 `stocks.ts`） |
| `isBarrel` | `boolean` | `index.ts` barrel なら `true` |
| `isAggregation` | `boolean` | group の `[dir]/[dir].ts` 集約ファイルなら `true` |

```typescript
pluginTs({ output: { path: 'types.ts' } }),
pluginAxios({ output: { path: 'clients', mode: 'directory' }, group: { type: 'tag' } }),
```

```typescript
output: {
  path: './src/gen',
  postGenerate: [{ name: 'types', command: 'npm run typecheck' }, 'biome check --write ./src/gen'],
},
```

## Notes

- `clean: true` は出力ディレクトリ全体を削除する。専用の出力フォルダでのみ使うこと
- `mode` は通常指定不要（拡張子ありのパス = 単一ファイル、なし = ディレクトリ）。generator plugin の既定は拡張子なし（例 `'types'`）だが `@kubb/plugin-redoc` のみ単一ファイル `'docs.html'`。`group` は推論されたディレクトリモードで動く。ファイルモード（明示・拡張子からの推論とも）と `group` の併用は `KUBB_INVALID_PLUGIN_OPTIONS` でビルド停止
- barrel の `index.ts` はデフォルトでは banner なし。plugin が `output.banner` を設定すると `isBarrel: true` で関数が実行される
- adapter / parser / storage をカスタムする例: `adapterOas({ validate: true })`、`parsers: [parserTs(), parserTsx()]`、`storage: memoryStorage()`（`kubb/kit` から import）
- Source: https://kubb.dev/docs/5.x/reference/configuration (docs/5.x/reference/configuration.md of kubb@5.20.0, retrieved 2026-11-14)
- Migration (5.11 → 5.20): the default `root` changed from `process.cwd()` to the folder of the config file; `input` accepts git inputs (`git+<repo>#<ref>:<path>`); the bare `@kubb/core` engine now applies `root`, `storage`, `output.format`, `output.lint`, and `output.defaultBanner`; bundler integrations apply the same defaults as `defineConfig` (docs diff 5.11 → 5.20, see also the Kubb changelog)
- The `input` requirement above is stated for `kubb generate` / `createKubb`. The import integrations say a config without `input` only serves `*.openapi.yaml` imports (integrations/overview "Import a spec", openapi-import: "Leave `input` out to import specs only"). Both statements are kept as published; omit `input` only for import-only configs and keep it for `kubb generate` (Source: https://kubb.dev/docs/5.x/integrations/openapi-import, kubb@5.20.0, retrieved 2026-11-14)

## Related

- [plugin-options](./plugin-options.md)
- [diagnostics](./diagnostics.md)
- [kit-api](./kit-api.md)
