# docs サイト生成器の外部リポジトリ利用ガイド

fandhe-frontend の docs サイト生成器（`docs-site`）を、fandhe-frontend 以外のリポジトリのドキュメントサイトに使うための手順。導入、`nav.toml` の書き方、`[site]` のブランドキー、予約名、GitHub Pages への公開を扱う。

## Signature / Usage

生成器は `crates/docs-site`（パッケージ名 `fandhe-frontend-docs-site`、バイナリ名 `docs-site`）。crates.io には未公開のため git から導入する。

```bash
cargo install --git https://github.com/Fandhe-AI/fandhe-frontend --rev <commit-sha> --locked fandhe-frontend-docs-site
```

コマンドライン:

```text
docs-site --out <dir> [--root <dir>] [--no-page-sections] [--help]
```

最小構成の `nav.toml`（`<root>/site/nav.toml`、値は例示用ダミー）:

```toml
[site]
title = "my-project"
base_path = "/my-project"
brand = "my-project"
repository_url = "https://github.com/your-org/my-project"
tagline = "my-project のドキュメント"
copyright = "© 2026 your-org"
version_badge = ""
lang = "ja"
brand_mark = "m"
brand_color = "#0f766e"

[[section]]
title = "Docs"
index_path = "/"

[[section.page]]
title = "はじめに"
source = "site/index.md"
path = "/"

[[section.page]]
title = "使い方"
source = "site/usage.md"
path = "/usage/"
```

`source` が参照する原稿はビルド前に作成する（存在しないと書き出し前に失敗する）:

```sh
mkdir -p site
printf '# はじめに\n\nmy-project のドキュメントへようこそ。\n' > site/index.md
printf '# 使い方\n\nここに使い方を書きます。\n' > site/usage.md
```

GitHub Pages ワークフロー内の生成コマンド:

```text
docs-site --out "${RUNNER_TEMP}/dist" --no-page-sections
```

ローカルプレビュー（出力は `<親ディレクトリ>/<base_path>/` に置く。配信後 `http://127.0.0.1:8000/<base_path>/` を開く）:

```text
python3 -m http.server --bind 127.0.0.1 --directory <親ディレクトリ>
```

## Options / Props

### コマンドライン引数

| Name | Type | Description |
|------|------|-------------|
| `--out` | path（必須） | 出力先ディレクトリ |
| `--root` | path | `site/nav.toml` を含むリポジトリルート。既定は `.` |
| `--no-page-sections` | flag | fandhe-frontend 本サイト専用機能（Themes・Primitives・Blocks・Wireframes のショーケース注入と専用アセット出力）を止める |
| `--help` / `-h` | flag | 使い方を標準出力へ出して終了コード 0 で終わる（何も生成しない）。`-h` というディレクトリは `./-h` と書く |

未知の引数は使い方を標準エラーへ出して非 0 で終了する。

### nav.toml のテーブルとキー

| Name | Type | Description |
|------|------|-------------|
| `[site]` | table | `title` と `base_path` が必須。`base_path` は空文字、または `/` で始まり `/` で終わらない文字列（GitHub Pages プロジェクトサイトは `/<リポジトリ名>`、ユーザーサイト・独自ドメイン直下は空文字） |
| `[[section]]` | table | `title` と `index_path`。`index_path` は配下の実在する `page.path` と完全一致させる。ページもグループも持たないセクションは不可。1 つ以上必要 |
| `[[section.page]]` / `[[section.group.page]]` | table | `title`・`source`・`path`。`path` は `/` で始まり `/` で終わり、セグメントは英数字・`-`・`_` のみでサイト全体で一意。`source` は `--root` からの相対パスで実在ファイル（絶対パス・`..`・`\` 不可、`site/` の外も可） |
| `[[section.group]]` | table | `title` のみ。入れ子は 1 段まで |
| `[[menu]]` / `[[menu.item]]` | table | 任意。複数セクションをヘッダー 1 項目と集約ページへ束ねる。`[[menu]]` は `title`・`index_path`・`source`、`[[menu.item]]` は `section`・`description`。`index_path` はどの `page.path` とも重複不可 |

### `[site]` のブランドキー（8 キー、すべて任意）

| Name | Type | Description |
|------|------|-------------|
| `brand` | string | 1〜64 文字、制御文字なし、空白のみ不可。ヘッダーとフッターのブランド名。未指定時ヘッダーは `fandhe-frontend`、フッターは `title` |
| `repository_url` | string | `https://` で始まる ASCII、空白・`\` なし、ホストあり、2048 バイト以下。ヘッダーとフッターのリポジトリリンク（文言とアイコンはホストで決まる）。未指定時は fandhe-frontend のリポジトリ |
| `tagline` | string | 1〜200 文字、制御文字なし、空白のみ不可。フッターのタグライン。未指定時は fandhe-frontend の文言 |
| `copyright` | string | `tagline` と同じ制約。フッター下段。未指定時は fandhe-frontend の著作権表記 |
| `version_badge` | string | 0〜32 文字、制御文字なし、空文字は非表示、空白のみ不可。ヘッダーのバッジ。未指定時は fandhe-frontend-core の版数 |
| `lang` | string | BCP 47 形（`ja`、`en-US`、`zh-Hant-TW` 等）、35 文字以下。`<html lang>` と生成器が出す固定クローム文言の言語を選ぶ。既定 `ja` |
| `brand_mark` | string | ASCII 英数字ちょうど 1 文字。`assets/favicon.svg` とヘッダーのマーク。未指定時は既定の図案 |
| `brand_color` | string | `#` と 16 進 6 桁。マークのタイルの塗り色。既定 `#3182ce`。白文字とのコントラストは検証されない |

### 予約名（ビルドエラーになる）

| Name | Type | Description |
|------|------|-------------|
| 予約アセット名 | file name | `site/assets/` 直下に置けない: `site.css` `site-primitives.css` `skip-nav.css` `pre-styled-ui.css` `primitives-showcase.css` `admonition.css` `site.js` `theme-init.js` `favicon.svg` `search-index.json` `image-demo.svg` `blocks.css` `wireframes.css` `blocks-demo-product.svg` `blocks-demo-avatar.svg` `blocks-demo-logo.svg` `blocks-demo-screenshot.svg` `blocks-demo-background.svg`。`index_path = "/assets/"` の `[[menu]]` を持つ場合は `site/assets/index.html` も不可 |
| 予約パス接頭辞 | path | `--no-page-sections` なしのビルドでショーケース注入に使われる: `/themes/<部品名>/` `/primitives/<部品名>/` `/blocks/<id>/` `/wireframes/<名前>/` |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/guides/docs-site-external-repos/（原本は pin SHA `4c8c7d1` の `docs/guides/docs-site-external-repos.md`）
- 導入: `--rev` には 40 桁の commit SHA を指定して固定する（`main` 等のブランチ名は動くため非推奨）。`--locked` で依存解決を固定。認証不要（private な submodule は取得されない）。外部クレート依存なしで Rust stable の toolchain のみ必要
- 重要: fandhe-frontend 以外のサイトでは `--no-page-sections` を必ず付ける。付けないと本サイト専用の生成節の登録表が使われ、未登録ページを持つ `nav.toml` は書き出し前にエラーで失敗する
- 最小構成の出力: ページごとの `index.html`、`404.html`、`assets/` 配下の `site.css` / `skip-nav.css` / `site.js` / `theme-init.js` / `favicon.svg` / `search-index.json` / `search-index/<セクション>.json`。内部リンクが 1 件でも壊れていると何も書き出さず非 0 で終了する
- `nav.toml` の書式は TOML のサブセット。使えるのは `#` コメント、`[site]`、`[[section]]`、`[[section.page]]`、`[[section.group]]`、`[[section.group.page]]`、`[[menu]]`、`[[menu.item]]`、`key = "value"`。値はダブルクォート文字列のみ（エスケープは `\"` `\\` `\n` `\t`）。整数・真偽値・配列・inline table・複数行文字列は不可。未知キー・重複キーはエラー。サイズ上限 1 MiB
- `path = "/"` のページは実質必須。ヘッダーのブランドと 404 ページが `base_path` 直下へのリンクを持つため、無いとリンク検査で失敗する
- 任意ファイル: `site/redirects.toml`（`[[redirect]]` の `from` / `to` で旧 URL の移転案内ページを作る）、`site/assets/`（直下の通常ファイルが出力の `assets/` へコピーされる。サブディレクトリとシンボリックリンクはエラー）
- ブランドキーの値が検証に通らないと行番号付きエラーで失敗する（値自体はエラーに出ない）
- `brand` 未指定だとヘッダーのブランド名が `fandhe-frontend` のまま、`version_badge` 未指定だと fandhe-frontend-core の版数が表示される。外部サイトでは `brand` を指定し、`version_badge` は空文字（非表示）か自前の文字列にする
- `lang`: `<html lang>` に加え、生成器の固定クローム文言（検索ボタン・検索ダイアログのラベルとプレースホルダ、前後ページのリンク、404 ページ、リダイレクト案内）の言語を選ぶ。先頭サブタグが `ja`（大文字小文字不問、未指定の既定も `ja`）なら日本語、それ以外は英語。選べるのは日本語と英語の 2 つで、文言を差し替えるキーは無い。`tagline` と `copyright` の既定文言は日本語のままなので、英語サイトでは両方を指定する
- `repository_url`: ホストが `github.com`（`www.github.com` 含む、大文字小文字不問）ならリンク文言が "GitHub" で GitHub のマーク、それ以外は "Repository" と汎用アイコン。バックスラッシュは不可（ブラウザが `/` と解釈しホスト判定と実リンク先がずれるため）。ホスト判定はユーザー名・ポート番号を除いて行う（`https://github.com@example.com/` のホストは `example.com`）
- 画像ファイルをロゴに使うキーは無い。ページの `<title>` は各ページの `title` のみでサイト名は付かない
- `--no-page-sections` を付ければ予約パス接頭辞も通常のページとして使えるが、付け忘れに備えて避けるのが無難
- Markdown 対応: 見出し `#`〜`######`（`id` 付き）・段落・リスト（入れ子可）・表・引用・fenced code（色分けは `rust` / `toml` / `html` のみ）・インラインコード・`*強調*`・`**太字**`・リンク（`http` / `https` / 相対のみ）・admonition（引用の 1 行目に単独で `[!NOTE]` `[!TIP]` `[!IMPORTANT]` `[!WARNING]` `[!CAUTION]`、大文字）
- Markdown 非対応: 画像（`!` とリンクとして描画される）、`_強調_`、生 HTML と HTML コメント（エスケープされ文字として表示される）、自動リンク・参照形式リンク・`mailto:` などのスキーム
- リンク検査: nav に登録した `.md` への相対リンクは公開 URL へ自動書き換え。nav に無い `.md`、存在しない `#anchor`、存在しない絶対パス（`base_path` を含めて書く）はビルドエラー。外部 URL は到達確認しない
- 帰属表記: `MIT OR Apache-2.0` で提供。`lang` 以外のブランドキー 7 つ（`brand` `repository_url` `tagline` `copyright` `version_badge` `brand_mark` `brand_color`）を 1 つでも指定するとフッター下段が `Built with fandhe-frontend docs-site (MIT OR Apache-2.0)` になり、7 つとも未指定なら `Licensed under MIT OR Apache-2.0`。リンク先は `repository_url` に関係なく fandhe-frontend 側を指す
- 帰属表記を消す・差し替えるキーは無い（`[site]` は未知キーを拒否）。生成後 HTML から取り除く後処理もしない。利用者自身のコンテンツのライセンスは対象外で、`copyright` や本文で別に示す
- GitHub Pages: リポジトリ Settings の Pages で Source を "GitHub Actions" にする。流れは checkout（submodule 不要、`persist-credentials: false`）→ Rust stable → `cargo install` で `docs-site` 導入 → `docs-site --out "${RUNNER_TEMP}/dist" --no-page-sections` で生成 → Pages 成果物として渡す → deploy ジョブで公開
- 権限は最小にする: ワークフロー全体は `contents: read`、`pages: write` と `id-token: write` は deploy ジョブのみ。サードパーティ action は commit SHA 固定。action の SHA・版数は古くなるため原本ガイドにも workflow YAML は無く、実例として fandhe-frontend リポジトリの `.github/workflows/docs-site.yml` を案内している（公開リポジトリ `Fandhe-AI/actions` の再利用ワークフロー `pages-deploy.yml` を呼ぶ）
- 再利用ワークフローの既定ランナーは self-hosted のため、`runner-label: ubuntu-latest` を明示しないとジョブが待機したまま止まる
- ローカルプレビュー: 生成 HTML は `base_path` 付き絶対パスでアセットを参照するため `file://` ではスタイルが崩れる。出力を `<任意のディレクトリ>/<base_path>/`（例: `base_path = "/my-project"` なら `preview/my-project/`）に置き、親ディレクトリを HTTP サーバーで配信する。fandhe-frontend リポジトリの `make docs-preview` も同方式
- 足場作成からデプロイ設定までを自動化する場合は Fandhe-AI/agent-util-skills の `setup-github-pages` スキルがある。設計判断の経緯は fandhe-frontend リポジトリの `docs/design/docs-site-external-use.md`（`[site]` の拡張と帰属表記の決定記録）

## Related

- [デプロイガイド](./deployment.md)
