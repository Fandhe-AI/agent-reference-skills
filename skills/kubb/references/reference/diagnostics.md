# Diagnostics

ビルド失敗時に Kubb が表示する診断メッセージの仕様（docs 5.x reference/diagnostics）。安定したコード、メッセージ、ドキュメント該当箇所、推奨される修正方法を含む。

## メッセージ形式

ターミナルではコードが右側に表示され、下にリンクが付く。プラグインが報告した問題はそのプラグイン名の下に並ぶ。

```text
  ✖ Could not find a definition for #/components/schemas/Owner.     KUBB_REF_NOT_FOUND
    at   petStore.yaml:336:17
    fix  Add the schema under `components.schemas`, or fix the `$ref`. Run `kubb validate` to check the spec.
    ↳ Learn more  kubb.dev/docs/5.x/reference/diagnostics#kubb-ref-not-found
```

AI コーディングエージェント・CI・パイプが出力を読む場合は、原因（`why:`）と修正（`fix:`）を含むラベル付きプレーン行が出力される。プラグイン由来の問題はコードの後ろの角括弧にプラグイン名が付く。クラッシュ時は `caused by:` と最初の `stack:` フレームが追加される。実行サマリーが続き、終了コードは 1。`--reporter json` で機械可読出力。

```text
error KUBB_REF_NOT_FOUND: Could not find a definition for #/components/schemas/Owner.
  at: petStore.yaml:336:17 (#/components/schemas/Owner)
  why: A `$ref` could not be resolved in the source document.
  fix: Add the schema under `components.schemas`, or fix the `$ref`. Run `kubb validate` to check the spec.
  docs: https://kubb.dev/docs/5.x/reference/diagnostics#kubb-ref-not-found
warning KUBB_INVALID_SPEC: Missing $ref pointer "#/components/schemas/Owner". Token "Owner" does not exist.
  why: The document does not pass OpenAPI schema validation. Kubb still generates from it, but the output can be incomplete or wrong.
  fix: Fix the spec, or run `kubb validate` to list every error. Set `validate: false` on the adapter to skip this check.
  docs: https://kubb.dev/docs/5.x/reference/diagnostics#kubb-invalid-spec
✗ Generation failed  202ms

  28 files generated
  Plugins  3 passed
  Issues   1 error · 1 warning
  Target   ./src/gen
```

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
| `KUBB_ADAPTER_REQUIRED` | OpenAPI adapter 専用のプラグイン（adapter オプションを読む Kubb プラグインと `@kubb/plugin-redoc`）が別の adapter、または adapter なしで実行された。`adapter: adapterOas()` を設定。`defineConfig` は `adapter` 省略時に OpenAPI adapter を供給するため、このコードはカスタム adapter または `@kubb/core` の `createKubb` 利用時のみ出る |
| `KUBB_BARREL_DUPLICATE_EXPORT` | 同じ barrel ディレクトリの 2 ファイルが同名を export。barrel は最初の export を残し他を落とす（生成コードはパース可能だが実行は失敗扱い）。宣言名・resolver・出力ディレクトリを変更。型と値は同名可 |
| `KUBB_CLEAN_ROOT` | `output.path` がプロジェクトルートまたはその親に解決され、`output.clean` が `kubb.config` とソースを削除してしまう。`./src/gen` のような生成専用サブディレクトリを使う。手書きファイルがあるなら `output.clean` を無効化 |
| `KUBB_FORMAT_FAILED` | 生成ファイルへのフォーマッター処理が失敗（ファイルは書かれるが実行は失敗扱い）。フォーマッターのインストールと設定を確認、または `output.format` を変更 |
| `KUBB_GIT_INPUT_FAILED` | git `input`（`git+<repo>#<ref>:<path>`）の形式が不正、または `git` が fetch できない（git 未インストール・リポジトリや ref が無い・認証拒否）。`git+<repo>#<ref>:<path>` 形式で書き、`git fetch --depth 1 <repo> <ref>` を自分で実行して git のエラーを確認し、private リポジトリは credential helper か SSH key を設定 |
| `KUBB_INCOMPATIBLE_DEPENDENCY` | プラグインの `dependencies` の `version` 範囲に対し、設定済みプラグインの `meta.version` が範囲外（`meta.version` が無ければチェックしない）。範囲内の依存を入れるか、インストール済み依存に対応するプラグイン版を入れる |
| `KUBB_INCOMPATIBLE_EXTENSION` | プラグインの `meta.compatibility.kubb` / `meta.compatibility.node` が実行中の Kubb / Node.js を満たさない（プラグイン実行前に検査）。Kubb / Node.js を範囲内へ更新、または対応するプラグイン版を入れる |
| `KUBB_INLINE_FAILED` | inline ソースのみのファイルから import した名前を Kubb が置換できない（inline 定義が無い・自己参照・拡張子の parser が inline 非対応）。1 件の診断が全問題を列挙。その inline ファイルは書かれず実行は失敗扱い。import する全名に inline 定義を与える、inline 対応 parser を登録する、またはソースの inline 指定をやめる |
| `KUBB_INPUT_NOT_FOUND` | `input`（または `kubb generate PATH`）のファイルが読み込めない。ファイルの存在と可読性を確認。`kubb.config.ts` からの相対パス・絶対パス・リモート仕様の完全な URL を使う |
| `KUBB_INPUT_REQUEST_FAILED` | `input` の URL が OpenAPI ドキュメントでなく 4xx / 5xx を返した（サーバーには到達）。`curl` で URL を確認。保護されたドキュメントはダウンロードしてローカルファイルを使う。リモート `$ref` のリクエストにも適用 |
| `KUBB_INPUT_REQUIRED` | adapter があるが `input` が無い。`input` にファイルパス・URL・インライン JSON/YAML 仕様・パース済みドキュメントを設定。ドキュメントをマージする場合は少なくとも 1 つの input を渡す |
| `KUBB_INPUT_UNREACHABLE` | `input` の URL が応答せず、ステータス取得前に失敗。サーバーのホスト・ポートを確認し、Kubb を動かすマシンから URL を取得、VPN / プロキシに接続、またはダウンロードした仕様を使う（メッセージに接続失敗の理由を含む） |
| `KUBB_INTERNAL_ERROR` | Kubb が想定しない状態に到達（設定や仕様ではなく Kubb のバグ）。`--reporter json` か `--verbose` で stack を取得し、再現する仕様と設定で issue を作成 |
| `KUBB_INVALID_DOCUMENT` | `input` から解決したドキュメントを OpenAPI / Swagger として読めない（JSON / YAML 構文エラー、`openapi` も `swagger` も無い、OpenAPI 3.1 へアップグレード不可）。メッセージの行の構文を直し、`input` が HTML ページでなく仕様を指しているか確認。Swagger 2.0 / OpenAPI 3.0 / 3.1 / 3.2 のドキュメントを使い、ラッパーでなくドキュメント自体を渡す。バージョン欠落は validation 無効でも失敗する |
| `KUBB_INVALID_PLUGIN_OPTIONS` | 同時に成立しないプラグインオプション。主な例は `output.mode` が `'file'` に解決されつつ `group` を設定、または `@kubb/plugin-fetch` / `@kubb/plugin-axios` で `sdk.mode: 'tag'`。`group` を外す、`sdk.mode: 'flat'` を使う、ディレクトリへ書く。`output.path` の拡張子はディレクトリモードを明示しない限りファイルモードを意味する |
| `KUBB_INVALID_SERVER_VARIABLE` | server variable の値が `enum` で許可されない。enum が許す値を選ぶ、default を直す、enum をサーバーに合わせる |
| `KUBB_LEGACY_INPUT` | `input` が `{ path }` / `{ data }` ラッパー（v4 の形式）。`input: { path: './spec.yaml' }` を `input: './spec.yaml'`、`input: { data: spec }` を `input: spec` に置換 |
| `KUBB_LINT_FAILED` | 生成ファイルへのリンター処理が失敗（ファイルは書かれるが実行は失敗扱い）。リンターのインストールと設定を確認、生成ファイル向けにルールを調整、または `output.lint` を変更 |
| `KUBB_MISSING_DEPENDENCY` | プラグインが `dependencies` レコードで `optional: true` なしに別プラグインを挙げ、config に無い（`dependencies` 配列は順序付けのみでこのコードを出さない）。不足プラグインをインストールし `kubb.config.ts` の `plugins` に追加 |
| `KUBB_NO_CONTEXT` | `useKubb()` / `addGenerator()` などの `kubb/kit` composable が `setup` / `kubb:plugin:setup` の外で実行された。それらの内側（または setup が await するコード）で呼ぶ。generator や後続フックでは使えない |
| `KUBB_PARSER_FAILED` | パーサーが生成ファイルの出力中に予期しないエラーを throw。パーサーオプションを確認。バグなら stack を添えて報告（`meta.issues` があれば `report:` リンク） |
| `KUBB_PATH_TRAVERSAL` | 解決した出力パスが出力ディレクトリの外に出る。生成パスを `output.path` 内、resolver の `file.path` を出力ディレクトリ内に保つ。仕様や `group.name` 由来の名前の `..` とパス区切りを拒否 |
| `KUBB_PLUGIN_FAILED` | プラグインが生成中に throw、または `ctx.error` で error を報告。プラグインオプションと `at:` ポインタのノードを確認。バグなら stack と再現する仕様断片を添えて報告。構造化エラーは `Diagnostics.Error` / `Diagnostics.report` |
| `KUBB_PLUGIN_NOT_FOUND` | 必須プラグインが config に無い。必要なプラグインをインストールして `plugins` に追加（順序は不問）、または依存元プラグインを外す。v5 では adapter が OpenAPI を読むため `@kubb/plugin-oas` は追加しない |
| `KUBB_POST_GENERATE_FAILED` | `output.postGenerate` のコマンドが非ゼロ終了（フォーマット・lint の後に実行。ファイルは書かれるが実行は失敗扱い）。プロジェクトルートから手動実行し、バイナリ・綴り・設定を確認 |
| `KUBB_REF_NOT_FOUND` | `$ref` が存在しない定義、または Kubb が読めないファイル / URL を指す。定義を追加・欠けたファイルを作成・`$ref` を修正し、生成前に `kubb validate` を実行。URL 入力からローカルファイルへの `$ref` にも出る。Kubb Studio の agent はプロジェクトと config の input ファイルのフォルダー外のローカルファイルを拒否し、sandbox agent は全ローカルファイルを拒否、managed agent は git input のリポジトリ内を除き拒否する。ファイルをプロジェクト内へ移す、自前の agent を `--allow-file-refs` で起動する、またはスキーマをインライン化する。`x-` vendor extension 内の読めない `$ref` は Kubb が extension を読まず出力が変わらないため warning |
| `KUBB_UNKNOWN` | 固有コードを持たない未分類エラーのフォールバック。`kubb generate --reporter file` で `.kubb/` 配下のログを取得、または `--verbose`。メッセージと stack を確認し、不明なものは `Environment:` ブロックと共に報告（CLI 出力では未分類エラーに汎用の fix が出て docs URL は無い） |

### Warnings

| コード | 説明と修正 |
|--------|-----------|
| `KUBB_INVALID_SPEC` | ドキュメントが OpenAPI スキーマ検証に通らない。各問題を報告し生成は継続するが、出力が不完全・不正になりうる（`@kubb/adapter-oas` の `validate` が `true`（既定）のとき）。仕様を修正、`kubb validate` で全エラーを位置付きで列挙、`validate: false` で検査をスキップ。`kubb validate` は同じコードを error として報告し非ゼロ終了する。バリデーターは OpenAPI 3.2 未対応で、3.2 ドキュメントでは未検証である旨のメッセージでこのコードが出る |
| `KUBB_ALIAS_CYCLE` | 互いを `$ref` するだけのスキーマがループを作り、生成する形が無い。Kubb は `unknown` に解決する。いずれかのスキーマに実際の定義を与えるか、ループを閉じる `$ref` を外す |
| `KUBB_DUPLICATE_DISCRIMINATOR` | 複数の `oneOf` / `anyOf` メンバーが `discriminator` プロパティを同じ値に固定し、値で分岐を選べない。Zod の `z.discriminatedUnion` は最初の parse で throw する。各メンバーに固有の値を与えるか、`discriminator` を外して形で照合する |
| `KUBB_PLUGIN_WARNING` | プラグインが `ctx.warn` で致命的でない警告を報告。メッセージを読み入力かプラグインオプションを調整。プラグイン作者は `Diagnostics.report` で安定コードと位置を付けられる |
| `KUBB_UNSUPPORTED_FORMAT` | 型マッピングを持たないスキーマ `format`（基底型にフォールバック）。対応フォーマットを使う、基底型で足りれば省略、カスタムパーサー / プラグインでマップ。各 format は件数付きで最初に使うスキーマで 1 回だけ報告される |

### Info

| コード | 説明と修正 |
|--------|-----------|
| `KUBB_DEPRECATED` | 参照先のスキーマ・operation が `deprecated`。可能なら移行。生成は変わらず、通知は毎回出うる |
| `KUBB_PERFORMANCE` | プラグインの経過時間（ビルド中にプラグインごとに 1 つ）。ターミナル診断としては表示されない。`kubb generate --verbose` でタイミングを確認。合計は生成時間で、config 読み込み・format・lint・post-generate は含まない |
| `KUBB_PLUGIN_INFO` | プラグインが `ctx.info` で情報メッセージを報告。対応不要。サマリーと JSON レポートに現れる |
| `KUBB_UPDATE_AVAILABLE` | 実行中より新しい Kubb が npm に公開されている。パッケージマネージャーで Kubb とプラグインを更新。`kubb generate` は npm への問い合わせを 24 時間に最大 1 回とし結果を `KUBB_HOME`（既定 `~/.kubb`）に保存するため、通知は問い合わせしない実行でも出る。CI（`CI` / `GITHUB_ACTIONS` 等の変数で検出）ではチェックしない |

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
| `filesCreated` / `filesUnchanged` / `dryRun` / `durationMs` / `output` | 生成ファイル数・変更なしファイル数・dry run か・所要時間・出力先 |
| `timings` | プラグイン別所要時間（遅い順） |
| `diagnostics` | `code` / `severity` / `message` / `title` / `cause` / `location` / `help`（診断が持たなければカタログの fix にフォールバック）/ `docsUrl` |

診断が投げられたエラーをラップする場合は `causes`（下位エラーのメッセージ）が並び、クラッシュはルートの `stack` を追加する。クラッシュのコードは `KUBB_UNKNOWN` / `KUBB_INTERNAL_ERROR` / `KUBB_PLUGIN_FAILED` / `KUBB_ADAPTER_FAILED` / `KUBB_PARSER_FAILED`。終了コードは変わらず、エラーがあれば非ゼロ。他の reporter は `kubb generate --reporter` を参照。

## Notes

- Source: https://kubb.dev/docs/5.x/reference/diagnostics (docs/5.x/reference/diagnostics.md of kubb@5.20.0, retrieved 2026-11-14)
- Added since 5.11: `KUBB_GIT_INPUT_FAILED`, `KUBB_INLINE_FAILED`, `KUBB_ALIAS_CYCLE`, `KUBB_DUPLICATE_DISCRIMINATOR`; `KUBB_ADAPTER_REQUIRED` is now described as raised by OpenAPI-adapter-only plugins (docs diff 5.11 → 5.20)
- v5 の移行で変わったコード: `KUBB_HOOK_FAILED` は `KUBB_POST_GENERATE_FAILED` に、`input: { path }` は `KUBB_LEGACY_INPUT`
- プラグイン開発者が独自の診断エラーを構築するための `Diagnostics` 名前空間（`Diagnostics.Error`、`Diagnostics.hasError` 等）は Kit API 側のトピック（[kit-api.md](./kit-api.md)）で扱う。本ページはビルド時に発生しうる診断コードの一覧

## Related

- [kit-api](./kit-api.md)
