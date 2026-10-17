---
source: https://v2.tauri.app/reference/cli/
---

# Plugins and Permissions

公式プラグインの追加・削除、プラグイン雛形の生成、Tauri capabilities / permissions (ACL) のファイル生成・管理のコマンド集。

> **警告**: `tauri remove` と `tauri permission rm` はプロジェクトのファイル・依存・capability 参照を書き換える。必ずバージョン管理下で実行し、差分を確認する。

## 公式プラグインの追加

```sh
npm run tauri add fs
```

```sh
cargo tauri add fs
```

CLI の説明は "Add a tauri plugin to the project"。Rust 側の crate のみ手動で追加する場合は公式プラグインページに次の形が載っている。

```sh
cargo add tauri-plugin-fs
```

`add` のオプション: `-t, --tag <TAG>` / `-r, --rev <REV>` / `-b, --branch <BRANCH>`（Git の指定）/ `--no-fmt`（rustfmt を掛けない）。

## プラグインの削除

```sh
cargo tauri remove fs
```

## プラグイン雛形の生成

```sh
cargo tauri plugin new test
```

```sh
cargo tauri plugin new <PLUGIN_NAME> --no-api --no-example --android --ios
```

`plugin new` のオプション: `--no-api`（TypeScript API なし）/ `--no-example` / `-d, --directory` / `-a, --author` / `--android` / `--ios` / `--mobile`（両方）/ `--ios-framework <spm|xcode>`（既定 `spm`）/ `--github-workflows` / `-t, --tauri-path`。

## 既存ディレクトリのプラグイン初期化

```sh
cargo tauri plugin init [PLUGIN_NAME]
```

```sh
cargo tauri plugin android init [PLUGIN_NAME]
cargo tauri plugin ios init [PLUGIN_NAME]
```

`PLUGIN_NAME` を省略するとカレントディレクトリ名から推測される。

## permission の一覧

```sh
cargo tauri permission ls
cargo tauri permission ls <PLUGIN>
cargo tauri permission ls --filter <FILTER>
```

アプリで利用可能な permission を表示する。

## permission ファイルの作成

```sh
cargo tauri permission new <IDENTIFIER> --description "<DESCRIPTION>" --allow <COMMAND> --deny <COMMAND> --format json --out <FILE>
```

`--format` は `json`（既定）または `toml`。`-a, --allow` と `-d, --deny` は許可 / 拒否するコマンドの一覧。

## capability への permission 追加

```sh
cargo tauri permission add <IDENTIFIER> [CAPABILITY]
```

## permission の削除

```sh
cargo tauri permission rm <IDENTIFIER>
```

プラグイン全体の permission を消すには `<plugin-name>:*` を指定する（permission ファイルと、全 capability からの参照が消える）。

## capability ファイルの作成

```sh
cargo tauri capability new <IDENTIFIER> --description "<DESCRIPTION>" --windows <WINDOWS> --permission <PERMISSION> --format json --out <FILE>
```

## 注記

- 呼び出し形は `npm run tauri <cmd>` / `cargo tauri <cmd>` など導入方法で異なる（`dev-build.md` の表を参照）。
- 出典の `--help` 出力の `Usage: pnpm-native run build ...` は公式 docs の生成環境由来で、実際は `tauri ...`。
- プラグインの JS パッケージ（`@tauri-apps/plugin-*`）と Rust crate（`tauri-plugin-*`）は同一バージョンに揃える（`info-migrate.md` 参照）。
