# cli

`fw` CLI の全サブコマンド（`fandhe-frontend-cli` 0.5.2 の `src/main.rs` / `src/new.rs` / `src/gate.rs` / `src/new_template.rs` で確認済み）。サブコマンドは `structure` / `gate` / `impact` / `new` の 4 つ。

## プロジェクトの新規作成（fw new）

```sh
fw new my-app --template app
```

`--template <name>` は `default`（標準構成）/ `app`（SSR/SSG + CSR(WASM) の拡充構成）/ `embed`（`embed.html` のみの最小埋め込み構成）から選ぶ。省略時は `default`。usage は `fw new <project-name> [--template <template> | --example <example>] [--dir <parent-dir>] [--force]`。

```sh
fw new my-app --dir <parent-dir> --force
```

`--dir <parent-dir>` で生成先の親ディレクトリを指定（省略時はカレントディレクトリ）。`--force` は既存ディレクトリへの上書きを許可する。

> **警告**: `--force` は生成先に既存ファイル・ディレクトリがあっても検証なしで展開を進める。既存プロジェクトを誤って混入・上書きする可能性があるため、対象ディレクトリを必ず確認してから使うこと。

```sh
fw new my-example --example ssr-routing
```

`--example <name>` は正本サンプルを展開する。指定可能な名前は `ssr-routing` / `ssg-blog` / `dist-server-docker` / `interactive-view-transitions` / `headless-pre-styled-ui` / `wireframe-ui` / `vercel-ssg` / `vercel-ssr` の 8 件。`--template` と `--example` は同時指定不可（使用法エラー、終了コード 2）。未知の名前も使用法エラー。

## 構造マニフェストの検証（fw structure）

```sh
fw structure --project <dir>
```

`structure.toml` をパース・検証し、`cargo metadata` との突き合わせ（crate 実在・依存宣言の過不足）、ルート定義・コンポーネント境界の抽出結果を JSON で標準出力へ返す。`--project` 省略時はカレントディレクトリ。違反があれば検出した全件を標準エラーへ列挙して終了コード 1、使用法エラーは 2。

## 検証ゲートの一括実行（fw gate）

```sh
fw gate --project <dir> --verbose
```

型チェック（`cargo check`）・既定エスケープ検査・URL 属性検証・lint（`cargo clippy`）・wasm32 向け lint・テスト（`cargo test`）・依存ポリシー（`cargo deny`）の 7 チェックを一括実行し、結果を JSON で標準出力へ返す。`--project` 省略時はカレントディレクトリ。`--verbose` を付けない場合はパスしたテストの出力を要約し、付けた場合はフル出力を表示する（JSON 構造自体は変わらない）。終了コードは `0`（PASS）/ `1`（BLOCKED、チェック失敗）/ `2`（使用法エラー）/ `3`（ERROR、環境エラー。ツール未導入など）。usage は `fw gate [--project <dir>] [--verbose] [--only <check>[,<check>...]]`。

## 検証ゲートの部分実行（fw gate --only）

```sh
fw gate --project <dir> --only test,lint
```

`--only <check>[,<check>...]` で実行するチェックを部分集合に限定する（選択されなかったチェックの外部コマンドは起動しない）。指定できるチェック名は `type_check` / `default_escape_check` / `url_validation_check` / `lint` / `lint_wasm32` / `test` / `policy` の 7 件で、完全一致のみ受理する。出力の `checks` は指定順ではなく上記の正規順に並ぶ。`--only` 指定時は JSON に `selected_checks` が追加され、部分実行の PASS は既定（`--only` なし）のフル実行の PASS とは区別される。

`--only` は値の欠落・空のチェック名・未知のチェック名を使用法エラー（終了コード 2）として拒否する。`--only=<value>` 形式は受理されない（`--only <value>` と空白区切りで指定する）。`structure.toml` の読み込み・検証失敗は `--only` を指定しても迂回できず BLOCKED になる。asset-only プロジェクト（宣言クレート 0 件かつ全ディレクトリが `role = "asset"`）では cargo 系チェックは not applicable になる。

## 変更影響分析（fw impact）

```sh
fw impact <symbol> --project <dir>
```

指定シンボル（トップレベル `pub fn` 等）の破壊的変更リスク・影響を受ける crate / ルートを解析し JSON で返す。シンボル名に `-` や `::` は使用不可（使用法エラーで拒否される）。シンボル欠落・空文字も終了コード 2。定義元が見つからない・走査失敗・`cargo metadata` 失敗は終了コード 1。
