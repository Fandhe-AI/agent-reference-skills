# Diagnostics

ビルド失敗時に Kubb が表示する診断メッセージの仕様（Kubb 5.11.0 / docs 5.x reference/diagnostics）。安定したコード、メッセージ、ドキュメント該当箇所、推奨される修正方法を含む。

## メッセージ形式

ターミナルではプラグインごとにグループ化され、コードが右側に表示される。

```text
 plugin-ts

  ✖ Could not find #/components/schemas/Owner                    KUBB_REF_NOT_FOUND
    at   #/components/schemas/Pet/properties/owner
    fix  Add the missing definition under components.schemas, or fix the $ref.
    ↳ Learn more  kubb.dev/docs/5.x/reference/diagnostics#kubb-ref-not-found
```

AI コーディングエージェント・CI・パイプが出力を読む場合は、原因（`why:`）と修正（`fix:`）を含むラベル付きプレーン行が出力される。クラッシュ時は `caused by:` と最初の `stack:` フレームが追加される。`--reporter json` で機械可読出力。

## Severity（深刻度）

| Severity | 効果 |
|----------|------|
| error | 非ゼロ終了コードで実行を失敗させる |
| warning | 報告され、実行は継続する |
| info | 助言的。実行を失敗させない |

## 診断コード一覧

### Errors

| コード | 説明と修正 |
|--------|-----------|
| `KUBB_ADAPTER_FAILED` | adapter が入力のパース中に予期しないエラーを throw。意図して報告されるエラー（`KUBB_REF_NOT_FOUND` など）は固有コードを持つ。入力と adapter オプションを確認。バグなら stack を添えて報告（`--reporter json` の `stack`、adapter が `meta.issues` を設定していれば `report:` リンク） |
| `KUBB_ADAPTER_REQUIRED` | アクションに adapter が必要だが未設定。`adapter` を設定（例: `adapterOas()`）。標準の `defineConfig` は既定の OpenAPI adapter を供給するため、adapter 省略時にこのコードは現在発行されない |
| `KUBB_BARREL_DUPLICATE_EXPORT` | 同じ barrel ディレクトリの 2 ファイルが同名を export。barrel は最初の export を残し他を落とす（生成コードはパース可能だが実行は失敗扱い）。宣言名・resolver・出力ディレクトリを変更。型と値は同名可 |
| `KUBB_CLEAN_ROOT` | `output.path` がプロジェクトルートまたはその親に解決され、`output.clean` が `kubb.config` とソースを削除してしまう。`./src/gen` のような生成専用サブディレクトリを使う。手書きファイルがあるなら `output.clean` を無効化 |
| `KUBB_FORMAT_FAILED` | 生成ファイルへのフォーマッター処理が失敗（ファイルは書かれるが実行は失敗扱い）。フォーマッターのインストールと設定を確認、または `output.format` を変更 |
| `KUBB_INCOMPATIBLE_DEPENDENCY` | プラグインの `dependencies` の `version` 範囲に対し、設定済みプラグインの `meta.version` が範囲外（`meta.version` が無ければチェックしない）。範囲内の依存を入れるか、インストール済み依存に対応するプラグイン版を入れる |
| `KUBB_INCOMPATIBLE_EXTENSION` | プラグインの `meta.compatibility.kubb` / `meta.compatibility.node` が実行中の Kubb / Node.js を満たさない（プラグイン実行前に検査）。Kubb / Node.js を範囲内へ更新、または対応するプラグイン版を入れる |
| `KUBB_INPUT_NOT_FOUND` | `input`（または `kubb generate PATH`）のファイルが読み込めない。ファイルの存在と可読性を確認。`kubb.config.ts` からの相対パス・絶対パス・リモート仕様の完全な URL を使う |
| `KUBB_INPUT_REQUEST_FAILED` | `input` の URL が OpenAPI ドキュメントでなく 4xx / 5xx を返した（サーバーには到達）。`curl` で URL を確認。保護されたドキュメントはダウンロードしてローカルファイルを使う。リモート `$ref` のリクエストにも適用 |
| `KUBB_INPUT_REQUIRED` | adapter があるが `input` が無い。`input` にファイルパス・URL・インライン JSON/YAML 仕様・パース済みドキュメントを設定。ドキュメントをマージする場合は少なくとも 1 つの input を渡す |
| `KUBB_INPUT_UNREACHABLE` | `input` の URL が応答せず、ステータス取得前に失敗。サーバーのホスト・ポートを確認し、Kubb を動かすマシンから URL を取得、VPN / プロキシに接続、またはダウンロードした仕様を使う（メッセージに接続失敗の理由を含む） |
| `KUBB_INTERNAL_ERROR` | Kubb が想定しない状態に到達（設定や仕様ではなく Kubb のバグ）。`--reporter json` か `--verbose` で stack を取得し、再現する仕様と設定で issue を作成 |
| `KUBB_INVALID_DOCUMENT` | `input` から解決したドキュメントを OpenAPI / Swagger として読めない（JSON / YAML 構文エラー、`openapi` も `swagger` も無い、OpenAPI 3.1 へアップグレード不可）。メッセージの行の構文を直し、`input` が HTML ページでなく仕様を指しているか確認。バージョン欠落は validation 無効でも失敗する |
| `KUBB_INVALID_PLUGIN_OPTIONS` | 同時に成立しないプラグインオプション。主な例は `output.mode` が `'file'` に解決されつつ `group` を設定、または `@kubb/plugin-fetch` / `@kubb/plugin-axios` で `sdk.mode: 'tag'`。`group` を外す、`sdk.mode: 'flat'` を使う、ディレクトリへ書く。`output.path` の拡張子はディレクトリモードを明示しない限りファイルモードを意味する |
| `KUBB_INVALID_SERVER_VARIABLE` | server variable の値が `enum` で許可されない。enum が許す値を選ぶ、default を直す、enum をサーバーに合わせる |
| `KUBB_LEGACY_INPUT` | `input` が `{ path }` / `{ data }` ラッパー（v4 の形式）。`input: { path: './spec.yaml' }` を `input: './spec.yaml'`、`input: { data: spec }` を `input: spec` に置換 |
| `KUBB_LINT_FAILED` | 生成ファイルへのリンター処理が失敗（ファイルは書かれるが実行は失敗扱い）。リンターのインストールと設定を確認、生成ファイル向けにルールを調整、または `output.lint` を変更 |
| `KUBB_MISSING_DEPENDENCY` | プラグインが `dependencies` レコードで `optional: true` なしに別プラグインを挙げ、config に無い（`dependencies` 配列は順序付けのみでこのコードを出さない）。不足プラグインをインストールし `kubb.config.ts` の `plugins` に追加 |
| `KUBB_NO_CONTEXT` | `useKubb()` / `addGenerator()` などの `kubb/kit` composable が `setup` / `kubb:plugin:setup` の外で実行された。それらの内側（または setup が await するコード）で呼ぶ。generator や後続フックでは使えない |
| `KUBB_PARSER_FAILED` | パーサーが生成ファイルの出力中に予期しないエラーを throw。パーサーオプションを確認。バグなら stack を添えて報告（`meta.issues` があれば `report:` リンク） |
| `KUBB_PATH_TRAVERSAL` | 解決した出力パスが出力ディレクトリの外に出る。生成パスを `output.path` 内、resolver の `file.path` を project root 内に保つ。仕様や `group.name` 由来の名前の `..` とパス区切りを拒否 |
| `KUBB_PLUGIN_FAILED` | プラグインが生成中に throw、または `ctx.error` で error を報告。プラグインオプションと `at:` ポインタのノードを確認。バグなら stack と再現する仕様断片を添えて報告。構造化エラーは `Diagnostics.Error` / `Diagnostics.report` |
| `KUBB_PLUGIN_NOT_FOUND` | 必須プラグインが config に無い。必要なプラグインをインストールして `plugins` に追加（順序は不問）、または依存元プラグインを外す。v5 では adapter が OpenAPI を読むため `@kubb/plugin-oas` は追加しない |
| `KUBB_POST_GENERATE_FAILED` | `output.postGenerate` のコマンドが非ゼロ終了（フォーマット・lint の後に実行。ファイルは書かれるが実行は失敗扱い）。プロジェクトルートから手動実行し、バイナリ・綴り・設定を確認 |
| `KUBB_REF_NOT_FOUND` | `$ref` が存在しない定義を指す。定義を追加するか `$ref` を修正。生成前に `kubb validate` を実行。外部参照を持つドキュメントは必要に応じてバンドル |
| `KUBB_UNKNOWN` | 固有コードを持たない未分類エラーのフォールバック。`kubb generate --reporter file` で `.kubb/` 配下のログを取得、または `--verbose`。メッセージと stack を確認し、不明なものは `Environment:` ブロックと共に報告（CLI 出力に推奨修正・docs URL は無い） |

### Warnings

| コード | 説明と修正 |
|--------|-----------|
| `KUBB_INVALID_SPEC` | ドキュメントが OpenAPI スキーマ検証に通らない。各問題を報告し生成は継続するが、出力が不完全・不正になりうる（`@kubb/adapter-oas` の `validate` が `true`（既定）のとき）。仕様を修正、`kubb validate` で全エラーを位置付きで列挙、`validate: false` で検査をスキップ |
| `KUBB_PLUGIN_WARNING` | プラグインが `ctx.warn` で致命的でない警告を報告。メッセージを読み入力かプラグインオプションを調整。プラグイン作者は `Diagnostics.report` で安定コードと位置を付けられる |
| `KUBB_UNSUPPORTED_FORMAT` | 型マッピングを持たないスキーマ `format`（基底型にフォールバック）。対応フォーマットを使う、基底型で足りれば省略、カスタムパーサー / プラグインでマップ |

### Info

| コード | 説明と修正 |
|--------|-----------|
| `KUBB_DEPRECATED` | 参照先のスキーマ・operation が `deprecated`。可能なら移行。生成は変わらず、通知は毎回出うる |
| `KUBB_PERFORMANCE` | プラグインの経過時間（ビルド中にプラグインごとに 1 つ）。ターミナル診断としては表示されない。`kubb generate --verbose` でタイミングを確認。合計は生成時間で、config 読み込み・format・lint・post-generate は含まない |
| `KUBB_PLUGIN_INFO` | プラグインが `ctx.info` で情報メッセージを報告。対応不要。サマリーと JSON レポートに現れる |
| `KUBB_UPDATE_AVAILABLE` | 実行中より新しい Kubb が npm に公開されている。パッケージマネージャーで Kubb とプラグインを更新 |

## マシン可読出力

```bash
kubb generate --reporter json
```

安定したレポートを stdout に JSON 配列で出力する（config ごとに 1 レポート。単一 config でも `[ ... ]`）。CI がターミナル出力のスクレイピングなしで診断を読める。

| フィールド | 内容 |
|-----------|------|
| `name` | config 名（無名なら空） |
| `status` | 実行結果（例: `"failed"`） |
| `plugins` | `{ passed, failed: [...], total }` |
| `counts` | `problem` 診断の severity 別合計 `{ errors, warnings, infos }` |
| `filesCreated` / `durationMs` / `output` | 生成ファイル数・所要時間・出力先 |
| `timings` | プラグイン別所要時間（遅い順） |
| `diagnostics` | `code` / `severity` / `message` / `title` / `cause` / `location` / `help`（診断が持たなければカタログの fix にフォールバック）/ `docsUrl` |

診断が投げられたエラーをラップする場合は `causes`（下位エラーのメッセージ）が並び、クラッシュ（`KUBB_UNKNOWN` または `*_FAILED` 拡張コード）はルートの `stack` を追加する。終了コードは変わらず、エラーがあれば非ゼロ。他の reporter は `kubb generate --reporter` を参照。

## Notes

- v5 の移行で変わったコード: `KUBB_HOOK_FAILED` は `KUBB_POST_GENERATE_FAILED` に、`input: { path }` は `KUBB_LEGACY_INPUT`
- プラグイン開発者が独自の診断エラーを構築するための `Diagnostics` 名前空間（`Diagnostics.Error`、`Diagnostics.hasError` 等）は Kit API 側のトピック（[kit-api.md](./kit-api.md)）で扱う。本ページはビルド時に発生しうる診断コードの一覧

## Related

- [kit-api](./kit-api.md)
