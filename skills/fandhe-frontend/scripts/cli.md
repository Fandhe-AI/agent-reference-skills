# cli

`fw` CLI の全サブコマンド（`crates/cli/src/main.rs` で確認済み）。

## プロジェクトの新規作成（fw new）

```sh
fw new my-app --template app
```

`--template <name>` は `default`（標準構成）/ `app`（SSR/SSG + CSR(WASM) の拡充構成）/ `embed`（`embed.html` のみの最小埋め込み構成）から選ぶ。省略時は `default`。

```sh
fw new my-app --dir <parent-dir> --force
```

`--dir <parent-dir>` で生成先の親ディレクトリを指定（省略時はカレントディレクトリ）。`--force` は既存ディレクトリへの上書きを許可する。

> **警告**: `--force` は生成先に既存ファイル・ディレクトリがあっても検証なしで展開を進める。既存プロジェクトを誤って混入・上書きする可能性があるため、対象ディレクトリを必ず確認してから使うこと。

```sh
fw new my-example --example ssr-routing
```

`--example <name>` は正本サンプル（`ssr-routing` / `ssg-blog` / `dist-server-docker` / `interactive-view-transitions` / `headless-pre-styled-ui`）を展開する。`--template` と `--example` は同時指定不可。

## 構造マニフェストの検証（fw structure）

```sh
fw structure --project <dir>
```

`structure.toml` をパース・検証し、`cargo metadata` との突き合わせ（crate 実在・依存宣言の過不足）、ルート定義・コンポーネント境界の抽出結果を JSON で標準出力へ返す。`--project` 省略時はカレントディレクトリ。

## 検証ゲートの一括実行（fw gate）

```sh
fw gate --project <dir> --verbose
```

型チェック（`cargo check`）・既定エスケープ検査・lint（`cargo clippy`）・テスト（`cargo test`）・依存ポリシー（`cargo deny`）を一括実行し、結果を JSON で標準出力へ返す。`--project` 省略時はカレントディレクトリ。`--verbose` を付けない場合はパスしたテストの出力を要約し、付けた場合はフル出力を表示する（JSON 構造自体は変わらない）。終了コードは `0`（PASS）/ `1`（BLOCKED、チェック失敗）/ `2`（使用法エラー）/ `3`（ERROR、環境エラー。ツール未導入など）。

## 変更影響分析（fw impact）

```sh
fw impact <symbol> --project <dir>
```

指定シンボル（トップレベル `pub fn` 等）の破壊的変更リスク・影響を受ける crate / ルートを解析し JSON で返す。シンボル名に `-` や `::` は使用不可（使用法エラーで拒否される）。
