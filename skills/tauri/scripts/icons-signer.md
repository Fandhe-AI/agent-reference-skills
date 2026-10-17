---
source: https://v2.tauri.app/develop/icons/
---

# Icons and Signer

アプリアイコンの生成（`tauri icon`）と、アップデーター用署名鍵の生成・署名（`tauri signer`）のコマンド集。

> **警告**: `tauri signer generate` が出力する秘密鍵は絶対に共有・コミットしない。公式は「鍵を失うと、既にアプリを導入済みのユーザーへ新しいアップデートを配布できなくなる」としている。`-f, --force` は既存の秘密鍵ファイルを上書きする。

## アイコンの生成

```sh
npm run tauri icon
```

```sh
cargo tauri icon
```

入力は既定で `./app-icon.png`。デスクトップ用アイコンは既定で `src-tauri/icons` に出力され、モバイル用は Xcode / Android Studio プロジェクトへ直接配置される。

## 入力ファイルと出力先の指定

```sh
cargo tauri icon /path/to/app-icon.png
cargo tauri icon /path/to/app-icon.png --ios-color '#fff'
cargo tauri icon --output <OUTPUT>
cargo tauri icon --png <PNG>
cargo tauri icon --fit contain
```

| Option | 説明 |
| --- | --- |
| `[INPUT]` | 正方形の PNG / SVG（透過あり）またはマニフェスト JSON（既定 `./app-icon.png`） |
| `-o, --output <OUTPUT>` | 出力先（既定は `tauri.conf.json` と同階層の `icons`） |
| `-p, --png <PNG>` | 生成する PNG のサイズを指定（指定時は既定アイコンを生成しない） |
| `--ios-color <IOS_COLOR>` | iOS アイコンの背景色（CSS Color Module Level 4、既定 `#fff`） |
| `--fit <FIT>` | 非正方形ソースの収め方（`cover` / `contain`。未指定だと非正方形は拒否） |

`tauri ios init` / `tauri android init` の後に実行するとモバイルアイコンを更新できる。

## アップデーター署名鍵の生成

```sh
npm run tauri signer generate -- -w ~/.tauri/myapp.key
```

```sh
cargo tauri signer generate -w ~/.tauri/myapp.key
```

公開鍵は `tauri.conf.json` に設定してアーティファクトの検証に使う。オプション: `-p, --password <PASSWORD>` / `-w, --write-keys <WRITE_KEYS>` / `-f, --force` / `--ci`。

## 署名付きビルドの環境変数

公式は「`.env` ファイルは機能しない」としている。

```sh
export TAURI_SIGNING_PRIVATE_KEY="Path or content of your private key"
# optionally also add a password
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""
```

```powershell
$env:TAURI_SIGNING_PRIVATE_KEY="Path or content of your private key"
<# optionally also add a password #>
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""
```

設定後に `tauri build` を実行すると更新バンドルと署名が生成される（`createUpdaterArtifacts` 設定が前提）。

## ファイルへの手動署名

```sh
cargo tauri signer sign <FILE>
cargo tauri signer sign --private-key-path <PRIVATE_KEY_PATH> --app-version <APP_VERSION> <FILE>
```

パスワードは事前に環境変数 `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` へ設定しておく。

| Option | 説明 |
| --- | --- |
| `-k, --private-key <PRIVATE_KEY>` | 秘密鍵の文字列（環境変数 `TAURI_SIGNING_PRIVATE_KEY`） |
| `-f, --private-key-path <PRIVATE_KEY_PATH>` | 秘密鍵ファイル（環境変数 `TAURI_SIGNING_PRIVATE_KEY_PATH`） |
| `-p, --password <PASSWORD>` | 秘密鍵のパスワード（環境変数 `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`） |
| `--app-version <APP_VERSION>` | 署名をアプリのバージョンに紐付ける（`requireSignedVersion` を設定したアップデーター向け。`tauri build` は自動設定、手動署名時に指定） |

## 注記

- 呼び出し形は導入方法で異なる（`dev-build.md` の表を参照）。npm は追加フラグの前に `--` が必要。
- `--password` / `-p` を引数で渡すとシェル履歴・プロセス一覧に残るため、環境変数 `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` で渡す。
- 出典の `--help` 出力の `Usage: pnpm-native run build ...` は公式 docs の生成環境由来で、実際は `tauri ...`。
- 手動でアイコンを作る場合の要件（`icon.ico` の層サイズ、PNG は RGBA 32bit など）は references の `develop/icons.md` を参照。
